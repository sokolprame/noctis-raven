"use client";

import { useState } from "react";
import type { ManagedProject, ProjectStatus } from "@/lib/public-portfolio";
import type { PortfolioItem } from "@/lib/site-data";

type Form = {
  id: string; slug: string; title: string; client: string; category: string; collection: string;
  typeRu: string; typeEn: string; cover: string; liveUrl: string; gallery: string;
  summaryRu: string; summaryEn: string; descriptionRu: string; descriptionEn: string;
  problemRu: string; problemEn: string; servicesRu: string; servicesEn: string;
  highlightsRu: string; highlightsEn: string; status: ProjectStatus; featured: boolean; sortOrder: number;
};

const blank: Form = { id: "", slug: "", title: "", client: "", category: "Web", collection: "Web", typeRu: "Веб-проект", typeEn: "Web project", cover: "", liveUrl: "", gallery: "", summaryRu: "", summaryEn: "", descriptionRu: "", descriptionEn: "", problemRu: "", problemEn: "", servicesRu: "", servicesEn: "", highlightsRu: "", highlightsEn: "", status: "draft", featured: false, sortOrder: 0 };
const list = (value: string) => value.split(/\n|,/).map((part) => part.trim()).filter(Boolean);
const slugify = (value: string) => {
  const cyrillic: Record<string, string> = { а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh", з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya" };
  return value.toLowerCase().split("").map((character) => cyrillic[character] ?? character).join("").trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
};
const approach = (ru: boolean) => ru
  ? [{ title: "Идея", description: "Визуальное направление собрано вокруг задачи проекта." }, { title: "Структура", description: "Ключевые разделы выстроены в ясный пользовательский маршрут." }, { title: "Детали", description: "Типографика, цвет и графика поддерживают единый характер." }, { title: "Результат", description: "Готовый цифровой опыт адаптирован для разных экранов." }]
  : [{ title: "Concept", description: "A distinct visual direction shaped around the project brief." }, { title: "Structure", description: "Key sections form a clear path through the experience." }, { title: "Details", description: "Type, colour, and imagery reinforce one coherent character." }, { title: "Delivery", description: "The finished digital experience adapts to different screens." }];

function fromProject(project: ManagedProject): Form {
  const p = project.content;
  return { id: project.id, slug: p.slug, title: p.title, client: p.client, category: p.category, collection: p.collection, typeRu: p.type.ru, typeEn: p.type.en, cover: p.previewUrl, liveUrl: p.liveUrl, gallery: p.gallery.join("\n"), summaryRu: p.copy.ru.summary, summaryEn: p.copy.en.summary, descriptionRu: p.copy.ru.description, descriptionEn: p.copy.en.description, problemRu: p.problem.ru, problemEn: p.problem.en, servicesRu: p.services.ru.join(", "), servicesEn: p.services.en.join(", "), highlightsRu: p.copy.ru.highlights.join("\n"), highlightsEn: p.copy.en.highlights.join("\n"), status: project.status, featured: project.featured, sortOrder: project.sortOrder };
}

function makeContent(form: Form): PortfolioItem {
  const slug = form.slug || slugify(form.title);
  const gallery = list(form.gallery);
  const highlightsRu = list(form.highlightsRu), highlightsEn = list(form.highlightsEn);
  const design = (ru: boolean) => ({ colors: [{ label: ru ? "Ночь" : "Night", value: "#050505" }, { label: ru ? "Красный" : "Red", value: "#c8102e" }, { label: ru ? "Белый" : "White", value: "#f5f5f5" }], typography: ru ? "Контрастная типографика подчёркивает характер проекта." : "Expressive typography reinforces the project's character.", interface: ru ? "Адаптивный интерфейс с акцентом на ясность и детали." : "A responsive interface focused on clarity and detail." });
  return {
    slug, title: form.title.trim(), client: form.client.trim(), type: { ru: form.typeRu, en: form.typeEn }, role: { ru: "Дизайн и разработка", en: "Design and development" }, services: { ru: list(form.servicesRu), en: list(form.servicesEn) }, category: form.category.trim() || "Web", collection: form.collection.trim() || "Web", liveUrl: form.liveUrl.trim() || "#", previewUrl: form.cover.trim() || "/portfolio/web/luna-protocol-cover.svg", previewFit: "cover", gallery: gallery.length ? gallery : [form.cover.trim() || "/portfolio/web/luna-protocol-cover.svg"], galleryFit: (gallery.length ? gallery : [form.cover.trim()]).map(() => "cover" as const),
    copy: { ru: { summary: form.summaryRu, description: form.descriptionRu || form.summaryRu, highlightsTitle: "Ключевые элементы", highlights: highlightsRu }, en: { summary: form.summaryEn || form.summaryRu, description: form.descriptionEn || form.summaryEn || form.summaryRu, highlightsTitle: "Highlights", highlights: highlightsEn.length ? highlightsEn : highlightsRu } },
    problem: { ru: form.problemRu || form.summaryRu, en: form.problemEn || form.summaryEn || form.problemRu || form.summaryRu }, approach: { ru: approach(true), en: approach(false) }, design: { ru: design(true), en: design(false) },
  };
}

