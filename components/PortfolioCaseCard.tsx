import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { withLocale, type Locale } from "@/lib/i18n";
import type { PortfolioItem } from "@/lib/site-data";

const collectionLabel: Record<PortfolioItem["collection"], Record<Locale, string>> = {
  Commerce: { ru: "Цифровой каталог", en: "Digital commerce" },
  Memorial: { ru: "Памятный сайт", en: "Memorial site" },
};

export default function PortfolioCaseCard({
  project,
  locale,
  index,
}: {
  project: PortfolioItem;
  locale: Locale;
  index: number;
}) {
  const ru = locale === "ru";

  return (
    <article className="group h-full border border-white/12 bg-[#080808] transition-colors duration-300 hover:border-[#c8102e]/70">
      <Link
        href={withLocale(`/work/${project.slug}`, locale)}
        aria-label={`${project.title} — ${project.copy[locale].summary}`}
        className="block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ed1739]"
      >
        <div
          role="img"
          aria-label={`${project.title} — ${project.copy[locale].summary}`}
          className="relative aspect-[1.18/1] overflow-hidden border-b border-white/10 bg-[#151112] sm:aspect-[1.34/1]"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            style={{
              backgroundImage: `url("${project.previewUrl}")`,
              backgroundSize: project.previewFit,
            }}
          />
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/85 via-black/5 to-black/20" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#c8102e] transition-transform duration-500 group-hover:scale-x-100" />

          <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3 sm:inset-x-6 sm:top-6">
            <span className="border border-white/35 bg-black/45 px-2.5 py-1.5 text-[8px] font-semibold uppercase tracking-[0.24em] text-white/90 backdrop-blur-sm sm:text-[9px]">
              {ru ? "КЕЙС" : "CASE"} / {String(index + 1).padStart(2, "0")}
            </span>
            <span className="max-w-[58%] text-right text-[8px] font-medium uppercase tracking-[0.2em] text-white/75 sm:text-[9px] sm:tracking-[0.24em]">
              {collectionLabel[project.collection][locale]}
            </span>
          </div>

          <span aria-hidden="true" className="absolute bottom-4 right-4 inline-flex h-10 w-10 items-center justify-center border border-white/50 bg-black/45 text-white transition duration-300 group-hover:rotate-45 group-hover:border-[#ff1a4d] group-hover:bg-[#c8102e] sm:bottom-6 sm:right-6 sm:h-12 sm:w-12">
            <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </span>
        </div>

        <div className="grid gap-4 p-4 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-6 sm:p-6 lg:p-7">
          <div className="min-w-0">
            <p className="text-[8px] font-semibold uppercase tracking-[0.26em] text-[#ff526f] sm:text-[9px]">{project.client}</p>
            <h2 className="mt-2 text-2xl font-semibold uppercase leading-[0.96] tracking-[-0.06em] text-white sm:text-3xl lg:text-4xl">{project.title}</h2>
            <p className="mt-3 max-w-xl text-xs leading-6 text-white/55 sm:text-sm sm:leading-7">{project.copy[locale].summary}</p>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-3 sm:min-w-32 sm:flex-col sm:items-end sm:justify-end sm:border-t-0 sm:pt-0">
            <span className="text-[8px] font-semibold uppercase tracking-[0.22em] text-white/50 sm:text-right">{project.type[locale]}</span>
            <span className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#ff526f]">{ru ? "Смотреть кейс" : "View case"}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
