import { NextResponse } from "next/server";
import { query } from "../../../lib/db";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      message?: string;
    };
    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, message: "Заполните все поля" }, { status: 400 });
    }

    await query("CREATE EXTENSION IF NOT EXISTS pgcrypto");
    await query(
      `CREATE TABLE IF NOT EXISTS contact_requests (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      )`,
    );
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
