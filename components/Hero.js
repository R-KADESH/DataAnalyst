import Image from "next/image";
import Counter from "@/components/Counter";
import RotatingWords from "@/components/RotatingWords";
import { firstNames, formatList } from "@/lib/format";

export default function Hero({ profile, stats }) {
  const availability = profile.availability ?? [];

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-accent-soft via-accent-soft/40 to-background pt-28 pb-20 text-ink sm:pt-36">
      {/* Background: soft moving sky glows + a faint data grid */}
      <div className="absolute -top-24 -left-24 -z-10 h-96 w-96 rounded-full bg-sky/20 blur-3xl animate-float" />
      <div className="absolute top-1/2 -right-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-sun/15 blur-3xl animate-float-slow" />
      <div
        className="absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--navy) 1px, transparent 1px), linear-gradient(90deg, var(--navy) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          {availability.length > 0 && (
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-sm text-muted shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-leaf" />
              </span>
              Open to {formatList(availability).toLowerCase()}
            </p>
          )}

          <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-7xl">
            Hi, I&apos;m {firstNames(profile.full_name)}
            <span className="animate-wave">👋</span>
          </h1>

          <p className="mt-6 max-w-xl text-xl text-muted sm:text-2xl">
            I turn raw data into{" "}
            <RotatingWords words={["clear dashboards", "real insights", "clean datasets", "better decisions"]} />
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group rounded-full bg-navy px-6 py-3 font-medium text-white shadow-lg shadow-navy/25 transition hover:-translate-y-0.5 hover:bg-accent"
            >
              See my work <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href={profile.resume_url ?? "#contact"}
              className="rounded-full border border-line bg-surface px-6 py-3 font-medium text-navy transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            >
              {profile.resume_url ? "Download CV" : "Get in touch"}
            </a>
          </div>
        </div>

        {/* Photo in an arch frame, with floating chips */}
        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="absolute -inset-3 -z-10 rotate-3 rounded-t-[10.5rem] rounded-b-[2.5rem] lg:rounded-t-[13.5rem] border-2 border-dashed border-sky/40" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[10.5rem] rounded-b-[2.5rem] lg:rounded-t-[13.5rem] bg-sky shadow-2xl shadow-navy/25 ring-8 ring-surface">
            <Image
              src="/profile-hero.jpg"
              alt={`Portrait of ${profile.full_name}`}
              fill
              priority
              sizes="(min-width: 1024px) 420px, 384px"
              className="object-cover"
            />
          </div>

          <div className="absolute -left-4 top-1/3 rounded-2xl border border-line bg-surface/95 px-4 py-3 shadow-xl backdrop-blur animate-bob sm:-left-10">
            {/* Mini bar chart that grows like a live dashboard */}
            <div className="flex h-10 items-end gap-1.5" aria-hidden="true">
              {[45, 70, 55, 90, 75].map((h, i) => (
                <span
                  key={i}
                  className="w-2.5 origin-bottom rounded-t bg-sky animate-grow"
                  style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            <p className="mt-2 text-xs font-medium text-navy">Data Analyst</p>
          </div>

          <div className="absolute -right-3 bottom-10 flex items-center gap-2 rounded-2xl bg-navy px-4 py-3 text-sm font-medium text-white shadow-xl animate-bob-delayed sm:-right-8">
            <span className="text-sun">✦</span> Excel · Power BI · SQL
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <dl className="mt-16 grid grid-cols-2 gap-6 border-t border-line pt-10 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-sm text-muted">{stat.label}</dt>
              <dd className="mt-1 font-display text-3xl font-bold text-navy sm:text-4xl">
                <Counter value={stat.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
