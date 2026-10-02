import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import { CaseReveal, CaseVisual } from "@/components/CaseStudyMotion";
import { resolveLocale, withLocale } from "@/lib/i18n";
import { getProjectBySlug, portfolioProjects } from "@/lib/site-data";

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ lang?: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const locale = resolveLocale(searchParams ? (await searchParams).lang : undefined);

  if (!project) notFound();

  const copy = project.copy[locale];
  const approach = project.approach[locale];
  const design = project.design[locale];
  const development = project.development[locale];
  const nextProject = portfolioProjects.find((item) => item.slug !== project.slug) ?? portfolioProjects[0];
  const labels = locale === "ru"
    ? {
        back: "Назад к проектам",
        project: "Проект",
        role: "Роль",
        year: "Год",
        services: "Услуги / фокус",
        overview: "Обзор",
        client: "Клиент",
        type: "Тип проекта",
        problem: "Задача",
        approach: "Подход",
        design: "Дизайн-система",
        palette: "Палитра",
        typography: "Типографика",
        interface: "Интерфейс",
        development: "Разработка",
        frontend: "Frontend",
        backend: "Backend",
        database: "База данных",
        motion: "Анимации",
        responsive: "Адаптивность",
        final: "Готовый проект",
        open: "Открыть сайт",
        next: "Следующий проект",
        nextHint: "Следующий кейс",
      }
    : {
        back: "Back to projects",
        project: "Project",
        role: "Role",
        year: "Year",
        services: "Services / focus",
        overview: "Overview",
        client: "Client",
        type: "Project type",
        problem: "The problem",
        approach: "The approach",
        design: "Design system",
        palette: "Palette",
        typography: "Typography",
        interface: "Interface",
        development: "Development",
        frontend: "Frontend",
        backend: "Backend",
        database: "Database",
        motion: "Motion",
        responsive: "Responsive",
        final: "Final result",
        open: "Open website",
        next: "Next project",
        nextHint: "Next case study",
      };
  const metadata = [
    { label: labels.client, value: project.client },
    { label: labels.role, value: project.role[locale] },
    { label: labels.year, value: project.year[locale] },
    { label: labels.type, value: project.type[locale] },
  ];
  const developmentItems = [
    { label: labels.frontend, value: development.frontend },
    { label: labels.backend, value: development.backend },
    { label: labels.database, value: development.database },
    { label: labels.motion, value: development.motion },
    { label: labels.responsive, value: development.responsive },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-[#f5f5f5]">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-6 sm:px-8 sm:pb-20 sm:pt-8 lg:px-10">
        <Link href={withLocale("/work", locale)} className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#a1a1a1] transition hover:text-[#ff1a4d]">
          <ArrowLeft className="h-4 w-4" />
          {labels.back}
        </Link>

        <section className="pb-10 pt-10 sm:pb-12 sm:pt-16 lg:pb-16">
          <CaseReveal>
            <p className="text-[10px] uppercase tracking-[0.42em] text-[#a1a1a1]">{labels.project} / {project.category}</p>
            <h1 className="mt-5 max-w-6xl text-4xl font-medium uppercase leading-[0.92] tracking-[-0.065em] text-[#f5f5f5] sm:text-7xl lg:text-8xl">
              {project.title}
            </h1>
            <div className="mt-9 grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-3">
              <MetaItem label={labels.role} value={project.role[locale]} />
              <MetaItem label={labels.year} value={project.year[locale]} />
              <div>
                <p className="text-[9px] uppercase tracking-[0.34em] text-[#777]">{labels.services}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.services[locale].map((service) => (
                    <span key={service} className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-[#d0d0d0]">{service}</span>
                  ))}
                </div>
              </div>
            </div>
          </CaseReveal>

          <CaseReveal delay={0.08} className="mt-10">
            <CaseVisual
              src={project.previewUrl}
              alt={`${project.title} — ${copy.summary}`}
              fit={project.previewFit}
              className="aspect-[4/3] min-h-64 rounded-[24px] border border-white/10 bg-[#100d0c] sm:aspect-video sm:min-h-110 sm:rounded-[36px] lg:min-h-140"
              imageClassName="transition-transform duration-700 group-hover:scale-[1.025]"
            >
              <div className="flex h-full items-end p-6 sm:p-10">
                <p className="max-w-3xl text-xl font-medium leading-snug tracking-tight text-white sm:text-3xl">{copy.summary}</p>
              </div>
            </CaseVisual>
          </CaseReveal>
        </section>

        <CaseReveal>
          <section className="grid gap-10 border-t border-white/10 py-14 lg:grid-cols-[0.65fr_1.35fr] lg:py-20">
            <SectionHeading number="01" title={labels.overview} />
            <div>
              <p className="max-w-3xl text-xl leading-8 text-[#d4d4d4] sm:text-2xl sm:leading-10">{copy.description}</p>
              <dl className="mt-9 grid gap-x-8 sm:grid-cols-2">
                {metadata.map((item) => (
                  <div key={item.label} className="border-t border-white/10 py-4">
                    <dt className="text-[9px] uppercase tracking-[0.35em] text-[#777]">{item.label}</dt>
                    <dd className="mt-2 text-sm text-[#e4e4e4]">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        </CaseReveal>

        <CaseReveal>
          <section className="grid gap-10 border-t border-white/10 py-14 lg:grid-cols-[0.65fr_1.35fr] lg:py-20">
            <SectionHeading number="02" title={labels.problem} />
            <p className="max-w-4xl text-2xl leading-relaxed tracking-tight text-[#e5e5e5] sm:text-4xl sm:leading-snug">{project.problem[locale]}</p>
          </section>
        </CaseReveal>

        <section className="border-t border-white/10 py-14 lg:py-20">
          <CaseReveal>
            <div className="mb-10 grid gap-6 lg:grid-cols-[0.65fr_1.35fr]">
              <SectionHeading number="03" title={labels.approach} />
              <p className="max-w-2xl text-sm leading-7 text-[#a1a1a1]">{locale === "ru" ? "Ключевые решения, которые видны в опубликованном проекте." : "Key decisions visible in the published project."}</p>
            </div>
          </CaseReveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {approach.map((item, index) => (
              <CaseReveal key={item.title} delay={index * 0.045} className="h-full">
                <article className="h-full rounded-[24px] border border-white/10 bg-[#0a0a0a] p-5 sm:rounded-3xl sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.3em] text-[#ff1a4d]">0{index + 1}</span>
                    <span className="h-px w-12 bg-white/15" />
                  </div>
                  <h3 className="mt-8 text-xl font-medium uppercase tracking-[-0.035em] sm:text-2xl">{item.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-[#a9a9a9]">{item.description}</p>
                </article>
              </CaseReveal>
            ))}
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {project.gallery.slice(0, 2).map((image, index) => (
              <CaseReveal key={image} delay={index * 0.06}>
                <CaseVisual
                  src={image}
                  alt={`${project.title} — ${approach[index]?.title ?? labels.approach}`}
                  fit={index === 1 && project.previewFit === "contain" ? "cover" : project.previewFit}
                  className="aspect-16/10 rounded-3xl border border-white/10 bg-[#100d0c]"
                  imageClassName="transition-transform duration-700 group-hover:scale-[1.025]"
                />
                <p className="mt-3 text-[9px] uppercase tracking-[0.3em] text-[#777]">{approach[index]?.title}</p>
              </CaseReveal>
            ))}
          </div>
        </section>

        <CaseReveal>
          <section className="border-t border-white/10 py-14 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
              <SectionHeading number="04" title={labels.design} />
              <div className="grid gap-10 sm:grid-cols-2">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.35em] text-[#777]">{labels.palette}</p>
                  <div className="mt-5 flex gap-2 sm:gap-3">
                    {design.colors.map((color) => (
                      <div key={color.value} className="min-w-0 flex-1">
                        <div className="h-14 rounded-xl border border-white/10 sm:h-20" style={{ backgroundColor: color.value }} />
                        <p className="mt-2 truncate text-[9px] text-[#aaa]">{color.label}</p>
                        <p className="text-[9px] uppercase tracking-widest text-[#666]">{color.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.35em] text-[#777]">{labels.typography}</p>
                  <p className="mt-4 text-4xl font-medium uppercase leading-none tracking-[-0.07em] text-[#f5f5f5]">Aa</p>
                  <p className="mt-4 text-sm leading-7 text-[#a9a9a9]">{design.typography}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-[9px] uppercase tracking-[0.35em] text-[#777]">{labels.interface}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {copy.highlights.map((item) => (
                      <span key={item} className="rounded-full border border-white/10 bg-white/2.5 px-4 py-2 text-xs text-[#d1d1d1]">{item}</span>
                    ))}
                  </div>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-[#a9a9a9]">{design.interface}</p>
                </div>
              </div>
            </div>
          </section>
        </CaseReveal>

        <CaseReveal>
          <section className="grid gap-10 border-t border-white/10 py-14 lg:grid-cols-[0.65fr_1.35fr] lg:py-20">
            <SectionHeading number="05" title={labels.development} />
            <div>
              <dl className="grid gap-x-8 sm:grid-cols-2">
                {developmentItems.map((item) => (
                  <div key={item.label} className="border-t border-white/10 py-4">
                    <dt className="text-[9px] uppercase tracking-[0.35em] text-[#777]">{item.label}</dt>
                    <dd className="mt-2 text-sm leading-6 text-[#d0d0d0]">{item.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 border-l border-[#b3002d] pl-4 text-xs leading-6 text-[#858585]">{development.note}</p>
            </div>
          </section>
        </CaseReveal>

        <CaseReveal>
          <section className="border-t border-white/10 py-14 lg:py-20">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <SectionHeading number="06" title={labels.final} />
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[#ff1a4d] transition hover:text-white">
                {labels.open}<ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <CaseVisual
              src={project.previewUrl}
              alt={`${project.title} — ${labels.final}`}
              fit={project.previewFit}
              className="aspect-[4/3] min-h-64 rounded-[24px] border border-white/10 bg-[#100d0c] sm:aspect-video sm:min-h-120 sm:rounded-[36px] lg:min-h-150"
              imageClassName="transition-transform duration-700 group-hover:scale-[1.025]"
            >
              <div className="flex h-full items-end justify-between gap-6 p-6 sm:p-10">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.35em] text-white/60">{project.client}</p>
                  <p className="mt-3 text-2xl font-medium uppercase tracking-[-0.04em] sm:text-4xl">{project.title}</p>
                </div>
                <span className="mb-1 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/20 backdrop-blur transition group-hover:bg-[#b3002d]">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </CaseVisual>
          </section>
        </CaseReveal>

        <CaseReveal>
          <section className="border-t border-white/10 pt-12 lg:pt-16">
            <p className="mb-5 text-[9px] uppercase tracking-[0.4em] text-[#777]">{labels.next}</p>
            <Link href={withLocale(`/work/${nextProject.slug}`, locale)} className="group block">
              <CaseVisual
                src={nextProject.previewUrl}
                alt={`${labels.next}: ${nextProject.title}`}
                fit={nextProject.previewFit}
                className="flex min-h-64 items-end rounded-[24px] border border-white/10 bg-[#100d0c] transition-colors duration-500 group-hover:border-[#ff1a4d]/50 sm:min-h-97.5 sm:rounded-[36px] lg:min-h-115"
                imageClassName="transition-transform duration-1000 group-hover:scale-[1.035]"
              >
                <div className="flex w-full items-end justify-between gap-3 p-5 sm:gap-6 sm:p-12">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.35em] text-white/60">{labels.nextHint}</p>
                    <h2 className="mt-3 text-3xl font-medium uppercase leading-none tracking-[-0.06em] text-white transition-transform duration-500 group-hover:translate-x-2 sm:text-6xl lg:text-7xl">{nextProject.title}</h2>
                  </div>
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white transition duration-500 group-hover:rotate-45 group-hover:border-[#ff1a4d] group-hover:bg-[#b3002d] sm:h-12 sm:w-12">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </div>
              </CaseVisual>
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
    <div>
      <p className="text-[9px] uppercase tracking-[0.34em] text-[#777]">{label}</p>
      <p className="mt-3 text-sm text-[#e4e4e4]">{value}</p>
    </div>
  );
}

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div>
      <p className="text-[9px] tracking-[0.3em] text-[#ff1a4d]">{number} /</p>
      <h2 className="mt-3 text-3xl font-medium uppercase tracking-[-0.055em] text-[#f5f5f5] sm:text-4xl">{title}</h2>
    </div>
  );
}