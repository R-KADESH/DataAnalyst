import { getProjects } from "@/lib/data";
import { siteUrl } from "@/lib/site-url";

// Tells search engines which pages exist. New projects appear automatically.
export default async function sitemap() {
  const projects = await getProjects();
  const latest = projects.map((p) => p.updated_at).filter(Boolean).sort().at(-1);

  return [
    { url: siteUrl, lastModified: latest, changeFrequency: "weekly", priority: 1 },
    ...projects.map((p) => ({
      url: `${siteUrl}/projects/${p.slug}`,
      lastModified: p.updated_at,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];
}
