"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import LanguageToggle from "@/components/LanguageToggle";
import BrandMark from "@/components/BrandMark";
import { resolveLocale, withLocale } from "@/lib/i18n";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const searchParams = useSearchParams();
  const locale = resolveLocale(searchParams.get("lang"));

  const navItems = [
    { label: locale === "ru" ? "Работы" : "WORK", href: withLocale("/work", locale) },
    { label: locale === "ru" ? "Обо мне" : "ABOUT", href: withLocale("/about", locale) },
    { label: locale === "ru" ? "Контакты" : "CONTACT", href: withLocale("/contact", locale) },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-8 lg:px-10">
        <Link
          href={withLocale("/", locale)}
          className="text-sm text-[#f5f5f5] transition hover:text-[#ff1a4d]"
          aria-label="Go to home page"
        >
          <BrandMark />
        </Link>

        <nav className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.28em] text-[#d5d5d5] md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[#ff1a4d]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 text-[10px] uppercase tracking-[0.22em] text-[#a1a1a1] sm:flex">
          <LanguageToggle />
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#ff1a4d] shadow-[0_0_16px_rgba(255,26,77,0.9)]" />
            {locale === "ru" ? "ДОСТУПЕН ДЛЯ РАБОТЫ" : "AVAILABLE FOR WORK"}
          </span>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
          className="inline-flex items-center justify-center rounded-full border border-white/10 bg-[#0a0a0a] p-2 text-[#f5f5f5] transition hover:border-[#ff1a4d]/60 md:hidden"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="border-t border-white/10 bg-[#050505] md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-[11px] uppercase tracking-[0.28em] text-[#f5f5f5]">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center justify-between border-b border-white/10 pb-3 text-[#f5f5f5] transition hover:text-[#ff1a4d]"
                >
                  <span>{item.label}</span>
                  <span className="text-[#a1a1a1]">↗</span>
                </Link>
              ))}
              <div className="flex flex-col items-start gap-3 pt-2 text-[10px] text-[#a1a1a1] sm:flex-row sm:items-center sm:justify-between">
                <LanguageToggle />
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#ff1a4d]" />
                  {locale === "ru" ? "ДОСТУПЕН ДЛЯ РАБОТЫ" : "AVAILABLE FOR WORK"}
                </span>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
