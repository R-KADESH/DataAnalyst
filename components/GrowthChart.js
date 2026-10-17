"use client";

import { useEffect, useRef, useState } from "react";
import { formatDate } from "@/lib/format";

// Cumulative step chart of Learning Log entries: every entry lifts the line,
// so a steady climb shows steady dedication. Hover (or use arrow keys) for details.

const HEIGHT = 240;
const M = { top: 24, right: 28, bottom: 32, left: 36 };
const DAY = 86_400_000;

// Group entries by date and count the running total
function toPoints(entries) {
  const byDate = new Map();
  [...entries]
    .sort((a, b) => a.entry_date.localeCompare(b.entry_date))
    .forEach((e) => byDate.set(e.entry_date, [...(byDate.get(e.entry_date) ?? []), e.title]));

  let total = 0;
  return [...byDate].map(([date, titles]) => {
    total += titles.length;
    return { date, t: Date.parse(date), total, titles };
  });
}

// First day of each month between two timestamps
function monthTicks(t0, t1) {
  const ticks = [];
  const d = new Date(t0);
  d.setUTCDate(1);
  d.setUTCMonth(d.getUTCMonth() + 1);
  while (d.getTime() <= t1) {
    ticks.push(d.getTime());
    d.setUTCMonth(d.getUTCMonth() + 1);
  }
  return ticks;
}

export default function GrowthChart({ entries }) {
  const ref = useRef(null);
  const [width, setWidth] = useState(null); // measured after load
  const [active, setActive] = useState(null);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const points = toPoints(entries);
  if (points.length < 2) return null;
  const w = width ?? 0;

  const total = points.at(-1).total;
  const t0 = points[0].t - 7 * DAY;
  const t1 = points.at(-1).t;
  const yMax = Math.max(2, Math.ceil(total / 2) * 2);
  const x = (t) => M.left + ((t - t0) / (t1 - t0)) * (w - M.left - M.right);
  const y = (v) => M.top + (1 - v / yMax) * (HEIGHT - M.top - M.bottom);

  // Step line: flat until an entry, then a jump up
  let line = `M ${x(t0)} ${y(0)}`;
  points.forEach((p) => (line += ` H ${x(p.t)} V ${y(p.total)}`));
  const area = `${line} V ${y(0)} H ${x(t0)} Z`;

  const ticks = monthTicks(t0, t1);
  const everyOther = ticks.length > 6 && w < 640;
  const current = active === null ? null : points[active];

  function nearest(clientX) {
    const left = ref.current.getBoundingClientRect().left;
    const px = clientX - left;
    let best = 0;
    points.forEach((p, i) => {
      if (Math.abs(x(p.t) - px) < Math.abs(x(points[best].t) - px)) best = i;
    });
    setActive(best);
  }

  function onKeyDown(event) {
    if (event.key === "ArrowRight") setActive((i) => Math.min((i ?? -1) + 1, points.length - 1));
    else if (event.key === "ArrowLeft") setActive((i) => Math.max((i ?? points.length) - 1, 0));
    else return;
    event.preventDefault();
  }

  return (
    <figure className="rounded-3xl border border-line bg-surface p-5 sm:p-7">
      <figcaption className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-display text-xl font-bold text-navy">Learning momentum</span>
        <span className="text-sm text-muted">Cumulative Learning Log entries over time</span>
      </figcaption>

      <div
        ref={ref}
        className="relative outline-none focus-visible:ring-4 focus-visible:ring-accent/25 rounded-xl"
        tabIndex={0}
        role="img"
        aria-label={`Learning momentum: ${total} entries from ${formatDate(points[0].date)} to ${formatDate(points.at(-1).date)}. Use arrow keys to step through entries.`}
        onPointerMove={(e) => nearest(e.clientX)}
        onPointerLeave={() => setActive(null)}
        onKeyDown={onKeyDown}
        onBlur={() => setActive(null)}
      >
        {width === null ? (
          <div style={{ height: HEIGHT }} />
        ) : (
          <svg width={width} height={HEIGHT} className="block overflow-visible">
            {/* Recessive grid + y labels */}
            {[0, yMax / 2, yMax].map((v) => (
              <g key={v}>
                <line x1={M.left} x2={w - M.right} y1={y(v)} y2={y(v)} className="stroke-line" strokeWidth="1" />
                <text x={M.left - 10} y={y(v)} dy="0.32em" textAnchor="end" className="fill-muted text-xs">
                  {v}
                </text>
              </g>
            ))}

            {/* Month labels */}
            {ticks.map((t, i) =>
              everyOther && i % 2 ? null : (
                <text key={t} x={x(t)} y={HEIGHT - 8} textAnchor="middle" className="fill-muted text-xs">
                  {new Date(t).toLocaleDateString("en-US", { month: "short", timeZone: "UTC" })}
                </text>
              )
            )}

            <path d={area} className="fill-accent/10" />
            <path d={line} fill="none" className="stroke-accent" strokeWidth="2" strokeLinejoin="round" />

            {/* Crosshair */}
            {current && (
              <line x1={x(current.t)} x2={x(current.t)} y1={M.top} y2={y(0)} className="stroke-muted" strokeWidth="1" strokeDasharray="3 3" />
            )}

            {/* Markers with a 2px surface ring */}
            {points.map((p, i) => (
              <circle
                key={p.date}
                cx={x(p.t)}
                cy={y(p.total)}
                r={active === i ? 6 : 4}
                className="fill-accent stroke-surface transition-[r]"
                strokeWidth="2"
              />
            ))}

            {/* Direct label on the latest point */}
            <text x={x(t1)} y={y(total) - 14} textAnchor="end" className="fill-ink text-sm font-semibold">
              {total} entries
            </text>
          </svg>
        )}

        {current && (
          <div
            className="pointer-events-none absolute top-0 z-10 w-56 rounded-xl border border-line bg-surface p-3 shadow-lg"
            style={{
              left: Math.min(Math.max(x(current.t) - 112, 0), w - 224),
              transform: `translateY(${Math.max(y(current.total) - 120, -8)}px)`,
            }}
          >
            <p className="font-display text-lg font-bold text-ink">
              {current.total} <span className="text-sm font-medium text-muted">total entries</span>
            </p>
            <p className="text-xs text-muted">
              {formatDate(current.date, { day: "numeric", month: "short", year: "numeric" })}
            </p>
            <ul className="mt-1.5 space-y-1">
              {current.titles.map((title) => (
                <li key={title} className="flex gap-2 text-sm text-ink">
                  <span className="mt-2 h-0.5 w-3 shrink-0 bg-accent" />
                  {title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <details className="mt-4 text-sm">
        <summary className="cursor-pointer text-muted hover:text-accent">View as table</summary>
        <table className="mt-3 w-full text-left">
          <thead className="text-muted">
            <tr>
              <th className="py-1 font-medium">Date</th>
              <th className="py-1 font-medium">Entry</th>
              <th className="py-1 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {points.map((p) => (
              <tr key={p.date} className="border-t border-line align-top">
                <td className="py-1.5 pr-4 whitespace-nowrap">{formatDate(p.date, { day: "numeric", month: "short", year: "numeric" })}</td>
                <td className="py-1.5 pr-4">{p.titles.join("; ")}</td>
                <td className="py-1.5 text-right">{p.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
