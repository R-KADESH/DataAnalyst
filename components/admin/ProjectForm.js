import Image from "next/image";
import ActionForm from "@/components/admin/ActionForm";
import { Card, Checkbox, Field, FileField, Select, TextArea } from "@/components/admin/Fields";
import { saveProject } from "@/app/admin/actions";

// Used for both "New project" and "Edit project".
export default function ProjectForm({ project = {} }) {
  return (
    <ActionForm action={saveProject} submitLabel={project.id ? "Save changes" : "Create project"}>
      {project.id && <input type="hidden" name="id" value={project.id} />}

      <Card title="The basics">
        <Field label="Title" name="title" defaultValue={project.title} required />
        <Field
          label="Summary"
          name="summary"
          defaultValue={project.summary}
          hint="One line shown on the project card — lead with the result."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Tools" name="tools" defaultValue={project.tools?.join(", ")} hint="Comma-separated, e.g. Excel, Power BI, SQL. Must match skill names to count as evidence." />
          <Field label="Rows analysed" name="dataset_rows" type="number" min="0" defaultValue={project.dataset_rows} />
        </div>
      </Card>

      <Card title="Case study">
        <TextArea label="The question" name="problem" defaultValue={project.problem} rows={3} />
        <TextArea label="The data" name="data_description" defaultValue={project.data_description} rows={3} />
        <TextArea label="My approach" name="approach" defaultValue={project.approach} />
        <TextArea label="Key findings" name="findings" defaultValue={project.findings} hint="Use numbers where you can." />
        <TextArea label="Why it matters" name="impact" defaultValue={project.impact} rows={3} />
        <TextArea label="What I'd improve next" name="improvements" defaultValue={project.improvements} rows={3} />
      </Card>

      <Card title="Cover image">
        {project.cover_image_url && (
          <div className="space-y-3">
            <Image
              src={project.cover_image_url}
              alt="Current cover"
              width={480}
              height={300}
              className="h-auto w-full max-w-sm rounded-xl border border-line"
            />
            <Checkbox label="Remove the current image" name="remove_cover" />
          </div>
        )}
        <FileField
          label={project.cover_image_url ? "Replace image" : "Upload image"}
          name="cover"
          accept="image/*"
          hint="A clean dashboard screenshot, max 8 MB."
        />
      </Card>

      <Card title="Links">
        <Field
          label="Live dashboard (Power BI, Tableau…)"
          name="live_url"
          type="url"
          defaultValue={project.live_url}
          hint="A Power BI “Publish to web” link or a Tableau Public link is embedded on the case study so visitors can interact with it."
        />
        <Field label="GitHub" name="github_url" type="url" defaultValue={project.github_url} />
        <Field label="Notebook" name="notebook_url" type="url" defaultValue={project.notebook_url} />
      </Card>

      <Card title="Publishing">
        <div className="grid gap-5 sm:grid-cols-3">
          <Select
            label="Status"
            name="status"
            defaultValue={project.status ?? "draft"}
            options={[
              { value: "draft", label: "Draft (hidden)" },
              { value: "published", label: "Published (visible)" },
            ]}
          />
          <Field label="Order" name="sort_order" type="number" defaultValue={project.sort_order ?? 0} hint="Lower numbers show first." />
          <Field label="URL name" name="slug" defaultValue={project.slug} hint="Leave empty to create it from the title." />
        </div>
        <Checkbox label="Featured (shown first)" name="featured" defaultChecked={project.featured ?? true} />
      </Card>
    </ActionForm>
  );
}
