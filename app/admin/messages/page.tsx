import Link from "next/link";
import { redirect } from "next/navigation";
import AdminMessageInbox from "@/components/AdminMessageInbox";
import { getContactRequests } from "@/lib/contact-db";
import { isAdminAuthenticated } from "@/lib/auth";

export default async function AdminMessagesPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const inbox = await getContactRequests();

  return (
    <main id="main-content" lang="ru" className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-14">
        <header className="mb-7 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.32em] text-[#ff526f]">{inbox.requests.length} / 100</p>
            <h1 className="mt-3 text-3xl font-black uppercase leading-none tracking-[-0.06em] sm:text-5xl">Входящие</h1>
            <p className="mt-3 text-sm text-white/50">Заявки, отправленные через контактную форму.</p>
          </div>
          <Link href="/admin" className="inline-flex min-h-10 w-fit items-center border border-white/15 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:border-[#c8102e] hover:text-white">Назад в админку</Link>
        </header>

        {!inbox.available ? (
          <p className="border border-[#c8102e]/35 bg-[#10090b] p-4 text-sm leading-6 text-white/65">
            Чтобы принимать и просматривать сообщения, настройте <code className="text-[#ff9bb1]">DATABASE_URL</code> и примените миграцию <code className="text-[#ff9bb1]">003_contact_requests.sql</code>.
          </p>
        ) : (
          <AdminMessageInbox initialRequests={inbox.requests} locale="ru" />
        )}
      </div>
    </main>
  );
}
