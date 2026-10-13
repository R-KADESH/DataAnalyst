import Image from "next/image";
import Link from "next/link";
import Tag from "@/components/Tag";

export default function ProjectCard({ project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface transition duration-300 hover:-translate-y-2 hover:border-accent hover:shadow-2xl hover:shadow-accent/15"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-deep">
        {project.cover_image_url && (
          <Image
            src={project.cover_image_url}
            alt={`${project.title} dashboard`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-top transition duration-500 group-hover:scale-105"
          />
        )}
        {project.dataset_rows && (
          <span className="absolute top-4 left-4 rounded-full bg-navy-deep/85 px-3 py-1 font-mono text-xs text-accent-bright backdrop-blur">
            {Number(project.dataset_rows).toLocaleString("en-US")} rows
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h3 className="text-2xl font-bold text-ink transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <p className="mt-3 flex-1 text-muted">{project.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tools?.map((tool) => (
            <Tag key={tool}>{tool}</Tag>
          ))}
        </div>
        <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-ink">
          Read the case study
          <span className="transition-transform group-hover:translate-x-1.5">→</span>
        </span>
      </div>
    </Link>
  );
}
