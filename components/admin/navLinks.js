export const navLinks = [
  { href: "/admin", label: "Overview", icon: "◧" },
  { href: "/admin/projects", label: "Projects", icon: "▤" },
  { href: "/admin/log", label: "Learning Log", icon: "✎" },
  { href: "/admin/skills", label: "Skills", icon: "✦" },
  { href: "/admin/certifications", label: "Certifications", icon: "✓" },
  { href: "/admin/profile", label: "Profile", icon: "☺" },
];

export function linkClass(active) {
  return `flex shrink-0 items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
    active ? "bg-white text-navy" : "text-white/75 hover:bg-white/10 hover:text-white"
  }`;
}
