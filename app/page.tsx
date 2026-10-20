import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Braces, Code2, Layers3, Mail, MessageSquare, Paintbrush2, Rocket, ScanLine, Sparkles } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import CustomCursor from "@/components/CustomCursor";
import HeroPortrait from "@/components/HeroPortrait";
import ProjectFilter from "@/components/ProjectFilter";
import SiteHeader from "@/components/SiteHeader";
import { resolveLocale, withLocale } from "@/lib/i18n";
import { getPublicPortfolioProjects } from "@/lib/public-portfolio";

export const revalidate = 0;

const services = [
  {
    index: "01",
    title: { ru: "РАЗРАБОТКА", en: "DEVELOPMENT" },
    text: { ru: "Цифровые продукты с точной логикой и характером.", en: "Digital products with precise logic and a point of view." },
    action: { ru: "ОБСУДИТЬ ПРОЕКТ", en: "PLAN A PROJECT" },
    image: "/portfolio/web/luna-protocol-cover.svg",
    icon: Code2,
  },
  {
    index: "02",
    title: { ru: "ИНТЕРФЕЙСЫ", en: "INTERFACES" },
    text: { ru: "Чёткая структура, выразительная система, сильная типографика.", en: "Clear structure, expressive systems, confident typography." },
    action: { ru: "ОБСУДИТЬ ПРОЕКТ", en: "PLAN A PROJECT" },
    image: "/portfolio/web/velvet-flagship-cover.svg",
    icon: Layers3,
  },
  {
    index: "03",
    title: { ru: "ЦИФРОВОЕ ИСКУССТВО", en: "DIGITAL ART" },
    text: { ru: "Персонажи, образы и визуальные миры с собственной мифологией.", en: "Characters, imagery, and visual worlds with their own mythology." },
    action: { ru: "ОБСУДИТЬ ПРОЕКТ", en: "PLAN A PROJECT" },
    image: "/portfolio/art/raven-revenant-cover.svg",
    icon: Paintbrush2,
  },
  {
    index: "04",
    title: { ru: "ВИЗУАЛЬНЫЕ СИСТЕМЫ", en: "VISUAL SYSTEMS" },
    text: { ru: "Айдентика, арт-дирекшн и единый визуальный язык бренда.", en: "Identity, art direction, and a coherent brand language." },
    action: { ru: "ОБСУДИТЬ ПРОЕКТ", en: "PLAN A PROJECT" },
    image: "/portfolio/art/blood-moon-ritual-cover.svg",
    icon: Sparkles,
  },
];

const processSteps = [
  { index: "01", icon: MessageSquare, title: { ru: "ДИАЛОГ", en: "DISCUSS" }, text: { ru: "Сверяем задачу, контекст и то чувство, которое проект должен оставить.", en: "We align on the brief, context, and the feeling the work should leave." } },
  { index: "02", icon: ScanLine, title: { ru: "НАПРАВЛЕНИЕ", en: "DIRECTION" }, text: { ru: "Собираю идею в ясную структуру и визуальную систему.", en: "I shape the idea into a clear structure and visual system." } },
  { index: "03", icon: Braces, title: { ru: "СОЗДАНИЕ", en: "BUILD" }, text: { ru: "Проектирую и собираю решение, внимательно работая с деталями.", en: "I design and build the experience with close attention to detail." } },
  { index: "04", icon: Rocket, title: { ru: "ЗАПУСК", en: "RELEASE" }, text: { ru: "Проверяю результат и передаю готовую работу в жизнь.", en: "I review the result and send the finished work into the world." } },
];

const skills = ["ART DIRECTION", "UI / UX", "NEXT.JS", "REACT", "TYPESCRIPT", "MOTION DESIGN", "DIGITAL ART", "VISUAL IDENTITY"];

