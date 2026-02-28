// server.js
const express = require("express");
const { Rcon } = require("rcon-client");
const crypto = require("crypto");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const https = require("https");

const app = express();

// ═══════════════════════════════════════════════
// SECURITY & CORS
// ═══════════════════════════════════════════════
app.use(helmet());

// ДОБАВЛЕНО: Доверяем прокси-серверу Render (исправляет ошибку X-Forwarded-For)
app.set("trust proxy", 1);

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      if (
        !origin ||
        ALLOWED_ORIGINS.includes(origin) ||
        process.env.SITE_URL.includes(origin)
      ) {
        cb(null, true);
      } else {
        cb(new Error("CORS: origin not allowed"));
      }
    },
    methods: ["GET", "POST"],
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10kb" }));

// ═══════════════════════════════════════════════
// RATE LIMITING
// ═══════════════════════════════════════════════
const payLimiter = rateLimit({
  windowMs: 60_000,
  max: 15,
  message: { error: "Too many requests." },
});
const resLimiter = rateLimit({
  windowMs: 60_000,
  max: 60,
  message: { error: "Too many requests." },
});

// ═══════════════════════════════════════════════
// ENV VALIDATION
// ═══════════════════════════════════════════════
const REQUIRED_ENV = [
  "ROBOKASSA_MERCHANT_LOGIN",
  "ROBOKASSA_PASSWORD1",
  "ROBOKASSA_PASSWORD2",
  "HYRCON_HOST",
  "HYRCON_PASSWORD",
  "TELEGRAM_BOT_TOKEN",
  "TELEGRAM_CHAT_ID",
  "SITE_URL",
];

for (const k of REQUIRED_ENV) {
  if (!process.env[k]) {
    console.error(`❌ Missing required env variable: ${k}`);
    process.exit(1);
  }
}

const MERCHANT = process.env.ROBOKASSA_MERCHANT_LOGIN;
const PASS1 = process.env.ROBOKASSA_PASSWORD1;
const PASS2 = process.env.ROBOKASSA_PASSWORD2;
const RCON_HOST = process.env.HYRCON_HOST;
const RCON_PORT = parseInt(process.env.HYRCON_PORT || "25575");
const RCON_PASS = process.env.HYRCON_PASSWORD;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const SITE_URL = process.env.SITE_URL.replace(/\/$/, "");
const SERVER_IP = "pixel.my-craft.cc:25612";

// ДОБАВЛЕНО: Парсим несколько ID админов, разделенных запятой
const ADMIN_CHATS = (process.env.TELEGRAM_CHAT_ID || "")
  .split(",")
  .map((id) => id.trim())
  .filter(Boolean);

const purchases = new Map();

// ═══════════════════════════════════════════════
// COMMAND BUILDER
// ═══════════════════════════════════════════════
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
  } else if (itemType === "pack") {
    const cfg = PACK_CONFIG[itemId];
    if (!cfg) return { cmds: [], rankName: null };

    rankName = cfg.rank;
    if (cfg.duration)
      cmds.push(`lp user ${nick} parent addtemp ${cfg.rank} ${cfg.duration}`);
    else cmds.push(`lp user ${nick} parent set ${cfg.rank}`);
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

// ═══════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════
function buildItemLabel(itemId, itemType) {
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  if (itemType === "rank") return `${capitalize(itemId.split("_")[0])} Rank`;
  if (itemType === "pack") return `${capitalize(itemId)} Starter Pack`;
  if (itemType === "pass") return "Battle Pass (VIP)";
  return capitalize(itemId);
}

const isValidNick = (n) => /^[a-zA-Z0-9_]{3,16}$/.test(n);
const isValidSum = (s) => !isNaN(parseFloat(s)) && parseFloat(s) > 0;
const safeCompare = (a, b) =>
  a.length === b.length &&
  crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));

async function sendRcon(commands) {
  if (!commands.length) return [];
  const rcon = await Rcon.connect({
    host: RCON_HOST,
    port: RCON_PORT,
    password: RCON_PASS,
    timeout: 6000,
  });
  const results = [];
  for (const cmd of commands) {
    console.log(`→ RCON: ${cmd}`);
    results.push(await rcon.send(cmd));
  }
  await rcon.end();
  return results;
}

// Telegram
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

function buildPurchaseCaption(p) {
  const status = p.revoked
    ? "🔴 <b>Status:</b> REVOKED BY ADMIN"
    : "🟢 <b>Status:</b> ACTIVE";
  return [
    `🛒 <b>NEW PURCHASE</b>  #<code>${p.invId}</code>\n`,
    `👤 <b>Player:</b>  <code>${p.nick}</code>`,
    `🎖 <b>Item:</b>  ${p.itemLabel}`,
    `💰 <b>Amount:</b>  $${p.price}`,
    `📅 <b>Date:</b>  ${p.dateStr}`,
    `🌐 <b>Server:</b>  <code>${SERVER_IP}</code>\n`,
    status,
  ].join("\n");
}

