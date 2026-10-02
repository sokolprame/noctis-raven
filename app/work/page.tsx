import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import { resolveLocale, withLocale } from "@/lib/i18n";
import { portfolioProjects } from "../../lib/site-data";

export default async function WorkPage({ searchParams }: { searchParams?: Promise<{ lang?: string }> }) {
  const params = searchParams ? await searchParams : {};
  const locale = resolveLocale(params.lang);
  const isRu = locale === "ru";

  return (
    <main className="min-h-screen bg-[#050505] text-[#f5f5f5]">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <p className="text-[11px] uppercase tracking-[0.42em] text-[#a1a1a1]">{isRu ? "РАБОТЫ" : "WORK"}</p>
        <h1 className="mt-6 text-5xl font-medium uppercase tracking-[-0.06em] text-[#f5f5f5] sm:text-6xl">
          {isRu ? "ИЗБРАННЫЕ РАБОТЫ" : "SELECTED WORK"}
        </h1>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {portfolioProjects.map((project, index) => (
            <Link
              key={project.slug}
              href={withLocale(`/work/${project.slug}`, locale)}
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0a0a0a] p-6 transition hover:border-[#ff1a4d]/60"
            >
              <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(179,0,45,0.25),transparent_42%)]" />
              <div className="relative">
                <div className="mb-6 flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-[#a1a1a1]">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{project.type[locale]}</span>
                </div>
                <div
                  role="img"
                  aria-label={`${project.title} — ${project.copy[locale].summary}`}
                  className="mb-5 h-52 overflow-hidden rounded-[20px] border border-white/10 bg-[#111]"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(5,5,5,0.02), rgba(5,5,5,0.44)), url("${project.previewUrl}")`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: project.previewFit,
                  }}
                />
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#a1a1a1]">{project.client}</p>
                <h2 className="mt-4 text-2xl font-medium uppercase tracking-tighter text-[#f5f5f5]">{project.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#c5c5c5]">{project.copy[locale].summary}</p>
                <div className="mt-6 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-[#ff1a4d]">
                  {isRu ? "СМОТРЕТЬ КЕЙС" : "VIEW CASE"} <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
