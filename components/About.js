import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function About({ profile }) {
  return (
    <section id="about" className="scroll-mt-24 bg-surface py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="About me" title="Dedicated to getting the data right" />
          <Reveal>
            <p className="text-lg leading-relaxed text-muted">{profile.bio}</p>
          </Reveal>
        </div>

        <ol className="space-y-4">
          {profile.journey?.map((step, i) => (
            <Reveal key={`${step.date}-${step.title}`} delay={i * 120}>
              <li className="flex gap-5 rounded-2xl border border-line bg-background p-6 transition hover:border-accent">
                <span className="font-display text-3xl font-extrabold text-sky">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-muted">{step.date}</p>
                  <h3 className="mt-1 text-lg font-semibold text-ink">{step.title}</h3>
                  <p className="mt-1 text-muted">{step.description}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