// ИЗМЕНЕНО: Отправка уведомлений ВСЕМ админам
async function sendPurchaseNotification(p) {
  const sentMessages = [];

  for (const chatId of ADMIN_CHATS) {
    try {
      const res = await telegramRequest("sendMessage", {
        chat_id: chatId,
        text: buildPurchaseCaption(p),
        parse_mode: "HTML",
        reply_markup: p.revoked
          ? undefined
          : {
              inline_keyboard: [
                [
                  {
                    text: "🔴 Revoke Privilege",
                    callback_data: `revoke|${p.invId}`,
                  },
                ],
              ],
            },
      });

      if (res?.result?.message_id) {
        sentMessages.push({ chatId, msgId: res.result.message_id });
      }
    } catch (e) {
      console.warn(`TG send error to ${chatId}:`, e.message);
    }
  }

  return sentMessages;
}

// ═══════════════════════════════════════════════
// ROUTES
// ═══════════════════════════════════════════════
app.get("/health", (_, res) => res.json({ status: "ok" }));

app.post("/create-payment", payLimiter, (req, res) => {
  const { nick, itemId, itemType, price } = req.body;

  if (!nick || !itemId || !itemType || !price)
    return res.status(400).json({ error: "Missing fields" });
  if (!isValidNick(nick))
    return res.status(400).json({ error: "Invalid nickname" });
  if (!isValidSum(price))
    return res.status(400).json({ error: "Invalid price" });

  const { cmds } = buildCommands(itemId, itemType, nick);
  if (!cmds.length)
    return res.status(400).json({ error: "Unknown item or type" });

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
  url.searchParams.set("SuccessURL", `${SITE_URL}/success`);
  url.searchParams.set("FailURL", `${SITE_URL}/fail`);

  // Раскомментируйте строку ниже для тестов
  // url.searchParams.set("IsTest", "1");

  res.json({ url: url.toString(), invId });
});

app.post("/robokassa/result", resLimiter, async (req, res) => {
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

  const expectedSig = `${OutSum}:${InvId}:${PASS2}:shp_item=${shp_item}:shp_nick=${shp_nick}:shp_type=${shp_type}`;
  const mySig = crypto
    .createHash("md5")
    .update(expectedSig)
    .digest("hex")
    .toUpperCase();

  if (!safeCompare(mySig, (SignatureValue || "").toUpperCase())) {
    console.warn(`⚠️ Signature mismatch! Expected: ${mySig}`);
    return res.status(400).send("bad sign");
  }

  const { cmds, rankName } = buildCommands(shp_item, shp_type, shp_nick);
  try {
    await sendRcon(cmds);
  } catch (e) {
    console.error(`❌ RCON error:`, e.message);
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
    dateStr: new Date().toLocaleString(),
    revoked: false,
    tgMsgs: [], // Массив для хранения ID сообщений у всех админов
  };
  purchases.set(String(InvId), p);

  try {
    p.tgMsgs = await sendPurchaseNotification(p);
  } catch (e) {
    console.warn("TG error:", e.message);
  }

  res.send(`OK${InvId}`);
});

app.get("/payment-info/:invId", (req, res) => {
  const p = purchases.get(req.params.invId);
  if (!p) return res.status(404).json({ error: "Purchase not found" });
  res.json({ ...p, serverIp: SERVER_IP });
});

app.post("/telegram/webhook", async (req, res) => {
  res.sendStatus(200);
  const cbq = req.body?.callback_query;
  if (!cbq) return;

  await telegramRequest("answerCallbackQuery", {
    callback_query_id: cbq.id,
  }).catch(() => {});

  if (cbq.data?.startsWith("revoke|")) {
    const invId = cbq.data.split("|")[1];
    const p = purchases.get(invId);
    if (!p || p.revoked) return;

    try {
      await sendRcon(buildRevokeCommands(p));
      p.revoked = true;

      // ИЗМЕНЕНО: Обновляем сообщение у ВСЕХ админов
      for (const msg of p.tgMsgs) {
        await telegramRequest("editMessageText", {
          chat_id: msg.chatId,
          message_id: msg.msgId,
          text: buildPurchaseCaption(p),
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [
              [{ text: "✅ Privilege Revoked", callback_data: "noop" }],
            ],
          },
        }).catch((e) =>
          console.warn(`Update TG msg failed for ${msg.chatId}`, e.message),
        );
      }
    } catch (e) {
      console.error("Revoke error", e);
    }
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`🚀 Pixel backend running on port ${PORT}`);
  const r = await telegramRequest("setWebhook", {
    url: `${SITE_URL}/telegram/webhook`,
    drop_pending_updates: true,
  });
  if (r.ok) console.log(`📬 TG webhook active`);
});
