import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "../../../lib/auth";
import { getArts, getWebProjects } from "../../../lib/portfolio-db";
import { PortfolioAdminEditor } from "../../../components/PortfolioAdminEditor";

export default async function AdminPortfolioPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const arts = await getArts();
  const webProjects = await getWebProjects();

  return (
    <main className="min-h-screen bg-[#050505] text-[#f8f5f5]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="rounded-[36px] border border-white/10 bg-[#0b0a0f]/95 p-10 shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#8f8a91]">Админ-панель</p>
              <h1 className="mt-3 text-4xl font-semibold uppercase tracking-[0.24em] text-[#f8f5f5]">Портфолио</h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[#b9b2bc]">
                Управляйте арт-работами и веб-кейсами как в Django admin через PostgreSQL.
              </p>
            </div>
            <Link href="/admin" className="inline-flex items-center justify-center rounded-full bg-[#111116]/95 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#f8f5f5] transition hover:text-[#ff1a4d]">
              Назад в админку
            </Link>
          </div>

          <PortfolioAdminEditor initialArts={arts} initialWebProjects={webProjects} />
        </div>
      </div>
    </main>
  );
}