export function PublicPortfolioEditor({ initialProjects }: { initialProjects: ManagedProject[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [form, setForm] = useState<Form>(blank);
  const [feedback, setFeedback] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (key: keyof Form, value: string | boolean | number) => setForm((current) => ({ ...current, [key]: value }));

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setFeedback("");
    try {
      const response = await fetch("/api/admin/public-portfolio", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id, content: makeContent(form), status: form.status, featured: form.featured, sortOrder: form.sortOrder }) });
      const result = await response.json();
      if (!response.ok || !result.ok) { setFeedback(result.message || "Не удалось сохранить проект"); return; }
      const saved = result.project as ManagedProject;
      setProjects((current) => [saved, ...current.filter((item) => item.id !== saved.id && item.content.slug !== saved.content.slug)]);
      setForm(blank); setFeedback("Кейс сохранён в PostgreSQL.");
    } catch { setFeedback("Не удалось связаться с сервером."); }
    finally { setBusy(false); }
  }

  async function toggleStatus(project: ManagedProject) {
    if (project.id.startsWith("static-")) { setFeedback("Сначала сохраните этот кейс в PostgreSQL, затем меняйте публикацию."); setForm(fromProject(project)); return; }
    const status = project.status === "published" ? "draft" : "published";
    const response = await fetch("/api/admin/public-portfolio", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: project.id, status }) });
    const result = await response.json();
    if (!response.ok || !result.ok) { setFeedback(result.message || "Не удалось обновить публикацию"); return; }
    setProjects((items) => items.map((item) => item.id === project.id ? { ...item, status } : item));
  }

  const input = "min-h-11 w-full border border-white/12 bg-[#080808] px-3 py-2 text-sm text-white placeholder:text-white/30 focus-visible:border-[#ff1a4d]";
  const area = `${input} min-h-24`;
  return <div className="space-y-8">
    {feedback && <p role="status" className="border border-[#ff1a4d]/30 bg-[#c8102e]/10 px-4 py-3 text-sm text-white/80">{feedback}</p>}
    <form onSubmit={save} className="grid gap-4 border border-white/10 bg-[#080808] p-4 sm:grid-cols-2 sm:p-6">
      <h2 className="text-xl font-semibold uppercase tracking-wide sm:col-span-2">{form.id ? "Редактировать кейс" : "Новый кейс"}</h2>
      <Field label="Название" className={input} value={form.title} onChange={(v) => set("title", v)} required />
      <Field label="Клиент / подпись" className={input} value={form.client} onChange={(v) => set("client", v)} required />
      <Field label="Slug (латиница)" className={input} value={form.slug} onChange={(v) => set("slug", v)} placeholder={slugify(form.title) || "my-project"} />
      <Field label="Категория" className={input} value={form.category} onChange={(v) => set("category", v)} />
      <Field label="Коллекция / фильтр" className={input} value={form.collection} onChange={(v) => set("collection", v)} />
      <Field label="Тип (RU)" className={input} value={form.typeRu} onChange={(v) => set("typeRu", v)} />
      <Field label="Тип (EN)" className={input} value={form.typeEn} onChange={(v) => set("typeEn", v)} />
      <Field label="Обложка: URL или путь /public" className={`${input} sm:col-span-2`} value={form.cover} onChange={(v) => set("cover", v)} required />
      <Field label="Ссылка на опубликованный сайт" className={`${input} sm:col-span-2`} value={form.liveUrl} onChange={(v) => set("liveUrl", v)} placeholder="https://…" />
      <Field label="RU · короткое описание" className={area} value={form.summaryRu} onChange={(v) => set("summaryRu", v)} required multiline />
      <Field label="EN · short summary" className={area} value={form.summaryEn} onChange={(v) => set("summaryEn", v)} multiline />
      <Field label="RU · описание кейса" className={area} value={form.descriptionRu} onChange={(v) => set("descriptionRu", v)} multiline />
      <Field label="EN · case description" className={area} value={form.descriptionEn} onChange={(v) => set("descriptionEn", v)} multiline />
      <Field label="RU · задача" className={area} value={form.problemRu} onChange={(v) => set("problemRu", v)} multiline />
      <Field label="EN · brief" className={area} value={form.problemEn} onChange={(v) => set("problemEn", v)} multiline />
      <Field label="RU · услуги (через запятую)" className={input} value={form.servicesRu} onChange={(v) => set("servicesRu", v)} />
      <Field label="EN · services (comma separated)" className={input} value={form.servicesEn} onChange={(v) => set("servicesEn", v)} />
      <Field label="RU · ключевые пункты (строка на пункт)" className={area} value={form.highlightsRu} onChange={(v) => set("highlightsRu", v)} multiline />
      <Field label="EN · highlights (one per line)" className={area} value={form.highlightsEn} onChange={(v) => set("highlightsEn", v)} multiline />
      <Field label="Галерея, URL по одному на строку" className={`${area} sm:col-span-2`} value={form.gallery} onChange={(v) => set("gallery", v)} multiline />
      <Field label="Позиция (меньше — выше)" className={input} value={String(form.sortOrder)} onChange={(v) => set("sortOrder", Number(v) || 0)} type="number" />
      <label className="flex min-h-11 items-center gap-3 text-sm text-white/75"><input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} />Избранный кейс</label>
      <label className="text-xs uppercase tracking-widest text-white/50">Публикация<select className={`${input} mt-2`} value={form.status} onChange={(e) => set("status", e.target.value as ProjectStatus)}><option value="draft">Черновик</option><option value="published">Опубликован</option></select></label>
      <div className="flex flex-wrap gap-3 sm:col-span-2"><button disabled={busy} className="min-h-11 bg-[#c8102e] px-5 text-xs font-semibold uppercase tracking-widest text-white disabled:opacity-50">{busy ? "Сохраняю…" : "Сохранить кейс"}</button><button type="button" onClick={() => { setForm(blank); setFeedback(""); }} className="min-h-11 border border-white/20 px-5 text-xs uppercase tracking-widest text-white/70">Новый</button></div>
    </form>
    <section className="space-y-3"><h2 className="text-xl font-semibold uppercase tracking-wide">Кейсы · {projects.length}</h2>{projects.map((project) => <article key={project.id} className="flex flex-col gap-3 border border-white/10 bg-[#080808] p-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold">{project.content.title}</p><p className="mt-1 text-xs text-white/45">/{project.content.slug} · {project.status === "published" ? "Опубликован" : "Черновик"}{project.featured ? " · Избранное" : ""}{project.id.startsWith("static-") ? " · статический источник" : ""}</p></div><div className="flex flex-wrap gap-2"><button type="button" onClick={() => { setForm(fromProject(project)); setFeedback(""); }} className="min-h-10 border border-white/20 px-3 text-xs uppercase tracking-wider">Изменить</button><button type="button" onClick={() => void toggleStatus(project)} className="min-h-10 border border-[#ff1a4d]/50 px-3 text-xs uppercase tracking-wider text-[#ff889b]">{project.status === "published" ? "В черновик" : "Опубликовать"}</button></div></article>)}</section>
  </div>;
}

function Field({ label, className, value, onChange, required, placeholder, multiline, type = "text" }: { label: string; className: string; value: string; onChange: (value: string) => void; required?: boolean; placeholder?: string; multiline?: boolean; type?: string }) {
  return <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50">{label}{multiline ? <textarea className={`${className} mt-2 normal-case tracking-normal`} value={value} onChange={(e) => onChange(e.target.value)} required={required} placeholder={placeholder} rows={3} /> : <input className={`${className} mt-2 normal-case tracking-normal`} value={value} onChange={(e) => onChange(e.target.value)} required={required} placeholder={placeholder} type={type} />}</label>;
}
