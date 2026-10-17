import Link from "next/link";
import ActionForm from "@/components/admin/ActionForm";
import { Card, Field } from "@/components/admin/Fields";
import ItemList from "@/components/admin/ItemList";
import PageHeader from "@/components/admin/PageHeader";
import { deleteCertification, saveCertification } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/format";

export default async function CertificationsAdmin({ searchParams }) {
  const { edit } = await searchParams;
  const supabase = await createClient();
  const { data: certs } = await supabase.from("certifications").select("*").order("issued_on", { ascending: false });
  const editing = certs?.find((c) => c.id === edit) ?? {};

  return (
    <>
      <PageHeader title="Certifications" description="Courses and certificates, shown under Skills on the site." />

      <Card title={editing.id ? "Edit certification" : "Add a certification"}>
        <ActionForm key={editing.id ?? "new"} action={saveCertification} submitLabel={editing.id ? "Save changes" : "Add certification"}>
          {editing.id && <input type="hidden" name="id" value={editing.id} />}
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" name="name" defaultValue={editing.name} required />
            <Field label="Issuer" name="issuer" defaultValue={editing.issuer} hint="e.g. Google, Microsoft, Coursera" />
            <Field label="Date issued" name="issued_on" type="date" defaultValue={editing.issued_on} />
            <Field label="Credential link" name="credential_url" type="url" defaultValue={editing.credential_url} />
          </div>
        </ActionForm>
        {editing.id && (
          <Link href="/admin/certifications" className="inline-block text-sm text-muted hover:text-accent">
            Cancel editing
          </Link>
        )}
      </Card>

      <h2 className="mt-10 mb-4 text-lg font-semibold text-navy">All certifications ({certs?.length ?? 0})</h2>
      <ItemList
        items={certs ?? []}
        basePath="/admin/certifications"
        deleteAction={deleteCertification}
        emptyText="No certifications yet."
        renderItem={(cert) => (
          <>
            <p className="font-semibold text-ink">{cert.name}</p>
            <p className="text-sm text-muted">
              {[cert.issuer, cert.issued_on && formatDate(cert.issued_on)].filter(Boolean).join(" · ")}
            </p>
          </>
        )}
      />
    </>
  );
}
