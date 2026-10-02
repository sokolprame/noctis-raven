"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import type { PortfolioItem } from "../lib/data";

type PortfolioSectionProps = {
  projects: PortfolioItem[];
};

export default function PortfolioSection({ projects }: PortfolioSectionProps) {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [searchTerm, setSearchTerm] = useState("");

  const portfolioCategories = useMemo(
    () => ["Все", ...Array.from(new Set(projects.map((item) => item.category)))],
    [projects],
  );

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return projects.filter((item) => {
      const matchesCategory = activeCategory === "Все" || item.category === activeCategory;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [item.title, item.description, item.category, ...item.tags]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, projects, searchTerm]);

  return (
    <section id="portfolio" className="relative mx-auto max-w-[1600px] px-6 pb-24 sm:px-8 lg:px-10">
      <div className="mb-10 flex flex-col gap-6 rounded-[36px] border border-white/10 bg-[#0b0a0f]/80 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.4em] text-[#8d8890]">Каталог проектов</p>
          <h2 className="mt-4 text-4xl font-semibold uppercase tracking-[0.24em] text-[#f8f5f5] sm:text-5xl">
            Проекты в формате каталога
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#b9b2bc]">
            Сортируй, ищи и просматривай работы в каталожной сетке — идеальный формат для портфолио.
          </p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-[#09090f]/90 px-5 py-4">
          <p className="text-sm uppercase tracking-[0.3em] text-[#8d8890]">Всего</p>
          <p className="mt-2 text-3xl font-semibold text-[#f8f5f5]">{filteredItems.length}</p>
        </div>
      </div>

      <div className="mb-8 grid gap-4 lg:grid-cols-[1.7fr_3.3fr]">
        <div className="space-y-4 rounded-[28px] border border-white/10 bg-[#0f0d12]/80 p-6">
          <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-[#09090f]/90 px-4 py-3 text-sm text-[#c9c2c9]">
            <Search className="h-4 w-4 text-[#ff1a4d]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Поиск по названию, тегам или описанию"
              className="w-full bg-transparent text-sm text-[#f8f5f5] outline-none placeholder:text-[#6d6872]"
            />
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#8d8890]">Категории</p>
            <div className="flex flex-wrap gap-3">
              {portfolioCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-5 py-2 text-sm uppercase tracking-[0.28em] transition ${
                    activeCategory === category
                      ? "border-[#ff1a4d] bg-[#ff1a4d]/10 text-[#ff1a4d] shadow-[0_0_28px_rgba(255,26,77,0.18)]"
                      : "border-white/10 bg-[#0c0b0d]/80 text-[#c8c3c9] hover:border-[#ff1a4d]/30 hover:text-[#ff8aa2]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {filteredItems.length === 0 ? (
            <div className="rounded-[28px] border border-white/10 bg-[#0f0d12]/80 p-10 text-center text-[#b9b2bc]">
              Ничего не найдено. Попробуй изменить фильтр или запрос.
            </div>
          ) : (
            <div className="grid gap-6 xl:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.article
                    key={item.title}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="group overflow-hidden rounded-[28px] border border-white/10 bg-[#0f0d12]/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.2)] transition hover:-translate-y-1 hover:border-[#ff1a4d]/30"
                  >
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-[#8d8890]">{item.category}</p>
                        <h3 className="mt-3 text-2xl font-semibold text-[#f8f5f5]">{item.title}</h3>
                      </div>
                      <span className="rounded-full bg-[#ff1a4d]/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-[#ff9bb1]">
                        {item.accent}
                      </span>
                    </div>

                    <p className="text-sm leading-7 text-[#c9c2c9]">{item.description}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-[#bfb8bf]">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm uppercase tracking-[0.28em] text-[#ff1a4d]">
                      <span className="rounded-full border border-[#ff1a4d]/15 bg-[#ff1a4d]/5 px-3 py-2 text-[#ffb1c3]">
                        Каталог
                      </span>
                      <span className="inline-flex items-center gap-2 font-semibold transition group-hover:translate-x-1">
                        Подробнее
                        <ArrowRight className="h-4 w-4 opacity-80" />
                      </span>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
