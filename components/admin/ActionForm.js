"use client";

import { startTransition, useActionState } from "react";

// Wraps a dashboard form: sends it to a server action, shows "Saving…",
// and displays any error or success message. Your typed values are kept if
// something goes wrong, so you never lose your work.
export default function ActionForm({ action, submitLabel = "Save", children, className = "" }) {
  const [state, formAction, pending] = useActionState(action, null);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-5 ${className}`}>
      {children}

      {state?.error && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}
      {state?.success && (
        <p role="status" className="rounded-xl border border-leaf/30 bg-leaf/10 px-4 py-3 text-sm text-leaf">
          {state.success}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-navy px-6 py-3 font-medium text-white transition hover:bg-accent disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
