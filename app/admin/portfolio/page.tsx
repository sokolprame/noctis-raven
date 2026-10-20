import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "../../../lib/auth";
import { getManagedPortfolioProjects } from "../../../lib/public-portfolio";
import { PublicPortfolioEditor } from "../../../components/PublicPortfolioEditor";

export default async function AdminPortfolioPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const projects = await getManagedPortfolioProjects();

  return (
    <main className="min-h-screen bg-[#050505] text-[#f8f5f5]">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="rounded-[28px] border border-white/10 bg-[#0b0a0f]/95 p-5 shadow-[0_40px_120px_rgba(0,0,0,0.45)] sm:rounded-[36px] sm:p-10">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#8f8a91]">Админ-панель</p>
              <h1 className="mt-3 text-3xl font-semibold uppercase tracking-[0.14em] text-[#f8f5f5] sm:text-4xl sm:tracking-[0.24em]">Портфолио</h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[#b9b2bc]">
                Создавайте кейсы, сохраняйте черновики, публикуйте работы и управляйте порядком главной и каталога.
              </p>
            </div>
            <Link href="/admin" className="inline-flex items-center justify-center rounded-full bg-[#111116]/95 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#f8f5f5] transition hover:text-[#ff1a4d]">
              Назад в админку
            </Link>
          </div>

          <PublicPortfolioEditor initialProjects={projects} />
        </div>
      </div>
    </main>
  );
}
