import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import { CaseReveal, CaseVisual } from "@/components/CaseStudyMotion";
import { resolveLocale, withLocale } from "@/lib/i18n";
import { getPublicPortfolioProjects, getPublishedProjectBySlug } from "@/lib/public-portfolio";

export const revalidate = 0;

export async function generateStaticParams() {
  return (await getPublicPortfolioProjects()).map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.copy.ru.summary,
    openGraph: {
      title: `${project.title} — NOCTIS RAVEN`,
      description: project.copy.ru.summary,
      images: [{ url: project.previewUrl }],
    },
  };
}

export default async function ProjectDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ lang?: string }>;
}) {
  const { slug } = await params;
  const projects = await getPublicPortfolioProjects();
  const project = await getPublishedProjectBySlug(slug);
  const locale = resolveLocale(searchParams ? (await searchParams).lang : undefined);

  if (!project) notFound();

  const ru = locale === "ru";
  const copy = project.copy[locale];
  const approach = project.approach[locale];
  const design = project.design[locale];
  const nextProject = projects.find((item) => item.slug !== project.slug) ?? project;
  const labels = ru
    ? {
        back: "Назад к проектам",
        project: "Проект",
        role: "Роль",
        client: "Клиент",
        type: "Тип проекта",
        services: "Фокус",
        overview: "Контекст",
        problem: "Задача",
        approach: "Решения",
        design: "Визуальный язык",
        palette: "Палитра",
        typography: "Типографика",
        interface: "Интерфейс",
        final: "Проект в работе",
        open: "Открыть сайт",
        next: "Следующий проект",
        nextHint: "Продолжить просмотр",
        talk: "Есть похожая задача?",
      }
    : {
        back: "Back to projects",
        project: "Project",
        role: "Role",
        client: "Client",
        type: "Project type",
        services: "Focus",
        overview: "Context",
        problem: "The brief",
        approach: "Solutions",
        design: "Visual language",
        palette: "Palette",
        typography: "Typography",
        interface: "Interface",
        final: "The project live",
        open: "Open website",
        next: "Next project",
        nextHint: "Keep exploring",
        talk: "Have a similar project?",
      };

  return (
    <main id="main-content" lang={locale} className="min-h-screen overflow-x-clip bg-[#050505] text-[#f5f5f5]">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-5 pb-14 pt-6 sm:px-8 sm:pb-20 sm:pt-8 lg:px-10">
        <Link href={withLocale("/work", locale)} className="inline-flex min-h-10 items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.28em] text-white/55 transition hover:text-[#ff526f] sm:text-[10px] sm:tracking-[0.3em]">
          <ArrowLeft className="h-4 w-4" />{labels.back}
        </Link>

        <section className="pb-10 pt-8 sm:pb-12 sm:pt-12 lg:pb-16">
          <CaseReveal>
            <p className="text-[9px] font-semibold uppercase tracking-[0.36em] text-[#ff526f] sm:text-[10px] sm:tracking-[0.42em]">{labels.project} / {project.category} / {String(projects.findIndex((item) => item.slug === project.slug) + 1).padStart(2, "0")}</p>
            <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.55fr] lg:items-end lg:gap-12">
              <h1 className="max-w-6xl text-[clamp(2.7rem,8vw,7.5rem)] font-black uppercase leading-[0.84] tracking-[-0.075em] text-white">{project.title}</h1>
              <p className="max-w-xl border-l-2 border-[#c8102e] pl-4 text-sm leading-6 text-white/65 sm:text-base sm:leading-7 lg:pb-1">{copy.summary}</p>
            </div>

            <dl className="mt-8 grid gap-x-6 border-y border-white/10 sm:grid-cols-2 lg:grid-cols-4">
              <MetaItem label={labels.client} value={project.client} />
              <MetaItem label={labels.role} value={project.role[locale]} />
              <MetaItem label={labels.type} value={project.type[locale]} />
              <div className="border-t border-white/10 py-4 sm:col-span-2 lg:col-span-1 lg:border-t-0">
                <dt className="text-[8px] font-semibold uppercase tracking-[0.32em] text-white/40">{labels.services}</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {project.services[locale].map((service) => <span key={service} className="border border-white/10 px-2 py-1 text-[9px] leading-4 text-white/65">{service}</span>)}
                </dd>
              </div>
            </dl>
          </CaseReveal>

          <CaseReveal delay={0.08} className="mt-6 sm:mt-8">
            <CaseVisual
              src={project.previewUrl}
              alt={`${project.title} — ${copy.summary}`}
              fit={project.previewFit}
              className="aspect-[4/3] min-h-[250px] border border-white/10 bg-[#100d0c] sm:aspect-[16/9] sm:min-h-[360px] lg:min-h-[470px]"
              imageClassName="transition-transform duration-700 group-hover:scale-[1.025]"
            >
              <div className="flex h-full items-end justify-between gap-4 p-4 sm:p-8 lg:p-10">
                <span className="border border-white/35 bg-black/50 px-3 py-2 text-[8px] font-semibold uppercase tracking-[0.28em] text-white/80 backdrop-blur-sm sm:text-[9px]">{project.type[locale]}</span>
                <span aria-hidden="true" className="mb-1 h-2 w-2 shrink-0 rotate-45 bg-[#ff1a4d] shadow-[0_0_18px_rgba(255,26,77,0.9)]" />
              </div>
            </CaseVisual>
          </CaseReveal>
        </section>

        <CaseReveal>
          <section className="grid gap-6 border-t border-white/10 py-10 sm:gap-10 sm:py-14 lg:grid-cols-[0.6fr_1.4fr] lg:py-16">
            <SectionHeading number="01" title={labels.overview} />
            <div className="grid gap-7 sm:grid-cols-2 sm:gap-10">
              <p className="text-base leading-7 text-white/70 sm:text-lg sm:leading-8">{copy.description}</p>
              <div className="border-l border-[#c8102e]/70 pl-4 sm:pl-6">
                <p className="text-[8px] font-semibold uppercase tracking-[0.32em] text-[#ff526f] sm:text-[9px]">{labels.problem}</p>
                <p className="mt-3 text-sm leading-7 text-white/55 sm:text-base">{project.problem[locale]}</p>
              </div>
            </div>
          </section>
        </CaseReveal>

        <section className="border-t border-white/10 py-10 sm:py-14 lg:py-16">
          <CaseReveal>
            <div className="mb-6 grid gap-4 sm:mb-8 sm:grid-cols-[0.6fr_1.4fr] sm:items-end sm:gap-10">
              <SectionHeading number="02" title={labels.approach} />
              <p className="max-w-xl text-xs leading-6 text-white/50 sm:text-sm sm:leading-7">{ru ? "Четыре решения, которые формируют опыт этого проекта." : "Four decisions that shape the experience of this project."}</p>
            </div>
          </CaseReveal>

          <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
            {approach.map((item, index) => (
              <CaseReveal key={item.title} delay={index * 0.035} className="h-full">
                <article className="h-full bg-[#080808] p-4 sm:p-6 lg:p-7">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-semibold tracking-[0.28em] text-[#ff526f]">0{index + 1}</span>
                    <span aria-hidden="true" className="h-px w-8 bg-[#c8102e]/70 sm:w-12" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold uppercase leading-tight tracking-[-0.035em] sm:mt-8 sm:text-xl">{item.title}</h3>
                  <p className="mt-3 max-w-xl text-xs leading-6 text-white/55 sm:text-sm sm:leading-7">{item.description}</p>
                </article>
              </CaseReveal>
            ))}
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-5">
            {project.gallery.slice(0, 2).map((image, index) => (
              <CaseReveal key={image} delay={index * 0.05}>
                <CaseVisual
                  src={image}
                  alt={`${project.title} — ${approach[index]?.title ?? labels.approach}`}
                  fit={project.galleryFit[index] ?? "cover"}
                  className="aspect-[4/3] border border-white/10 bg-[#100d0c] sm:aspect-[16/10]"
                  imageClassName="transition-transform duration-700 group-hover:scale-[1.025]"
                />
                <p className="mt-2 border-l border-[#c8102e] pl-3 text-[8px] font-semibold uppercase tracking-[0.25em] text-white/45 sm:text-[9px]">{approach[index]?.title}</p>
              </CaseReveal>
            ))}
          </div>
        </section>

        <CaseReveal>
          <section className="grid gap-6 border-t border-white/10 py-10 sm:gap-10 sm:py-14 lg:grid-cols-[0.6fr_1.4fr] lg:py-16">
            <SectionHeading number="03" title={labels.design} />
            <div className="grid gap-7 sm:grid-cols-2 sm:gap-10">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.32em] text-white/40 sm:text-[9px]">{labels.palette}</p>
                <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
                  {design.colors.map((color) => (
                    <div key={color.value}>
                      <div className="h-12 border border-white/10 sm:h-16" style={{ backgroundColor: color.value }} />
                      <p className="mt-2 truncate text-[8px] text-white/55 sm:text-[9px]">{color.label}</p>
                      <p className="text-[8px] uppercase tracking-[0.12em] text-white/30 sm:text-[9px]">{color.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.32em] text-white/40 sm:text-[9px]">{labels.typography}</p>
                <p className="mt-3 text-4xl font-black uppercase leading-none tracking-[-0.08em] sm:text-5xl">Aa</p>
                <p className="mt-3 text-xs leading-6 text-white/55 sm:text-sm sm:leading-7">{design.typography}</p>
              </div>
              <div className="border-t border-white/10 pt-5 sm:col-span-2 sm:pt-6">
                <p className="text-[8px] font-semibold uppercase tracking-[0.32em] text-white/40 sm:text-[9px]">{labels.interface}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {copy.highlights.map((item) => <span key={item} className="border border-white/10 px-3 py-2 text-[9px] leading-4 text-white/65 sm:text-[10px]">{item}</span>)}
                </div>
                <p className="mt-4 max-w-3xl text-xs leading-6 text-white/50 sm:text-sm sm:leading-7">{design.interface}</p>
              </div>
            </div>
          </section>
        </CaseReveal>

        <CaseReveal>
          <section className="border-t border-white/10 py-10 sm:py-14 lg:py-16">
            <div className="grid gap-5 border border-[#c8102e]/35 bg-[linear-gradient(120deg,rgba(179,0,45,0.18),rgba(255,255,255,0.015)_55%)] p-5 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-8 sm:p-8 lg:p-10">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.32em] text-[#ff526f] sm:text-[9px]">04 / {labels.final}</p>
                <h2 className="mt-3 text-2xl font-semibold uppercase leading-none tracking-[-0.055em] sm:text-4xl">{project.title}</h2>
                <p className="mt-3 max-w-2xl text-xs leading-6 text-white/55 sm:text-sm sm:leading-7">{copy.highlightsTitle}: {copy.highlights.join(" · ")}</p>
              </div>
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-between gap-8 border border-white/25 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.22em] transition hover:border-[#c8102e] hover:bg-[#c8102e] sm:min-w-44 sm:px-5">
                {labels.open}<ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </section>
        </CaseReveal>

        <CaseReveal>
          <section className="border-t border-white/10 pt-8 sm:pt-10">
            <p className="mb-4 text-[8px] font-semibold uppercase tracking-[0.32em] text-white/40 sm:text-[9px]">{labels.next}</p>
            <Link href={withLocale(`/work/${nextProject.slug}`, locale)} className="group flex items-center justify-between gap-5 border border-white/12 bg-[#080808] p-4 transition hover:border-[#c8102e]/70 sm:p-6 lg:p-8">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.28em] text-[#ff526f]">{labels.nextHint}</p>
                <h2 className="mt-2 text-xl font-semibold uppercase leading-none tracking-[-0.05em] transition group-hover:text-[#ff526f] sm:text-3xl lg:text-4xl">{nextProject.title}</h2>
                <p className="mt-2 max-w-xl text-[10px] leading-5 text-white/45 sm:text-xs sm:leading-6">{nextProject.copy[locale].summary}</p>
              </div>
              <span aria-hidden="true" className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-white/25 transition group-hover:rotate-45 group-hover:border-[#ff1a4d] group-hover:bg-[#c8102e] sm:h-14 sm:w-14">
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
            </Link>
          </section>
        </CaseReveal>
      </div>
      <Footer />
    </main>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-white/10 py-4 first:border-t-0 sm:first:border-t-0 lg:border-t-0">
      <dt className="text-[8px] font-semibold uppercase tracking-[0.32em] text-white/40">{label}</dt>
      <dd className="mt-2 text-xs leading-5 text-white/75 sm:text-sm">{value}</dd>
    </div>
  );
}

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div>
      <p className="text-[9px] font-semibold tracking-[0.3em] text-[#ff526f]">{number} /</p>
      <h2 className="mt-3 text-2xl font-semibold uppercase leading-[0.94] tracking-[-0.055em] text-white sm:text-3xl lg:text-4xl">{title}</h2>
    </div>
  );
}
