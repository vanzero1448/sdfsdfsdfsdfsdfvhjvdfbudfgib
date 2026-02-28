// server.js  ·  Pixel Backend v3.0  ·  Production-Ready
// ═══════════════════════════════════════════════════════
"use strict";

const express = require("express");
const { Rcon } = require("rcon-client");
const crypto = require("crypto");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const https = require("https");

const app = express();

// ┌─────────────────────────────────────────────────────┐
// │                 CURRENCY CONVERTER                  │
// └─────────────────────────────────────────────────────┘
let cachedRate = null;
let cachedRateTime = 0;
const CACHE_TTL_MS = 60 * 60 * 1000; // refresh every hour

async function getUsdToRub() {
  if (cachedRate && Date.now() - cachedRateTime < CACHE_TTL_MS) {
    return cachedRate;
  }
  return new Promise((resolve) => {
    https
      .get("https://www.cbr-xml-daily.ru/daily_json.js", (res) => {
        let raw = "";
        res.on("data", (d) => (raw += d));
        res.on("end", () => {
          try {
            const data = JSON.parse(raw);
            const rate = data?.Valute?.USD?.Value;
            if (rate) {
              cachedRate = rate;
              cachedRateTime = Date.now();
              console.log(`💱  USD/RUB rate updated: ${rate}`);
              resolve(rate);
            } else {
              console.warn("⚠️  CBR rate not found, using fallback 90");
              resolve(cachedRate ?? 90);
            }
          } catch (e) {
            console.warn(
              `⚠️  CBR parse error: ${e.message}, using fallback 90`,
            );
            resolve(cachedRate ?? 90);
          }
        });
      })
      .on("error", (e) => {
        console.warn(`⚠️  CBR request failed: ${e.message}, using fallback 90`);
        resolve(cachedRate ?? 90);
      });
  });
}

async function usdToRub(usd) {
  const rate = await getUsdToRub();
  return Math.ceil(parseFloat(usd) * rate); // round UP — копейки Robokassa не любит
}

// ┌─────────────────────────────────────────────────────┐
// │                   ENV VALIDATION                    │
// └─────────────────────────────────────────────────────┘
const REQUIRED_ENV = [
  "ROBOKASSA_MERCHANT_LOGIN",
  "ROBOKASSA_PASSWORD1",
  "ROBOKASSA_PASSWORD2",
  "HYRCON_HOST",
  "HYRCON_PASSWORD",
  "TELEGRAM_BOT_TOKEN",
  "TELEGRAM_CHAT_ID",
  "SITE_URL",
  "BACKEND_URL",
  "ALLOWED_ORIGINS",
];

for (const k of REQUIRED_ENV) {
  if (!process.env[k]) {
    console.error(`❌  Missing required env variable: ${k}`);
    process.exit(1);
  }
}

const MERCHANT = process.env.ROBOKASSA_MERCHANT_LOGIN;
const PASS1 = process.env.ROBOKASSA_PASSWORD1;
const PASS2 = process.env.ROBOKASSA_PASSWORD2;
const RCON_HOST = process.env.HYRCON_HOST;
const RCON_PORT = parseInt(process.env.HYRCON_PORT ?? "25575", 10);
const RCON_PASS = process.env.HYRCON_PASSWORD;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const SITE_URL = process.env.SITE_URL.replace(/\/$/, "");
const BACKEND_URL = process.env.BACKEND_URL.replace(/\/$/, "");
const SERVER_IP = process.env.SERVER_IP ?? "pixel.my-craft.cc:25612";
const IS_TEST = process.env.TEST_MODE === "true";

const ADMIN_CHATS = process.env.TELEGRAM_CHAT_ID.split(",")
  .map((id) => id.trim())
  .filter(Boolean);

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS.split(",")
  .map((o) => o.trim())
  .filter(Boolean);

// ┌─────────────────────────────────────────────────────┐
// │              SECURITY & MIDDLEWARE                  │
// └─────────────────────────────────────────────────────┘
app.use(helmet());
app.set("trust proxy", 1);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
      console.warn(`🚫  CORS rejected: ${origin}`);
      cb(new Error("CORS: origin not allowed"));
    },
    methods: ["GET", "POST"],
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10kb" }));

