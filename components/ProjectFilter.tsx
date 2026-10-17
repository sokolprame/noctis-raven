"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import PortfolioCaseCard from "@/components/PortfolioCaseCard";
import { resolveLocale, type Locale } from "@/lib/i18n";
import { portfolioProjects, projectFilters } from "@/lib/site-data";

const filterLabels: Record<(typeof projectFilters)[number], Record<Locale, string>> = {
  All: { ru: "Все проекты", en: "All work" },
  Commerce: { ru: "Коммерция", en: "Commerce" },
  Memorial: { ru: "Памятные проекты", en: "Memorial" },
};

export default function ProjectFilter() {
  const searchParams = useSearchParams();
  const locale = resolveLocale(searchParams.get("lang"));
  const [activeFilter, setActiveFilter] = useState<(typeof projectFilters)[number]>("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return portfolioProjects;
    return portfolioProjects.filter((project) => project.collection === activeFilter);
  }, [activeFilter]);

  return (
    <div className="space-y-6 sm:space-y-8">
      <div role="group" aria-label={locale === "ru" ? "Фильтр проектов" : "Project filter"} className="flex flex-wrap gap-2 border-y border-white/10 py-3">
        {projectFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            aria-pressed={activeFilter === filter}
            className={`min-h-10 border px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] transition sm:px-4 sm:text-[10px] sm:tracking-[0.22em] ${
              activeFilter === filter
                ? "border-[#ff1a4d] bg-[#b3002d]/10 text-[#ff526f]"
                : "border-transparent text-[#aaa] hover:border-white/15 hover:text-white"
            }`}
          >
            {filterLabels[filter][locale]}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.38, ease: "easeOut", delay: index * 0.035 }}
              className="h-full"
            >
              <PortfolioCaseCard project={project} locale={locale} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
