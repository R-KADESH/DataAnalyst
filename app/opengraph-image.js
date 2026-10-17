import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getProfile } from "@/lib/data";
import { firstNames, formatList } from "@/lib/format";

// The preview card shown when the site is shared on LinkedIn, WhatsApp, X…
export const alt = "Data analyst portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const profile = await getProfile();
  const photo = await readFile(join(process.cwd(), "public/profile-hero.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
  const availability = profile.availability ?? [];

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#0e1830", color: "white" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, padding: "0 72px" }}>
          <div style={{ fontSize: 28, color: "#7fd0f2", letterSpacing: 4 }}>DATA ANALYST PORTFOLIO</div>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, marginTop: 20 }}>
            {firstNames(profile.full_name)}
          </div>
          <div style={{ fontSize: 32, color: "rgba(255,255,255,0.75)", marginTop: 24 }}>
            Turning raw data into clear decisions
          </div>
          <div style={{ display: "flex", alignItems: "center", fontSize: 26, marginTop: 40, color: "#d9a23a" }}>
            <div style={{ width: 14, height: 14, background: "#d9a23a", transform: "rotate(45deg)", marginRight: 16 }} />
            Excel · Power BI · SQL
          </div>
          {availability.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", fontSize: 24, marginTop: 20, color: "#a6d68a" }}>
              <div style={{ width: 14, height: 14, borderRadius: 7, background: "#a6d68a", marginRight: 16 }} />
              Open to {formatList(availability).toLowerCase()}
            </div>
          )}
        </div>
        <img src={photoSrc} alt="" width={440} height={630} style={{ objectFit: "cover" }} />
      </div>
    ),
    size
  );
}
