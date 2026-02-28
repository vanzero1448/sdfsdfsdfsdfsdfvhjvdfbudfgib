import crypto from "node:crypto";
import { LauncherTokens } from "@/types/auth";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-super-secret-key-2026-change-this!";

const encodeBase64 = (data: any): string => {
  return Buffer.from(JSON.stringify(data))
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
};

const sign = (header: string, payload: string): string => {
  const hmac = crypto.createHmac("sha256", JWT_SECRET);
  hmac.update(`${header}.${payload}`);
  return hmac.digest("base64url");
};

export function generateHytaleTokens(
  uuid: string,
  username: string,
): LauncherTokens {
  const header = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 30 * 24 * 3600;

  const identityPayload = {
    sub: uuid,
    name: username,
    username,
    profile: { username },
    entitlements: ["game.base", "harmonic"],
    scope: "hytale:client",
    iat,
    exp,
    iss: "https://sessions.hertak.ru",
  };

  const sessionPayload = {
    sub: uuid,
    scope: "hytale:server",
    iat,
    exp,
    iss: "https://sessions.hertak.ru",
  };

  const identityPayloadB64 = encodeBase64(identityPayload);
  const sessionPayloadB64 = encodeBase64(sessionPayload);

  return {
    success: true,
    identity_token: `${header}.${identityPayloadB64}.${sign(header, identityPayloadB64)}`,
    session_token: `${header}.${sessionPayloadB64}.${sign(header, sessionPayloadB64)}`,
    uuid,
  };
}

export function verifyToken(token: string): { sub: string } | null {
  try {
    const [, payloadB64] = token.split(".");
    const payload = JSON.parse(
      Buffer.from(
        payloadB64.replace(/-/g, "+").replace(/_/g, "/"),
        "base64",
      ).toString("utf-8"),
    );
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}
