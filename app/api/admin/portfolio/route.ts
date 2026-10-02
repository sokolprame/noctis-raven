import { NextResponse } from "next/server";
import { createArt, createWebProject, deleteArt, deleteWebProject, updateArt, updateWebProject } from "../../../../lib/portfolio-db";
import { isAdminAuthenticated } from "../../../../lib/auth";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { type, payload } = body as { type?: "art" | "web"; payload?: Record<string, unknown> };

  if (!type || !payload) {
    return NextResponse.json({ ok: false, message: "Invalid payload" }, { status: 400 });
  }

  try {
    if (type === "art") {
      if (payload.id) {
        await updateArt(String(payload.id), payload as Parameters<typeof updateArt>[1]);
      } else {
        await createArt(payload as Parameters<typeof createArt>[0]);
      }
    } else if (type === "web") {
      if (payload.id) {
        await updateWebProject(String(payload.id), payload as Parameters<typeof updateWebProject>[1]);
      } else {
        await createWebProject(payload as Parameters<typeof createWebProject>[0]);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, message: "Failed to save" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { type, id } = body as { type?: "art" | "web"; id?: string };

  if (!type || !id) {
    return NextResponse.json({ ok: false, message: "Invalid payload" }, { status: 400 });
  }

  try {
    if (type === "art") {
      await deleteArt(id);
    } else if (type === "web") {
      await deleteWebProject(id);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, message: "Failed to delete" }, { status: 500 });
  }
}
