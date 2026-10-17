import Link from "next/link";
import { ArrowRight, ArrowUpRight, Circle, Mail } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import CustomCursor from "@/components/CustomCursor";
import HeroPortrait from "@/components/HeroPortrait";
import ProjectFilter from "@/components/ProjectFilter";
import SiteHeader from "@/components/SiteHeader";
import { resolveLocale, withLocale } from "@/lib/i18n";

const expertise = [
  {
    label: "DESIGN",
    items: ["UI/UX", "Visual Design", "Branding", "Typography", "Art Direction"],
  },
  {
    label: "DEVELOPMENT",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Python", "Django", "Tailwind CSS", "Framer Motion"],
  },
  {
    label: "ART",
    items: ["Digital Illustration", "Concept Art", "Character Design", "Portraits", "Visual Experiments"],
  },
];

const services = [
  {
    index: "01",
    title: "WEB DEVELOPMENT",
    list: ["Landing pages", "Portfolio websites", "Interactive websites", "Full-stack applications"],
  },
  {
    index: "02",
    title: "DESIGN",
    list: ["UI/UX", "Visual identity", "Web design", "Creative direction"],
  },
  {
    index: "03",
    title: "DIGITAL ART",
    list: ["Illustrations", "Portraits", "Character art", "Custom artwork"],
  },
];

export default async function HomePage({ searchParams }: { searchParams?: Promise<{ lang?: string }> }) {
  const params = searchParams ? await searchParams : {};
  const locale = resolveLocale(params.lang);
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

      <section id="work" className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <div className="mb-10 flex items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.42em] text-[#a1a1a1]">{t.sectionWork}</p>
            <h2 className="mt-4 text-4xl font-medium uppercase tracking-[-0.06em] text-[#f5f5f5] sm:text-5xl">{locale === "ru" ? "ПРОЕКТЫ" : "PROJECTS"}</h2>
          </div>
          <Link href={withLocale("/work", locale)} className="hidden items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[#ff1a4d] md:inline-flex">
            {locale === "ru" ? "Показать все" : "VIEW ALL"} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <ProjectFilter />
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <p className="text-[11px] uppercase tracking-[0.42em] text-[#a1a1a1]">{t.sectionAbout}</p>
            <h2 className="text-4xl font-medium uppercase tracking-[-0.06em] text-[#f5f5f5] sm:text-5xl">
              {t.heroTitle[0] === "I CREATE" ? "I DESIGN." : "Я ДИЗАЙНИРУЮ."}
              <br />
              {t.heroTitle[0] === "I CREATE" ? "I DRAW." : "Я РИСУЮ."}
              <br />
              {t.heroTitle[0] === "I CREATE" ? "I BUILD." : "Я СТРОЮ."}
            </h2>
          </div>

          <div className="space-y-6 text-[#d2d2d2]">
            <p className="max-w-2xl text-lg leading-8 text-[#d4d4d4]">
              {locale === "ru"
                ? "Я работаю на стыке цифрового искусства и продуктового дизайна. Мои проекты создаются через атмосферу, детали и ясную идею."
                : "I work at the boundary between digital art and product design. My projects are shaped by atmosphere, detail, craft, and clear intent."}
            </p>
            <p className="max-w-2xl text-base leading-8 text-[#a1a1a1]">
              {locale === "ru"
                ? "От иллюстраций и визуальных систем до интерактивных веб-сайтов и премиальных лендингов — я создаю работу, которая ощущается личной, точной и живой."
                : "From character studies and visual identities to interactive storefronts and premium landing pages, I build work that feels personal, precise, and alive."}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <div className="mb-8 flex items-end justify-between gap-6 border-b border-white/10 pb-6">
          <p className="text-[11px] uppercase tracking-[0.42em] text-[#a1a1a1]">{t.sectionExpertise}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {expertise.map((group) => (
            <div key={group.label} className="border border-white/10 bg-[#0a0a0a]/80 p-6">
              <p className="border-b border-white/10 pb-4 text-[11px] font-bold uppercase tracking-[0.38em] text-[#ed1739]">{group.label}</p>
              <ul className="mt-6 space-y-3 text-sm text-[#d8d8d8]">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 border-b border-white/5 pb-2 last:border-b-0 last:pb-0">
                    <Circle className="h-2.5 w-2.5 fill-[#ff1a4d] text-[#ff1a4d]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <div className="mb-8 border-b border-white/10 pb-6">
          <p className="text-[11px] uppercase tracking-[0.42em] text-[#a1a1a1]">{locale === "ru" ? "УСЛУГИ" : "SERVICES"}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.index} className="border border-white/10 bg-[#0a0a0a]/80 p-6">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.35em] text-[#a1a1a1]">{service.index}</span>
                <span className="ml-4 h-px flex-1 bg-white/10" />
              </div>
              <h3 className="text-2xl font-medium uppercase tracking-[-0.04em] text-[#f5f5f5]">{service.title}</h3>
              <ul className="mt-6 space-y-3 text-sm text-[#d4d4d4]">
                {service.list.map((item) => (
                  <li key={item} className="flex items-start gap-3 border-t border-white/5 pt-3 first:border-t-0 first:pt-0">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#ff1a4d]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <div className="relative overflow-hidden border border-white/10 bg-[linear-gradient(135deg,rgba(200,16,46,0.12),rgba(255,255,255,0.01))] p-8 md:p-12">
            <span aria-hidden="true" className="absolute -right-8 -top-16 select-none text-[15rem] font-black leading-none text-white/[0.025]">N</span>
          <p className="text-[11px] uppercase tracking-[0.42em] text-[#a1a1a1]">{t.philosophy}</p>
          <h3 className="mt-8 max-w-4xl text-4xl font-medium uppercase tracking-[-0.06em] text-[#f5f5f5] sm:text-5xl lg:text-6xl">
            {t.philosophyText.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h3>
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
