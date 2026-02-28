require("dotenv").config();
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const { Rcon } = require("rcon-client");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Цены на донат (ОБЯЗАТЕЛЬНО хранить на бэкенде, чтобы не взломали через браузер)
// Умножаем на курс или ставим рубли, Робокасса работает в рублях (или укажи нужную валюту в настройках)
const PRICES = {
  ping: { month: 100, quarter: 250, forever: 600 },
  packet: { month: 200, quarter: 500, forever: 1000 },
  // ... добавь сюда остальные ранги из своего React-кода ...
};

// Функция создания MD5 хэша
const md5 = (str) => crypto.createHash("md5").update(str).digest("hex");

// 1. ЕНДПОИНТ ДЛЯ ФРОНТЕНДА: Получить ссылку на оплату
app.post("/api/pay", (req, res) => {
  const { rankId, period, nickname } = req.body;

  if (!PRICES[rankId] || !PRICES[rankId][period] || !nickname) {
    return res.status(400).json({ error: "Неверные данные заказа" });
  }

  const outSum = PRICES[rankId][period]; // Сумма к оплате
  const invId = Math.floor(Math.random() * 1000000); // Уникальный номер заказа
  const description = `Покупка привилегии ${rankId} (${period}) для ${nickname}`;

  // Пользовательские параметры для Робокассы ВСЕГДА должны начинаться с Shp_
  // Они нужны, чтобы Робокасса вернула нам их после успешной оплаты
  const shp_nick = nickname;
  const shp_rank = rankId;
  const shp_period = period;

  // Формируем подпись для создания ссылки
  // Формат: MerchantLogin:OutSum:InvId:Password1:Shp_nick=...:Shp_period=...:Shp_rank=...
  // ВАЖНО: параметры Shp_ должны идти в алфавитном порядке! (nick, period, rank)
  const signatureString = `${process.env.ROBOX_LOGIN}:${outSum}:${invId}:${process.env.ROBOX_PASS1}:Shp_nick=${shp_nick}:Shp_period=${shp_period}:Shp_rank=${shp_rank}`;
  const signature = md5(signatureString);

  const paymentUrl = `https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=${process.env.ROBOX_LOGIN}&OutSum=${outSum}&InvId=${invId}&Description=${encodeURIComponent(description)}&SignatureValue=${signature}&Shp_nick=${shp_nick}&Shp_period=${shp_period}&Shp_rank=${shp_rank}`;

  res.json({ url: paymentUrl });
});

// 2. ЕНДПОИНТ ДЛЯ РОБОКАССЫ: Вебхук (ResultURL)
// Сюда Робокасса пошлет запрос, когда игрок оплатит
app.all("/api/webhook", async (req, res) => {
  // Робокасса может слать GET или POST в зависимости от настроек
  const data = req.method === "POST" ? req.body : req.query;

  const outSum = data.OutSum;
  const invId = data.InvId;
  const signature = data.SignatureValue;

  const shp_nick = data.Shp_nick;
  const shp_period = data.Shp_period;
  const shp_rank = data.Shp_rank;

  // Проверяем подпись (тут используется PASS2)
  const mySignatureString = `${outSum}:${invId}:${process.env.ROBOX_PASS2}:Shp_nick=${shp_nick}:Shp_period=${shp_period}:Shp_rank=${shp_rank}`;
  const mySignature = md5(mySignatureString).toUpperCase();

  if (mySignature !== signature.toUpperCase()) {
    return res.status(400).send("Bad signature");
  }

  // ОПЛАТА ПРОШЛА УСПЕШНО! Выдаем донат через RCON
  try {
    const rcon = await Rcon.connect({
      host: process.env.RCON_HOST,
      port: process.env.RCON_PORT,
      password: process.env.RCON_PASS,
    });

    // Формируем команду. Например, для LuckPerms:
    // lp user Nickname parent add rank
    let command = "";
    if (shp_period === "forever") {
      command = `lp user ${shp_nick} parent set ${shp_rank}`;
    } else if (shp_period === "month") {
      command = `lp user ${shp_nick} parent addtemp ${shp_rank} 30d`;
    } else if (shp_period === "quarter") {
      command = `lp user ${shp_nick} parent addtemp ${shp_rank} 90d`;
    }

    // Отправляем команду на сервер
    const rconResponse = await rcon.send(command);
    console.log(`[RCON] Выдали донат ${shp_nick}: ${rconResponse}`);

    rcon.end();

    // ОБЯЗАТЕЛЬНО возвращаем "OK{InvId}", иначе Робокасса будет думать, что сервер лежит
    res.send(`OK${invId}`);
  } catch (error) {
    console.error("Ошибка RCON:", error);
    res.status(500).send("RCON Error");
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend started on port ${PORT}`));
