import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { saveManagedProject, setProjectStatus, type ProjectStatus } from "@/lib/public-portfolio";
import type { PortfolioItem } from "@/lib/site-data";

function validContent(value: unknown): value is PortfolioItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<PortfolioItem>;
  return typeof item.slug === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug)
    && typeof item.title === "string" && item.title.trim().length > 0
    && typeof item.client === "string" && typeof item.category === "string" && typeof item.collection === "string"
    && typeof item.previewUrl === "string" && typeof item.liveUrl === "string"
    && !!item.copy?.ru && !!item.copy?.en && !!item.type?.ru && !!item.type?.en
    && !!item.role?.ru && !!item.role?.en && !!item.services?.ru && !!item.services?.en
    && Array.isArray(item.gallery) && Array.isArray(item.galleryFit)
    && !!item.problem?.ru && !!item.problem?.en && !!item.approach?.ru && !!item.approach?.en
    && !!item.design?.ru && !!item.design?.en;
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ ok: false, message: "Некорректный JSON" }, { status: 400 }); }
  if (!body || typeof body !== "object") return NextResponse.json({ ok: false, message: "Некорректные данные" }, { status: 400 });
  const payload = body as { id?: unknown; content?: unknown; status?: unknown; featured?: unknown; sortOrder?: unknown };
  if (!validContent(payload.content) || (payload.status !== "draft" && payload.status !== "published") || typeof payload.featured !== "boolean" || !Number.isInteger(payload.sortOrder)) {
    return NextResponse.json({ ok: false, message: "Заполните обязательные поля и выберите корректный slug" }, { status: 400 });
  }
  try {
    const saved = await saveManagedProject({ id: typeof payload.id === "string" && !payload.id.startsWith("static-") ? payload.id : undefined, content: payload.content, status: payload.status as ProjectStatus, featured: payload.featured, sortOrder: payload.sortOrder as number });
    if (!saved) return NextResponse.json({ ok: false, message: "Запись не найдена" }, { status: 404 });
    return NextResponse.json({ ok: true, project: saved });
  } catch (error) {
    const message = (error as { code?: string })?.code === "23505" ? "Этот slug уже занят" : "Не удалось сохранить кейс. Проверьте подключение к PostgreSQL и миграцию 004.";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ ok: false, message: "Некорректный JSON" }, { status: 400 }); }
  if (!body || typeof body !== "object") return NextResponse.json({ ok: false, message: "Некорректные данные" }, { status: 400 });
  const payload = body as { id?: unknown; status?: unknown };
  if (typeof payload.id !== "string" || payload.id.startsWith("static-") || (payload.status !== "draft" && payload.status !== "published")) return NextResponse.json({ ok: false, message: "Некорректные данные" }, { status: 400 });
  try {
    const updated = await setProjectStatus(payload.id, payload.status as ProjectStatus);
    return updated ? NextResponse.json({ ok: true }) : NextResponse.json({ ok: false, message: "Кейс не найден" }, { status: 404 });
  } catch {
    return NextResponse.json({ ok: false, message: "Не удалось обновить статус. Проверьте подключение к PostgreSQL и миграцию 004." }, { status: 500 });
  }
}
