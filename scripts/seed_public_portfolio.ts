import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

async function seed() {
  const { portfolioProjects } = await import("../lib/site-data");
  const { query } = await import("../lib/db");
  for (const [index, project] of portfolioProjects.entries()) {
    await query(
      "INSERT INTO public_portfolio_projects (slug, content, status, featured, sort_order) VALUES ($1, $2::jsonb, 'published', $3, $4) ON CONFLICT (slug) DO NOTHING",
      [project.slug, JSON.stringify(project), index === 0, index],
    );
    console.log(`Imported if missing: ${project.slug}`);
  }
}

seed().catch((error) => {
  console.error("Public portfolio import failed. Apply migrations/004_public_portfolio.sql and configure DATABASE_URL first.", error);
  process.exitCode = 1;
});
