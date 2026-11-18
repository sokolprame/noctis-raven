# NOCTIS RAVEN

Bilingual creative portfolio built with Next.js 16, React 19, and Tailwind CSS 4.

## Run locally

1. Install Node.js 20.9 or later.
2. Copy `.env.example` to `.env.local` and replace the example values.
3. Create a PostgreSQL 15+ database, set `DATABASE_URL`, then apply `migrations/003_contact_requests.sql` and `migrations/004_public_portfolio.sql`.
4. Install packages with `npm ci` and run `npm run dev`. Open <http://localhost:3000>.

The website can run without PostgreSQL using the two bundled public cases as a fallback. The contact form then offers a prefilled email draft; database-backed publishing and the admin inbox are unavailable.

## Deploy

Deploy this as a Node.js Next.js application. Use Node.js 20.9 or later, `npm run build` as the build command, and `npm run start` for a self-hosted deployment. Set these values in the host's encrypted environment settings:

- `SITE_URL`: the actual public URL for this deployment, including `https://`.
- `DATABASE_URL`: a PostgreSQL connection string. Apply `003_contact_requests.sql` and `004_public_portfolio.sql`.
- `ADMIN_PASSWORD`: a unique, long password for `/admin`.
- `ADMIN_SESSION_SECRET`: a private random secret with at least 32 characters.

Never commit `.env.local` or production credentials. After applying migration `004`, run `npm run seed:public` once to import the current bilingual cases without overwriting existing rows. Then use `/admin/portfolio` to add and edit cases, save drafts, publish, feature, and order them. Covers and gallery images accept public URLs or paths under `/public`; image hosting/upload is not configured. `/admin/messages` displays contact requests stored in PostgreSQL.

## Languages and content

Public pages support Russian and English with `?lang=ru` and `?lang=en`. `lib/site-data.ts` contains the fallback copy used until the PostgreSQL migration and initial import are complete. Social/contact details are in the page components.
