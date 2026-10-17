import { cacheLife, cacheTag } from "next/cache";
import { hasSupabase } from "@/lib/supabase/config";
import { createPublicClient } from "@/lib/supabase/public";
import * as starter from "@/lib/content";

// All public pages read data through these functions.
// - Results are cached (fast pages); the admin dashboard refreshes the
//   "portfolio" tag after every change so visitors see updates right away.
// - Until Supabase is configured, the starter content in lib/content.js is used.

async function query(build, fallback) {
  if (!hasSupabase) return fallback;
  const { data, error } = await build(createPublicClient());
  if (error) {
    console.error("Supabase query failed, using starter content:", error.message);
    return fallback;
  }
  return data;
}

export async function getProfile() {
  "use cache";
  cacheTag("portfolio");
  cacheLife("hours");
  const row = await query((db) => db.from("profile").select("*").maybeSingle(), starter.profile);
  return row ?? starter.profile;
}

export async function getProjects() {
  "use cache";
  cacheTag("portfolio");
  cacheLife("hours");
  const rows = await query(
    (db) =>
      db
        .from("projects")
        .select("*")
        .eq("status", "published")
        .order("featured", { ascending: false })
        .order("sort_order"),
    starter.projects
  );
  return rows.length ? rows : starter.projects;
}

export async function getProject(slug) {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}

export async function getLearningLog() {
  "use cache";
  cacheTag("portfolio");
  cacheLife("hours");
  return query(
    (db) => db.from("learning_log").select("*").order("entry_date", { ascending: false }),
    starter.learningLog
  );
}

// Each skill comes with its evidence: the projects that use it.
export async function getSkills() {
  "use cache";
  cacheTag("portfolio");
  cacheLife("hours");
  const [skills, projects] = await Promise.all([
    query((db) => db.from("skills").select("*").order("name"), starter.skills),
    getProjects(),
  ]);
  return skills.map((skill) => ({
    ...skill,
    projects: projects.filter((p) => p.tools?.includes(skill.name)).map((p) => p.title),
  }));
}

export async function getCertifications() {
  "use cache";
  cacheTag("portfolio");
  cacheLife("hours");
  return query(
    (db) => db.from("certifications").select("*").order("issued_on", { ascending: false }),
    starter.certifications
  );
}
