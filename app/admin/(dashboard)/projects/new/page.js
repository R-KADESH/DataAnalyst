import PageHeader from "@/components/admin/PageHeader";
import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProject() {
  return (
    <>
      <PageHeader title="New project" description="Tip: save as a draft first, publish when the case study is complete." />
      <ProjectForm />
    </>
  );
}
