// The public address of the site, used for link previews and the sitemap.
// Set NEXT_PUBLIC_SITE_URL in .env.local (and on Vercel) once you have a domain.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
