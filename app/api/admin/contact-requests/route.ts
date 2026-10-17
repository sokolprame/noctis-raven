import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../../lib/auth";
import { deleteContactRequest } from "../../../../lib/contact-db";

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body) || typeof (body as { id?: unknown }).id !== "string") {
    return NextResponse.json({ ok: false, message: "Invalid request" }, { status: 400 });
  }

  const id = (body as { id: string }).id;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
    return NextResponse.json({ ok: false, message: "Invalid request" }, { status: 400 });
  }

  try {
    await deleteContactRequest(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "Could not delete message" }, { status: 503 });
  }
}
