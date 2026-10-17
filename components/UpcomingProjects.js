import Reveal from "@/components/Reveal";
import Tag from "@/components/Tag";

// Teaser cards for projects still in progress — shows what's coming next.
export default function UpcomingProjects({ projects }) {
  if (!projects.length) return null;

  return (
    <div className="mt-16">
      <Reveal className="mb-6 flex items-center gap-3">
        <h3 className="text-2xl font-bold text-navy">Currently building</h3>
        <span className="rounded-full bg-sun/15 px-3 py-1 text-xs font-medium text-ink">Work in progress</span>
      </Reveal>
      <div className="grid gap-5 md:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 100}>
            <article className="flex h-full flex-col rounded-2xl border-2 border-dashed border-line bg-surface/60 p-6 transition hover:border-sun">
              <div className="flex items-center gap-2 text-sm font-medium text-muted">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sun opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-sun" />
                </span>
                In progress
              </div>
              <h4 className="mt-3 font-display text-lg font-semibold text-ink">{project.title}</h4>
              <p className="mt-2 flex-1 text-sm text-muted">{project.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tools?.map((tool) => (
                  <Tag key={tool}>{tool}</Tag>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
