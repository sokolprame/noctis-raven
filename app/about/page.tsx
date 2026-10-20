import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import HeroPortrait from "@/components/HeroPortrait";
import SiteHeader from "@/components/SiteHeader";
import { resolveLocale, withLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Обо мне",
  description: "Портфолио NOCTIS RAVEN: цифровой дизайн, разработка сайтов и иллюстрация.",
};

export default async function AboutPage({ searchParams }: { searchParams?: Promise<{ lang?: string }> }) {
  const params = searchParams ? await searchParams : {};
  const locale = resolveLocale(params.lang);
  const isRu = locale === "ru";
  const steps = isRu
    ? ["Идея и контекст", "Структура и направление", "Визуальная система", "Реализация и детали"]
    : ["Idea and context", "Structure and direction", "Visual system", "Build and finish"];

  return (
    <main id="main-content" lang={locale} className="min-h-screen bg-[#050505] text-[#f5f5f5]">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-5 pb-14 pt-8 sm:px-8 sm:pb-20 sm:pt-12 lg:px-10">
        <section className="grid items-center gap-5 border-b border-white/10 pb-8 sm:gap-8 sm:pb-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-16">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.36em] text-[#ff526f] sm:text-[10px] sm:tracking-[0.42em]">{isRu ? "ОБО МНЕ / NOCTIS RAVEN" : "ABOUT / NOCTIS RAVEN"}</p>
            <h1 className="mt-5 text-[clamp(2.7rem,7.4vw,6.5rem)] font-black uppercase leading-[0.84] tracking-[-0.075em] text-white">
              {isRu ? <><span className="block">ИСКУССТВО</span><span className="block text-[#c8102e]">И ТЕХНОЛОГИИ.</span></> : <><span className="block">ART AND</span><span className="block text-[#c8102e]">TECHNOLOGY.</span></>}
            </h1>
            <div className="mt-6 max-w-2xl space-y-4 text-sm leading-7 text-white/60 sm:mt-8 sm:text-base sm:leading-8">
              <p>
                {isRu
                  ? "Я создаю вещи, которые ощущаются атмосферными, продуманными и живыми. Моя работа соединяет визуальное повествование, продуктовый подход и интерактивный дизайн."
                  : "I create work that feels atmospheric, considered, and alive. My practice brings visual storytelling, product thinking, and interaction design together."}
              </p>
              <p>
                {isRu
                  ? "От веб-сайтов и цифровых брендов до тёмных иллюстраций — каждый проект начинается с ясной идеи и заканчивается вниманием к деталям."
                  : "From websites and digital identities to dark illustration, every project starts with a clear idea and is finished with care for the details."}
              </p>
            </div>
            <Link href={withLocale("/contact", locale)} className="mt-6 inline-flex min-h-12 items-center gap-3 bg-[#c8102e] px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[#ed1739] sm:mt-8 sm:px-6 sm:text-[10px]">
              {isRu ? "ОБСУДИТЬ ПРОЕКТ" : "START A PROJECT"}<ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mx-auto w-full max-w-[560px] lg:ml-auto">
            <HeroPortrait locale={locale} />
          </div>
        </section>

        <section className="grid gap-px border-b border-white/10 bg-white/10 sm:grid-cols-3" aria-label={isRu ? "Направления работы" : "Areas of work"}>
          {[
            { index: "01", title: isRu ? "ДИЗАЙН" : "DESIGN", detail: isRu ? "UI/UX · визуальные системы · направление" : "UI/UX · visual systems · direction" },
            { index: "02", title: isRu ? "РАЗРАБОТКА" : "DEVELOPMENT", detail: isRu ? "Интерактивные сайты · frontend · продукт" : "Interactive sites · frontend · product" },
            { index: "03", title: isRu ? "АРТ" : "ART", detail: isRu ? "Иллюстрация · персонажи · визуальные эксперименты" : "Illustration · characters · visual experiments" },
          ].map((item) => (
            <article key={item.index} className="bg-[#080808] p-4 sm:p-5 lg:p-7">
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-semibold tracking-[0.28em] text-[#ff526f]">{item.index}</span>
                <span className="h-px flex-1 bg-white/10" />
              </div>
              <h2 className="mt-5 text-lg font-semibold uppercase tracking-[-0.035em] sm:mt-7 sm:text-xl">{item.title}</h2>
              <p className="mt-2 text-xs leading-6 text-white/50 sm:text-sm">{item.detail}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 border-b border-white/10 py-10 sm:gap-10 sm:py-14 lg:grid-cols-[0.7fr_1.3fr] lg:py-16">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.36em] text-[#ff526f]">{isRu ? "ПОДХОД" : "APPROACH"}</p>
            <h2 className="mt-4 max-w-md text-3xl font-semibold uppercase leading-[0.9] tracking-[-0.06em] sm:text-4xl">{isRu ? "ОТ ПЕРВОЙ ИДЕИ ДО ПОСЛЕДНЕГО ПИКСЕЛЯ." : "FROM THE FIRST IDEA TO THE LAST PIXEL."}</h2>
          </div>
          <ol className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
            {steps.map((step, index) => (
              <li key={step} className="flex min-h-20 items-center gap-4 bg-[#080808] p-4 sm:min-h-24 sm:p-5">
                <span className="text-[9px] font-semibold tracking-[0.24em] text-[#ff526f]">0{index + 1}</span>
                <span className="h-px w-6 shrink-0 bg-[#c8102e]/70" />
                <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/75 sm:text-xs sm:tracking-[0.16em]">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between sm:pt-10">
          <p className="text-[9px] font-semibold uppercase tracking-[0.32em] text-white/45">{isRu ? "ОТКРЫТ К СОТРУДНИЧЕСТВУ" : "AVAILABLE FOR PROJECTS"}</p>
          <Link href={withLocale("/work", locale)} className="inline-flex min-h-11 items-center gap-3 border border-white/20 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.22em] transition hover:border-[#c8102e] hover:text-[#ff526f]">
            {isRu ? "СМОТРЕТЬ РАБОТЫ" : "VIEW WORK"}<ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
      <Footer />
    </main>
  );
}