// ┌─────────────────────────────────────────────────────┐
// │                  RATE LIMITING                      │
// └─────────────────────────────────────────────────────┘
const payLimiter = rateLimit({
  windowMs: 60_000,
  max: 15,
  message: { error: "Too many requests. Please wait." },
});
const resLimiter = rateLimit({
  windowMs: 60_000,
  max: 60,
  message: { error: "Too many requests. Please wait." },
});

// ┌─────────────────────────────────────────────────────┐
// │                   PURCHASES STORE                   │
// └─────────────────────────────────────────────────────┘
/** @type {Map<string, object>} */
const purchases = new Map();

// ┌─────────────────────────────────────────────────────┐
// │                   GAME CONFIG                       │
// └─────────────────────────────────────────────────────┘
const VALID_RANKS = new Set([
  "ping",
  "packet",
  "protocol",
  "script",
  "kernel",
  "cipher",
  "quantum",
  "core",
  "overclock",
  "singularity",
]);

const PACK_CONFIG = {
  s1: { rank: "ping", duration: "90d", kit: "start" },
  s2: { rank: "packet", duration: null, kit: "packet" },
  s3: { rank: "protocol", duration: null, kit: "protocol" },
};

const RANK_DISPLAY = {
  ping: { icon: "🟢", label: "Ping" },
  packet: { icon: "🔵", label: "Packet" },
  protocol: { icon: "🟣", label: "Protocol" },
  script: { icon: "🟠", label: "Script" },
  kernel: { icon: "🔴", label: "Kernel" },
  cipher: { icon: "🟡", label: "Cipher" },
  quantum: { icon: "⚡", label: "Quantum" },
  core: { icon: "💠", label: "Core" },
  overclock: { icon: "🔥", label: "Overclock" },
  singularity: { icon: "🌌", label: "Singularity" },
  bp: { icon: "🏆", label: "Battle Pass" },
};

// ┌─────────────────────────────────────────────────────┐
// │                 COMMAND BUILDER                     │
// └─────────────────────────────────────────────────────┘
function buildCommands(itemId, itemType, nick) {
  const cmds = [];
  let rankName = null;

  if (itemType === "rank") {
    const parts = itemId.split("_");
    const period = parts.pop();
    const rank = parts.join("_");

    if (!VALID_RANKS.has(rank)) return { cmds: [], rankName: null };
    rankName = rank;

    if (period === "forever") cmds.push(`lp user ${nick} parent set ${rank}`);
    else if (period === "month")
      cmds.push(`lp user ${nick} parent addtemp ${rank} 30d`);
    else if (period === "quarter")
      cmds.push(`lp user ${nick} parent addtemp ${rank} 90d`);
    else return { cmds: [], rankName: null };
  } else if (itemType === "pack") {
    const cfg = PACK_CONFIG[itemId];
    if (!cfg) return { cmds: [], rankName: null };
    rankName = cfg.rank;
    cfg.duration
      ? cmds.push(`lp user ${nick} parent addtemp ${cfg.rank} ${cfg.duration}`)
      : cmds.push(`lp user ${nick} parent set ${cfg.rank}`);
    cmds.push(`kit ${cfg.kit} ${nick}`);
  } else if (itemType === "pass") {
    rankName = "bp";
    cmds.push(`lp user ${nick} permission set BetterBattlePass.perks.vip`);
  } else if (itemType === "cosmetic") {
    cmds.push(`givepet ${nick} ${itemId}`);
  }

  return { cmds, rankName };
}

function buildRevokeCommands(p) {
  if (!p.rankName) return [];
  if (p.itemType === "pass")
    return [`lp user ${p.nick} permission unset BetterBattlePass.perks.vip`];
  return [`lp user ${p.nick} parent remove ${p.rankName}`];
}

