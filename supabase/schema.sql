-- =========================================================
-- Portfolio database schema
-- Run this once in Supabase: Dashboard → SQL Editor → New query → paste → Run
-- =========================================================

-- ---------- Helpers ----------

-- Keeps "updated_at" fresh automatically (powers the "Last updated" stamps)
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Only users listed here can write content (that's you)
create table if not exists admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);

create or replace function is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from admins where user_id = auth.uid());
$$;

-- ---------- Profile (single row) ----------
create table if not exists profile (
  id          int primary key default 1 check (id = 1),
  full_name   text not null,
  headline    text,
  availability text[] not null default '{Data analyst internships, Scholarships}',
  bio         text,
  journey     jsonb not null default '[]',  -- [{ "date": "2025", "title": "...", "description": "..." }]
  resume_url  text,
  email       text,
  linkedin    text,
  github      text,
  updated_at  timestamptz not null default now()
);

-- ---------- Projects ----------
create table if not exists projects (
  id               uuid primary key default gen_random_uuid(),
  slug             text unique not null,          -- used in the URL: /projects/bmw-sales
  title            text not null,
  summary          text,                          -- one-line result shown on the card
  problem          text,
  data_description text,
  approach         text,
  findings         text,
  impact           text,
  improvements     text,                          -- "what I'd do next" — experts love this
  tools            text[] not null default '{}',  -- e.g. {Python, SQL, Power BI}
  dataset_rows     bigint,                        -- rows analysed (feeds the hero counter)
  cover_image_url  text,
  github_url       text,
  notebook_url     text,
  live_url         text,
  featured         boolean not null default false,
  status           text not null default 'draft' check (status in ('draft', 'published')),
  sort_order       int not null default 0,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- ---------- Learning Log ----------
create table if not exists learning_log (
  id                 uuid primary key default gen_random_uuid(),
  entry_date         date not null default current_date,
  title              text not null,
  description        text,
  tags               text[] not null default '{}',
  related_project_id uuid references projects (id) on delete set null,
  created_at         timestamptz not null default now()
);

-- ---------- Skills ----------
-- "Used in N projects" is computed by matching skills.name with projects.tools
create table if not exists skills (
  id          uuid primary key default gen_random_uuid(),
  name        text unique not null,
  category    text not null default 'Other',  -- e.g. Languages, Visualization, Tools
  started_on  date,                           -- powers the growth chart
  created_at  timestamptz not null default now()
);

-- ---------- Certifications ----------
create table if not exists certifications (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  issuer         text,
  issued_on      date,
  credential_url text,
  created_at     timestamptz not null default now()
);

-- ---------- updated_at triggers ----------
drop trigger if exists trg_profile_updated on profile;
create trigger trg_profile_updated before update on profile
  for each row execute function set_updated_at();

drop trigger if exists trg_projects_updated on projects;
create trigger trg_projects_updated before update on projects
  for each row execute function set_updated_at();

-- =========================================================
-- Security (Row Level Security)
-- Everyone can READ public content; only admins can WRITE.
-- =========================================================
alter table admins         enable row level security;
alter table profile        enable row level security;
alter table projects       enable row level security;
alter table learning_log   enable row level security;
alter table skills         enable row level security;
alter table certifications enable row level security;

create policy "admins read self" on admins for select using (user_id = auth.uid());

create policy "public read profile" on profile for select using (true);
create policy "admin write profile" on profile for all using (is_admin()) with check (is_admin());

-- Visitors only see published projects; you see drafts too
create policy "public read projects" on projects for select using (status = 'published' or is_admin());
create policy "admin write projects" on projects for all using (is_admin()) with check (is_admin());

create policy "public read log" on learning_log for select using (true);
create policy "admin write log" on learning_log for all using (is_admin()) with check (is_admin());

create policy "public read skills" on skills for select using (true);
create policy "admin write skills" on skills for all using (is_admin()) with check (is_admin());

create policy "public read certs" on certifications for select using (true);
create policy "admin write certs" on certifications for all using (is_admin()) with check (is_admin());

-- =========================================================
-- Storage: one public bucket for images and the CV
-- =========================================================
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

create policy "public read portfolio files" on storage.objects
  for select using (bucket_id = 'portfolio');
create policy "admin upload portfolio files" on storage.objects
  for insert with check (bucket_id = 'portfolio' and is_admin());
create policy "admin update portfolio files" on storage.objects
  for update using (bucket_id = 'portfolio' and is_admin());
create policy "admin delete portfolio files" on storage.objects
  for delete using (bucket_id = 'portfolio' and is_admin());

-- =========================================================
-- Starter content (edit everything later from /admin)
-- =========================================================
insert into profile (id, full_name, headline, bio, journey)
values (
  1,
  'TAPOPHILE DJOUAKA Nathanael Caleb',
  'Aspiring Data Analyst — turning raw data into clear decisions',
  'I build dashboards and analyses that make data easy to act on. I''m learning in public: every project, course and fix is logged below, so you can see how my skills grow week by week.',
  '[
    {"date": "2026", "title": "Started my data analytics journey", "description": "Excel, SQL and Power BI fundamentals through hands-on projects."},
    {"date": "2026", "title": "First dashboards", "description": "From a first Power BI report to a 50,000-row Excel dashboard."},
    {"date": "Next", "title": "Internship & scholarship", "description": "Bringing this dedication to a real data team — and to further studies."}
  ]'::jsonb
)
on conflict (id) do nothing;

