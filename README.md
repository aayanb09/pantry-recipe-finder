# MealMaker

A Vite + React app for browsing pantry-friendly recipe PDFs from The Food Bank for Central & Northeast Missouri.

## Shared Backend Setup

This app can use Supabase as a shared backend so admin-synced recipes appear for every visitor.

1. Create a Supabase project.
2. In the Supabase SQL editor, run [supabase/recipes_schema.sql](./supabase/recipes_schema.sql).
3. In Supabase Authentication, create at least one user with an email and password.
4. Mark that user as an admin in SQL:

```sql
insert into public.admin_users (user_id, email)
select id, email
from auth.users
where email = 'admin@example.com';
```
5. Copy [.env.example](./.env.example) to `.env` and fill in:

```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

6. Restart the dev server.

Notes:

- Public visitors can read recipes from Supabase.
- Admins sign in on `/admin` using a Supabase auth user that also exists in `public.admin_users`.
- If Supabase env vars are missing, the public site falls back to the bundled recipe list and the admin dashboard shows setup instructions.

## Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```
