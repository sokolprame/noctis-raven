import { NextResponse } from "next/server";
import { query } from "../../../lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      name?: unknown;
      email?: unknown;
      message?: unknown;
    };
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (
      !name || !email || !message ||
      name.length > 100 || email.length > 254 || message.length > 5000 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json({ ok: false, message: "Заполните все поля" }, { status: 400 });
    }

    await query(
      "INSERT INTO contact_requests (name, email, message) VALUES ($1, $2, $3)",
      [name, email, message],
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact request failed:", error);
    return NextResponse.json({ ok: false, message: "База данных недоступна" }, { status: 503 });
  }
}
