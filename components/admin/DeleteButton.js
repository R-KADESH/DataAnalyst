"use client";

// A delete button that asks "Are you sure?" before running the server action.
export default function DeleteButton({ action, itemName }) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!confirm(`Delete "${itemName}"? This can't be undone.`)) event.preventDefault();
      }}
    >
      <button
        type="submit"
        className="rounded-full px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
      >
        Delete
      </button>
    </form>
  );
}
