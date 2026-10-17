"use client";

import type { Locale } from "@/lib/i18n";
import PixelReveal from "@/components/PixelReveal";

export default function HeroPortrait({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const ru = locale === "ru";

  return (
    <div className={`relative isolate mx-auto w-full ${compact ? "h-full min-h-[250px] max-w-[420px]" : "aspect-[0.94] max-w-[650px] lg:ml-auto"}`}>
      <span aria-hidden="true" className="absolute -right-[3%] top-[12%] h-24 w-24 rounded-full border border-[#c8102e]/30 sm:h-36 sm:w-36" />
      <span aria-hidden="true" className="absolute -right-[1%] top-[14%] h-20 w-20 rounded-full bg-[#c8102e]/20 blur-3xl sm:h-32 sm:w-32" />

      <div aria-hidden="true" className="absolute inset-[1%] noctis-portrait-mask bg-[#c8102e]/70" />
      <div className="group noctis-portrait-mask absolute inset-[1.7%] overflow-hidden bg-[#100b0d] shadow-[0_35px_100px_rgba(0,0,0,0.6)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(179,0,45,0.28),transparent_67%)]" />
        <PixelReveal locale={locale} variant={compact ? "contact" : "home"} />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-black/10" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[11] cyber-glitch-overlay" />

        <div className={`absolute left-[10%] top-[11%] flex items-center gap-2 uppercase text-white/80 ${compact ? "text-[8px] tracking-[0.2em] sm:text-[9px]" : "text-[8px] tracking-[0.26em] sm:text-[10px] sm:tracking-[0.32em]"}`}>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff1a4d] shadow-[0_0_14px_rgba(255,26,77,0.9)]" />
          {ru ? "ДИЗАЙН · КОД · АРТ" : "DESIGN · CODE · ART"}
        </div>

        <div className={`absolute bottom-[10%] left-[10%] right-[10%] ${compact ? "" : "flex items-end justify-between"}`}>
          <div>
            <p className={`uppercase text-white/70 ${compact ? "text-[8px] tracking-[0.28em]" : "text-[9px] tracking-[0.36em] sm:text-[10px]"}`}>NOCTIS RAVEN</p>
            {!compact && <p className="mt-2 max-w-[90%] text-xl font-semibold uppercase leading-[0.95] tracking-[-0.055em] text-white sm:text-3xl">{ru ? "СОЗДАЮ ЦИФРОВОЕ." : "MADE WITH INTENT."}</p>}
          </div>
          {!compact && <span className="mb-1 hidden text-[8px] uppercase tracking-[0.28em] text-white/55 sm:block">01 — 02</span>}
        </div>
      </div>

      {!compact && <>
        <span aria-hidden="true" className="absolute bottom-[7%] right-[1%] hidden h-8 w-8 rotate-45 border border-[#c8102e] bg-[#050505] shadow-[0_0_30px_rgba(200,16,46,0.45)] sm:block" />
        <span className="absolute bottom-[22%] right-[-1.5rem] hidden text-[8px] uppercase tracking-[0.32em] text-white/40 [writing-mode:vertical-rl] sm:block">VISUAL SYSTEMS / DIGITAL ART</span>
      </>}
    </div>
  );
}
