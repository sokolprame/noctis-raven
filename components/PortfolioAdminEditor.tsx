"use client";

import { useState } from "react";
import type { ArtRecord, WebRecord } from "../lib/portfolio-db";

type Props = {
  initialArts: ArtRecord[];
  initialWebProjects: WebRecord[];
};

const emptyArtForm = {
  id: "",
  slug: "",
  title: "",
  category: "ART",
  summary: "",
  description: "",
  story: "",
  toolsText: "",
  cover: "",
  galleryText: "",
};

const emptyWebForm = {
  id: "",
  slug: "",
  title: "",
  type: "",
  summary: "",
  brief: "",
  challenge: "",
  solution: "",
  process_research: "",
  process_structure: "",
  process_prototyping: "",
  process_ui: "",
  gallery_home: "",
  gallery_inner: "",
  gallery_responsive: "",
  gallery_ui: "",
  technologiesText: "",
  featuresText: "",
  live_url: "",
  result: "",
  cover: "",
};

function parseList(value: string) {
  return value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function PortfolioAdminEditor({ initialArts, initialWebProjects }: Props) {
  const [arts, setArts] = useState(initialArts);
  const [artForm, setArtForm] = useState(emptyArtForm);
  const [webProjects, setWebProjects] = useState(initialWebProjects);
  const [webForm, setWebForm] = useState(emptyWebForm);
  const [feedback, setFeedback] = useState<string | null>(null);

  async function saveArt(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = {
      ...artForm,
      slug: artForm.slug || slugify(artForm.title),
      tools: parseList(artForm.toolsText),
      gallery: parseList(artForm.galleryText),
    };

    const res = await fetch("/api/admin/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "art", payload }),
    });

    const result = await res.json();
    if (!res.ok || !result.ok) {
      setFeedback(result.message || "Не удалось сохранить арт-работу");
      return;
    }

    if (artForm.id) {
      setArts((current) => current.map((item) => (item.id === artForm.id ? { ...item, ...payload } : item)));
    } else {
      setArts((current) => [{ ...payload, id: `${Date.now()}` } as ArtRecord, ...current]);
    }

    setArtForm(emptyArtForm);
    setFeedback("Арт-работа сохранена");
  }

  async function editArt(item: ArtRecord) {
    setArtForm({
      id: item.id,
      slug: item.slug,
      title: item.title,
      category: item.category,
      summary: item.summary,
      description: item.description,
      story: item.story,
      toolsText: item.tools.join(", "),
      cover: item.cover,
      galleryText: item.gallery.join(", "),
    });
    setFeedback(null);
  }

  async function deleteArt(id: string) {
    const res = await fetch("/api/admin/portfolio", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "art", id }),
    });
    const result = await res.json();
    if (!res.ok || !result.ok) {
      setFeedback(result.message || "Не удалось удалить арт-работу");
      return;
    }
    setArts((current) => current.filter((item) => item.id !== id));
    setFeedback("Арт-работа удалена");
  }

  async function saveWeb(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = {
      ...webForm,
      slug: webForm.slug || slugify(webForm.title),
      goals: parseList(""),
      technologies: parseList(webForm.technologiesText),
      features: parseList(webForm.featuresText),
    };

    const res = await fetch("/api/admin/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "web", payload }),
    });

    const result = await res.json();
    if (!res.ok || !result.ok) {
      setFeedback(result.message || "Не удалось сохранить web-кейс");
      return;
    }

    if (webForm.id) {
      setWebProjects((current) => current.map((item) => (item.id === webForm.id ? { ...item, ...payload } : item)));
    } else {
      setWebProjects((current) => [{ ...payload, id: `${Date.now()}` } as WebRecord, ...current]);
    }

    setWebForm(emptyWebForm);
    setFeedback("Web-кейс сохранён");
  }

  async function editWeb(item: WebRecord) {
    setWebForm({
      id: item.id,
      slug: item.slug,
      title: item.title,
      type: item.type,
      summary: item.summary,
      brief: item.brief,
      challenge: item.challenge,
      solution: item.solution,
      process_research: item.process_research,
      process_structure: item.process_structure,
      process_prototyping: item.process_prototyping,
      process_ui: item.process_ui,
      gallery_home: item.gallery_home,
      gallery_inner: item.gallery_inner,
      gallery_responsive: item.gallery_responsive,
      gallery_ui: item.gallery_ui,
      technologiesText: item.technologies.join(", "),
      featuresText: item.features.join(", "),
      live_url: item.live_url,
      result: item.result,
      cover: item.cover,
    });
    setFeedback(null);
  }

  async function deleteWeb(id: string) {
    const res = await fetch("/api/admin/portfolio", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "web", id }),
    });
    const result = await res.json();
    if (!res.ok || !result.ok) {
      setFeedback(result.message || "Не удалось удалить web-кейс");
      return;
    }
    setWebProjects((current) => current.filter((item) => item.id !== id));
    setFeedback("Web-кейс удалён");
  }

  return (
    <div className="space-y-8">
      {feedback ? <div className="rounded-2xl border border-[#ff1a4d]/30 bg-[#111116]/90 px-4 py-3 text-sm text-[#ffb7c4]">{feedback}</div> : null}

      <section className="rounded-[28px] border border-white/10 bg-[#09090f]/80 p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-[#f8f5f5]">ART</h2>
            <p className="mt-2 text-sm text-[#b9b2bc]">Создание и правка арт-работ.</p>
          </div>
          <span className="rounded-full bg-[#ff1a4d]/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-[#ff9bb1]">{arts.length} записей</span>
        </div>

        <form onSubmit={saveArt} className="mt-6 grid gap-4 lg:grid-cols-2">
          <input value={artForm.slug} onChange={(event) => setArtForm((current) => ({ ...current, slug: event.target.value }))} className="rounded-2xl border border-white/10 bg-[#0b0a0f] px-4 py-3 text-sm text-[#f8f5f5]" placeholder="slug" />
          <input value={artForm.title} onChange={(event) => setArtForm((current) => ({ ...current, title: event.target.value }))} className="rounded-2xl border border-white/10 bg-[#0b0a0f] px-4 py-3 text-sm text-[#f8f5f5]" placeholder="Название" required />
          <input value={artForm.category} onChange={(event) => setArtForm((current) => ({ ...current, category: event.target.value }))} className="rounded-2xl border border-white/10 bg-[#0b0a0f] px-4 py-3 text-sm text-[#f8f5f5]" placeholder="Категория" />
          <input value={artForm.cover} onChange={(event) => setArtForm((current) => ({ ...current, cover: event.target.value }))} className="rounded-2xl border border-white/10 bg-[#0b0a0f] px-4 py-3 text-sm text-[#f8f5f5]" placeholder="Cover URL" />
          <textarea value={artForm.summary} onChange={(event) => setArtForm((current) => ({ ...current, summary: event.target.value }))} className="rounded-2xl border border-white/10 bg-[#0b0a0f] px-4 py-3 text-sm text-[#f8f5f5] lg:col-span-2" rows={3} placeholder="Краткое описание" />
          <textarea value={artForm.description} onChange={(event) => setArtForm((current) => ({ ...current, description: event.target.value }))} className="rounded-2xl border border-white/10 bg-[#0b0a0f] px-4 py-3 text-sm text-[#f8f5f5] lg:col-span-2" rows={4} placeholder="Полное описание" />
          <textarea value={artForm.story} onChange={(event) => setArtForm((current) => ({ ...current, story: event.target.value }))} className="rounded-2xl border border-white/10 bg-[#0b0a0f] px-4 py-3 text-sm text-[#f8f5f5] lg:col-span-2" rows={4} placeholder="История / идея" />
          <textarea value={artForm.toolsText} onChange={(event) => setArtForm((current) => ({ ...current, toolsText: event.target.value }))} className="rounded-2xl border border-white/10 bg-[#0b0a0f] px-4 py-3 text-sm text-[#f8f5f5]" rows={3} placeholder="Инструменты (через запятую или новую строку)" />
          <textarea value={artForm.galleryText} onChange={(event) => setArtForm((current) => ({ ...current, galleryText: event.target.value }))} className="rounded-2xl border border-white/10 bg-[#0b0a0f] px-4 py-3 text-sm text-[#f8f5f5]" rows={3} placeholder="Ссылки на галерею (через запятую или новую строку)" />
          <div className="flex gap-3 lg:col-span-2">
            <button type="submit" className="rounded-full bg-[#ff1a4d] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white">Сохранить</button>
            <button type="button" onClick={() => setArtForm(emptyArtForm)} className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#f8f5f5]">Очистить</button>
          </div>
        </form>

        <div className="mt-6 space-y-3">
          {arts.map((item) => (
            <div key={item.id} className="flex flex-col gap-3 rounded-[20px] border border-white/10 bg-[#0b0a0f]/70 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#f8f5f5]">{item.title}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.28em] text-[#8f8a91]">{item.slug}</p>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => editArt(item)} className="rounded-full border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.2em] text-[#f8f5f5]">Редактировать</button>
                <button type="button" onClick={() => deleteArt(item.id)} className="rounded-full border border-[#ff1a4d]/40 px-3 py-2 text-xs uppercase tracking-[0.2em] text-[#ff9bb1]">Удалить</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[28px] border border-white/10 bg-[#09090f]/80 p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-[#f8f5f5]">WEB</h2>
            <p className="mt-2 text-sm text-[#b9b2bc]">Создание и правка web-кейсов.</p>
          </div>
          <span className="rounded-full bg-[#ff1a4d]/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-[#ff9bb1]">{webProjects.length} записей</span>
        </div>

        <form onSubmit={saveWeb} className="mt-6 grid gap-4 lg:grid-cols-2">
          <input value={webForm.slug} onChange={(event) => setWebForm((current) => ({ ...current, slug: event.target.value }))} className="rounded-2xl border border-white/10 bg-[#0b0a0f] px-4 py-3 text-sm text-[#f8f5f5]" placeholder="slug" />
          <input value={webForm.title} onChange={(event) => setWebForm((current) => ({ ...current, title: event.target.value }))} className="rounded-2xl border border-white/10 bg-[#0b0a0f] px-4 py-3 text-sm text-[#f8f5f5]" placeholder="Название" required />
          <input value={webForm.type} onChange={(event) => setWebForm((current) => ({ ...current, type: event.target.value }))} className="rounded-2xl border border-white/10 bg-[#0b0a0f] px-4 py-3 text-sm text-[#f8f5f5]" placeholder="Тип проекта" />
          <input value={webForm.cover} onChange={(event) => setWebForm((current) => ({ ...current, cover: event.target.value }))} className="rounded-2xl border border-white/10 bg-[#0b0a0f] px-4 py-3 text-sm text-[#f8f5f5]" placeholder="Cover URL" />
          <input value={webForm.live_url} onChange={(event) => setWebForm((current) => ({ ...current, live_url: event.target.value }))} className="rounded-2xl border border-white/10 bg-[#0b0a0f] px-4 py-3 text-sm text-[#f8f5f5]" placeholder="Live URL" />
          <textarea value={webForm.summary} onChange={(event) => setWebForm((current) => ({ ...current, summary: event.target.value }))} className="rounded-2xl border border-white/10 bg-[#0b0a0f] px-4 py-3 text-sm text-[#f8f5f5] lg:col-span-2" rows={3} placeholder="Краткое описание" />
          <textarea value={webForm.brief} onChange={(event) => setWebForm((current) => ({ ...current, brief: event.target.value }))} className="rounded-2xl border border-white/10 bg-[#0b0a0f] px-4 py-3 text-sm text-[#f8f5f5] lg:col-span-2" rows={3} placeholder="Бриф" />
          <textarea value={webForm.challenge} onChange={(event) => setWebForm((current) => ({ ...current, challenge: event.target.value }))} className="rounded-2xl border border-white/10 bg-[#0b0a0f] px-4 py-3 text-sm text-[#f8f5f5] lg:col-span-2" rows={3} placeholder="Задача" />
          <textarea value={webForm.solution} onChange={(event) => setWebForm((current) => ({ ...current, solution: event.target.value }))} className="rounded-2xl border border-white/10 bg-[#0b0a0f] px-4 py-3 text-sm text-[#f8f5f5] lg:col-span-2" rows={3} placeholder="Решение" />
          <textarea value={webForm.process_research} onChange={(event) => setWebForm((current) => ({ ...current, process_research: event.target.value }))} className="rounded-2xl border border-white/10 bg-[#0b0a0f] px-4 py-3 text-sm text-[#f8f5f5]" rows={3} placeholder="Исследование" />
          <textarea value={webForm.process_structure} onChange={(event) => setWebForm((current) => ({ ...current, process_structure: event.target.value }))} className="rounded-2xl border border-white/10 bg-[#0b0a0f] px-4 py-3 text-sm text-[#f8f5f5]" rows={3} placeholder="Структура" />
          <textarea value={webForm.process_prototyping} onChange={(event) => setWebForm((current) => ({ ...current, process_prototyping: event.target.value }))} className="rounded-2xl border border-white/10 bg-[#0b0a0f] px-4 py-3 text-sm text-[#f8f5f5]" rows={3} placeholder="Прототип" />
          <textarea value={webForm.process_ui} onChange={(event) => setWebForm((current) => ({ ...current, process_ui: event.target.value }))} className="rounded-2xl border border-white/10 bg-[#0b0a0f] px-4 py-3 text-sm text-[#f8f5f5]" rows={3} placeholder="UI" />
          <textarea value={webForm.technologiesText} onChange={(event) => setWebForm((current) => ({ ...current, technologiesText: event.target.value }))} className="rounded-2xl border border-white/10 bg-[#0b0a0f] px-4 py-3 text-sm text-[#f8f5f5]" rows={3} placeholder="Технологии (через запятую)" />
          <textarea value={webForm.featuresText} onChange={(event) => setWebForm((current) => ({ ...current, featuresText: event.target.value }))} className="rounded-2xl border border-white/10 bg-[#0b0a0f] px-4 py-3 text-sm text-[#f8f5f5]" rows={3} placeholder="Фичи (через запятую)" />
          <textarea value={webForm.result} onChange={(event) => setWebForm((current) => ({ ...current, result: event.target.value }))} className="rounded-2xl border border-white/10 bg-[#0b0a0f] px-4 py-3 text-sm text-[#f8f5f5] lg:col-span-2" rows={3} placeholder="Итог" />
          <div className="flex gap-3 lg:col-span-2">
            <button type="submit" className="rounded-full bg-[#ff1a4d] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white">Сохранить</button>
            <button type="button" onClick={() => setWebForm(emptyWebForm)} className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#f8f5f5]">Очистить</button>
          </div>
        </form>

        <div className="mt-6 space-y-3">
          {webProjects.map((item) => (
            <div key={item.id} className="flex flex-col gap-3 rounded-[20px] border border-white/10 bg-[#0b0a0f]/70 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#f8f5f5]">{item.title}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.28em] text-[#8f8a91]">{item.slug}</p>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => editWeb(item)} className="rounded-full border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.2em] text-[#f8f5f5]">Редактировать</button>
                <button type="button" onClick={() => deleteWeb(item.id)} className="rounded-full border border-[#ff1a4d]/40 px-3 py-2 text-xs uppercase tracking-[0.2em] text-[#ff9bb1]">Удалить</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