// ┌─────────────────────────────────────────────────────┐
// │                    HELPERS                          │
// └─────────────────────────────────────────────────────┘
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const isValidNick = (n) => /^[a-zA-Z0-9_]{3,16}$/.test(n);
const isValidSum = (s) => !isNaN(parseFloat(s)) && parseFloat(s) > 0;
const safeCompare = (a, b) =>
  a.length === b.length &&
  crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));

function buildItemLabel(itemId, itemType) {
  if (itemType === "rank") return `${capitalize(itemId.split("_")[0])} Rank`;
  if (itemType === "pack") return `${capitalize(itemId)} Starter Pack`;
  if (itemType === "pass") return "Battle Pass (VIP)";
  return capitalize(itemId);
}

function formatDate(d = new Date()) {
  return (
    d.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Europe/Moscow",
    }) + " МСК"
  );
}

// ┌─────────────────────────────────────────────────────┐
// │                      RCON                          │
// └─────────────────────────────────────────────────────┘
async function sendRcon(commands) {
  if (!commands.length) return [];
  const rcon = await Rcon.connect({
    host: RCON_HOST,
    port: RCON_PORT,
    password: RCON_PASS,
    timeout: 8000,
  });
  const results = [];
  try {
    for (const cmd of commands) {
      console.log(`➤  RCON: ${cmd}`);
      results.push(await rcon.send(cmd));
    }
  } finally {
    await rcon.end();
  }
  return results;
}

