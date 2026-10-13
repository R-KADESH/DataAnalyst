import { formatDate } from "@/lib/format";

export default function Footer({ name, lastUpdated }) {
  return (
    <footer className="border-t border-line py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 text-sm text-muted sm:flex-row sm:px-6">
        <p>© {new Date(lastUpdated).getUTCFullYear()} {name}</p>
        <p>Last updated {formatDate(lastUpdated, { day: "numeric", month: "long", year: "numeric" })}</p>
      </div>
    </footer>
  );
}
