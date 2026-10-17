import { notFound } from "next/navigation";
import PageHeader from "@/components/admin/PageHeader";
import ProjectForm from "@/components/admin/ProjectForm";
import { createClient } from "@/lib/supabase/server";

export default async function EditProject({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
  if (!project) notFound();

  return (
    <>
      <PageHeader title={`Edit: ${project.title}`} />
      <ProjectForm project={project} />
    </>
  );
}
