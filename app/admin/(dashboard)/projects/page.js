import Image from "next/image";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";
import PageHeader from "@/components/admin/PageHeader";
import { deleteProject } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/format";

export default async function ProjectsAdmin() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("id, title, slug, status, featured, cover_image_url, updated_at")
    .order("featured", { ascending: false })
    .order("sort_order");
  const projects = data ?? [];

  return (
    <>
      <PageHeader
        title="Projects"
        description="Drafts stay hidden until you publish them."
        action={{ href: "/admin/projects/new", label: "＋ New project" }}
      />

      {projects.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line p-10 text-center text-muted">No projects yet.</p>
      ) : (
        <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
          {projects.map((project) => (
            <li key={project.id} className="flex flex-wrap items-center gap-4 p-4">
              <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-accent-soft">
                {project.cover_image_url && (
                  <Image src={project.cover_image_url} alt="" fill sizes="80px" className="object-cover object-top" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-ink">
                  {project.title} {project.featured && <span title="Featured" className="text-sun">★</span>}
                </p>
                <p className="text-sm text-muted">
                  <span
                    className={`mr-2 rounded-full px-2 py-0.5 text-xs font-medium ${
                      project.status === "published" ? "bg-leaf/15 text-leaf" : "bg-line text-muted"
                    }`}
                  >
                    {project.status === "published" ? "Published" : "Draft"}
                  </span>
                  Updated {formatDate(project.updated_at, { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
              <div className="flex items-center gap-1">
                {project.status === "published" && (
                  <a href={`/projects/${project.slug}`} target="_blank" className="rounded-full px-3 py-1.5 text-sm text-muted hover:bg-accent-soft hover:text-accent">
                    View ↗
                  </a>
                )}
                <Link href={`/admin/projects/${project.id}`} className="rounded-full px-3 py-1.5 text-sm font-medium text-accent hover:bg-accent-soft">
                  Edit
                </Link>
                <DeleteButton action={deleteProject.bind(null, project.id)} itemName={project.title} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
