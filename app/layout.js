import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/lib/site-url";

// Headings: Bricolage Grotesque — playful and lively, still professional
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

// Body text: Geist — clean and easy to read
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    siteName: "Nathanael Caleb Tapophile Djouaka",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  title: {
    default: "Nathanael Caleb Tapophile Djouaka — Data Analyst",
    template: "%s · Nathanael Caleb Tapophile Djouaka",
  },
  description:
    "Data analyst portfolio: case studies, a continuously updated learning log, and evidence-backed skills.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
