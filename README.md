# NOCTIS RAVEN

Bilingual creative portfolio built with Next.js 16, React 19, and Tailwind CSS 4.

## Run locally

1. Install Node.js 20.9 or later.
2. Copy `.env.example` to `.env.local` and replace the example values.
3. Create a PostgreSQL 15+ database, set `DATABASE_URL`, then apply `migrations/003_contact_requests.sql` to enable the contact form inbox.
4. Install packages with `npm ci` and run `npm run dev`. Open <http://localhost:3000>.

The website itself can run without PostgreSQL. Without a database, the contact form offers a prefilled email draft and the admin inbox is unavailable.

## Deploy

Deploy this as a Node.js Next.js application. Use Node.js 20.9 or later, `npm run build` as the build command, and `npm run start` for a self-hosted deployment. Set these values in the host's encrypted environment settings:

- `SITE_URL`: the actual public URL for this deployment, including `https://`.
- `DATABASE_URL`: a PostgreSQL connection string. Apply `003_contact_requests.sql` first.
- `ADMIN_PASSWORD`: a unique, long password for `/admin`.
- `ADMIN_SESSION_SECRET`: a private random secret with at least 32 characters.

Never commit `.env.local` or production credentials. The public cases are maintained in `lib/site-data.ts`; update the details and image URLs there. `/admin/messages` displays contact requests stored in PostgreSQL. The project catalog admin routes are legacy and do not publish to the public case pages.

## Languages and content

Public pages support Russian and English with `?lang=ru` and `?lang=en`. Edit project content in `lib/site-data.ts` and social/contact details in the page components.
