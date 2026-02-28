import { NextRequest, NextResponse } from "next/server";
import { findUserByUuid } from "@/lib/db";
import { generateHytaleTokens, verifyToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: "Token required" }, { status: 400 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 },
      );
    }

    const user = await findUserByUuid(payload.sub);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const tokens = generateHytaleTokens(user.uuid, user.login);
    return NextResponse.json(tokens);
  } catch (error) {
    console.error("[TOKENS ERROR]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
