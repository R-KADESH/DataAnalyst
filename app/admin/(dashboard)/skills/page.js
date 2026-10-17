import Link from "next/link";
import ActionForm from "@/components/admin/ActionForm";
import { Card, Field } from "@/components/admin/Fields";
import ItemList from "@/components/admin/ItemList";
import PageHeader from "@/components/admin/PageHeader";
import { deleteSkill, saveSkill } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/server";

export default async function SkillsAdmin({ searchParams }) {
  const { edit } = await searchParams;
  const supabase = await createClient();
  const [{ data: skills }, { data: projects }] = await Promise.all([
    supabase.from("skills").select("*").order("category").order("name"),
    supabase.from("projects").select("title, tools").eq("status", "published"),
  ]);
  const editing = skills?.find((s) => s.id === edit) ?? {};
  const usedIn = (name) => (projects ?? []).filter((p) => p.tools?.includes(name)).length;

  return (
    <>
      <PageHeader
        title="Skills"
        description="A skill counts as evidence when its name matches a tool listed on a published project."
      />

      <Card title={editing.id ? "Edit skill" : "Add a skill"}>
        <ActionForm key={editing.id ?? "new"} action={saveSkill} submitLabel={editing.id ? "Save changes" : "Add skill"}>
          {editing.id && <input type="hidden" name="id" value={editing.id} />}
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Skill" name="name" defaultValue={editing.name} required />
            <Field label="Category" name="category" defaultValue={editing.category} hint="e.g. Analysis, Visualization, Databases" />
            <Field label="Started learning" name="started_on" type="date" defaultValue={editing.started_on} />
          </div>
        </ActionForm>
        {editing.id && (
          <Link href="/admin/skills" className="inline-block text-sm text-muted hover:text-accent">
            Cancel editing
          </Link>
        )}
      </Card>

      <h2 className="mt-10 mb-4 text-lg font-semibold text-navy">All skills ({skills?.length ?? 0})</h2>
      <ItemList
        items={skills ?? []}
        basePath="/admin/skills"
        deleteAction={deleteSkill}
        emptyText="No skills yet."
        renderItem={(skill) => {
          const count = usedIn(skill.name);
          return (
            <>
              <p className="font-semibold text-ink">
                {skill.name} <span className="ml-1 rounded-full bg-navy px-2 py-0.5 font-mono text-xs text-white">{skill.category}</span>
              </p>
              <p className={`text-sm ${count ? "text-leaf" : "text-muted"}`}>
                {count ? `Used in ${count} published project${count > 1 ? "s" : ""}` : "Not used in a project yet — shows as “Practising now”"}
              </p>
            </>
          );
        }}
      />
    </>
  );
}
