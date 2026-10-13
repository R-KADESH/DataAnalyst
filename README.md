# Portfolio — TAPOPHILE DJOUAKA Nathanael Caleb

Data analyst portfolio built with Next.js + Supabase.
Public site for recruiters, scholarship committees and data experts; private `/admin` dashboard to manage content.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## One-time Supabase setup

1. Create a free project at https://supabase.com.
2. **Database:** Dashboard → SQL Editor → New query → paste `supabase/schema.sql` → Run.
3. **Keys:** copy `.env.local.example` to `.env.local` and fill in the values from Project Settings → API.
4. **Your admin account:**
   - Authentication → Users → *Add user* → enter your email + a strong password (tick "Auto confirm").
   - Copy the new user's **UID**, then in the SQL Editor run:
     ```sql
     insert into admins (user_id) values ('PASTE-YOUR-UID-HERE');
     ```
5. **Lock sign-ups:** Authentication → Sign In / Providers → turn off *Allow new users to sign up*.

## Project structure

| Path | What it is |
|---|---|
| `app/` | Pages (public site, later `/admin`) |
| `lib/supabase/` | Database connections: `public.js` (cached public reads), `server.js` (admin, server), `client.js` (browser) |
| `proxy.js` | Redirects logged-out visitors away from `/admin` |
| `supabase/schema.sql` | Tables, security rules, storage bucket, starter content |
| `app/globals.css` | Color theme (navy + green) and animations |
| `components/` | Page sections (Hero, ProjectCard, LearningLog, Skills…) and animations (Reveal, Counter) |
| `lib/content.js` | Starter content, shown until Supabase is connected |
| `lib/data.js` | Reads content from Supabase (cached) |
| `projects/` | Raw project files + `UPGRADE.md` practice plans (not in git) |
