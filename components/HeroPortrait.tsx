"use client";

import type { Locale } from "@/lib/i18n";
import PixelReveal from "@/components/PixelReveal";

export default function HeroPortrait({ locale }: { locale: Locale }) {
  const ru = locale === "ru";

  return (
    <div className="relative mx-auto w-[88%] max-w-md perspective-[1000px] sm:w-full lg:ml-auto">
      <div className="hero-glitch-shell group relative ы overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#100b0d] shadow-[0_40px_120px_rgba(0,0,0,0.55)] transform-3d sm:rounded-4xl">
        <div className="absolute -inset-8 bg-[radial-gradient(ellipse_at_50%_45%,rgba(179,0,45,0.24),transparent_65%)] blur-2xl sm:-inset-10" />
        <PixelReveal locale={locale} />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/10 to-black/5" />
        <div className="absolute inset-3 rounded-[calc(1.75rem-0.75rem)] border border-white/15 sm:inset-4 sm:rounded-[calc(var(--radius-4xl)-1rem)]" />
        <div className="absolute left-4 top-4 flex items-center gap-2 text-[7px] uppercase tracking-[0.26em] text-white/70 sm:left-7 sm:top-7 sm:gap-3 sm:text-[9px] sm:tracking-[0.32em]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff1a4d] shadow-[0_0_14px_rgba(255,26,77,0.9)]" />
          {ru ? "ДИЗАЙН · КОД · ИСКУССТВО" : "DESIGN · CODE · ART"}
        </div>
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between sm:inset-x-8 sm:bottom-8 lg:inset-x-10 lg:bottom-10">
          <div>
            <p className="text-[8px] uppercase tracking-[0.34em] text-white/60 sm:text-[10px] sm:tracking-[0.4em]">NOCTIS RAVEN</p>
            <p className="mt-2 text-xl font-medium uppercase tracking-[-0.04em] text-white sm:text-2xl lg:text-3xl">
              {ru ? "Создаю цифровое." : "Made with intent."}
            </p>
          </div>
          <span className="mb-1 hidden text-[9px] uppercase tracking-[0.28em] text-white/50 sm:block">01 — 02</span>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute -right-2 top-[18%] h-12 w-12 rounded-full border border-[#ff1a4d]/30 shadow-[0_0_45px_rgba(179,0,45,0.2)] sm:-right-3 sm:h-16 sm:w-16 lg:-right-6" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-4 -left-4 h-14 w-14 rounded-full border border-white/10 bg-black/20 backdrop-blur-sm sm:-bottom-5 sm:-left-5 sm:h-20 sm:w-20" />
    </div>
  );
}
