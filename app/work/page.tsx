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
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-14 lg:px-10">
        <div className="mb-9 border-b border-white/10 pb-7 sm:mb-12 sm:pb-10">
          <p className="text-[10px] uppercase tracking-[0.42em] text-[#a1a1a1]">{isRu ? "ПОРТФОЛИО / NOCTIS RAVEN" : "PORTFOLIO / NOCTIS RAVEN"}</p>
          <div className="mt-5 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h1 className="max-w-5xl text-[clamp(2.65rem,8vw,6.5rem)] font-medium uppercase leading-[0.86] tracking-[-0.075em] text-[#f5f5f5]">
              {isRu ? "ИЗБРАННЫЕ РАБОТЫ" : "SELECTED WORK"}
            </h1>
            <p className="max-w-sm text-sm leading-6 text-white/50 sm:text-base sm:leading-7">
              {isRu ? "Два проекта, в которых задача, содержание и визуальный язык собраны в цельный цифровой опыт." : "Two projects where purpose, content, and visual language come together as a considered digital experience."}
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 md:gap-6 xl:gap-8">
          {portfolioProjects.map((project, index) => (
            <Link
              key={project.slug}
              href={withLocale(`/work/${project.slug}`, locale)}
              className="group overflow-hidden rounded-[24px] border border-white/10 bg-[#0a0a0a] transition duration-300 hover:-translate-y-1 hover:border-[#c8102e]/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ed1739] sm:rounded-[28px]"
            >
              <div
                role="img"
                aria-label={`${project.title} — ${project.copy[locale].summary}`}
                className="relative aspect-[1.16/1] overflow-hidden bg-[#171313] sm:aspect-[1.32/1]"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(5,5,5,0.15) 0%, rgba(5,5,5,0.02) 30%, rgba(5,5,5,0.88) 100%), url("${project.previewUrl}")`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: project.previewFit,
                }}
              >
                <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_90%_12%,rgba(200,16,46,0.28),transparent_35%)] opacity-70 transition duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-5 top-5 flex items-center justify-between gap-4 sm:inset-x-7 sm:top-7">
                  <span className="border border-white/25 bg-black/35 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.28em] text-white/85 backdrop-blur-sm">CASE / {String(index + 1).padStart(2, "0")}</span>
                  <span className="max-w-[55%] text-right text-[9px] font-medium uppercase tracking-[0.24em] text-white/80 sm:text-[10px]">{project.type[locale]}</span>
                </div>
                <div className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-7">
                  <p className="text-[9px] uppercase tracking-[0.28em] text-white/65 sm:text-[10px]">{project.client}</p>
                  <h2 className="mt-2 text-2xl font-semibold uppercase leading-[0.95] tracking-[-0.06em] text-white sm:text-3xl lg:text-4xl">{project.title}</h2>
                </div>
                <span aria-hidden="true" className="absolute bottom-6 right-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/35 text-white backdrop-blur-sm transition duration-300 group-hover:rotate-45 group-hover:border-[#ff1a4d] group-hover:bg-[#c8102e] sm:bottom-7 sm:right-7 sm:h-12 sm:w-12">
                  <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
              </div>

              <div className="flex items-end justify-between gap-5 p-5 sm:p-7">
                <div className="min-w-0">
                  <p className="text-sm leading-6 text-white/60 sm:text-base sm:leading-7">{project.copy[locale].summary}</p>
                  <p className="mt-4 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#ed1739]">{project.category} <span className="mx-1 text-white/30">/</span> {isRu ? "СМОТРЕТЬ КЕЙС" : "VIEW CASE"}</p>
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
