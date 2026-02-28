import { NextRequest, NextResponse } from "next/server";
import { findUser } from "@/lib/db";
import { generateHytaleTokens } from "@/lib/auth";
import { hashPassword } from "@/lib/db";

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

    // Проверяем пароль
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
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
