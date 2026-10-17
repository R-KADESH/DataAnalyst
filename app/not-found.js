import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="relative isolate flex flex-1 items-center justify-center overflow-hidden bg-gradient-to-b from-accent-soft to-background px-4 py-24 text-center">
      <div className="absolute -top-24 left-1/4 -z-10 h-80 w-80 rounded-full bg-sky/20 blur-3xl animate-float" />
      <div>
        {/* A tiny "empty chart" — the data for this page is missing */}
        <div className="mx-auto flex h-24 w-40 items-end justify-center gap-2 border-b-2 border-l-2 border-navy/30 px-3" aria-hidden="true">
          {[30, 55, 20, 0].map((h, i) => (
            <span key={i} className="w-6 rounded-t bg-sky/70" style={{ height: `${h}%` }} />
          ))}
          <span className="mb-1 font-mono text-xs text-muted">null</span>
        </div>
        <p className="mt-8 font-mono text-sm uppercase tracking-[0.25em] text-accent">Error 404</p>
        <h1 className="mt-3 text-4xl font-extrabold text-navy sm:text-5xl">This row isn&apos;t in the dataset</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted">
          The page you&apos;re looking for doesn&apos;t exist — or it was moved during the last data cleaning.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-full bg-navy px-6 py-3 font-medium text-white transition hover:-translate-y-0.5 hover:bg-accent">
            Back to the portfolio
          </Link>
          <Link href="/#projects" className="rounded-full border border-line bg-surface px-6 py-3 font-medium text-navy transition hover:-translate-y-0.5 hover:border-accent hover:text-accent">
            See projects
          </Link>
        </div>
      </div>
    </main>
  );
}
