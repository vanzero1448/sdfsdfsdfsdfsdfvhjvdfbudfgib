import { NextRequest, NextResponse } from "next/server";
import { findUser, hashPassword } from "@/lib/db";
import { generateHytaleTokens } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { login, password } = await request.json();

    if (!login || !password) {
      return NextResponse.json(
        { error: "Login and password required" },
        { status: 400 },
      );
    }

    const user = await findUser(login);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const hashedInput = await hashPassword(password);
    if (user.password !== hashedInput) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const tokens = generateHytaleTokens(user.uuid, user.login);
    return NextResponse.json(tokens);
  } catch (error) {
    console.error("[LOGIN ERROR]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
