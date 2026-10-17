import Link from "next/link";
import PageHeader from "@/components/admin/PageHeader";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/format";

async function count(supabase, table, filter) {
  let query = supabase.from(table).select("*", { count: "exact", head: true });
  if (filter) query = filter(query);
  const { count } = await query;
  return count ?? 0;
}

export default async function Overview() {
  const supabase = await createClient();
  const [published, drafts, entries, skills, certs, latest] = await Promise.all([
    count(supabase, "projects", (q) => q.eq("status", "published")),
    count(supabase, "projects", (q) => q.eq("status", "draft")),
    count(supabase, "learning_log"),
    count(supabase, "skills"),
    count(supabase, "certifications"),
    supabase.from("learning_log").select("entry_date, title").order("entry_date", { ascending: false }).limit(1).maybeSingle(),
  ]);

  const lastEntry = latest.data;
  const daysSince = lastEntry
    ? Math.floor((Date.parse(new Date().toISOString().slice(0, 10)) - Date.parse(lastEntry.entry_date)) / 86400000)
    : null;

  const stats = [
    { label: "Published projects", value: published, href: "/admin/projects" },
    { label: "Drafts", value: drafts, href: "/admin/projects" },
    { label: "Learning entries", value: entries, href: "/admin/log" },
    { label: "Skills", value: skills, href: "/admin/skills" },
    { label: "Certifications", value: certs, href: "/admin/certifications" },
  ];

  return (
    <>
      <PageHeader title="Welcome back 👋" description="Keep the portfolio alive: small, regular updates beat big rare ones." />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="rounded-2xl border border-line bg-surface p-5 transition hover:-translate-y-0.5 hover:border-accent">
            <p className="font-display text-3xl font-bold text-navy">{stat.value}</p>
            <p className="mt-1 text-sm text-muted">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className={`mt-8 rounded-2xl border p-6 ${daysSince === null || daysSince > 14 ? "border-sun/40 bg-sun/10" : "border-leaf/30 bg-leaf/10"}`}>
        <h2 className="font-semibold text-navy">Learning Log freshness</h2>
        <p className="mt-1 text-ink">
          {lastEntry
            ? `Last entry: "${lastEntry.title}" on ${formatDate(lastEntry.entry_date, { day: "numeric", month: "long", year: "numeric" })} (${daysSince} day${daysSince === 1 ? "" : "s"} ago).`
            : "No entries yet."}{" "}
          {(daysSince === null || daysSince > 14) && "Add something you learned this week — it keeps the “constantly growing” story true."}
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { href: "/admin/projects/new", label: "＋ New project" },
          { href: "/admin/log", label: "＋ Log something I learned" },
          { href: "/admin/profile", label: "Update profile & CV" },
        ].map((action) => (
          <Link key={action.href} href={action.href} className="rounded-2xl bg-navy p-5 font-medium text-white transition hover:-translate-y-0.5 hover:bg-accent">
            {action.label}
          </Link>
        ))}
      </div>
    </>
  );
}
