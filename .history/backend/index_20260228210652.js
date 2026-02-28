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
    ? `❌  <b>Privilege revoked</b>`
    : `✅  <b>Privilege granted</b>`;

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
      `${status} ${ri.icon} <b>${p.itemLabel}</b>  ·  <code>${p.price} RUB</code>  ·  <code>#${p.invId}</code>`,
    );
    lines.push(`     <i>${p.dateStr}</i>`);
  }

  lines.push(D);
  lines.push(
    `<b>Total:</b>  <code>${total} RUB</code>  ·  <b>${list.length} purchase(s)</b>`,
  );
  return lines.join("\n");
}

// ─── Keyboards ─────────────────────────────────────────
function activeKeyboard(invId) {
  return {
    inline_keyboard: [
      [
        { text: "🔴  Revoke", callback_data: `revoke|${invId}` },
        { text: "🚫  Ban Player", callback_data: `ban|${invId}` },
      ],
      [
        { text: "📋  Purchase History", callback_data: `history|${invId}` },
        { text: "📊  Player Info", callback_data: `info|${invId}` },
      ],
      [{ text: "🌐  Open Website", url: SITE_URL }],
    ],
  };
}

function revokedKeyboard(invId) {
  return {
    inline_keyboard: [
      [
        { text: "🟢  Restore", callback_data: `restore|${invId}` },
        { text: "🚫  Ban Player", callback_data: `ban|${invId}` },
      ],
      [
        { text: "📋  Purchase History", callback_data: `history|${invId}` },
        { text: "📊  Player Info", callback_data: `info|${invId}` },
      ],
      [{ text: "🌐  Open Website", url: SITE_URL }],
    ],
  };
}