// ┌─────────────────────────────────────────────────────┐
// │                   TELEGRAM                         │
// └─────────────────────────────────────────────────────┘
async function telegramRequest(method, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = https.request(
      {
        hostname: "api.telegram.org",
        path: `/bot${BOT_TOKEN}/${method}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(data),
        },
      },
      (res) => {
        let raw = "";
        res.on("data", (d) => (raw += d));
        res.on("end", () => {
          try {
            resolve(JSON.parse(raw));
          } catch {
            resolve({});
          }
        });
      },
    );
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

// ┌─────────────────────────────────────────────────────┐
// │               TELEGRAM MESSAGES                    │
// └─────────────────────────────────────────────────────┘
const D = "┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄";

// ─── Main purchase message ─────────────────────────────
function buildPurchaseMessage(p) {
  const rankInfo = RANK_DISPLAY[p.rankName] ?? {
    icon: "🎮",
    label: p.rankName ?? "Unknown",
  };
  const periodMap = {
    forever: "Permanent",
    month: "1 Month",
    quarter: "3 Months",
  };
  const period = p.itemId?.includes("_")
    ? (periodMap[p.itemId.split("_").pop()] ?? "Permanent")
    : "Permanent";

  const testBadge = IS_TEST ? "  <code>[TEST]</code>" : "";
  const statusLine = p.revoked
    ? `❌  <b>Privilege revoked</b>${p.banned ? "  |  🚫 <b>Banned</b>" : ""}`
    : `✅  <b>Privilege granted</b>${p.banned ? "  |  🚫 <b>Banned</b>" : ""}`;

  return [
    `<b>🧾 New Purchase</b>${testBadge}`,
    D,
    `<b>Player</b>    <code>${p.nick}</code>`,
    `<b>Item</b>      ${rankInfo.icon} ${p.itemLabel}`,
    `<b>Duration</b>  ${period}`,
    `<b>Amount</b>    <code>${p.price} RUB</code>`,
    `<b>Invoice</b>   <code>#${p.invId}</code>`,
    `<b>Date</b>      <code>${p.dateStr}</code>`,
    D,
    statusLine,
  ].join("\n");
}

// ─── Purchase history (sent as message — can be long) ──
function buildHistoryMessage(nick) {
  const list = [...purchases.values()]
    .filter((p) => p.nick.toLowerCase() === nick.toLowerCase())
    .sort((a, b) => Number(b.invId) - Number(a.invId));

  if (!list.length)
    return `<b>📋 Purchase History</b>\n\nNo purchases found for <code>${nick}</code>.`;

  const total = list.reduce((s, p) => s + parseFloat(p.price), 0).toFixed(2);
  const lines = [`<b>📋 Purchase History — <code>${nick}</code></b>`, D];

  for (const p of list) {
    const ri = RANK_DISPLAY[p.rankName] ?? { icon: "🎮" };
    const status = p.revoked ? "❌" : "✅";
    lines.push(
      `${status} ${ri.icon} <b>${p.itemLabel}</b>  ·  <code>${p.price} RUB</code>`,
    );
    lines.push(`     <code>#${p.invId}</code>  <i>${p.dateStr}</i>`);
  }

  lines.push(D);
  lines.push(
    `<b>Total:</b> <code>${total} RUB</code>  ·  <b>${list.length} purchase(s)</b>`,
  );
  return lines.join("\n");
}

// ─── Keyboards ─────────────────────────────────────────
function buildKeyboard(p) {
  const invId = p.invId;
  const row1 = p.revoked
    ? [{ text: "🟢  Restore", callback_data: `restore|${invId}` }]
    : [{ text: "🔴  Revoke", callback_data: `revoke|${invId}` }];

  const row2 = p.banned
    ? [{ text: "✅  Unban", callback_data: `unban|${invId}` }]
    : [{ text: "🚫  Ban Player", callback_data: `ban|${invId}` }];

  return {
    inline_keyboard: [
      [...row1, ...row2],
      [
        { text: "📋  History", callback_data: `history|${invId}` },
        { text: "📊  Info", callback_data: `info|${invId}` },
      ],
      [{ text: "🌐  Open Website", url: SITE_URL }],
    ],
  };
}

// ─── Send / update ─────────────────────────────────────
async function sendPurchaseNotification(p) {
  const sentMessages = [];
  for (const chatId of ADMIN_CHATS) {
    try {
      const res = await telegramRequest("sendMessage", {
        chat_id: chatId,
        text: buildPurchaseMessage(p),
        parse_mode: "HTML",
        reply_markup: buildKeyboard(p),
      });
      if (res?.result?.message_id) {
        sentMessages.push({ chatId, msgId: res.result.message_id });
        console.log(
          `✅  TG sent to ${chatId}, msgId: ${res.result.message_id}`,
        );
      } else {
        console.warn(`⚠️  TG failed for ${chatId}:`, JSON.stringify(res));
      }
    } catch (e) {
      console.warn(`⚠️  TG error → ${chatId}: ${e.message}`);
    }
  }
  return sentMessages;
}

async function updatePurchaseMessage(p) {
  for (const msg of p.tgMsgs) {
    await telegramRequest("editMessageText", {
      chat_id: msg.chatId,
      message_id: msg.msgId,
      text: buildPurchaseMessage(p),
      parse_mode: "HTML",
      reply_markup: buildKeyboard(p),
    }).catch((e) => console.warn(`⚠️  Edit TG msg failed: ${e.message}`));
  }
}

async function sendMessage(chatId, text) {
  await telegramRequest("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
  }).catch((e) => console.warn(`⚠️  sendMessage failed: ${e.message}`));
}

async function alertCallback(cbqId, text) {
  await telegramRequest("answerCallbackQuery", {
    callback_query_id: cbqId,
    text,
    show_alert: true,
  }).catch(() => {});
}

// ┌─────────────────────────────────────────────────────┐
// │               GLOBAL ERROR HANDLER                  │
// └─────────────────────────────────────────────────────┘
const errorHandler = (err, _req, res, _next) => {
  console.error(`❌  Unhandled error: ${err.message}`);
  if (res.headersSent) return;
  res.status(500).json({ error: "Internal server error." });
};

// ┌─────────────────────────────────────────────────────┐
// │                     ROUTES                         │
// └─────────────────────────────────────────────────────┘
app.get("/health", (_req, res) =>
  res.json({
    status: "ok",
    uptime: process.uptime(),
    ts: Date.now(),
  }),
);

