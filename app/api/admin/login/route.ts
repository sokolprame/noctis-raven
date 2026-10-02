import { NextResponse } from "next/server";
import { validateAdminPassword, ADMIN_COOKIE_NAME } from "../../../../lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const { password } = body as { password?: string };

  if (!password || !validateAdminPassword(password)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, "true", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
