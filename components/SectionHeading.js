import Reveal from "@/components/Reveal";

export default function SectionHeading({ eyebrow, title, children }) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {children && <p className="mt-4 text-lg text-muted">{children}</p>}
    </Reveal>
  );
}