// ── Current USD/RUB rate ───────────────────────────────
app.get("/rate", async (_req, res) => {
  try {
    const rate = await getUsdToRub();
    res.json({
      rate,
      cached: cachedRateTime > 0,
      updatedAt: new Date(cachedRateTime).toISOString(),
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Create payment link ────────────────────────────────
app.post("/create-payment", payLimiter, async (req, res, next) => {
  try {
    const { nick, itemId, itemType, price, currency = "USD" } = req.body;

    if (!nick || !itemId || !itemType || !price)
      return res.status(400).json({ error: "Missing required fields." });
    if (!isValidNick(nick))
      return res
        .status(400)
        .json({ error: "Invalid nickname (3–16 alphanumeric chars)." });
    if (!isValidSum(price))
      return res.status(400).json({ error: "Invalid price." });

    const { cmds } = buildCommands(itemId, itemType, nick);
    if (!cmds.length)
      return res.status(400).json({ error: "Unknown item or type." });

    // Convert to RUB if price is in USD
    const priceUsd = parseFloat(price);
    const priceRub = currency === "RUB" ? priceUsd : await usdToRub(priceUsd);

    const rate = currency === "RUB" ? null : await getUsdToRub();
    const invId = Math.floor(Date.now() / 1000);
    const sum = priceRub.toFixed(2);
    const desc = `${buildItemLabel(itemId, itemType)} for ${nick}`;

    const sigStr = `${MERCHANT}:${sum}:${invId}:${PASS1}:shp_item=${itemId}:shp_nick=${nick}:shp_type=${itemType}`;
    const sig = crypto.createHash("md5").update(sigStr).digest("hex");

    const url = new URL("https://auth.robokassa.ru/Merchant/Index.aspx");
    url.searchParams.set("MrchLogin", MERCHANT);
    url.searchParams.set("OutSum", sum);
    url.searchParams.set("InvId", String(invId));
    url.searchParams.set("Desc", desc);
    url.searchParams.set("SignatureValue", sig);
    url.searchParams.set("shp_item", itemId);
    url.searchParams.set("shp_nick", nick);
    url.searchParams.set("shp_type", itemType);
    url.searchParams.set("SuccessURL", `${SITE_URL}/success?invId=${invId}`);
    url.searchParams.set("FailURL", `${SITE_URL}/fail`);
    if (IS_TEST) url.searchParams.set("IsTest", "1");

    res.json({
      url: url.toString(),
      invId,
      priceUsd: currency === "RUB" ? null : priceUsd,
      priceRub,
      rate,
    });
  } catch (err) {
    next(err);
  }
});

// ── Robokassa result callback ──────────────────────────
app.post("/robokassa/result", resLimiter, async (req, res, next) => {
  try {
    const { InvId, OutSum, SignatureValue, shp_item, shp_nick, shp_type } =
      req.body;

    if (
      !InvId ||
      !OutSum ||
      !SignatureValue ||
      !shp_item ||
      !shp_nick ||
      !shp_type
    )
      return res.status(400).send("missing params");

    const expectedRaw = `${OutSum}:${InvId}:${PASS2}:shp_item=${shp_item}:shp_nick=${shp_nick}:shp_type=${shp_type}`;
    const expected = crypto
      .createHash("md5")
      .update(expectedRaw)
      .digest("hex")
      .toUpperCase();

    if (!safeCompare(expected, (SignatureValue ?? "").toUpperCase())) {
      console.warn(`⚠️  Signature mismatch for InvId=${InvId}`);
      return res.status(400).send("bad sign");
    }

    if (purchases.has(String(InvId))) {
      console.warn(`⚠️  Duplicate callback for InvId=${InvId}`);
      return res.send(`OK${InvId}`);
    }

    const { cmds, rankName } = buildCommands(shp_item, shp_type, shp_nick);

    try {
      await sendRcon(cmds);
    } catch (e) {
      console.error(`❌  RCON error: ${e.message}`);
      return res.status(500).send("rcon error");
    }

    const p = {
      invId: String(InvId),
      nick: shp_nick,
      itemId: shp_item,
      itemType: shp_type,
      itemLabel: buildItemLabel(shp_item, shp_type),
      price: parseFloat(OutSum).toFixed(2), // RUB
      rankName,
      dateStr: formatDate(),
      revoked: false,
      banned: false,
      tgMsgs: [],
    };

    purchases.set(String(InvId), p);

    try {
      p.tgMsgs = await sendPurchaseNotification(p);
    } catch (e) {
      console.warn(`⚠️  TG notification error: ${e.message}`);
    }

    res.send(`OK${InvId}`);
  } catch (err) {
    next(err);
  }
});

// ── Payment info ───────────────────────────────────────
app.get("/payment-info/:invId", (req, res) => {
  const p = purchases.get(req.params.invId);
  if (!p) return res.status(404).json({ error: "Purchase not found." });
  res.json({ ...p, serverIp: SERVER_IP });
});

// ── Telegram webhook ───────────────────────────────────
app.post("/telegram/webhook", async (req, res) => {
  res.sendStatus(200);

  const cbq = req.body?.callback_query;
  if (!cbq) return;

  // Always ack immediately
  await telegramRequest("answerCallbackQuery", {
    callback_query_id: cbq.id,
  }).catch(() => {});

  if (cbq.data === "noop") return;

  const [action, invId] = (cbq.data ?? "").split("|");
  if (!invId) return;

  const p = purchases.get(invId);
  const adminId = cbq.from?.username
    ? `@${cbq.from.username}`
    : String(cbq.from?.id ?? "?");
  const chatId = cbq.message?.chat?.id;

  if (!p) {
    await alertCallback(cbq.id, "⚠️ Purchase not found.");
    return;
  }

  // ── Revoke ───────────────────────────────────────────
  if (action === "revoke") {
    if (p.revoked) {
      await alertCallback(cbq.id, "Already revoked.");
      return;
    }
    try {
      await sendRcon(buildRevokeCommands(p));
      p.revoked = true;
      await updatePurchaseMessage(p);
      await alertCallback(cbq.id, `✅ Privilege revoked for ${p.nick}`);
      console.log(`🔴  Revoked: ${p.nick} (#${invId}) by ${adminId}`);
    } catch (e) {
      await alertCallback(cbq.id, `❌ RCON error: ${e.message}`);
    }
  }

  // ── Restore ──────────────────────────────────────────
  if (action === "restore") {
    if (!p.revoked) {
      await alertCallback(cbq.id, "Privilege is already active.");
      return;
    }
    try {
      const { cmds } = buildCommands(p.itemId, p.itemType, p.nick);
      await sendRcon(cmds);
      p.revoked = false;
      await updatePurchaseMessage(p);
      await alertCallback(cbq.id, `✅ Privilege restored for ${p.nick}`);
      console.log(`🟢  Restored: ${p.nick} (#${invId}) by ${adminId}`);
    } catch (e) {
      await alertCallback(cbq.id, `❌ RCON error: ${e.message}`);
    }
  }

  // ── Ban ──────────────────────────────────────────────
  if (action === "ban") {
    if (p.banned) {
      await alertCallback(cbq.id, "Player is already banned.");
      return;
    }
    try {
      const reason = "Pending investigation";
      await sendRcon([`ban ${p.nick} ${reason}`]);
      p.banned = true;
      await updatePurchaseMessage(p);
      await alertCallback(cbq.id, `🚫 ${p.nick} banned.\nReason: ${reason}`);
      console.log(`🚫  Banned: ${p.nick} (#${invId}) by ${adminId}`);
    } catch (e) {
      await alertCallback(cbq.id, `❌ RCON error: ${e.message}`);
    }
  }

  // ── Unban ─────────────────────────────────────────────
  if (action === "unban") {
    if (!p.banned) {
      await alertCallback(cbq.id, "Player is not banned.");
      return;
    }
    try {
      await sendRcon([`pardon ${p.nick}`]);
      p.banned = false;
      await updatePurchaseMessage(p);
      await alertCallback(cbq.id, `✅ ${p.nick} unbanned.`);
      console.log(`✅  Unbanned: ${p.nick} (#${invId}) by ${adminId}`);
    } catch (e) {
      await alertCallback(cbq.id, `❌ RCON error: ${e.message}`);
    }
  }

  // ── Purchase History ──────────────────────────────────
  // History is long — send as a separate message in the same chat
  if (action === "history") {
    if (chatId) await sendMessage(chatId, buildHistoryMessage(p.nick));
  }

  // ── Player Info ───────────────────────────────────────
  // Brief info shown in popup, full LP output sent as message
  if (action === "info") {
    try {
      // lp user <nick> info   — primary group, UUID, status
      // lp user <nick> parent info — list of all parent groups
      const [userInfo, parentInfo, onlineList] = await sendRcon([
        `lp user ${p.nick} info`,
        `lp user ${p.nick} parent info`,
        `list`,
      ]);

      const isOnline = (onlineList ?? "")
        .toLowerCase()
        .includes(p.nick.toLowerCase());
      const playerPurchases = [...purchases.values()].filter(
        (x) => x.nick.toLowerCase() === p.nick.toLowerCase(),
      );
      const totalSpent = playerPurchases
        .reduce((s, x) => s + parseFloat(x.price), 0)
        .toFixed(2);

      // Short popup (≤200 chars)
      const popup = [
        `👤 ${p.nick}`,
        `${isOnline ? "🟢 Online" : "⚫ Offline"}  |  🚫 ${p.banned ? "Banned" : "Not banned"}`,
        `💰 ${totalSpent} RUB  ·  ${playerPurchases.length} purchase(s)`,
      ].join("\n");

      await alertCallback(cbq.id, popup);

      // Full LP output as a message
      if (chatId) {
        const lpOutput = [
          `<b>📊 Player Info — <code>${p.nick}</code></b>`,
          D,
          `<b>Status:</b>   ${isOnline ? "🟢 Online" : "⚫ Offline"}`,
          `<b>Banned:</b>   ${p.banned ? "🚫 Yes" : "No"}`,
          `<b>Spent:</b>    <code>${totalSpent} RUB</code> (${playerPurchases.length} purchases)`,
          D,
          `<b>LP User Info:</b>`,
          `<pre>${(userInfo ?? "No response").slice(0, 600)}</pre>`,
          `<b>LP Parent Groups:</b>`,
          `<pre>${(parentInfo ?? "No response").slice(0, 600)}</pre>`,
        ].join("\n");

        await sendMessage(chatId, lpOutput);
      }

      console.log(`📊  Info fetched: ${p.nick} (#${invId}) by ${adminId}`);
    } catch (e) {
      console.error(`❌  Player info error: ${e.message}`);
      await alertCallback(cbq.id, `❌ RCON error: ${e.message.slice(0, 150)}`);
    }
  }
});

// ── 404 ────────────────────────────────────────────────
app.use((_req, res) => res.status(404).json({ error: "Route not found." }));
app.use(errorHandler);

// ┌─────────────────────────────────────────────────────┐
// │                    STARTUP                         │
// └─────────────────────────────────────────────────────┘
const PORT = parseInt(process.env.PORT ?? "3000", 10);

app.listen(PORT, async () => {
  console.log(`\n🚀  Pixel Backend v3.0  ·  port ${PORT}`);
  console.log(`📡  Backend:   ${BACKEND_URL}`);
  console.log(`🌐  Frontend:  ${SITE_URL}`);
  console.log(`🧪  Test mode: ${IS_TEST ? "ENABLED ⚠️" : "disabled"}`);
  console.log(`👥  Admin chats: ${ADMIN_CHATS.length}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

  try {
    const r = await telegramRequest("setWebhook", {
      url: `${BACKEND_URL}/telegram/webhook`,
      drop_pending_updates: true,
      allowed_updates: ["callback_query", "message"],
    });
    console.log(
      r.ok
        ? "📬  Telegram webhook — ACTIVE ✅"
        : `⚠️  Telegram webhook error: ${r.description}`,
    );
  } catch (e) {
    console.warn(`⚠️  Could not register Telegram webhook: ${e.message}`);
  }
});
