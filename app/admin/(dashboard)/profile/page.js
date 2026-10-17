import ActionForm from "@/components/admin/ActionForm";
import { Card, Checkbox, Field, FileField, TextArea } from "@/components/admin/Fields";
import PageHeader from "@/components/admin/PageHeader";
import { saveProfile } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/server";

export default async function ProfileAdmin() {
  const supabase = await createClient();
  const { data } = await supabase.from("profile").select("*").eq("id", 1).maybeSingle();
  const profile = data ?? {};
  const journey = (profile.journey ?? []).map((s) => [s.date, s.title, s.description].join(" | ")).join("\n");

  return (
    <>
      <PageHeader title="Profile" description="Your name, story, availability, contact links and CV." />

      <ActionForm action={saveProfile} submitLabel="Save profile">
        <Card title="About you">
          <Field label="Full name" name="full_name" defaultValue={profile.full_name} required />
          <Field label="Headline" name="headline" defaultValue={profile.headline} />
          <TextArea label="Bio" name="bio" defaultValue={profile.bio} rows={5} />
          <Field
            label="Open to"
            name="availability"
            defaultValue={profile.availability?.join(", ")}
            hint="Comma-separated, e.g. Data analyst internships, Scholarships. Leave empty to hide the badge."
          />
        </Card>

        <Card title="Journey">
          <TextArea
            label="Steps (one per line)"
            name="journey"
            defaultValue={journey}
            rows={5}
            hint="Format: date | title | description — e.g. 2026 | First dashboards | From Excel to Power BI."
          />
        </Card>

        <Card title="Contact">
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Email" name="email" type="email" defaultValue={profile.email} />
            <Field label="LinkedIn URL" name="linkedin" type="url" defaultValue={profile.linkedin} />
            <Field label="GitHub URL" name="github" type="url" defaultValue={profile.github} />
          </div>
        </Card>

        <Card title="CV / résumé">
          {profile.resume_url && (
            <div className="flex flex-wrap items-center gap-4">
              <a href={profile.resume_url} target="_blank" className="font-medium text-accent hover:underline">
                Current CV ↗
              </a>
              <Checkbox label="Remove it" name="remove_resume" />
            </div>
          )}
          <FileField label={profile.resume_url ? "Replace CV" : "Upload CV"} name="resume" accept="application/pdf" hint="PDF, max 8 MB." />
        </Card>
      </ActionForm>
    </>
  );
}
