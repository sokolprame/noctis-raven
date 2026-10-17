import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_TTL_SECONDS,
  createAdminSessionToken,
  getAdminPassword,
  validateAdminPassword,
} from "../../../../lib/auth";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).origin !== new URL(request.url).origin) {
    return NextResponse.json({ message: "Invalid origin" }, { status: 403 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 1024) {
    return NextResponse.json({ message: "Request is too large" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  if (!getAdminPassword() || !process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET.length < 32) {
    return NextResponse.json({ message: "Admin authentication is not configured" }, { status: 503 });
  }

  const password = (body as { password?: unknown }).password;
  if (typeof password !== "string" || password.length > 512 || !validateAdminPassword(password)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const token = createAdminSessionToken();
  if (!token) {
    return NextResponse.json({ message: "Admin authentication is not configured" }, { status: 503 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    path: "/",
    maxAge: ADMIN_SESSION_TTL_SECONDS,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
