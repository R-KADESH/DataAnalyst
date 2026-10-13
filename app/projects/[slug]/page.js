import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Reveal from "@/components/Reveal";
import Tag from "@/components/Tag";
import { getProfile, getProject, getProjects } from "@/lib/data";
import { formatDate, initials } from "@/lib/format";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  return project ? { title: project.title, description: project.summary } : {};
}

// The case study follows the same story every time: question → data → method → results → next steps.
const sections = [
  { key: "problem", label: "The question" },
  { key: "data_description", label: "The data" },
  { key: "approach", label: "My approach" },
  { key: "findings", label: "Key findings" },
  { key: "impact", label: "Why it matters" },
  { key: "improvements", label: "What I'd improve next" },
];

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const [project, projects, profile] = await Promise.all([getProject(slug), getProjects(), getProfile()]);
  if (!project) notFound();

  const others = projects.filter((p) => p.slug !== slug);
  const links = [
    project.live_url && { label: "Live dashboard", href: project.live_url },
    project.github_url && { label: "Code on GitHub", href: project.github_url },
    project.notebook_url && { label: "Notebook", href: project.notebook_url },
  ].filter(Boolean);

  return (
    <>
      <Navbar initials={initials(profile.full_name)} />
      <main className="flex-1">
        <header className="relative isolate overflow-hidden bg-gradient-to-b from-accent-soft/70 to-background pt-32 pb-8 text-ink sm:pt-40">
          <div className="absolute -top-24 right-0 -z-10 h-96 w-96 rounded-full bg-sky/20 blur-3xl animate-float" />
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <Link href="/#projects" className="text-sm text-muted transition hover:text-accent">
              ← All projects
            </Link>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-navy sm:text-6xl">{project.title}</h1>
            <p className="mt-5 text-xl text-muted">{project.summary}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted">
              {project.dataset_rows && (
                <span className="rounded-full bg-navy px-3 py-1 font-mono text-white">
                  {Number(project.dataset_rows).toLocaleString("en-US")} rows
                </span>
              )}
              {project.updated_at && <span>Updated {formatDate(project.updated_at)}</span>}
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {project.cover_image_url && (
            <Reveal className="pt-6">
              <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl shadow-navy/20">
                <Image
                  src={project.cover_image_url}
                  alt={`${project.title} dashboard`}
                  width={1600}
                  height={1000}
                  sizes="(min-width: 896px) 896px, 100vw"
                  className="h-auto w-full"
                  priority
                />
              </div>
            </Reveal>
          )}

          <Reveal className="mt-10 flex flex-wrap gap-2">
            {project.tools?.map((tool) => (
              <Tag key={tool}>{tool}</Tag>
            ))}
          </Reveal>

          <div className="mt-12 space-y-12">
            {sections
              .filter((s) => project[s.key])
              .map((s, i) => (
                <Reveal key={s.key}>
                  <section className="grid gap-3 sm:grid-cols-[180px_1fr] sm:gap-8">
                    <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-accent">
                      <span className="mr-2 text-muted">{String(i + 1).padStart(2, "0")}</span>
                      {s.label}
                    </h2>
                    <p className="whitespace-pre-line text-lg leading-relaxed text-ink">{project[s.key]}</p>
                  </section>
                </Reveal>
              ))}
          </div>

          {links.length > 0 && (
            <Reveal className="mt-14 flex flex-wrap gap-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-navy px-6 py-3 font-medium text-white transition hover:-translate-y-0.5 hover:bg-accent"
                >
                  {link.label} ↗
                </a>
              ))}
            </Reveal>
          )}

          {others.length > 0 && (
            <Reveal className="my-20 border-t border-line pt-10">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">Next project</p>
              <Link
                href={`/projects/${others[0].slug}`}
                className="group mt-3 inline-flex items-center gap-3 font-display text-3xl font-bold text-ink transition hover:text-accent"
              >
                {others[0].title}
                <span className="transition-transform group-hover:translate-x-2">→</span>
              </Link>
            </Reveal>
          )}
        </div>
      </main>
      <Footer name={profile.full_name} lastUpdated={project.updated_at ?? "2026-01-01"} />
    </>
  );
}
