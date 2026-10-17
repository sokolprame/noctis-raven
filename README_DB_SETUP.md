# PostgreSQL configuration

1. Create a PostgreSQL 15+ database, for example `noctis_raven`.
2. Copy `.env.example` to `.env.local` and replace every placeholder. Generate `ADMIN_SESSION_SECRET` as a private random value with at least 32 characters (for example, `openssl rand -base64 48`). Use a unique, long admin password.
3. Apply `migrations/003_contact_requests.sql` using pgAdmin Query Tool or `psql` to enable contact submissions and the admin inbox.
4. Public work and case pages are maintained in `lib/site-data.ts`. The project catalog tables and seed scripts are legacy features and are not used to render the public pages.

Keep credentials out of source control. `.env.local` is ignored by Git.
