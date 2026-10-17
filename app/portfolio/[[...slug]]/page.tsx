import { permanentRedirect } from "next/navigation";
import { resolveLocale, withLocale } from "@/lib/i18n";

export default async function LegacyPortfolioRoute({ searchParams }: { searchParams?: Promise<{ lang?: string }> }) {
  const params = searchParams ? await searchParams : {};
  permanentRedirect(withLocale("/work", resolveLocale(params.lang)));
}
