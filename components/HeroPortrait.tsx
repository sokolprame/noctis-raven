"use client";

import type { Locale } from "@/lib/i18n";
import PixelReveal from "@/components/PixelReveal";

export default function HeroPortrait({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const ru = locale === "ru";

  return (
    <div className={`relative isolate mx-auto w-full ${compact ? "h-full min-h-[250px] max-w-[420px]" : "aspect-[0.94] max-w-[650px] lg:ml-auto"}`}>
      {!compact && <>
        <div aria-hidden="true" className="hero-orbit hero-orbit-a absolute inset-[2%]" />
        <div aria-hidden="true" className="hero-orbit hero-orbit-b absolute inset-[9%]" />
        <span aria-hidden="true" className="absolute -right-[2%] top-[12%] h-28 w-28 rounded-full border border-[#c8102e]/30 shadow-[0_0_50px_rgba(200,16,46,0.12)] sm:h-40 sm:w-40" />
        <span aria-hidden="true" className="absolute -right-[1%] top-[14%] h-24 w-24 rounded-full bg-[#c8102e]/25 blur-3xl sm:h-36 sm:w-36" />
        <span aria-hidden="true" className="absolute bottom-[2%] left-[12%] h-20 w-44 rounded-full bg-[#c8102e]/20 blur-3xl" />
      </>}

      <div aria-hidden="true" className="absolute inset-[1%] translate-x-2 translate-y-2 noctis-portrait-mask bg-[#c8102e]/80 shadow-[0_28px_100px_rgba(200,16,46,0.16)]" />
      <div className={`group noctis-portrait-mask absolute inset-[1.7%] overflow-hidden bg-[#100b0d] shadow-[0_35px_100px_rgba(0,0,0,0.72)] ${compact ? "" : "[transform:perspective(1200px)_rotateY(-4deg)_rotateX(2deg)] transition-transform duration-700 hover:[transform:perspective(1200px)_rotateY(0deg)_rotateX(0deg)]"}`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(179,0,45,0.28),transparent_67%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[9] opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(135deg,black,transparent_70%)]" />
        <PixelReveal locale={locale} variant={compact ? "contact" : "home"} />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-black/10" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[11] cyber-glitch-overlay" />

        <div className={`absolute left-[10%] right-[10%] top-[8%] flex items-center justify-between gap-3 uppercase text-white/75 ${compact ? "text-[8px] tracking-[0.2em] sm:text-[9px]" : "text-[8px] tracking-[0.26em] sm:text-[9px] sm:tracking-[0.32em]"}`}>
          <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff1a4d] shadow-[0_0_14px_rgba(255,26,77,0.9)]" />{ru ? "ДИЗАЙН · КОД · АРТ" : "DESIGN · CODE · ART"}</span>
          {!compact && <span className="font-mono text-white/45">NR—001</span>}
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
        <span aria-hidden="true" className="absolute left-[5%] top-[20%] hidden h-14 w-px bg-linear-to-b from-transparent via-[#ff526f]/70 to-transparent sm:block" />
        <span className="absolute bottom-[22%] right-[-1.5rem] hidden text-[8px] uppercase tracking-[0.32em] text-white/40 [writing-mode:vertical-rl] sm:block">VISUAL SYSTEMS / DIGITAL ART</span>
        <div aria-hidden="true" className="absolute right-[4%] top-[19%] hidden border border-white/10 bg-black/55 px-3 py-2 font-mono text-[8px] leading-4 tracking-[0.14em] text-white/55 backdrop-blur-md sm:block">
          <span className="block text-[#ff526f]">{ru ? "ПОЛЕ / 01" : "FIELD / 01"}</span>
          <span>VISUAL SYSTEMS</span>
        </div>
      </>}
    </div>
  );
}
