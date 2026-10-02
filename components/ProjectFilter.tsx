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
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {projectFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.28em] transition ${
              activeFilter === filter
                ? "border-[#ff1a4d] bg-[#b3002d]/10 text-[#ff1a4d]"
                : "border-white/10 bg-[#0a0a0a] text-[#d5d5d5] hover:border-[#ff1a4d]/40 hover:text-[#ffb3c7]"
            }`}
          >
            {filterLabels[filter][locale]}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.04 }}
              className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-[#0a0a0a] p-4 sm:rounded-[28px] sm:p-5"
            >
              <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(179,0,45,0.28),transparent_38%)]" />
              <div className="relative">
                <div className="mb-6 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.28em] text-[#a1a1a1]">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{project.type[locale]}</span>
                </div>

                <div
                  role="img"
                  aria-label={`${project.title} — ${project.copy[locale].summary}`}
                  className="relative mb-5 h-48 overflow-hidden rounded-[18px] border border-white/10 bg-[#111] sm:h-56 sm:rounded-[20px]"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(5,5,5,0.02), rgba(5,5,5,0.44)), url("${project.previewUrl}")`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: project.previewFit,
                  }}
                >
                  <span className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/60 to-transparent" />
                </div>

                <div className="mb-3 flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[#a1a1a1] sm:tracking-[0.3em]">{project.client}</p>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#ff1a4d]">{project.category}</span>
                </div>

                <h3 className="text-2xl font-medium uppercase tracking-tighter text-[#f5f5f5]">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#c6c6c6]">{project.copy[locale].summary}</p>

                <Link
                  href={withLocale(`/work/${project.slug}`, locale)}
                  className="mt-6 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-[#ff1a4d] transition group-hover:translate-x-1"
                >
                  {locale === "ru" ? "СМОТРЕТЬ КЕЙС" : "VIEW CASE"}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
