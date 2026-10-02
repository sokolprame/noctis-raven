"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Feather, Home, LayoutGrid, Briefcase, User, MessageCircle } from "lucide-react";

const sideLinks = [
  { label: "Главная", href: "#home", icon: Home },
  { label: "Портфолио", href: "/work", icon: LayoutGrid },
  { label: "Услуги", href: "#services", icon: Briefcase },
  { label: "Обо мне", href: "#about", icon: User },
  { label: "Записи", href: "#feed", icon: MessageCircle },
];

const heroCards = [
  { title: "ООО «2 Культуры»", subtitle: "Сайт-каталог", icon: LayoutGrid },
  { title: "Светлая память", subtitle: "Страница памяти", icon: Feather },
];

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,160,173,0.11),transparent_28%),linear-gradient(180deg,#0b0b0d_0%,#101014_100%)]" />
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute left-1/4 top-12 h-0.5 w-40 bg-[#ff1a4d]/30 blur-sm" />
        <span className="absolute right-20 top-64 h-0.5 w-28 bg-[#ff1a4d]/20 blur-sm" />
        <span className="absolute left-10 bottom-28 h-0.5 w-32 bg-[#ff1a4d]/20 blur-sm" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-96px)] max-w-[1600px] items-center px-6 py-24 sm:px-8 lg:px-10">
        <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.28fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="rounded-3xl border border-white/10 bg-[#151418]/90 p-10 shadow-[0_32px_90px_rgba(0,0,0,0.3)] backdrop-blur-xl">
              <p className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#d8a0ad]/25 bg-[#21191e]/80 px-4 py-2 text-xs uppercase tracking-[0.4em] text-[#d8a0ad] sm:text-sm">
                Тёмная студийная идентичность • цифровая алхимия
              </p>
              <h1 className="text-5xl font-semibold uppercase tracking-[0.24em] text-[#f8f5f5] sm:text-6xl lg:text-7xl">
                NOCTIS RAVEN
              </h1>
              <p className="mt-6 text-sm uppercase tracking-[0.35em] text-[#aaa3a7] sm:text-base">
                Арт • Дизайн • Код
              </p>
              <p className="mt-8 max-w-2xl text-lg leading-9 text-[#d7d2d9] sm:text-xl">
                Создаю персонажей, миры и цифровые впечатления с премиальной тёмной фэнтези атмосферой и киберпанковым акцентом.
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {heroCards.map((card) => (
                  <div key={card.title} className="rounded-3xl border border-white/10 bg-[#09090f]/85 p-5 text-sm text-[#d7d2d9]">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-[#1b111a]/90 text-[#ff1a4d] shadow-[0_0_24px_rgba(255,26,77,0.15)]">
                      <card.icon className="h-5 w-5" />
                    </div>
                    <p className="font-semibold text-[#f8f5f5]">{card.title}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.35em] text-[#8f8a91]">{card.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/work"
                className="inline-flex items-center justify-center gap-3 rounded-3xl border border-[#ff1a4d]/15 bg-[#11070d]/90 px-6 py-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#ff1a4d] transition hover:border-[#ff1a4d]/30 hover:bg-[#12030c]"
              >
                Перейти в портфолио
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-3 rounded-3xl border border-white/10 bg-[#0c0b10]/95 px-6 py-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#f8f5f5] transition hover:border-[#ff1a4d]/30 hover:bg-[#12030c]"
              >
                Написать мне
                <Feather className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="hidden rounded-3xl border border-white/10 bg-[#151418]/90 p-6 shadow-[0_32px_90px_rgba(0,0,0,0.3)] backdrop-blur-xl lg:block"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-[#8f8a91]">Навигация</p>
            <div className="mt-6 space-y-3">
              {sideLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  className="group flex items-center justify-between rounded-3xl border border-white/10 bg-[#09090f]/80 px-4 py-4 text-sm text-[#d7d2d9] transition hover:border-[#ff1a4d]/30 hover:bg-[#12030c]"
                >
                  <span className="inline-flex items-center gap-3">
                    <Icon className="h-4 w-4 text-[#ff1a4d]" />
                    <span>{label}</span>
                  </span>
                  <span className="text-[#8f8a91]">→</span>
                </a>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
