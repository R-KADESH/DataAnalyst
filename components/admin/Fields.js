// Simple, consistent form fields for the dashboard.

const inputClass =
  "mt-1.5 w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-ink outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15";

function Label({ label, hint, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

export function Field({ label, hint, name, defaultValue, type = "text", ...props }) {
  return (
    <Label label={label} hint={hint}>
      <input name={name} type={type} defaultValue={defaultValue ?? ""} className={inputClass} {...props} />
    </Label>
  );
}

export function TextArea({ label, hint, name, defaultValue, rows = 4, ...props }) {
  return (
    <Label label={label} hint={hint}>
      <textarea name={name} rows={rows} defaultValue={defaultValue ?? ""} className={inputClass} {...props} />
    </Label>
  );
}

export function Select({ label, hint, name, defaultValue, options }) {
  return (
    <Label label={label} hint={hint}>
      <select name={name} defaultValue={defaultValue} className={inputClass}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Label>
  );
}

export function FileField({ label, hint, name, accept }) {
  return (
    <Label label={label} hint={hint}>
      <input
        name={name}
        type="file"
        accept={accept}
        className={`${inputClass} file:mr-4 file:rounded-full file:border-0 file:bg-accent-soft file:px-4 file:py-1.5 file:text-sm file:font-medium file:text-accent`}
      />
    </Label>
  );
}

export function Checkbox({ label, name, defaultChecked }) {
  return (
    <label className="flex items-center gap-3 text-sm text-ink">
      <input name={name} type="checkbox" defaultChecked={defaultChecked} className="h-5 w-5 rounded accent-[var(--navy)]" />
      {label}
    </label>
  );
}

export function Card({ title, children }) {
  return (
    <section className="rounded-2xl border border-line bg-surface p-6">
      {title && <h2 className="mb-5 text-lg font-semibold text-navy">{title}</h2>}
      <div className="space-y-5">{children}</div>
    </section>
  );
}
