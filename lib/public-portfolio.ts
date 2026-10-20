import { query } from "@/lib/db";
import { portfolioProjects, type PortfolioItem } from "@/lib/site-data";

export type ProjectStatus = "draft" | "published";
export type ManagedProject = {
  id: string;
  content: PortfolioItem;
  status: ProjectStatus;
  featured: boolean;
  sortOrder: number;
  updatedAt: string;
};

type DbProject = { id: string; slug: string; content: PortfolioItem; status: ProjectStatus; featured: boolean; sort_order: number; updated_at: Date | string };
const fallback = (): ManagedProject[] => portfolioProjects.map((content, index) => ({ id: `static-${content.slug}`, content, status: "published", featured: index === 0, sortOrder: index, updatedAt: "" }));

function fromRow(row: DbProject): ManagedProject {
  return { id: row.id, content: { ...row.content, slug: row.slug }, status: row.status, featured: row.featured, sortOrder: row.sort_order, updatedAt: new Date(row.updated_at).toISOString() };
}

async function readProjects(where: string, params: unknown[] = []): Promise<ManagedProject[]> {
  try {
    const result = await query(`SELECT id, slug, content, status, featured, sort_order, updated_at FROM public_portfolio_projects ${where} ORDER BY featured DESC, sort_order ASC, updated_at DESC`, params);
    return (result.rows as unknown as DbProject[]).map(fromRow);
  } catch {
    return fallback();
  }
}

export async function getPublicPortfolioProjects() {
  return (await readProjects("WHERE status = 'published'")).map((item) => item.content);
}

export async function getManagedPortfolioProjects() {
  return readProjects("");
}

export async function getPublishedProjectBySlug(slug: string) {
  try {
    const result = await query("SELECT id, slug, content, status, featured, sort_order, updated_at FROM public_portfolio_projects WHERE slug = $1 AND status = 'published' LIMIT 1", [slug]);
    if (result.rows[0]) return fromRow(result.rows[0] as unknown as DbProject).content;
    return undefined;
  } catch {
    return portfolioProjects.find((project) => project.slug === slug);
  }
}

export async function saveManagedProject(input: { id?: string; content: PortfolioItem; status: ProjectStatus; featured: boolean; sortOrder: number }) {
  if (input.id) {
    const result = await query("UPDATE public_portfolio_projects SET slug = $2, content = $3::jsonb, status = $4, featured = $5, sort_order = $6, updated_at = NOW() WHERE id = $1 RETURNING id, slug, content, status, featured, sort_order, updated_at", [input.id, input.content.slug, JSON.stringify(input.content), input.status, input.featured, input.sortOrder]);
    return result.rows[0] ? fromRow(result.rows[0] as unknown as DbProject) : null;
  }
  const result = await query("INSERT INTO public_portfolio_projects (slug, content, status, featured, sort_order) VALUES ($1, $2::jsonb, $3, $4, $5) RETURNING id, slug, content, status, featured, sort_order, updated_at", [input.content.slug, JSON.stringify(input.content), input.status, input.featured, input.sortOrder]);
  return fromRow(result.rows[0] as unknown as DbProject);
}

export async function setProjectStatus(id: string, status: ProjectStatus) {
  const result = await query("UPDATE public_portfolio_projects SET status = $2, updated_at = NOW() WHERE id = $1 RETURNING id", [id, status]);
  return result.rowCount === 1;
}
