import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "../../../../lib/auth";

export async function GET() {
  const response = NextResponse.redirect(new URL("/admin/login", "http://localhost"));
  response.cookies.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  return response;
}
