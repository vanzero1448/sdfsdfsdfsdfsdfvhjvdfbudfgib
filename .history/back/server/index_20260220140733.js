import express, { Request, Response } from "express";
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

interface User {
  id: string;
  uuid: string;
  login: string;
  password: string;
}

async function getUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, "[]");
    return [];
  }
}

async function saveUsers(users: User[]): Promise<void> {
  await fs.writeFile(DB_PATH, JSON.stringify(users, null, 2));
}

async function hashPassword(password: string): Promise<string> {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// ─── AUTH ──────────────────────────────────────────────────────────────────

function generateTokens(uuid: string, username: string) {
  const header = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 30 * 24 * 3600;

  const encode = (data: object): string =>
    Buffer.from(JSON.stringify(data))
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");

  const sign = (payload: string): string =>
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

app.post("/api/auth/register", async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body as { login: string; password: string };

    if (!login || !password || login.length < 3 || password.length < 6) {
      res.status(400).json({ error: "Login min 3, password min 6 symbols" });
      return;
    }

    const users = await getUsers();
    if (users.find((u) => u.login === login)) {
      res.status(409).json({ error: "User already exists" });
      return;
    }

    const newUser: User = {
      id: Date.now().toString(),
      uuid: crypto.randomUUID(),
      login,
      password: await hashPassword(password),
    };
    users.push(newUser);
    await saveUsers(users);

    res.json({
      success: true,
      uuid: newUser.uuid,
      message: "Registered successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/auth/login", async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body as { login: string; password: string };

    if (!login || !password) {
      res.status(400).json({ error: "Login and password required" });
      return;
    }

    const users = await getUsers();
    const user = users.find((u) => u.login === login);

    if (!user || user.password !== (await hashPassword(password))) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    res.json(generateTokens(user.uuid, user.login));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/auth/tokens", async (req: Request, res: Response) => {
  try {
    const { token } = req.body as { token: string };

    if (!token) {
      res.status(400).json({ error: "Token required" });
      return;
    }

    const [, payloadB64] = token.split(".");
    const payload = JSON.parse(
      Buffer.from(
        payloadB64.replace(/-/g, "+").replace(/_/g, "/"),
        "base64",
      ).toString(),
    ) as { sub: string; exp: number };

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      res.status(401).json({ error: "Token expired" });
      return;
    }

    const users = await getUsers();
    const user = users.find((u) => u.uuid === payload.sub);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(generateTokens(user.uuid, user.login));
  } catch (e) {
    res.status(401).json({ error: "Invalid token" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Auth server running on http://localhost:${PORT}`);
});
