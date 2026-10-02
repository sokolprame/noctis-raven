import { query } from "./db";
import type { PortfolioItem } from "./data";

export async function getProjects(): Promise<PortfolioItem[]> {
  if (!process.env.DATABASE_URL) {
    return [
      {
        id: "1",
        title: "Raven Revenant",
        category: "Персонажи",
        description: "Тёмный фэнтезийный воин с кровавыми акцентами и кибернетической бронёй.",
        accent: "#ff1a4d",
        tags: ["аниме", "персонаж", "оружие"],
      },
      {
        id: "2",
        title: "Crimson Skyline",
        category: "Иллюстрации",
        description: "Городской пейзаж с готической энергией, неоновым туманом и металлическими отблесками.",
        accent: "#b3002d",
        tags: ["окружение", "настроение", "освещение"],
      },
      {
        id: "3",
        title: "Nexus Studio",
        category: "Веб-разработка",
        description: "Премиальный лендинг для элитной креативной студии.",
        accent: "#ff1a4d",
        tags: ["Next.js", "Tailwind", "motion"],
      },
    ];
  }

  const result = await query(
    `SELECT id, title, category, description, accent, tags FROM projects ORDER BY created_at DESC LIMIT 20`,
  );

  return result.rows.map((row) => {
    const project = row as unknown as PortfolioItem;
    return {
      ...project,
      tags: Array.isArray(project.tags) ? project.tags : JSON.parse(String(project.tags ?? "[]")),
    };
  });
}
