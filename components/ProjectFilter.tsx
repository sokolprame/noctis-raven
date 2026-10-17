"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { resolveLocale, withLocale, type Locale } from "@/lib/i18n";
import { portfolioProjects, projectFilters } from "../lib/site-data";

const filterLabels: Record<string, Record<Locale, string>> = {
  All: { ru: "Все", en: "All" },
  Web: { ru: "Сайты", en: "Websites" },
};

export default function ProjectFilter() {
  const searchParams = useSearchParams();
  const locale = resolveLocale(searchParams.get("lang")) as Locale;
  const [activeFilter, setActiveFilter] = useState<(typeof projectFilters)[number]>("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return portfolioProjects;
    return portfolioProjects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="space-y-7 sm:space-y-8">
      <div className="flex flex-wrap gap-2.5 sm:gap-3">
        {projectFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            aria-pressed={activeFilter === filter}
            className={`min-h-10 rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] transition ${
              activeFilter === filter
                ? "border-[#ff1a4d] bg-[#b3002d]/10 text-[#ff1a4d]"
                : "border-white/10 bg-[#0a0a0a] text-[#d5d5d5] hover:border-[#ff1a4d]/40 hover:text-[#ffb3c7]"
            }`}
          >
            {filterLabels[filter][locale]}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.04 }}
              className="group overflow-hidden rounded-[22px] border border-white/10 bg-[#0a0a0a] transition duration-300 hover:-translate-y-1 hover:border-[#c8102e]/65 sm:rounded-[26px]"
            >
              <Link href={withLocale(`/work/${project.slug}`, locale)} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#ed1739]">
                <div
                  role="img"
                  aria-label={`${project.title} — ${project.copy[locale].summary}`}
                  className="relative aspect-[1.12/1] overflow-hidden bg-[#171313] sm:aspect-[1.28/1]"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(5,5,5,0.12) 0%, rgba(5,5,5,0.02) 34%, rgba(5,5,5,0.9) 100%), url("${project.previewUrl}")`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: project.previewFit,
                  }}
                >
                  <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(200,16,46,0.28),transparent_38%)] opacity-60 transition group-hover:opacity-100" />
                  <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3 sm:inset-x-6 sm:top-6">
                    <span className="border border-white/25 bg-black/35 px-2.5 py-1.5 text-[8px] font-semibold uppercase tracking-[0.24em] text-white/85 backdrop-blur-sm sm:text-[9px]">NR—{String(index + 1).padStart(2, "0")}</span>
                    <span className="max-w-[60%] text-right text-[8px] uppercase tracking-[0.18em] text-white/80 sm:text-[9px] sm:tracking-[0.22em]">{project.type[locale]}</span>
                  </div>
                  <div className="absolute inset-x-4 bottom-4 pr-12 sm:inset-x-6 sm:bottom-6 sm:pr-14">
                    <p className="text-[8px] uppercase tracking-[0.24em] text-white/60 sm:text-[9px]">{project.client}</p>
                    <h3 className="mt-2 text-2xl font-semibold uppercase leading-[0.95] tracking-[-0.06em] text-white sm:text-3xl">{project.title}</h3>
                  </div>
                  <span aria-hidden="true" className="absolute bottom-5 right-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/35 text-white backdrop-blur-sm transition duration-300 group-hover:rotate-45 group-hover:border-[#ff1a4d] group-hover:bg-[#c8102e] sm:bottom-6 sm:right-6 sm:h-11 sm:w-11">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <div className="p-4 sm:p-5">
                  <p className="text-sm leading-6 text-white/60">{project.copy[locale].summary}</p>
                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#ed1739]">{project.category} / {locale === "ru" ? "КЕЙС" : "CASE"}</span>
                    <span className="text-[8px] uppercase tracking-[0.2em] text-white/45 transition group-hover:text-white/80 sm:text-[9px]">{locale === "ru" ? "СМОТРЕТЬ" : "EXPLORE"}</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
