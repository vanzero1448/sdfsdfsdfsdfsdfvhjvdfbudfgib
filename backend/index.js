const express = require("express");
const { Rcon } = require("rcon-client");
const crypto = require("crypto");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const MERCHANT_LOGIN = process.env.ROBOKASSA_MERCHANT_LOGIN;
const PASSWORD1 = process.env.ROBOKASSA_PASSWORD1; // Result
const HYRCON_HOST = process.env.HYRCON_HOST;
const HYRCON_PORT = parseInt(process.env.HYRCON_PORT || "25575");
const HYRCON_PASS = process.env.HYRCON_PASSWORD;

// === 1. Создание ссылки на оплату (вызывай из фронта) ===
app.post("/create-payment", async (req, res) => {
  const { nick, rank, sum } = req.body; // nick — ник игрока, rank — например "vip"
  const orderId = Date.now();

  const description = `Донат ${rank} для ${nick}`;
  const signature = crypto
    .createHash("md5")
    .update(`${MERCHANT_LOGIN}:${sum}:${orderId}:${PASSWORD1}`)
    .digest("hex");

  const paymentUrl =
    `https://auth.robokassa.ru/Merchant/Index.aspx?` +
    `MrchLogin=${MERCHANT_LOGIN}&OutSum=${sum}&InvId=${orderId}&` +
    `Desc=${encodeURIComponent(description)}&SignatureValue=${signature}&` +
    `shp_nick=${nick}&shp_rank=${rank}`;

  res.json({ url: paymentUrl });
});

// === 2. Результат оплаты (RoboKassa стучит сюда) ===
app.post("/robokassa/result", async (req, res) => {
  const { InvId, OutSum, SignatureValue, shp_nick, shp_rank } = req.body;

  // Проверка подписи
  const mySig = crypto
    .createHash("md5")
    .update(`${OutSum}:${InvId}:${PASSWORD1}`)
    .digest("hex")
    .toUpperCase();

  if (mySig !== SignatureValue.toUpperCase()) {
    return res.send("bad sign");
  }

  // === Выдаём привилегию через HyRCON ===
  try {
    const rcon = await Rcon.connect({
      host: HYRCON_HOST,
      port: HYRCON_PORT,
      password: HYRCON_PASS,
    });

    // Замени на свою команду для Hytale (пример с LuckPerms-подобным плагином)
    const command = `lp user ${shp_nick} parent add ${shp_rank}`;
    await rcon.send(command);

    await rcon.end();
    res.send("OK"); // обязательно для RoboKassa
  } catch (e) {
    console.error(e);
    res.status(500).send("rcon error");
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Backend запущен");
});
