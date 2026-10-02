"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { resolveLocale, type Locale } from "@/lib/i18n";

export default function LanguageToggle() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = resolveLocale(searchParams.get("lang")) as Locale;

  const toggleLanguage = () => {
    const nextLocale = locale === "ru" ? "en" : "ru";
    const params = new URLSearchParams(window.location.search);
    params.set("lang", nextLocale);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label="Toggle locale"
      className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#a1a1a1] transition hover:text-[#ff1a4d]"
    >
      <span className={locale === "ru" ? "text-[#f5f5f5]" : "text-[#a1a1a1]"}>RU</span>
      <span className="text-[#666]">/</span>
      <span className={locale === "en" ? "text-[#f5f5f5]" : "text-[#a1a1a1]"}>EN</span>
    </button>
  );
}