-- Your two featured projects, with their full case-study text
insert into projects (slug, title, summary, problem, data_description, approach, findings, impact, improvements, tools, dataset_rows, cover_image_url, featured, status, sort_order)
values
  ('bmw-sales',
   'BMW Sales 2010–2024',
   'Interactive Excel dashboard over 50,000 sales records: 11 models, 6 regions, 15 years.',
   'How do sales volumes differ by model, region, fuel type and year — and can a manager explore that in seconds without touching formulas?',
   '50,000 sales records (2010–2024) with model, year, region, colour, fuel type, transmission, engine size, mileage, price and sales volume. The distribution is almost perfectly even across categories, which suggests a synthetic dataset — so the project focuses on dashboard building, not real BMW strategy.',
   'Cleaned the data in a working sheet, summarised it with pivot tables, then built a one-page dashboard with KPI cards and slicers (sales class, fuel type, region, year) that drive every chart at once.',
   'Asia is the top region (≈43.0M units) and the 7 Series the best-selling model (≈23.8M units), but every region and model sits within about ±3% of the others. Yearly sales stay between 16.3M and 17.9M, peaking in 2022.',
   'A stakeholder can answer "how did X sell in Y?" with two clicks instead of writing formulas.',
   'Use estimated revenue (price × volume) instead of summing prices, start bar-chart axes at zero, and rebuild the dashboard in Power BI to compare both tools.',
   '{"Excel","Pivot Tables","Data Visualization"}',
   50000,
   '/projects/bmw-sales.png',
   true,
   'published',
   1),
  ('data-jobs-survey',
   'Data Jobs Survey',
   'Power BI report on 630 data professionals: salaries, favourite languages and job satisfaction.',
   'What do data professionals earn, which tools do they prefer, and how happy are they with their jobs?',
   'A survey of 630 data professionals worldwide: job title, salary range, favourite programming language, country, age and satisfaction scores (0–10).',
   'Transformed the survey in Power Query (splitting salary ranges, averaging them, cleaning job titles), then designed a single-page report with a treemap, bar charts, a donut and gauges in a consistent navy/green palette.',
   'Python is the clear favourite (≈2 in 3 respondents). Data Scientists report the highest average salary (≈$77k), Data Analysts ≈$41k. Satisfaction is moderate: 5.7/10 for work-life balance and only 4.3/10 for salary.',
   'Shows at a glance which roles pay most and which skills are most in demand — useful for anyone (like me) planning a data career.',
   'Rename raw survey field titles, label salaries in $k, add a country slicer and publish a live version to Power BI Service.',
   '{"Power BI","Power Query","Data Visualization"}',
   630,
   '/projects/data-jobs-survey.png',
   true,
   'published',
   2)
on conflict (slug) do nothing;

insert into learning_log (entry_date, title, description, tags)
select * from (values
  ('2026-05-06'::date, 'Practice databases in MySQL', 'Set up two databases (company HR & sales, theological research) to practise SQL from beginner to advanced.', '{SQL, MySQL}'::text[]),
  ('2026-08-21', 'BMW sales dashboard', '50,000 records, pivot tables, KPI cards and slicers in Excel.', '{Excel}'),
  ('2026-09-21', 'My first Power BI report', 'Tables and a monthly sales chart on a practice store dataset.', '{Power BI}'),
  ('2026-09-22', 'Star schema data model', 'Built a sales model with one fact table and five dimension tables.', '{Power BI, Data Modeling}'),
  ('2026-09-30', 'Data Jobs Survey — first version', 'Treemap, gauges and Power Query transformations on 630 survey answers.', '{Power BI, Power Query}'),
  ('2026-10-11', 'Redesigned the Data Jobs Survey report', 'New consistent navy/green palette and cleaner layout.', '{Power BI, Design}'),
  ('2026-10-11', 'Bike sales dashboard', 'Excel dashboard on ~1,000 customers: income, age brackets and commute distance vs. bike purchases.', '{Excel}'),
  ('2026-10-11', 'Portfolio review & redesign', 'Audited all my projects, found metric errors in my own dashboards and wrote an upgrade plan for each.', '{Review}')
) as v
where not exists (select 1 from learning_log);

insert into skills (name, category) values
  ('Excel', 'Analysis'), ('Pivot Tables', 'Analysis'), ('Power BI', 'Visualization'),
  ('Power Query', 'Data Preparation'), ('Data Visualization', 'Visualization'),
  ('SQL', 'Databases'), ('Data Modeling', 'Databases')
on conflict (name) do nothing;
