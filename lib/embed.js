// Turns a "live dashboard" link into an embeddable address, when we know how.
// Power BI: use File → Embed report → Publish to web, and paste the link.
// Tableau Public: paste the normal public.tableau.com/views/... link.
export function getEmbed(url) {
  if (!url) return null;
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  if (parsed.protocol !== "https:") return null;

  const host = parsed.hostname;
  if ((host === "powerbi.com" || host.endsWith(".powerbi.com")) && /\/(view|reportEmbed)/i.test(parsed.pathname)) {
    return { tool: "Power BI", src: parsed.toString() };
  }

  if (parsed.hostname === "public.tableau.com" && parsed.pathname.startsWith("/views/")) {
    parsed.searchParams.set(":showVizHome", "no");
    parsed.searchParams.set(":embed", "true");
    return { tool: "Tableau", src: parsed.toString() };
  }

  return null;
}
