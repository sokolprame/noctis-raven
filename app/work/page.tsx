import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Footer from "@/components/Footer";
import PortfolioCaseCard from "@/components/PortfolioCaseCard";
import SiteHeader from "@/components/SiteHeader";
import { resolveLocale, withLocale } from "@/lib/i18n";
import { getPublicPortfolioProjects } from "@/lib/public-portfolio";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Избранные работы",
  description: "Кейсы NOCTIS RAVEN: коммерческий сайт-каталог и персональная страница памяти.",
};

export default async function WorkPage({ searchParams }: { searchParams?: Promise<{ lang?: string }> }) {
  const params = searchParams ? await searchParams : {};
  const locale = resolveLocale(params.lang);
  const projects = await getPublicPortfolioProjects();
  const isRu = locale === "ru";

  return (
      <main id="main-content" lang={locale} className="min-h-screen bg-[#050505] text-[#f5f5f5]">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-12 lg:px-10">
        <header className="mb-8 border-b border-white/10 pb-7 sm:mb-12 sm:pb-10">
          <p className="text-[9px] font-semibold uppercase tracking-[0.36em] text-[#ff526f] sm:text-[10px] sm:tracking-[0.42em]">
            {isRu ? "ПОРТФОЛИО / ИЗБРАННЫЕ КЕЙСЫ" : "PORTFOLIO / SELECTED CASES"}
          </p>
          <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10">
            <h1 className="max-w-5xl text-[clamp(2.7rem,8vw,6.5rem)] font-black uppercase leading-[0.84] tracking-[-0.075em]">
              {isRu ? <><span className="block">ИЗБРАННЫЕ</span><span className="block text-[#c8102e]">РАБОТЫ</span></> : <><span className="block">SELECTED</span><span className="block text-[#c8102e]">WORK</span></>}
            </h1>
            <div className="flex items-end justify-between gap-5 lg:max-w-sm lg:pb-1">
              <p className="max-w-sm text-sm leading-6 text-white/55 sm:text-base sm:leading-7">
                {isRu
                  ? "Каждый кейс — отдельная история, собранная вокруг реальных задач и людей."
                  : "Every case is a distinct story shaped around real needs and people."}
              </p>
              <span aria-hidden="true" className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">{String(projects.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
            </div>
          </div>
        </header>

        <section aria-label={isRu ? "Избранные проекты" : "Selected projects"} className="grid gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6">
          {projects.map((project, index) => (
            <PortfolioCaseCard key={project.slug} project={project} locale={locale} index={index} />
          ))}
        </section>

        <section className="mt-10 flex flex-col gap-5 border-t border-white/10 py-7 sm:mt-14 sm:flex-row sm:items-end sm:justify-between sm:py-9">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/45">{isRu ? "СЛЕДУЮЩИЙ ШАГ" : "NEXT STEP"}</p>
            <h2 className="mt-3 text-2xl font-semibold uppercase leading-none tracking-[-0.05em] sm:text-3xl">{isRu ? "ЕСТЬ ЗАДАЧА?" : "HAVE A PROJECT?"}</h2>
          </div>
          <Link href={withLocale("/contact", locale)} className="inline-flex min-h-12 items-center justify-between gap-10 border border-white/20 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.22em] transition hover:border-[#ff1a4d] hover:bg-[#c8102e] sm:px-5">
            {isRu ? "ОБСУДИТЬ ПРОЕКТ" : "LET’S TALK"}<ArrowUpRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
      <Footer />
    </main>
  );
}
