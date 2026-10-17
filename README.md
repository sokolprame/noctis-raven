# NOCTIS RAVEN

Bilingual portfolio built with Next.js 16, React 19, and Tailwind CSS 4.

## Local development

1. Install Node.js 20.9 or later and PostgreSQL 15 or later.
2. Copy `.env.example` to `.env.local`; set `DATABASE_URL`, `ADMIN_PASSWORD`, and a random `ADMIN_SESSION_SECRET` of at least 32 characters.
3. Create the database named in `DATABASE_URL`, then apply migrations `001_create_projects.sql`, `002_portfolio_tables.sql`, and `003_contact_requests.sql` in order.
4. Install dependencies with `npm ci`, then run `npm run dev` and open <http://localhost:3000>.

For an optional PostgreSQL seed, run `npm run seed` after the schema is installed.

## Hosting

- Deploy as a Node.js Next.js application (for example, Vercel). Configure `DATABASE_URL`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET` in the host's encrypted environment settings. Never commit `.env.local` or production credentials.
- Apply all three SQL migrations to the production database before enabling contact submissions or the admin routes.
- Run `npm run build` as the deployment build command and `npm run start` for a self-hosted Node deployment. Set the deployment platform's Node version to 20.9 or later.
- The public project cards and case pages currently come from `lib/site-data.ts`. The protected admin portfolio endpoints use PostgreSQL but do not currently publish edits to those static case pages.
- Contact requests are saved in PostgreSQL. If the API is unavailable, the form opens a prefilled email draft addressed to `raven4noctis@gmail.com`.

## Content and languages

Edit project details in `lib/site-data.ts`. Pages support Russian and English through the `?lang=ru` and `?lang=en` query parameters.
