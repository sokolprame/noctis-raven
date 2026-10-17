"use client";

import type { Locale } from "@/lib/i18n";
import PixelReveal from "@/components/PixelReveal";

export default function HeroPortrait({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const ru = locale === "ru";

  return (
    <div className={`relative isolate w-full ${compact ? "h-full min-h-[250px]" : "aspect-[0.86] lg:ml-auto"}`}>
      <div className="absolute inset-[2%] rounded-[50%] border border-[#c8102e]/55" />
      <div className="absolute inset-[7%] rounded-[50%] border border-dashed border-white/15" />
      <div className="absolute -right-[2%] top-[22%] h-20 w-20 rounded-full bg-[#c8102e]/20 blur-3xl sm:h-28 sm:w-28" />

      <div className="group absolute inset-[5%] overflow-hidden bg-[#100b0d] shadow-[0_35px_100px_rgba(0,0,0,0.6)] [clip-path:ellipse(47%_49%_at_50%_50%)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(179,0,45,0.28),transparent_67%)]" />
        <PixelReveal locale={locale} variant={compact ? "contact" : "home"} />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-black/10" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[11] cyber-glitch-overlay" />

        <div className={`absolute left-[13%] top-[14%] flex items-center gap-2 uppercase text-white/80 ${compact ? "text-[8px] tracking-[0.2em] sm:text-[9px]" : "text-[8px] tracking-[0.26em] sm:text-[10px] sm:tracking-[0.32em]"}`}>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff1a4d] shadow-[0_0_14px_rgba(255,26,77,0.9)]" />
          {ru ? "ДИЗАЙН · КОД · АРТ" : "DESIGN · CODE · ART"}
        </div>

        <div className={`absolute bottom-[14%] left-[13%] right-[13%] ${compact ? "" : "flex items-end justify-between"}`}>
          <div>
            <p className={`uppercase text-white/70 ${compact ? "text-[8px] tracking-[0.28em]" : "text-[9px] tracking-[0.36em] sm:text-[10px]"}`}>NOCTIS RAVEN</p>
            {!compact && <p className="mt-2 max-w-[90%] text-xl font-semibold uppercase leading-[0.95] tracking-[-0.055em] text-white sm:text-3xl">{ru ? "СОЗДАЮ ЦИФРОВОЕ." : "MADE WITH INTENT."}</p>}
          </div>
          {!compact && <span className="mb-1 hidden text-[8px] uppercase tracking-[0.28em] text-white/55 sm:block">01 — 02</span>}
        </div>
      </div>

      {!compact && <span aria-hidden="true" className="absolute bottom-[8%] right-[4%] hidden h-8 w-8 rounded-full border border-[#c8102e] bg-[#050505] shadow-[0_0_30px_rgba(200,16,46,0.45)] sm:block" />}
    </div>
  );
}
