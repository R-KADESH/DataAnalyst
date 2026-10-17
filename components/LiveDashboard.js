import Reveal from "@/components/Reveal";

// Interactive report embedded in the case study (Power BI / Tableau).
export default function LiveDashboard({ embed, title, url }) {
  return (
    <Reveal className="mt-12">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 font-display text-xl font-bold text-navy">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-leaf" />
          </span>
          Explore the live {embed.tool} report
        </h2>
        <a href={url} target="_blank" rel="noreferrer" className="text-sm font-medium text-accent hover:underline">
          Open full screen ↗
        </a>
      </div>
      <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-xl shadow-navy/10">
        <iframe
          src={embed.src}
          title={`${title} — interactive ${embed.tool} report`}
          loading="lazy"
          allowFullScreen
          className="aspect-[16/10] w-full"
        />
      </div>
      <p className="mt-3 text-sm text-muted">Click the charts to filter — it&apos;s the real report, not a screenshot.</p>
    </Reveal>
  );
}
