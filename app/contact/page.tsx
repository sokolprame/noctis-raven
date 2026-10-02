import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import { resolveLocale } from "@/lib/i18n";

const links = [
  { label: "Telegram", href: "https://t.me/noctisraven" },
  { label: "VK", href: "https://vk.com/noctisraven" },
  { label: "Instagram", href: "https://instagram.com/noctisraven" },
  { label: "GitHub", href: "https://github.com/noctisraven" },
  { label: "Email", href: "mailto:raven4noctis@gmail.com" },
];

export default async function ContactPage({ searchParams }: { searchParams?: Promise<{ lang?: string }> }) {
  const params = searchParams ? await searchParams : {};
  const locale = resolveLocale(params.lang);
  const isRu = locale === "ru";

  return (
    <main className="min-h-screen bg-[#050505] text-[#f5f5f5]">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10">
        <p className="text-[11px] uppercase tracking-[0.42em] text-[#a1a1a1]">{isRu ? "КОНТАКТЫ" : "CONTACT"}</p>
        <h1 className="mt-6 text-5xl font-medium uppercase tracking-[-0.06em] text-[#f5f5f5] sm:text-6xl">
          {isRu ? "ЕСТЬ ИДЕЯ?" : "HAVE AN IDEA?"}
          <br />
          {isRu ? "Давайте создадим это." : "LET'S BUILD IT."}
        </h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-6 text-lg leading-8 text-[#d9d9d9]">
            <p>
              {isRu
                ? "Открыт к freelance-проектам, креативным коллаборациям и интересным идеям. Если у вас есть концепция, история или продукт, которому нужен сильный визуальный голос — давайте обсудим."
                : "Open for freelance projects, creative collaborations and interesting ideas. If you have a concept, a story, or a product that needs a strong visual voice, let's talk."}
            </p>
            <Link href="mailto:raven4noctis@gmail.com" className="inline-flex items-center gap-3 rounded-full bg-[#b3002d] px-6 py-3 text-[11px] uppercase tracking-[0.28em] text-[#f5f5f5] transition hover:bg-[#ff1a4d]">
              {isRu ? "НАЧАТЬ ПРОЕКТ" : "START A PROJECT"} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[#0a0a0a] p-6">
            <p className="text-[11px] uppercase tracking-[0.42em] text-[#a1a1a1]">{isRu ? "СВЯЗЬ" : "CONNECT"}</p>
            <ul className="mt-6 space-y-4 text-sm uppercase tracking-[0.22em] text-[#d8d8d8]">
              {links.map((link) => (
                <li key={link.label} className="border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                  <a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined} className="transition hover:text-[#ff1a4d]">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
