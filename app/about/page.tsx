import Link from "next/link";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import { resolveLocale, withLocale } from "@/lib/i18n";

export default async function AboutPage({ searchParams }: { searchParams?: Promise<{ lang?: string }> }) {
  const params = searchParams ? await searchParams : {};
  const locale = resolveLocale(params.lang);
  const isRu = locale === "ru";

  return (
    <main className="min-h-screen bg-[#050505] text-[#f5f5f5]">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
        <p className="text-[11px] uppercase tracking-[0.42em] text-[#a1a1a1]">
          {isRu ? "ОБО МНЕ" : "ABOUT ME"}
        </p>
        <h1 className="mt-6 text-3xl font-medium uppercase leading-[1.02] tracking-[-0.06em] text-[#f5f5f5] sm:text-6xl">
          {isRu ? "Я НА СТЫКЕ ИСКУССТВА И ТЕХНОЛОГИЙ." : "I WORK AT THE INTERSECTION OF ART AND TECHNOLOGY."}
        </h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6 text-lg leading-8 text-[#d9d9d9]">
            <p>
              {isRu
                ? "Я создаю вещи, которые ощущаются атмосферными, продуманными и живыми. Моя работа соединяет визуальное повествование, продуктовый подход и интерактивный дизайн в проекты с ярким характером."
                : "I create things that feel atmospheric, considered, and alive. My work blends visual storytelling, product thinking, and interaction design into projects that carry a clear identity."}
            </p>
            <p>
              {isRu
                ? "Будь то портфолио, цифровой бренд или тёмная иллюстрация — цель всегда одна: построить что-то с характером, ясностью и эмоциональной глубиной."
                : "Whether I am developing a portfolio, designing a digital brand, or crafting a dark illustration, the goal is always the same: build something with character, focus, and emotional weight."}
            </p>
            <p>
              {isRu
                ? "Дизайнер. Художник. Разработчик. Я двигаюсь между этими ролями, чтобы делать цифровую работу премиальной без потери ясности."
                : "Designer. Artist. Developer. I move between those roles with one shared intention: to make digital work feel premium without losing clarity."}
            </p>
          </div>

          <div className="space-y-4 rounded-[28px] border border-white/10 bg-[#0a0a0a] p-6">
            <p className="text-[11px] uppercase tracking-[0.38em] text-[#ff1a4d]">{isRu ? "КЛЮЧЕВОЕ" : "CORE"}</p>
            <div className="space-y-4 text-sm text-[#d4d4d4]">
              <div className="flex flex-col gap-1 border-b border-white/5 pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <span>{isRu ? "Дизайн" : "Designer"}</span>
                <span className="break-words text-[#a1a1a1] sm:text-right">{isRu ? "UI / identity / визуальные системы" : "UI / identity / visual systems"}</span>
              </div>
              <div className="flex flex-col gap-1 border-b border-white/5 pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <span>{isRu ? "Искусство" : "Artist"}</span>
                <span className="break-words text-[#a1a1a1] sm:text-right">{isRu ? "иллюстрация / портреты / worldbuilding" : "illustration / portraits / worldbuilding"}</span>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <span>{isRu ? "Разработка" : "Developer"}</span>
                <span className="break-words text-[#a1a1a1] sm:text-right">{isRu ? "web / frontend / продуктовые решения" : "web / frontend / product experiences"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-[28px] border border-white/10 bg-[#0a0a0a] p-8">
          <p className="text-[11px] uppercase tracking-[0.42em] text-[#a1a1a1]">{isRu ? "ХРОНОЛОГИЯ" : "TIMELINE"}</p>
          <div className="mt-8 flex flex-col gap-5">
            {[
              isRu ? "СТАРТ" : "START",
              isRu ? "ДИЗАЙН" : "DESIGN",
              isRu ? "ИСКУССТВО" : "ART",
              isRu ? "WEB" : "WEB",
              "NOCTIS",
            ].map((step, index) => (
              <div key={step} className="flex items-center gap-4 text-sm uppercase tracking-[0.26em] text-[#d5d5d5]">
                {index > 0 ? <span className="text-[#ff1a4d]">↓</span> : <span className="text-[#ff1a4d]">→</span>}
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <Link href={withLocale("/contact", locale)} className="inline-flex items-center gap-3 rounded-full bg-[#b3002d] px-6 py-3 text-[11px] uppercase tracking-[0.28em] text-[#f5f5f5] transition hover:bg-[#ff1a4d]">
            {isRu ? "НАЧАТЬ ПРОЕКТ" : "START A PROJECT"}
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
