import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Github, Instagram, Mail, Send } from "lucide-react";
import Footer from "@/components/Footer";
import HeroPortrait from "@/components/HeroPortrait";
import SiteHeader from "@/components/SiteHeader";
import ContactSection from "@/components/ContactSection";
import { resolveLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Связаться с NOCTIS RAVEN по поводу веб-дизайна, разработки или цифрового искусства.",
};

const contacts = [
  { label: "Telegram", value: "@noctisraven", href: "https://t.me/noctisraven", icon: Send },
  { label: "Instagram", value: "@noctisraven", href: "https://instagram.com/noctisraven", icon: Instagram },
  { label: "GitHub", value: "noctisraven", href: "https://github.com/noctisraven", icon: Github },
];

export default async function ContactPage({ searchParams }: { searchParams?: Promise<{ lang?: string }> }) {
  const params = searchParams ? await searchParams : {};
  const locale = resolveLocale(params.lang);
  const isRu = locale === "ru";

  return (
    <main className="min-h-screen bg-[#050505] text-[#f5f5f5]">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-5 pb-12 pt-7 sm:px-8 sm:pb-16 sm:pt-10 lg:px-10">
        <p className="mb-5 text-[9px] font-medium uppercase tracking-[0.34em] text-white/45 sm:mb-7 sm:text-[10px]">
          {isRu ? "КОНТАКТЫ / NOCTIS RAVEN" : "CONTACT / NOCTIS RAVEN"}
        </p>

        <section className="grid grid-cols-1 items-center gap-3 md:grid-cols-[0.9fr_1.1fr] md:gap-7 lg:gap-12" aria-labelledby="contact-title">
          <div className="flex min-w-0 flex-col justify-center py-2 sm:py-4">
            <p className="mb-3 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/55 sm:mb-4 sm:text-[10px] sm:tracking-[0.28em]">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#d20a31]" />
              {isRu ? "ОТКРЫТ К СОТРУДНИЧЕСТВУ" : "AVAILABLE FOR PROJECTS"}
            </p>
            <h1 id="contact-title" className="text-[clamp(2.65rem,9vw,5.7rem)] font-black uppercase leading-[0.82] tracking-[-0.075em]">
              {isRu ? <><span className="block">ДАВАЙТЕ</span><span className="block text-[#d20a31]">ОБСУДИМ.</span></> : <><span className="block">LET&apos;S</span><span className="block text-[#d20a31]">TALK.</span></>}
            </h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/60 sm:mt-5 sm:text-base sm:leading-7">
              {isRu
                ? "Есть идея для сайта, дизайна или арт-проекта? Напишите — обсудим задачу и следующий шаг."
                : "Have an idea for a website, design, or art project? Tell me about it and we’ll find the next step."}
            </p>
            <a href="#contact-form" className="mt-5 inline-flex min-h-12 w-fit items-center gap-3 bg-[#c8102e] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] transition hover:bg-[#ed1739] sm:mt-6 sm:px-6 sm:text-[11px]">
              {isRu ? "НАПИСАТЬ МНЕ" : "SEND A MESSAGE"}<ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[400px] min-w-0 md:aspect-[1.08/1] md:max-w-none md:h-[330px] lg:h-[410px]">
            <HeroPortrait locale={locale} compact />
          </div>
        </section>

        <section className="mt-8 grid border border-white/15 bg-[#080808] lg:grid-cols-[1.1fr_0.9fr] sm:mt-10" aria-label={isRu ? "Форма и контакты" : "Message form and contact details"}>
          <div className="p-5 sm:p-7 lg:p-9">
            <div className="mb-5 border-b border-white/10 pb-4 sm:mb-6 sm:pb-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] sm:text-[11px] sm:tracking-[0.32em]">{isRu ? "ОТПРАВИТЬ СООБЩЕНИЕ" : "SEND US A MESSAGE"}</p>
              <p className="mt-2 text-xs text-white/50 sm:text-sm">{isRu ? "Расскажите, над чем хотите поработать." : "Tell me what you would like to work on."}</p>
            </div>
            <ContactSection locale={locale} />
          </div>

          <aside className="border-t border-white/10 bg-white/[0.015] p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-9">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] sm:text-[11px] sm:tracking-[0.32em]">{isRu ? "НА СВЯЗИ" : "GET IN TOUCH"}</p>
            <p className="mt-2 text-xs text-white/50 sm:text-sm">{isRu ? "Выберите удобный способ связаться." : "Choose the channel that works best for you."}</p>

            <a href="mailto:raven4noctis@gmail.com" className="group mt-5 flex min-h-16 items-center gap-3 border-t border-white/10 py-4 sm:mt-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c8102e]/50 text-[#ed1739]"><Mail className="h-4 w-4" /></span>
              <span className="min-w-0 flex-1">
                <span className="block text-[9px] font-semibold uppercase tracking-[0.18em] text-white/80 sm:text-[10px]">EMAIL</span>
                <span className="mt-1 block truncate text-xs text-white/50 sm:text-sm">raven4noctis@gmail.com</span>
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#c8102e] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <div className="border-t border-white/10 pt-4 sm:pt-5">
              <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/55 sm:text-[10px]">{isRu ? "СОЦСЕТИ" : "SOCIAL MEDIA"}</p>
              <div className="grid gap-2">
                {contacts.map(({ label, value, href, icon: Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className="group flex min-h-10 items-center gap-3 py-1 text-xs text-white/65 transition hover:text-white sm:text-sm">
                    <Icon className="h-4 w-4 text-white/45 transition group-hover:text-[#ed1739]" />
                    <span className="flex-1">{label}</span>
                    <span className="text-white/40">{value}</span>
                    <ArrowUpRight className="h-4 w-4 text-[#c8102e]" />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-5 grid gap-4 sm:mt-6 sm:gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative overflow-hidden border border-white/10 bg-[#0a0909] p-5 sm:p-7 lg:p-8">
            <span aria-hidden="true" className="absolute -right-8 -top-9 h-28 w-28 rounded-full border border-[#c8102e]/20" />
            <span aria-hidden="true" className="absolute -right-2 -top-3 h-16 w-16 rounded-full border border-[#c8102e]/25" />
            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#ed1739] sm:text-[10px]">{isRu ? "ПЕРЕД СТАРТОМ" : "BEFORE WE START"}</p>
            <h2 className="mt-3 max-w-sm text-xl font-bold uppercase leading-tight tracking-[-0.04em] sm:text-2xl">{isRu ? "ПАРА СЛОВ О ВАШЕЙ ИДЕЕ — И МЫ НАЧНЁМ." : "A FEW WORDS ABOUT YOUR IDEA — AND WE CAN BEGIN."}</h2>
            <p className="mt-3 max-w-sm text-xs leading-6 text-white/55 sm:mt-4 sm:text-sm">{isRu ? "Опишите цель, что уже готово и какой результат вы хотите получить. Ссылки и референсы помогут быстрее понять задачу." : "Share the goal, what you already have, and the result you’re looking for. Links and references help me understand the brief."}</p>
          </div>

          <div className="border border-white/10 bg-[#080808] p-5 sm:p-7 lg:p-8">
            <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/75 sm:mb-4 sm:text-[10px]">FAQ / {isRu ? "ВОПРОСЫ" : "QUICK QUESTIONS"}</p>
            <details className="group border-t border-white/10 py-4" open>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-xs font-medium text-white/80 sm:text-sm">{isRu ? "С какими задачами можно обратиться?" : "What kind of projects can I ask about?"}<span className="text-[#ed1739] transition group-open:rotate-45">＋</span></summary>
              <p className="mt-2 max-w-2xl text-xs leading-5 text-white/50 sm:text-sm sm:leading-6">{isRu ? "Веб-дизайн и разработка, цифровой брендинг, иллюстрация и визуальные концепции." : "Web design and development, digital branding, illustration, and visual concepts."}</p>
            </details>
            <details className="group border-t border-white/10 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-xs font-medium text-white/80 sm:text-sm">{isRu ? "Что написать в первом сообщении?" : "What should I include in my first message?"}<span className="text-[#ed1739] transition group-open:rotate-45">＋</span></summary>
              <p className="mt-2 max-w-2xl text-xs leading-5 text-white/50 sm:text-sm sm:leading-6">{isRu ? "Коротко опишите идею, сроки и ссылки на материалы или примеры, которые вам нравятся." : "Briefly describe the idea, timing, and any links or examples that capture what you have in mind."}</p>
            </details>
            <details className="group border-t border-white/10 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-xs font-medium text-white/80 sm:text-sm">{isRu ? "Как удобнее связаться?" : "What’s the best way to get in touch?"}<span className="text-[#ed1739] transition group-open:rotate-45">＋</span></summary>
              <p className="mt-2 max-w-2xl text-xs leading-5 text-white/50 sm:text-sm sm:leading-6">{isRu ? "Отправьте заявку через форму или напишите в Telegram или на почту." : "Use the form, Telegram, or email—whichever is easiest for you."}</p>
            </details>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
