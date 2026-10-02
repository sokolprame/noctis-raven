import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "../../lib/auth";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[#050505] text-[#f8f5f5]">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8">
        <div className="rounded-[36px] border border-white/10 bg-[#0b0a0f]/95 p-10 shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-4xl font-semibold uppercase tracking-[0.24em] text-[#f8f5f5]">Админ-панель</h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[#b9b2bc]">
                Здесь управляется каталог проектов — пароль защищает доступ к административной части.
              </p>
            </div>
            <Link
              href="/api/admin/logout"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-[#111116]/95 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#f8f5f5] transition hover:border-[#ff1a4d] hover:text-[#ff1a4d]"
            >
              Выйти
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <Link
              href="/admin/projects"
              className="rounded-[28px] border border-white/10 bg-[#09090f]/80 p-8 text-left transition hover:border-[#ff1a4d]/40"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-[#8f8a91]">Каталог</p>
              <h2 className="mt-4 text-2xl font-semibold text-[#f8f5f5]">Проекты</h2>
              <p className="mt-3 text-sm leading-7 text-[#c9c2c9]">
                Просматривайте и управляйте записями проекта в таблице, аналогично Django admin.
              </p>
            </Link>

            <Link
              href="/admin/portfolio"
              className="rounded-[28px] border border-white/10 bg-[#09090f]/80 p-8 text-left transition hover:border-[#ff1a4d]/40"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-[#8f8a91]">Портфолио</p>
              <h2 className="mt-4 text-2xl font-semibold text-[#f8f5f5]">ART / WEB</h2>
              <p className="mt-3 text-sm leading-7 text-[#c9c2c9]">
                Управляйте арт-работами и веб-кейсами из PostgreSQL через административный список.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
