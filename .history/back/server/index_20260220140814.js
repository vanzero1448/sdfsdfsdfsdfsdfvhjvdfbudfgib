import express from "express";
import cors from "cors";
import crypto from "node:crypto";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3001;
const JWT_SECRET =
  process.env.JWT_SECRET || "your-super-secret-key-2026-change-this!";
const DB_PATH = path.join(__dirname, "../data/users.json");

app.use(cors());
app.use(express.json());

// ─── DB ────────────────────────────────────────────────────────────────────

async function getUsers() {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, "[]");
    return [];
  }
}

async function saveUsers(users) {
  await fs.writeFile(DB_PATH, JSON.stringify(users, null, 2));
}

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// ─── AUTH ──────────────────────────────────────────────────────────────────

function generateTokens(uuid, username) {
  const header = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 30 * 24 * 3600;

  const encode = (data) =>
    Buffer.from(JSON.stringify(data))
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");

  const sign = (payload) =>
    crypto
      .createHmac("sha256", JWT_SECRET)
      .update(`${header}.${payload}`)
      .digest("base64url");

  const identityB64 = encode({
    sub: uuid,
    name: username,
    username,
    profile: { username },
    entitlements: ["game.base", "harmonic"],
    scope: "hytale:client",
    iat,
    exp,
    iss: "https://sessions.hertak.ru",
  });

  const sessionB64 = encode({
    sub: uuid,
    scope: "hytale:server",
    iat,
    exp,
    iss: "https://sessions.hertak.ru",
  });

  return {
    success: true,
    identity_token: `${header}.${identityB64}.${sign(identityB64)}`,
    session_token: `${header}.${sessionB64}.${sign(sessionB64)}`,
    uuid,
  };
}

// ─── ROUTES ────────────────────────────────────────────────────────────────

app.post("/api/auth/register", async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password || login.length < 3 || password.length < 6) {
      return res
        .status(400)
        .json({ error: "Login min 3, password min 6 symbols" });
    }

    const users = await getUsers();
    if (users.find((u) => u.login === login)) {
      return res.status(409).json({ error: "User already exists" });
    }

    const newUser = {
      id: Date.now().toString(),
      uuid: crypto.randomUUID(),
      login,
      password: hashPassword(password),
    };
    users.push(newUser);
    await saveUsers(users);

    return res.json({
      success: true,
      uuid: newUser.uuid,
      message: "Registered successfully",
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json({ error: "Login and password required" });
    }

    const users = await getUsers();
    const user = users.find((u) => u.login === login);

    if (!user || user.password !== hashPassword(password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    return res.json(generateTokens(user.uuid, user.login));
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/auth/tokens", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: "Token required" });

    const [, payloadB64] = token.split(".");
    const payload = JSON.parse(
      Buffer.from(
        payloadB64.replace(/-/g, "+").replace(/_/g, "/"),
        "base64",
      ).toString(),
    );

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return res.status(401).json({ error: "Token expired" });
    }

    const users = await getUsers();
    const user = users.find((u) => u.uuid === payload.sub);
    if (!user) return res.status(404).json({ error: "User not found" });

    return res.json(generateTokens(user.uuid, user.login));
  } catch (e) {
    return res.status(401).json({ error: "Invalid token" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Auth server running on http://localhost:${PORT}`);
});
