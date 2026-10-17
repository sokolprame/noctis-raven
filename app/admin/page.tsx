import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "../../lib/auth";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[#050505] text-[#f8f5f5]">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-16">
      <div className="rounded-[28px] border border-white/10 bg-[#0b0a0f]/95 p-5 shadow-[0_40px_120px_rgba(0,0,0,0.45)] sm:rounded-[36px] sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold uppercase tracking-[0.14em] text-[#f8f5f5] sm:text-4xl sm:tracking-[0.24em]">Админ-панель</h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[#b9b2bc]">
                Здесь собраны входящие заявки. Тексты публичных кейсов редактируются в файле lib/site-data.ts.
              </p>
            </div>
            <form action="/api/admin/logout" method="post">
              <button type="submit" className="inline-flex items-center justify-center border border-white/10 bg-[#111116]/95 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#f8f5f5] transition hover:border-[#ff1a4d] hover:text-[#ff1a4d]">Выйти</button>
            </form>
          </div>

          <div className="mt-10 grid gap-4">
            <Link
              href="/admin/messages"
              className="border border-white/10 bg-[#09090f]/80 p-5 text-left transition hover:border-[#ff1a4d]/50 sm:p-7"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-[#8f8a91]">Контактная форма</p>
              <h2 className="mt-4 text-xl font-semibold text-[#f8f5f5]">Входящие сообщения</h2>
              <p className="mt-3 text-sm leading-6 text-[#c9c2c9]">Читайте заявки с сайта и отвечайте отправителю напрямую по email.</p>
            </Link>

          </div>
        </div>
      </div>
    </main>
  );
}