// ─── Notification helpers ──────────────────────────────
async function sendPurchaseNotification(p) {
  const sentMessages = [];
  for (const chatId of ADMIN_CHATS) {
    try {
      const res = await telegramRequest("sendMessage", {
        chat_id: chatId,
        text: buildPurchaseMessage(p),
        parse_mode: "HTML",
        reply_markup: activeKeyboard(p.invId),
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
      reply_markup: p.revoked
        ? revokedKeyboard(p.invId)
        : activeKeyboard(p.invId),
    }).catch((e) =>
      console.warn(`⚠️  Edit TG msg failed for ${msg.chatId}: ${e.message}`),
    );
  }
}

async function sendReply(chatId, text) {
  await telegramRequest("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
  }).catch((e) => console.warn(`⚠️  sendReply failed: ${e.message}`));
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

// ── Create payment link ────────────────────────────────
app.post("/create-payment", payLimiter, (req, res, next) => {
  try {
    const { nick, itemId, itemType, price } = req.body;

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

    const invId = Math.floor(Date.now() / 1000);
    const sum = parseFloat(price).toFixed(2);
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

    res.json({ url: url.toString(), invId });
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
      price: parseFloat(OutSum).toFixed(2),
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

  await telegramRequest("answerCallbackQuery", {
    callback_query_id: cbq.id,
  }).catch(() => {});

  if (cbq.data === "noop") return;

  const [action, invId] = (cbq.data ?? "").split("|");
  if (!invId) return;

  const p = purchases.get(invId);
  const adminId = cbq.from?.username
    ? `@${cbq.from.username}`
    : String(cbq.from?.id);
  const chatId = cbq.message?.chat?.id;

  if (!p) {
    await telegramRequest("answerCallbackQuery", {
      callback_query_id: cbq.id,
      text: "Purchase not found.",
      show_alert: true,
    }).catch(() => {});
    return;
  }

  // ── Revoke ───────────────────────────────────────────
  if (action === "revoke") {
    if (p.revoked) {
      await telegramRequest("answerCallbackQuery", {
        callback_query_id: cbq.id,
        text: "Privilege is already revoked.",
        show_alert: true,
      }).catch(() => {});
      return;
    }
    try {
      await sendRcon(buildRevokeCommands(p));
      p.revoked = true;
      await updatePurchaseMessage(p);
      console.log(`🔴  Revoked: ${p.nick} (#${invId}) by ${adminId}`);
    } catch (e) {
      console.error(`❌  Revoke error: ${e.message}`);
    }
  }

  // ── Restore ──────────────────────────────────────────
  if (action === "restore") {
    if (!p.revoked) {
      await telegramRequest("answerCallbackQuery", {
        callback_query_id: cbq.id,
        text: "Privilege is already active.",
        show_alert: true,
      }).catch(() => {});
      return;
    }
    try {
      const { cmds } = buildCommands(p.itemId, p.itemType, p.nick);
      await sendRcon(cmds);
      p.revoked = false;
      await updatePurchaseMessage(p);
      console.log(`🟢  Restored: ${p.nick} (#${invId}) by ${adminId}`);
    } catch (e) {
      console.error(`❌  Restore error: ${e.message}`);
    }
  }

  // ── Ban ──────────────────────────────────────────────
  if (action === "ban") {
    if (p.banned) {
      await telegramRequest("answerCallbackQuery", {
        callback_query_id: cbq.id,
        text: "Player is already banned.",
        show_alert: true,
      }).catch(() => {});
      return;
    }
    try {
      const reason = "Pending investigation";
      await sendRcon([`ban ${p.nick} ${reason}`]);
      p.banned = true;
      console.log(`🚫  Banned: ${p.nick} (#${invId}) by ${adminId}`);
      if (chatId) {
        await sendReply(
          chatId,
          [
            `<b>🚫 Player Banned</b>`,
            D,
            `<b>Player</b>   <code>${p.nick}</code>`,
            `<b>Reason</b>   <code>${reason}</code>`,
            `<b>By</b>       ${adminId}`,
            `<b>Time</b>     <code>${formatDate()}</code>`,
          ].join("\n"),
        );
      }
    } catch (e) {
      console.error(`❌  Ban error: ${e.message}`);
      if (chatId)
        await sendReply(
          chatId,
          `❌ Failed to ban <code>${p.nick}</code>: <code>${e.message}</code>`,
        );
    }
  }

  // ── Purchase History ──────────────────────────────────
  if (action === "history") {
    if (chatId) await sendReply(chatId, buildHistoryMessage(p.nick));
  }

  // ── Player Info ───────────────────────────────────────
  if (action === "info") {
    if (!chatId) return;
    try {
      const [groupsRaw, onlineRaw] = await sendRcon([
        `lp user ${p.nick} group list`,
        `list`,
      ]);

      const isOnline = (onlineRaw ?? "")
        .toLowerCase()
        .includes(p.nick.toLowerCase());
      const status = isOnline ? "🟢  Online" : "⚫  Offline";

      const playerPurchases = [...purchases.values()].filter(
        (x) => x.nick.toLowerCase() === p.nick.toLowerCase(),
      );
      const totalSpent = playerPurchases
        .reduce((s, x) => s + parseFloat(x.price), 0)
        .toFixed(2);

      await sendReply(
        chatId,
        [
          `<b>📊 Player Info — <code>${p.nick}</code></b>`,
          D,
          `<b>Status</b>      ${status}`,
          `<b>Purchases</b>   ${playerPurchases.length}`,
          `<b>Total spent</b> <code>${totalSpent} RUB</code>`,
          `<b>Banned</b>      ${p.banned ? "Yes 🚫" : "No"}`,
          D,
          `<b>Permission groups:</b>`,
          `<pre>${(groupsRaw ?? "No data").slice(0, 800)}</pre>`,
        ].join("\n"),
      );
    } catch (e) {
      console.error(`❌  Player info error: ${e.message}`);
      if (chatId)
        await sendReply(
          chatId,
          `❌ Failed to fetch info for <code>${p.nick}</code>: <code>${e.message}</code>`,
        );
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
