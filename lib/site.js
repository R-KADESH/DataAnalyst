import { getLearningLog, getProfile, getProjects, getSkills } from "@/lib/data";

// Loads everything the home page needs, plus a few derived numbers.
export async function getSiteData() {
  const [profile, projects, log, skills] = await Promise.all([
    getProfile(),
    getProjects(),
    getLearningLog(),
    getSkills(),
  ]);

  const dates = [...log.map((e) => e.entry_date), ...projects.map((p) => p.updated_at)].filter(Boolean);
  const lastUpdated = dates.length
    ? new Date(Math.max(...dates.map((d) => new Date(d).getTime()))).toISOString()
    : profile.updated_at ?? "2026-01-01";

  const stats = [
    { label: "Rows analysed", value: projects.reduce((sum, p) => sum + Number(p.dataset_rows ?? 0), 0) },
    { label: "Case studies", value: projects.length },
    { label: "Learning entries", value: log.length },
    { label: "Tools & skills", value: skills.length },
  ];

  return { profile, projects, log, skills, stats, lastUpdated };
}
