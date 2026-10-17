"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { list, number, requireAdmin, slugify, text, uploadFile } from "@/lib/admin";

// Every function here runs on the server when you submit a dashboard form.
// Each one checks you're the admin, saves to Supabase, refreshes the public
// site (updateTag) and returns to the list. Errors are sent back to the form.

async function adminClient() {
  const { supabase, isAdmin } = await requireAdmin();
  if (!isAdmin) throw new Error("This account is not an admin. Add it to the admins table first.");
  return supabase;
}

// Runs a save/delete and turns any problem into a message for the form.
async function attempt(work) {
  try {
    const supabase = await adminClient();
    const { error } = await work(supabase);
    if (error) {
      return {
        error:
          error.code === "23505"
            ? "That name or URL is already used by another item."
            : error.message,
      };
    }
  } catch (e) {
    return { error: e.message };
  }
  return null;
}

function saveOrUpdate(supabase, table, id, row) {
  return id ? supabase.from(table).update(row).eq("id", id) : supabase.from(table).insert(row);
}

// ---------- Auth ----------

export async function signOut() {
  const { supabase } = await requireAdmin();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// ---------- Projects ----------

export async function saveProject(_previous, formData) {
  const title = text(formData, "title");
  if (!title) return { error: "Please give the project a title." };

  const problem = await attempt(async (supabase) => {
    const project = {
      title,
      slug: slugify(text(formData, "slug") ?? title),
      summary: text(formData, "summary"),
      problem: text(formData, "problem"),
      data_description: text(formData, "data_description"),
      approach: text(formData, "approach"),
      findings: text(formData, "findings"),
      impact: text(formData, "impact"),
      improvements: text(formData, "improvements"),
      tools: list(formData, "tools"),
      dataset_rows: number(formData, "dataset_rows"),
      github_url: text(formData, "github_url"),
      notebook_url: text(formData, "notebook_url"),
      live_url: text(formData, "live_url"),
      featured: formData.get("featured") === "on",
      status: formData.get("status") === "published" ? "published" : "draft",
      sort_order: number(formData, "sort_order") ?? 0,
    };

    const cover = await uploadFile(supabase, formData.get("cover"), "projects");
    if (cover) project.cover_image_url = cover;
    else if (formData.get("remove_cover") === "on") project.cover_image_url = null;

    return saveOrUpdate(supabase, "projects", text(formData, "id"), project);
  });
  if (problem) return problem;

  updateTag("portfolio");
  redirect("/admin/projects");
}

export async function deleteProject(id) {
  const problem = await attempt((supabase) => supabase.from("projects").delete().eq("id", id));
  if (problem) throw new Error(problem.error);
  updateTag("portfolio");
  redirect("/admin/projects");
}

// ---------- Learning Log ----------

export async function saveLogEntry(_previous, formData) {
  const title = text(formData, "title");
  if (!title) return { error: "Please give the entry a title." };

  const problem = await attempt((supabase) =>
    saveOrUpdate(supabase, "learning_log", text(formData, "id"), {
      title,
      entry_date: text(formData, "entry_date") ?? new Date().toISOString().slice(0, 10),
      description: text(formData, "description"),
      tags: list(formData, "tags"),
      related_project_id: text(formData, "related_project_id"),
    })
  );
  if (problem) return problem;

  updateTag("portfolio");
  redirect("/admin/log");
}

export async function deleteLogEntry(id) {
  const problem = await attempt((supabase) => supabase.from("learning_log").delete().eq("id", id));
  if (problem) throw new Error(problem.error);
  updateTag("portfolio");
  redirect("/admin/log");
}

// ---------- Skills ----------

export async function saveSkill(_previous, formData) {
  const name = text(formData, "name");
  if (!name) return { error: "Please enter the skill name." };

  const problem = await attempt((supabase) =>
    saveOrUpdate(supabase, "skills", text(formData, "id"), {
      name,
      category: text(formData, "category") ?? "Other",
      started_on: text(formData, "started_on"),
    })
  );
  if (problem) return problem;

  updateTag("portfolio");
  redirect("/admin/skills");
}

export async function deleteSkill(id) {
  const problem = await attempt((supabase) => supabase.from("skills").delete().eq("id", id));
  if (problem) throw new Error(problem.error);
  updateTag("portfolio");
  redirect("/admin/skills");
}

// ---------- Certifications ----------

export async function saveCertification(_previous, formData) {
  const name = text(formData, "name");
  if (!name) return { error: "Please enter the certification name." };

  const problem = await attempt((supabase) =>
    saveOrUpdate(supabase, "certifications", text(formData, "id"), {
      name,
      issuer: text(formData, "issuer"),
      issued_on: text(formData, "issued_on"),
      credential_url: text(formData, "credential_url"),
    })
  );
  if (problem) return problem;

  updateTag("portfolio");
  redirect("/admin/certifications");
}

export async function deleteCertification(id) {
  const problem = await attempt((supabase) => supabase.from("certifications").delete().eq("id", id));
  if (problem) throw new Error(problem.error);
  updateTag("portfolio");
  redirect("/admin/certifications");
}

// ---------- Profile ----------

// Journey textarea: one step per line → "2026 | Title | Description"
function parseJourney(value) {
  return (value ?? "")
    .split("\n")
    .map((line) => line.split("|").map((part) => part.trim()))
    .filter(([date, title]) => date && title)
    .map(([date, title, description = ""]) => ({ date, title, description }));
}

export async function saveProfile(_previous, formData) {
  const fullName = text(formData, "full_name");
  if (!fullName) return { error: "Your name is required." };

  const problem = await attempt(async (supabase) => {
    const profile = {
      id: 1,
      full_name: fullName,
      headline: text(formData, "headline"),
      bio: text(formData, "bio"),
      availability: list(formData, "availability"),
      journey: parseJourney(text(formData, "journey")),
      email: text(formData, "email"),
      linkedin: text(formData, "linkedin"),
      github: text(formData, "github"),
    };

    const resume = await uploadFile(supabase, formData.get("resume"), "resume");
    if (resume) profile.resume_url = resume;
    else if (formData.get("remove_resume") === "on") profile.resume_url = null;

    return supabase.from("profile").upsert(profile);
  });
  if (problem) return problem;

  updateTag("portfolio");
  return { success: "Profile saved — the site is updated." };
}
