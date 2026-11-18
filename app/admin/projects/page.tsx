import Link from "next/link";
import { redirect } from "next/navigation";
import { getProjects } from "../../../lib/projects";
import type { PortfolioItem } from "../../../lib/data";
import { isAdminAuthenticated } from "../../../lib/auth";

export default async function AdminProjectsPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const projects = await getProjects();

  return (
    <main id="main-content" lang="ru" className="min-h-screen bg-[#050505] text-[#f8f5f5]">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="rounded-[28px] border border-white/10 bg-[#0b0a0f]/95 p-5 shadow-[0_40px_120px_rgba(0,0,0,0.45)] sm:rounded-[36px] sm:p-10">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#8f8a91]">Админ-панель</p>
              <h1 className="mt-3 text-2xl font-semibold uppercase tracking-[0.12em] text-[#f8f5f5] sm:text-4xl sm:tracking-[0.24em]">Каталог проектов</h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[#b9b2bc]">
                Интерфейс напоминает таблицу Django admin: фильтрация, метки и быстрый доступ к управлению.
              </p>
            </div>
            <Link
              href="/admin"
              className="inline-flex items-center justify-center rounded-full bg-[#111116]/95 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#f8f5f5] transition hover:border-[#ff1a4d]/50 hover:text-[#ff1a4d]"
            >
              Назад в админку
            </Link>
          </div>

          <div className="overflow-x-auto rounded-[28px] border border-white/10 bg-[#09090f]/80">
            <table className="min-w-[680px] border-collapse text-left text-sm">
              <thead className="bg-white/5 text-[#b9b2bc]">
                <tr>
                  <th className="px-6 py-4 uppercase tracking-[0.25em]">ID</th>
                  <th className="px-6 py-4 uppercase tracking-[0.25em]">Название</th>
                  <th className="px-6 py-4 uppercase tracking-[0.25em]">Категория</th>
                  <th className="px-6 py-4 uppercase tracking-[0.25em]">Теги</th>
                  <th className="px-6 py-4 uppercase tracking-[0.25em]">Акцент</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project: PortfolioItem, index: number) => (
                  <tr
                    key={project.id ?? `${project.title}-${index}`}
                    className={index % 2 === 0 ? "bg-white/2" : "bg-transparent"}
                  >
                    <td className="whitespace-nowrap px-6 py-4 text-[#f8f5f5]">
                      {project.id ?? "—"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-base font-semibold text-[#f8f5f5]">{project.title}</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.25em] text-[#8f8a91]">{project.description}</div>
                    </td>
                    <td className="px-6 py-4 text-[#c9c2c9]">{project.category}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-white/5 px-2 py-1 text-[11px] uppercase tracking-[0.28em] text-[#bfb8bf]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full border border-[#ff1a4d]/20 bg-[#ff1a4d]/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-[#ff9bb1]">
                        {project.accent}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-[#8f8a91]">
            <p>Всего проектов: {projects.length}</p>
            <p>Отображаются данные из PostgreSQL или демонстрационный каталог.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
