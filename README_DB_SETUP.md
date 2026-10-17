# PostgreSQL configuration

1. Create a PostgreSQL 15+ database, for example `noctis_raven`.
2. Copy `.env.example` to `.env.local` and replace every placeholder. Generate `ADMIN_SESSION_SECRET` as a private random value with at least 32 characters (for example, `openssl rand -base64 48`). Use a unique, long admin password.
3. Apply `migrations/001_create_projects.sql`, `migrations/002_portfolio_tables.sql`, and `migrations/003_contact_requests.sql` in that order using pgAdmin Query Tool or `psql`.
4. Optionally seed legacy project records with `npm run seed`. Current public work and case pages are maintained in `lib/site-data.ts`.

Keep credentials out of source control. `.env.local` is ignored by Git.
