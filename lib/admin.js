import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Helpers used only by the admin dashboard (server side).

// Checks who is logged in. Sends visitors to the login page,
// and tells us whether the logged-in account is in the `admins` table.
export async function requireAdmin() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) redirect("/admin/login");

  const { data: admin } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", data.claims.sub)
    .maybeSingle();

  return { supabase, email: data.claims.email, isAdmin: Boolean(admin) };
}

// ---------- Reading form fields ----------

export function text(formData, key) {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

// "Excel, Power BI ,SQL" → ["Excel", "Power BI", "SQL"]
export function list(formData, key) {
  return (text(formData, key) ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function number(formData, key) {
  const value = text(formData, key);
  return value === null || Number.isNaN(Number(value)) ? null : Number(value);
}

// "BMW Sales 2010–2024" → "bmw-sales-2010-2024"
export function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ---------- File uploads (images, CV) ----------

const MAX_UPLOAD_MB = 8;

// Uploads a file to the "portfolio" storage bucket and returns its public URL.
// Returns null when no file was chosen.
export async function uploadFile(supabase, file, folder) {
  if (!file || typeof file === "string" || file.size === 0) return null;
  if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
    throw new Error(`"${file.name}" is larger than ${MAX_UPLOAD_MB} MB.`);
  }

  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
  const path = `${folder}/${Date.now()}-${safeName}`;
  const { error } = await supabase.storage
    .from("portfolio")
    .upload(path, file, { contentType: file.type });
  if (error) throw new Error(`Upload failed: ${error.message}`);

  return supabase.storage.from("portfolio").getPublicUrl(path).data.publicUrl;
}
