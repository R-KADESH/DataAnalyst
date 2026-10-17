import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

// A simple list of items with Edit (via ?edit=id) and Delete buttons.
export default function ItemList({ items, basePath, deleteAction, renderItem, emptyText }) {
  if (items.length === 0) {
    return <p className="rounded-2xl border border-dashed border-line p-10 text-center text-muted">{emptyText}</p>;
  }

  return (
    <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
      {items.map((item) => (
        <li key={item.id} className="flex flex-wrap items-center gap-4 p-4">
          <div className="min-w-0 flex-1">{renderItem(item)}</div>
          <div className="flex items-center gap-1">
            <Link href={`${basePath}?edit=${item.id}`} className="rounded-full px-3 py-1.5 text-sm font-medium text-accent hover:bg-accent-soft">
              Edit
            </Link>
            <DeleteButton action={deleteAction.bind(null, item.id)} itemName={item.title ?? item.name} />
          </div>
        </li>
      ))}
    </ul>
  );
}