export default async function HomePage({ searchParams }: { searchParams?: Promise<{ lang?: string }> }) {
  const params = searchParams ? await searchParams : {};
  const locale = resolveLocale(params.lang);
  const projects = await getPublicPortfolioProjects();
  const t = locale === "ru"
    ? {
        nav: { work: "Работы", about: "Обо мне", contact: "Контакты" },
        status: "ДОСТУПЕН ДЛЯ РАБОТЫ",
        badge: "ХУДОЖНИК / ДИЗАЙНЕР / ВЕБ-РАЗРАБОТЧИК",
        heroTitle: ["Я СОЗДАЮ", "ЦИФРОВЫЕ МИРЫ."],
        heroText: "Проектирую и разрабатываю сайты, в которых ясная структура сочетается с выразительной визуальной подачей.",
        primary: "Смотреть работы",
        secondary: "Обо мне",
        sectionWork: "01 / ИЗБРАННЫЕ ПРОЕКТЫ",
        sectionAbout: "02 / ОБО МНЕ",
        sectionExpertise: "03 / ЭКСПЕРТИЗА",
        sectionContact: "04 / КОНТАКТЫ",
        philosophy: "ФИЛОСОФИЯ",
        philosophyText: ["СОЗДАВАЙ С ЦЕЛЬЮ.", "БЕЙСЯ ЗА ДЕТАЛИ.", "ДЕЛАЙ ВЕЩЬ, КОТОРАЯ ЧУВСТВУЕТСЯ ЖИВОЙ."],
        contactTitle: ["Есть идея?", "Воплотим её в жизнь."],
        contactText: "Открыт к фриланс-проектам, творческим коллаборациям и интересным идеям.",
        cta: "Начать проект",
        email: "Почта",
      }
    : {
        nav: { work: "WORK", about: "ABOUT", contact: "CONTACT" },
        status: "AVAILABLE FOR WORK",
        badge: "ARTIST / DESIGNER / WEB DEVELOPER",
        heroTitle: ["I CREATE", "DIGITAL WORLDS."],
        heroText: "I design and build websites where clear structure meets a distinctive visual point of view.",
        primary: "VIEW PROJECTS",
        secondary: "ABOUT ME",
        sectionWork: "01 / SELECTED WORK",
        sectionAbout: "02 / ABOUT",
        sectionExpertise: "03 / EXPERTISE",
        sectionContact: "04 / CONTACT",
        philosophy: "PHILOSOPHY",
        philosophyText: ["CREATE WITH PURPOSE.", "BE OBSESSED WITH DETAILS.", "MAKE SOMETHING THAT FEELS ALIVE."],
        contactTitle: ["HAVE AN IDEA?", "LET'S BUILD IT."],
        contactText: "Open for freelance projects, creative collaborations and meaningful ideas.",
        cta: "START A PROJECT",
        email: "EMAIL",
      };

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#050505] text-[#f5f5f5]">
      <CustomCursor />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_16%_8%,rgba(200,16,46,0.18),transparent_31%),radial-gradient(circle_at_bottom_right,rgba(255,26,77,0.06),transparent_25%)]" />

      <SiteHeader />

      <section className="relative mx-auto max-w-7xl px-5 pb-12 pt-8 sm:px-8 sm:pb-16 sm:pt-12 lg:px-10 lg:pb-24 lg:pt-20">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-8 lg:gap-12">
          <div className="space-y-8 lg:pb-8">
            <p className="inline-flex items-center gap-3 border-l-2 border-[#c8102e] bg-white/[0.035] px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.32em] text-[#c8c2c3] sm:text-[10px]">
              <span className="h-2 w-2 bg-[#c8102e]" />
              {t.badge}
            </p>

            <div className="space-y-4">
              <h1 className="max-w-5xl text-[clamp(2.8rem,7.4vw,7.2rem)] font-black uppercase leading-[0.8] tracking-[-0.085em] text-[#f5f2f1]">
                <span className="block">{t.heroTitle[0]}</span>
                <span className="mt-3 block text-[#c8102e]">{t.heroTitle[1]}</span>
              </h1>
              <p className="max-w-xl text-base leading-7 text-[#b5b5b5] sm:text-lg">
                {t.heroText}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href={withLocale("/work", locale)}
                className="inline-flex items-center gap-3 bg-[#c8102e] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.23em] text-[#fff] transition hover:bg-[#ed1739]"
              >
                {t.primary}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={withLocale("/about", locale)}
                className="inline-flex items-center gap-3 border border-white/20 bg-transparent px-6 py-4 text-[10px] font-bold uppercase tracking-[0.23em] text-[#f5f5f5] transition hover:border-[#c8102e] hover:text-[#ffb3c7]"
              >
                {t.secondary}
              </Link>
            </div>
          </div>

          <HeroPortrait locale={locale} />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex items-center gap-4 border-y border-white/10 py-4 text-[9px] font-semibold uppercase tracking-[0.28em] text-white/45 sm:text-[10px]">
          <span className="h-2 w-2 bg-[#c8102e]" />
          <span>{locale === "ru" ? "НЕЗАВИСИМАЯ ТВОРЧЕСКАЯ ПРАКТИКА" : "INDEPENDENT CREATIVE PRACTICE"}</span>
          <span className="ml-auto text-right">{locale === "ru" ? "ОТ ИДЕИ ДО РЕАЛИЗАЦИИ" : "CONCEPT TO REALITY"}</span>
        </div>
      </div>

      <section id="about" className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#ff526f]">01 / {locale === "ru" ? "ОБО МНЕ" : "ABOUT ME"}</p>
          <span className="text-[8px] uppercase tracking-[0.28em] text-white/35">{locale === "ru" ? "ЧЕЛОВЕК × ТЕХНОЛОГИИ" : "HUMAN × TECHNOLOGY"}</span>
        </div>
        <div className="grid overflow-hidden border border-white/10 bg-[#090909] lg:grid-cols-[0.78fr_1.22fr]">
          <div className="relative z-10 flex flex-col justify-center p-6 sm:p-9 lg:p-11">
            <h2 className="text-3xl font-black uppercase leading-[0.92] tracking-[-0.065em] sm:text-5xl">{locale === "ru" ? <>ИДЕЯ.<br /><span className="text-[#c8102e]">АТМОСФЕРА.</span><br />ТОЧНОСТЬ.</> : <>IDEA.<br /><span className="text-[#c8102e]">ATMOSPHERE.</span><br />INTENT.</>}</h2>
            <p className="mt-6 max-w-lg text-sm leading-7 text-white/65 sm:text-base sm:leading-8">{locale === "ru" ? "Я соединяю цифровое искусство, дизайн и разработку, чтобы создавать цельные миры — от первого эскиза до работающего сайта." : "I bring digital art, design, and development together to create complete worlds — from the first sketch to a living website."}</p>
            <p className="mt-4 max-w-lg border-l border-[#c8102e] pl-4 text-xs leading-6 text-white/45 sm:text-sm">{locale === "ru" ? "Каждый проект начинается с идеи и становится выразительным через детали." : "Every project begins with an idea and becomes distinctive through its details."}</p>
            <Link href={withLocale("/about", locale)} className="mt-7 inline-flex min-h-11 w-fit items-center gap-4 border border-white/20 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.2em] transition hover:border-[#c8102e] hover:bg-[#c8102e]/10">{locale === "ru" ? "БОЛЬШЕ ОБО МНЕ" : "MORE ABOUT ME"}<ArrowRight className="h-4 w-4 text-[#ff526f]" /></Link>
          </div>
          <div className="group relative min-h-[270px] overflow-hidden border-t border-white/10 bg-[#10090b] sm:min-h-[380px] lg:min-h-[460px] lg:border-l lg:border-t-0">
            <Image src="/portfolio/art/raven-revenant-final.svg" alt="" fill sizes="(max-width: 1024px) 100vw, 62vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-[#090909]/60 via-transparent to-black/20" />
            <span className="absolute bottom-4 left-4 border border-white/25 bg-black/55 px-3 py-2 font-mono text-[8px] tracking-[0.18em] text-white/65 backdrop-blur sm:bottom-6 sm:left-6">NOCTIS / VISUAL STUDY 001</span>
            <span aria-hidden="true" className="absolute right-5 top-5 h-8 w-8 border-r border-t border-[#ff526f]/70 sm:right-7 sm:top-7 sm:h-12 sm:w-12" />
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mb-6 flex items-end justify-between gap-5 border-b border-white/10 pb-4">
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#ff526f]">02 / {locale === "ru" ? "УСЛУГИ" : "SERVICES"}</p><h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.06em] sm:text-5xl">{locale === "ru" ? "ЧТО Я СОЗДАЮ" : "WHAT I CREATE"}</h2></div>
          <span className="hidden text-[8px] uppercase tracking-[0.28em] text-white/35 sm:block">{locale === "ru" ? "ИДЕЯ → РЕАЛЬНОСТЬ" : "IDEA → REALITY"}</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return <Link key={service.index} href={withLocale("/contact", locale)} className="group relative flex min-h-[280px] flex-col justify-between overflow-hidden border border-white/10 bg-[#090909] p-4 transition-colors hover:border-[#c8102e]/70 sm:min-h-[330px] sm:p-5">
              <Image src={service.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw" className="object-cover opacity-45 transition duration-700 group-hover:scale-105 group-hover:opacity-65" />
              <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/35 to-[#050505]/15" />
              <div className="relative flex items-center justify-between"><span className="font-mono text-[10px] tracking-[0.2em] text-white/55">{service.index} / 04</span><Icon aria-hidden="true" className="h-5 w-5 text-[#ff526f]" /></div>
              <div className="relative"><h3 className="text-xl font-black uppercase leading-none tracking-[-0.04em] text-white sm:text-2xl">{service.title[locale]}</h3><p className="mt-3 max-w-xs text-xs leading-6 text-white/65">{service.text[locale]}</p><span className="mt-5 flex items-center justify-between border-t border-white/20 pt-3 text-[8px] font-semibold uppercase tracking-[0.19em] text-white/55 transition group-hover:text-white"><span>{service.action[locale]}</span><ArrowUpRight className="h-4 w-4 text-[#ff526f] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span></div>
            </Link>;
          })}
        </div>
      </section>

      <section id="work" className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mb-6 flex items-end justify-between gap-5 border-b border-white/10 pb-4">
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#ff526f]">03 / {locale === "ru" ? "ИЗБРАННЫЕ РАБОТЫ" : "SELECTED WORK"}</p><h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.06em] sm:text-5xl">{locale === "ru" ? "ПРОЕКТЫ" : "PROJECTS"}</h2></div>
          <Link href={withLocale("/work", locale)} className="hidden min-h-10 items-center gap-2 border border-white/15 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/65 transition hover:border-[#c8102e] hover:text-white sm:inline-flex">{locale === "ru" ? "ВСЕ ПРОЕКТЫ" : "ALL PROJECTS"}<ArrowUpRight className="h-4 w-4 text-[#ff526f]" /></Link>
        </div>
        <ProjectFilter projects={projects} />
        <Link href={withLocale("/work", locale)} className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-3 border border-white/15 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/65 transition hover:border-[#c8102e] hover:text-white sm:hidden">{locale === "ru" ? "СМОТРЕТЬ ВСЕ ПРОЕКТЫ" : "VIEW ALL PROJECTS"}<ArrowUpRight className="h-4 w-4 text-[#ff526f]" /></Link>
      </section>

      <section id="process" className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mb-7 flex items-end justify-between gap-5 border-b border-white/10 pb-4"><div><p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#ff526f]">04 / {locale === "ru" ? "ПРОЦЕСС" : "WORK PROCESS"}</p><h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.06em] sm:text-5xl">{locale === "ru" ? "ОТ ИДЕИ ДО ЗАПУСКА" : "FROM IDEA TO RELEASE"}</h2></div><span className="hidden text-[8px] uppercase tracking-[0.28em] text-white/35 sm:block">{locale === "ru" ? "ПОНЯТНО. СОБРАННО. ВОВРЕМЯ." : "CLEAR. CONSIDERED. ON TIME."}</span></div>
        <ol className="grid border-y border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => { const Icon = step.icon; return <li key={step.index} className={`group relative border-white/10 py-5 sm:px-5 sm:py-6 lg:px-6 ${index > 0 ? "border-t sm:border-t-0" : ""} ${index % 2 === 1 ? "sm:border-l" : ""} ${index > 1 ? "lg:border-l" : ""}`}><div className="flex items-center justify-between"><span className="font-mono text-sm text-[#ff526f]">{step.index}</span><Icon aria-hidden="true" className="h-5 w-5 text-white/45 transition-colors group-hover:text-[#ff526f]" /></div><h3 className="mt-5 text-sm font-bold uppercase tracking-[0.12em]">{step.title[locale]}</h3><p className="mt-2 max-w-xs text-xs leading-6 text-white/50">{step.text[locale]}</p><span aria-hidden="true" className="absolute bottom-0 left-0 h-px w-0 bg-[#c8102e] transition-all duration-500 group-hover:w-full" /></li>; })}
        </ol>
      </section>

      <section id="expertise" className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mb-6 flex items-end justify-between gap-5 border-b border-white/10 pb-4"><div><p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#ff526f]">05 / {locale === "ru" ? "НАВЫКИ И ИНСТРУМЕНТЫ" : "SKILLS & TOOLS"}</p><h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.06em] sm:text-5xl">{locale === "ru" ? "АРТ × ТЕХНОЛОГИИ" : "ART × TECHNOLOGY"}</h2></div><span className="hidden text-[8px] uppercase tracking-[0.28em] text-white/35 sm:block">{locale === "ru" ? "СОЗДАЮ НА СТЫКЕ ДИСЦИПЛИН" : "BUILT BETWEEN DISCIPLINES"}</span></div>
        <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="grid grid-cols-2 border-l border-t border-white/10 sm:grid-cols-4">{skills.map((skill, index) => <div key={skill} className="group flex min-h-24 flex-col justify-between border-b border-r border-white/10 bg-[#080808] p-3 transition-colors hover:bg-[#c8102e]/10 sm:min-h-28 sm:p-4"><span className="font-mono text-[8px] text-white/35">0{index + 1}</span><span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-white/75 transition-colors group-hover:text-white sm:text-[10px]">{skill}</span></div>)}</div>
          <div className="relative flex min-h-52 flex-col justify-end overflow-hidden border border-[#c8102e]/25 bg-[radial-gradient(ellipse_at_75%_20%,rgba(200,16,46,0.28),transparent_50%),linear-gradient(135deg,#10090b,#050505)] p-5 sm:min-h-60 sm:p-7"><span aria-hidden="true" className="absolute -right-6 -top-16 font-serif text-[17rem] italic leading-none text-white/[0.035]">N</span><p className="relative text-[8px] font-semibold uppercase tracking-[0.28em] text-[#ff526f]">{locale === "ru" ? "РАБОЧИЙ ПРИНЦИП" : "WORKING PRINCIPLE"}</p><p className="relative mt-3 max-w-sm text-xl font-semibold uppercase leading-[1.05] tracking-[-0.04em] sm:text-2xl">{locale === "ru" ? "ЧЕЛОВЕЧЕСКИЙ МАСШТАБ. ЦИФРОВАЯ ТОЧНОСТЬ." : "HUMAN SCALE. DIGITAL PRECISION."}</p><span className="relative mt-5 inline-flex items-center gap-2 font-mono text-[8px] tracking-[0.18em] text-white/45"><span className="h-1.5 w-1.5 rounded-full bg-[#ff1a4d] shadow-[0_0_12px_#ff1a4d]" />NOCTIS RAVEN / 2026</span></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-8 sm:pb-24 sm:pt-12 lg:px-10">
        <div className="border border-white/10 bg-[#0a0a0a]/80 p-5 sm:p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-[11px] uppercase tracking-[0.42em] text-[#a1a1a1]">{t.sectionContact}</p>
            </div>
            <div>
              <h3 className="text-4xl font-medium uppercase tracking-[-0.06em] text-[#f5f5f5] sm:text-5xl">
                {t.contactTitle[0]}
                <br />
                {t.contactTitle[1]}
              </h3>
              <p className="mt-4 max-w-xl text-base leading-8 text-[#a1a1a1]">{t.contactText}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={withLocale("/contact", locale)} className="inline-flex items-center gap-3 bg-[#b3002d] px-6 py-3 text-[11px] uppercase tracking-[0.28em] text-[#f5f5f5] transition hover:bg-[#ff1a4d]">
                  {t.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="mailto:raven4noctis@gmail.com" className="inline-flex items-center gap-3 border border-white/10 px-6 py-3 text-[11px] uppercase tracking-[0.28em] text-[#f5f5f5] transition hover:border-[#ff1a4d]/60 hover:text-[#ffb3c7]">
                  <Mail className="h-4 w-4" />
                  {t.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#050505]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-[10px] uppercase tracking-[0.28em] text-[#a1a1a1] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p className="flex items-center gap-3"><BrandMark compact /> <span className="text-white/35">© 2026</span></p>
          <div className="flex flex-wrap gap-4 text-[#d8d8d8]">
            <a href="https://t.me/noctisraven" target="_blank" rel="noreferrer">Telegram</a>
            <a href="https://vk.com/noctisraven" target="_blank" rel="noreferrer">VK</a>
            <a href="https://github.com/noctisraven" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://instagram.com/noctisraven" target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
