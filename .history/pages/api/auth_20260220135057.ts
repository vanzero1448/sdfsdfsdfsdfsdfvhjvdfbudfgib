import type { NextApiRequest, NextApiResponse } from "next"; // ✅ ПРАВИЛЬНЫЙ импорт
import { findUser, hashPassword } from "@/lib/db";
import { generateHytaleTokens } from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json({ error: "Login and password required" });
    }

    const user = await findUser(login);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const hashedInput = await hashPassword(password);
    if (user.password !== hashedInput) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const tokens = generateHytaleTokens(user.uuid, user.login);
    return res.status(200).json(tokens);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}
