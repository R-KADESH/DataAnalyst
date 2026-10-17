# DataAnalyst — Portfolio of TAPOPHILE DJOUAKA Nathanael Caleb

> My data analyst journey from beginner to expert.

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
3. **Keys:** copy `.env.local.example` to `.env.local` and fill in the Project URL and publishable (anon) key from Project Settings → API. Never use the `service_role` key here.
4. **Your admin account:**
   - Authentication → Users → *Add user* → enter your email + a strong password (tick "Auto confirm").
   - Copy the new user's **UID**, then in the SQL Editor run:
     ```sql
     insert into admins (user_id) values ('PASTE-YOUR-UID-HERE');
     ```
5. **Lock sign-ups:** Authentication → Sign In / Providers → turn off *Allow new users to sign up*.

## Using the dashboard

Open **http://localhost:3000/admin** (or `/admin` on the live site) and sign in with your admin user.

| Page | What you can do |
|---|---|
| Overview | Counts, Learning Log freshness reminder, quick actions |
| Projects | Add / edit / delete, upload a cover image, draft ↔ published, featured, order |
| Learning Log | Add dated entries, link them to a project |
| Skills | Add skills; a skill shows "Used in N projects" when its name matches a project's tools |
| Certifications | Shown under Skills on the site |
| Profile | Bio, availability badges, journey, contact links, CV upload (PDF) |

Every save refreshes the public site immediately.

## Go live on Vercel

1. Push this repository to GitHub (`git push`).
2. On https://vercel.com → **Add New → Project** → import `R-KADESH/DataAnalyst`.
3. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` → your Vercel address, e.g. `https://dataanalyst-yourname.vercel.app`
4. Click **Deploy**. Every later `git push` redeploys automatically.
5. In Supabase → **Authentication → URL Configuration**, set **Site URL** to the same address.
6. Share the link: LinkedIn and WhatsApp show the preview card from `app/opengraph-image.js`.

## Features at a glance

- Hero with photo, rotating role words, animated counters, availability badge
- Featured project cards → full case studies (question → data → approach → findings → impact → next steps)
- Live Power BI / Tableau embed when a project has a Publish-to-web link
- "Currently building" teasers for in-progress projects
- Learning Log with a momentum chart and "show more"
- Skills backed by project evidence, plus certifications
- SEO: share image, sitemap, robots, icon; custom 404
- Accessibility: skip link, focus outlines, reduced-motion support, chart table view

## Project structure

| Path | What it is |
|---|---|
| `app/` | Pages: public site, `app/admin/` dashboard (login + `(dashboard)` pages + `actions.js`) |
| `lib/supabase/` | Database connections: `public.js` (cached public reads), `server.js` (admin, server), `client.js` (browser) |
| `proxy.js` | Redirects logged-out visitors away from `/admin` |
| `supabase/schema.sql` | Tables, security rules, storage bucket, starter content |
| `app/globals.css` | Color theme (navy + green) and animations |
| `components/` | Page sections (Hero, ProjectCard, LearningLog, Skills…), animations, and `admin/` dashboard parts |
| `lib/content.js` | Starter content, shown until Supabase is connected |
| `lib/data.js` | Reads content from Supabase (cached) |
| `projects/` | Raw project files + `UPGRADE.md` practice plans (not in git) |
