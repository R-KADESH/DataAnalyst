import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { formatDate } from "@/lib/format";

// Skills are proven by projects, not by percentage bars.
export default function Skills({ skills, certifications = [] }) {
  if (!skills.length) return null;

  return (
    <section id="skills" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Skills" title="Skills, with the evidence">
          No made-up percentages — each skill links to the work that uses it.
        </SectionHeading>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, i) => (
            <Reveal key={skill.name} delay={(i % 3) * 90}>
              <div className="group h-full rounded-2xl border border-line bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-accent">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold text-ink">{skill.name}</h3>
                  <span className="shrink-0 rounded-full bg-navy px-2.5 py-0.5 font-mono text-xs text-white">
                    {skill.category}
                  </span>
                </div>
                <p className="mt-4 text-sm text-muted">
                  {skill.projects.length > 0 ? (
                    <>
                      <span className="font-semibold text-accent">
                        Used in {skill.projects.length} project{skill.projects.length > 1 ? "s" : ""}
                      </span>
                      {" · "}
                      {skill.projects.join(", ")}
                    </>
                  ) : (
                    <span className="font-semibold text-leaf">Practising now 🌱</span>
                  )}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {certifications.length > 0 && (
          <Reveal className="mt-14">
            <h3 className="mb-5 text-2xl font-bold text-navy">Certifications</h3>
            <ul className="grid gap-4 sm:grid-cols-2">
              {certifications.map((cert) => (
                <li key={cert.id ?? cert.name} className="flex items-start gap-4 rounded-2xl border border-line bg-surface p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">✓</span>
                  <div>
                    <p className="font-semibold text-ink">
                      {cert.credential_url ? (
                        <a href={cert.credential_url} target="_blank" rel="noreferrer" className="hover:text-accent">
                          {cert.name} ↗
                        </a>
                      ) : (
                        cert.name
                      )}
                    </p>
                    <p className="text-sm text-muted">
                      {[cert.issuer, cert.issued_on && formatDate(cert.issued_on)].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
