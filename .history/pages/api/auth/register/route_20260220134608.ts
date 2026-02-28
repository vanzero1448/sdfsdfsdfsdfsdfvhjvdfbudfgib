import { NextRequest, NextResponse } from "next/server";
import { findUser, createUser } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { login, password } = await request.json();

    if (!login || !password || login.length < 3 || password.length < 6) {
      return NextResponse.json(
        { error: "Login min 3, password min 6 symbols" },
        { status: 400 },
      );
    }

    const existingUser = await findUser(login);
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 },
      );
    }

    const user = await createUser(login, password);
    return NextResponse.json({
      success: true,
      uuid: user.uuid,
      message: "Registered successfully",
    });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
