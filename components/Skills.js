import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

// Skills are proven by projects, not by percentage bars.
export default function Skills({ skills }) {
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
      </div>
    </section>
  );
}
