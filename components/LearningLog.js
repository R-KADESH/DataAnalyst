import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Tag from "@/components/Tag";
import { formatDate } from "@/lib/format";

export default function LearningLog({ entries, lastUpdated }) {
  if (!entries.length) return null;

  return (
    <section id="learning" className="scroll-mt-24 bg-surface py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Learning Log" title="Always learning, always shipping">
          Every course, project and fix — dated, so you can see the progress.
        </SectionHeading>

        <Reveal className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 text-sm font-medium text-accent">
            <span className="h-2 w-2 rounded-full bg-leaf" />
            Last updated {formatDate(lastUpdated, { day: "numeric", month: "long", year: "numeric" })}
          </span>
        </Reveal>

        <ol className="relative border-l-2 border-line pl-8 sm:ml-4">
          {entries.map((entry, i) => (
            <li key={entry.id ?? `${entry.entry_date}-${entry.title}`} className="mb-10 last:mb-0">
              <Reveal delay={Math.min(i, 5) * 80}>
                <span
                  className={`absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-4 border-surface ${
                    i === 0 ? "bg-sky ring-4 ring-sky/25" : "bg-navy"
                  }`}
                />
                <time className="font-mono text-xs uppercase tracking-wider text-muted">
                  {formatDate(entry.entry_date, { day: "numeric", month: "short", year: "numeric" })}
                </time>
                <h3 className="mt-1 text-xl font-semibold text-ink">{entry.title}</h3>
                {entry.description && <p className="mt-1 max-w-2xl text-muted">{entry.description}</p>}
                {entry.tags?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
