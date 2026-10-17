import Link from "next/link";
import ActionForm from "@/components/admin/ActionForm";
import { Card, Field, Select, TextArea } from "@/components/admin/Fields";
import ItemList from "@/components/admin/ItemList";
import PageHeader from "@/components/admin/PageHeader";
import { deleteLogEntry, saveLogEntry } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/format";

export default async function LearningLogAdmin({ searchParams }) {
  const { edit } = await searchParams;
  const supabase = await createClient();
  const [{ data: entries }, { data: projects }] = await Promise.all([
    supabase.from("learning_log").select("*").order("entry_date", { ascending: false }),
    supabase.from("projects").select("id, title").order("title"),
  ]);
  const editing = entries?.find((e) => e.id === edit) ?? {};
  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <PageHeader title="Learning Log" description="Courses, projects, fixes, new skills — anything that shows growth." />

      <Card title={editing.id ? "Edit entry" : "Add an entry"}>
        <ActionForm key={editing.id ?? "new"} action={saveLogEntry} submitLabel={editing.id ? "Save changes" : "Add to log"}>
          {editing.id && <input type="hidden" name="id" value={editing.id} />}
          <div className="grid gap-5 sm:grid-cols-[1fr_180px]">
            <Field label="What did you do or learn?" name="title" defaultValue={editing.title} required />
            <Field label="Date" name="entry_date" type="date" defaultValue={editing.entry_date ?? today} />
          </div>
          <TextArea label="Details" name="description" defaultValue={editing.description} rows={3} />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Tags" name="tags" defaultValue={editing.tags?.join(", ")} hint="Comma-separated, e.g. SQL, Course" />
            <Select
              label="Related project (optional)"
              name="related_project_id"
              defaultValue={editing.related_project_id ?? ""}
              options={[{ value: "", label: "— None —" }, ...(projects ?? []).map((p) => ({ value: p.id, label: p.title }))]}
            />
          </div>
        </ActionForm>
        {editing.id && (
          <Link href="/admin/log" className="inline-block text-sm text-muted hover:text-accent">
            Cancel editing
          </Link>
        )}
      </Card>

      <h2 className="mt-10 mb-4 text-lg font-semibold text-navy">All entries ({entries?.length ?? 0})</h2>
      <ItemList
        items={entries ?? []}
        basePath="/admin/log"
        deleteAction={deleteLogEntry}
        emptyText="No entries yet — add your first one above."
        renderItem={(entry) => (
          <>
            <p className="font-mono text-xs uppercase tracking-wider text-muted">
              {formatDate(entry.entry_date, { day: "numeric", month: "short", year: "numeric" })}
            </p>
            <p className="font-semibold text-ink">{entry.title}</p>
          </>
        )}
      />
    </>
  );
}
