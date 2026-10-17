import Link from "next/link";

export default function PageHeader({ title, description, action }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-navy">{title}</h1>
        {description && <p className="mt-1 text-muted">{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
