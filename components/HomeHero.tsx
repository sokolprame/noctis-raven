"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useRef } from "react";
import HeroPortrait from "@/components/HeroPortrait";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

type HomeHeroProps = {
  locale: Locale;
  badge: string;
  title: [string, string];
  text: string;
  primary: string;
  secondary: string;
};

export default function HomeHero({ locale, badge, title, text, primary, secondary }: HomeHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -44]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.82, 1], [1, 1, 0.45]);

  return (
    <section
      ref={sectionRef}
      className="home-hero relative mx-auto min-h-[calc(100svh-72px)] max-w-7xl px-5 pb-10 pt-8 sm:px-8 sm:pt-12 lg:min-h-[145svh] lg:px-10 lg:pb-0 lg:pt-0"
    >
      <div className="home-hero-stage relative isolate lg:sticky lg:top-[72px] lg:flex lg:min-h-[calc(100svh-72px)] lg:items-center">
        <div aria-hidden="true" className="home-hero-glow pointer-events-none absolute -inset-x-[14vw] inset-y-0 -z-10" />
        <div aria-hidden="true" className="home-hero-serial pointer-events-none absolute right-0 top-[12%] hidden font-mono text-[clamp(5rem,15vw,15rem)] font-black leading-none tracking-[-0.1em] text-white/[0.025] lg:block">NR</div>
        <div className="grid w-full grid-cols-1 items-center gap-8 sm:grid-cols-[1.06fr_0.94fr] sm:gap-5 lg:grid-cols-2 lg:gap-12">
          <motion.div
            style={reduceMotion ? undefined : { y: copyY, opacity: copyOpacity }}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.2, 0, 0, 1] }}
            className="relative z-10 space-y-5 sm:space-y-4 lg:space-y-7 lg:pb-8"
          >
            <p className="inline-flex max-w-full items-center gap-3 border-l-2 border-[#c8102e] bg-white/[0.045] px-4 py-3 text-[9px] font-semibold uppercase leading-5 tracking-[0.24em] text-white/75 sm:text-[10px] sm:tracking-[0.32em]">
              <span className="h-2 w-2 shrink-0 bg-[#ff1a4d] shadow-[0_0_14px_rgba(255,26,77,0.7)]" />
              {badge}
            </p>

            <div className="space-y-5">
              <h1 className="max-w-5xl text-[clamp(2.8rem,7.4vw,7.2rem)] font-black uppercase leading-[0.92] tracking-[-0.075em] text-[#f5f2f1] [text-wrap:balance] sm:text-[clamp(2.35rem,6vw,4.4rem)] lg:text-[clamp(2.8rem,7.4vw,7.2rem)]">
                <span className="block">{title[0]}</span>
                <span aria-hidden="true" data-text={title[1]} className="home-hero-title-accent mt-2 block text-[#e1163b]">{title[1]}</span>
                <span className="sr-only">{title[1]}</span>
              </h1>
              <p className="max-w-xl text-base leading-7 text-white/70 sm:text-[0.95rem] sm:leading-6 lg:text-lg lg:leading-8 [text-wrap:pretty]">{text}</p>
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-2 lg:gap-3">
              <Link
                href={withLocale("/work", locale)}
                className="inline-flex min-h-12 items-center gap-3 bg-[#c8102e] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-[background-color,transform] duration-150 hover:bg-[#ed1739] active:scale-[0.96] sm:gap-2 sm:px-3 sm:text-[9px] sm:tracking-[0.12em] lg:gap-3 lg:px-6 lg:text-[10px] lg:tracking-[0.2em]"
              >
                {primary}<ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                href={withLocale("/about", locale)}
                className="inline-flex min-h-12 items-center border border-white/25 bg-black/25 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/90 transition-[border-color,color,transform] duration-150 hover:border-[#ff526f] hover:text-white active:scale-[0.96] sm:px-3 sm:text-[9px] sm:tracking-[0.12em] lg:px-6 lg:text-[10px] lg:tracking-[0.2em]"
              >
                {secondary}
              </Link>
            </div>
          </motion.div>

          <motion.div
            style={reduceMotion ? undefined : { scale: portraitScale, y: portraitY }}
            initial={false}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.2, 0, 0, 1] }}
            className="relative z-0 md:py-5 lg:py-8"
          >
            <HeroPortrait locale={locale} />
          </motion.div>
        </div>

        <div aria-hidden="true" className="home-hero-scroll pointer-events-none absolute bottom-5 left-0 hidden items-center gap-3 font-mono text-[9px] tracking-[0.22em] text-white/50 lg:flex">
          <ArrowDown className="h-3.5 w-3.5 text-[#ff526f]" />
          <span>{locale === "ru" ? "ПРОКРУТИТЕ, ЧТОБЫ ВОЙТИ" : "SCROLL TO ENTER"}</span>
          <motion.span className="home-hero-progress ml-2 h-px w-20 origin-left bg-[#ff526f]" style={reduceMotion ? undefined : { scaleX: scrollYProgress }} />
        </div>
        <span aria-hidden="true" className="pointer-events-none absolute bottom-5 right-0 hidden font-mono text-[9px] tracking-[0.18em] text-white/35 lg:block">01 — 05</span>
      </div>
    </section>
  );
}
