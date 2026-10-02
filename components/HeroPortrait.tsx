"use client";

import type { Locale } from "@/lib/i18n";
import PixelReveal from "@/components/PixelReveal";

export default function HeroPortrait({ locale }: { locale: Locale }) {
  const ru = locale === "ru";

  return (
    <div className="relative mx-auto w-full max-w-md perspective-[1000px] lg:ml-auto">
      <div className="group relative aspect-4/5 overflow-hidden rounded-4xl border border-white/10 bg-[#100b0d] shadow-[0_40px_120px_rgba(0,0,0,0.55)] transform-3d">
        <div className="absolute -inset-10 bg-[radial-gradient(ellipse_at_50%_45%,rgba(179,0,45,0.24),transparent_65%)] blur-2xl" />
        <PixelReveal locale={locale} />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/10 to-black/5" />
        <div className="absolute inset-4 rounded-[calc(var(--radius-4xl)-1rem)] border border-white/15"/>
        <div className="absolute left-7 top-7 flex items-center gap-3 text-[9px] uppercase tracking-[0.32em] text-white/70 sm:left-9 sm:top-9">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff1a4d] shadow-[0_0_14px_rgba(255,26,77,0.9)]" />
          {ru ? "ДИЗАЙН · КОД · ИСКУССТВО" : "DESIGN · CODE · ART"}
        </div>
        <div className="absolute inset-x-8 bottom-8 flex items-end justify-between sm:inset-x-10 sm:bottom-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/60">NOCTIS RAVEN</p>
            <p className="mt-2 text-2xl font-medium uppercase tracking-[-0.04em] text-white sm:text-3xl">
              {ru ? "Создаю цифровое." : "Made with intent."}
            </p>
          </div>
          <span className="mb-1 hidden text-[9px] uppercase tracking-[0.28em] text-white/50 sm:block">01 — 02</span>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute -right-3 top-[18%] h-16 w-16 rounded-full border border-[#ff1a4d]/30 shadow-[0_0_45px_rgba(179,0,45,0.2)] sm:-right-6" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-5 -left-5 h-20 w-20 rounded-full border border-white/10 bg-black/20 backdrop-blur-sm" />
    </div>
  );
}
