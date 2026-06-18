import React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const siteUrl = "https://dipakmandlik.github.io/AIByDM";

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: {
    default: "AIByDM - Learn, Build, and Ship AI",
    template: "%s | AIByDM",
  },
  description:
    "A free, open-source AI learning platform with structured tracks, tool discovery, interactive games, exam prep, newsletter issues, and community paths.",
  icons: {
    icon: [
      { url: `${siteUrl}/icon.png`, sizes: "180x180", type: "image/png" },
      { url: `${siteUrl}/icon-light-32x32.png`, sizes: "32x32", type: "image/png", media: "(prefers-color-scheme: light)" },
      { url: `${siteUrl}/icon-dark-32x32.png`, sizes: "32x32", type: "image/png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: [{ url: `${siteUrl}/apple-icon.png`, sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "AIByDM - Learn, Build, and Ship AI",
    description:
      "Structured AI learning paths, practical tools, hands-on projects, and community momentum for modern AI builders.",
    url: `${siteUrl}/`,
    siteName: "AIByDM",
    images: [
      {
        url: `${siteUrl}/brand/social-preview.png`,
        width: 1280,
        height: 640,
        alt: "AIByDM - Learn AI. Build AI. Master AI.",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIByDM - Learn, Build, and Ship AI",
    description: "Structured AI learning paths, practical tools, hands-on projects, and community momentum for modern AI builders.",
    images: [`${siteUrl}/brand/social-preview.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <div id="main-content">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
