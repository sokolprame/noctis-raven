import { query } from "./db";

export type ArtRecord = {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  story: string;
  tools: string[];
  cover: string;
  gallery: string[];
  created_at?: string;
};

export type WebRecord = {
  id: string;
  slug: string;
  title: string;
  type: string;
  summary: string;
  brief: string;
  challenge: string;
  goals: string[];
  solution: string;
  process_research: string;
  process_structure: string;
  process_prototyping: string;
  process_ui: string;
  gallery_home: string;
  gallery_inner: string;
  gallery_responsive: string;
  gallery_ui: string;
  technologies: string[];
  features: string[];
  live_url: string;
  result: string;
  cover: string;
  created_at?: string;
};

function parseJson<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T[];
    } catch {
      return [] as T[];
    }
  }
  return [] as T[];
}

export async function getArts(): Promise<ArtRecord[]> {
  try {
    const result = await query(
      `SELECT id, slug, title, category, summary, description, story, tools, cover, gallery FROM arts ORDER BY created_at DESC`,
    );

    return result.rows.map((row) => ({
      ...(row as unknown as ArtRecord),
      tools: parseJson<string>(row.tools),
      gallery: parseJson<string>(row.gallery),
    }));
  } catch {
    return [];
  }
}

export async function getArtBySlug(slug: string): Promise<ArtRecord | null> {
  try {
    const result = await query(
      `SELECT id, slug, title, category, summary, description, story, tools, cover, gallery FROM arts WHERE slug = $1 LIMIT 1`,
      [slug],
    );

    if (!result.rows[0]) return null;

    const row = result.rows[0] as unknown as ArtRecord;
    return {
      ...row,
      tools: parseJson<string>(row.tools),
      gallery: parseJson<string>(row.gallery),
    };
  } catch {
    return null;
  }
}

export async function createArt(input: Omit<ArtRecord, "id" | "created_at">) {
  try {
    await query(
      `INSERT INTO arts (slug, title, category, summary, description, story, tools, cover, gallery) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [input.slug, input.title, input.category, input.summary, input.description, input.story, JSON.stringify(input.tools), input.cover, JSON.stringify(input.gallery)],
    );
  } catch {
    // ignore when DB is unavailable; admin UI should still render without crashing
  }
}

export async function updateArt(id: string, input: Partial<Omit<ArtRecord, "id" | "created_at">>) {
  const fields: string[] = [];
  const values: unknown[] = [];
  const columns = [
    ["slug", input.slug],
    ["title", input.title],
    ["category", input.category],
    ["summary", input.summary],
    ["description", input.description],
    ["story", input.story],
    ["tools", input.tools ? JSON.stringify(input.tools) : undefined],
    ["cover", input.cover],
    ["gallery", input.gallery ? JSON.stringify(input.gallery) : undefined],
  ] as const;

  for (const [column, value] of columns) {
    if (value !== undefined) {
      fields.push(`${column} = $${fields.length + 2}`);
      values.push(value);
    }
  }

  if (fields.length === 0) return;

  values.unshift(id);
  await query(`UPDATE arts SET ${fields.join(", ")} WHERE id = $1`, values);
}

export async function deleteArt(id: string) {
  await query(`DELETE FROM arts WHERE id = $1`, [id]);
}

export async function getWebProjects(): Promise<WebRecord[]> {
  try {
    const result = await query(
      `SELECT id, slug, title, type, summary, brief, challenge, goals, solution, process_research, process_structure, process_prototyping, process_ui, gallery_home, gallery_inner, gallery_responsive, gallery_ui, technologies, features, live_url, result, cover FROM web_projects ORDER BY created_at DESC`,
    );

    return result.rows.map((row) => ({
      ...(row as unknown as WebRecord),
      goals: parseJson<string>(row.goals),
      technologies: parseJson<string>(row.technologies),
      features: parseJson<string>(row.features),
    }));
  } catch {
    return [];
  }
}

export async function getWebProjectBySlug(slug: string): Promise<WebRecord | null> {
  try {
    const result = await query(
      `SELECT id, slug, title, type, summary, brief, challenge, goals, solution, process_research, process_structure, process_prototyping, process_ui, gallery_home, gallery_inner, gallery_responsive, gallery_ui, technologies, features, live_url, result, cover FROM web_projects WHERE slug = $1 LIMIT 1`,
      [slug],
    );

    if (!result.rows[0]) return null;

    const row = result.rows[0] as unknown as WebRecord;
    return {
      ...row,
      goals: parseJson<string>(row.goals),
      technologies: parseJson<string>(row.technologies),
      features: parseJson<string>(row.features),
    };
  } catch {
    return null;
  }
}

export async function createWebProject(input: Omit<WebRecord, "id" | "created_at">) {
  try {
    await query(
      `INSERT INTO web_projects (slug, title, type, summary, brief, challenge, goals, solution, process_research, process_structure, process_prototyping, process_ui, gallery_home, gallery_inner, gallery_responsive, gallery_ui, technologies, features, live_url, result, cover) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)`,
      [input.slug, input.title, input.type, input.summary, input.brief, input.challenge, JSON.stringify(input.goals), input.solution, input.process_research, input.process_structure, input.process_prototyping, input.process_ui, input.gallery_home, input.gallery_inner, input.gallery_responsive, input.gallery_ui, JSON.stringify(input.technologies), JSON.stringify(input.features), input.live_url, input.result, input.cover],
    );
  } catch {
    // ignore when DB is unavailable; admin UI should still render without crashing
  }
}

export async function updateWebProject(id: string, input: Partial<Omit<WebRecord, "id" | "created_at">>) {
  const fields: string[] = [];
  const values: unknown[] = [];
  const columns = [
    ["slug", input.slug],
    ["title", input.title],
    ["type", input.type],
    ["summary", input.summary],
    ["brief", input.brief],
    ["challenge", input.challenge],
    ["goals", input.goals ? JSON.stringify(input.goals) : undefined],
    ["solution", input.solution],
    ["process_research", input.process_research],
    ["process_structure", input.process_structure],
    ["process_prototyping", input.process_prototyping],
    ["process_ui", input.process_ui],
    ["gallery_home", input.gallery_home],
    ["gallery_inner", input.gallery_inner],
    ["gallery_responsive", input.gallery_responsive],
    ["gallery_ui", input.gallery_ui],
    ["technologies", input.technologies ? JSON.stringify(input.technologies) : undefined],
    ["features", input.features ? JSON.stringify(input.features) : undefined],
    ["live_url", input.live_url],
    ["result", input.result],
    ["cover", input.cover],
  ] as const;

  for (const [column, value] of columns) {
    if (value !== undefined) {
      fields.push(`${column} = $${fields.length + 2}`);
      values.push(value);
    }
  }

  if (fields.length === 0) return;

  values.unshift(id);
  await query(`UPDATE web_projects SET ${fields.join(", ")} WHERE id = $1`, values);
}

export async function deleteWebProject(id: string) {
  await query(`DELETE FROM web_projects WHERE id = $1`, [id]);
}
