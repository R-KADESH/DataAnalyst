export function formatDate(value, options = { month: "short", year: "numeric" }) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-US", { timeZone: "UTC", ...options });
}

// "TAPOPHILE DJOUAKA Nathanael Caleb" → "NC"
export function initials(fullName) {
  const parts = fullName.trim().split(/\s+/);
  return parts.slice(-2).map((p) => p[0]).join("").toUpperCase();
}

// "TAPOPHILE DJOUAKA Nathanael Caleb" → "Nathanael Caleb"
export function firstNames(fullName) {
  return fullName.trim().split(/\s+/).filter((p) => p !== p.toUpperCase()).join(" ") || fullName;
}

// ["Internships", "Scholarships"] → "Internships & Scholarships"
export function formatList(items) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} & ${items.at(-1)}`;
}
