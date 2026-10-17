import { NextResponse } from "next/server";
import { query } from "../../../lib/db";

export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");
    if (origin && new URL(origin).origin !== new URL(request.url).origin) {
      return NextResponse.json({ ok: false, message: "Invalid origin" }, { status: 403 });
    }

    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > 12_000) {
      return NextResponse.json({ ok: false, message: "Request is too large" }, { status: 413 });
    }

    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ ok: false, message: "Invalid request" }, { status: 400 });
    }
    const input = body as {
      name?: unknown;
      email?: unknown;
      message?: unknown;
      website?: unknown;
    };
    if (typeof input.website === "string" && input.website.trim()) {
      return NextResponse.json({ ok: true });
    }
    const name = typeof input.name === "string" ? input.name.trim() : "";
    const email = typeof input.email === "string" ? input.email.trim() : "";
    const message = typeof input.message === "string" ? input.message.trim() : "";

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
