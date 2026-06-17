import React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dipakmandlik.github.io/AIByDM/"),
  title: {
    default: "AIByDM - Learn, Build, and Ship AI",
    template: "%s | AIByDM",
  },
  description:
    "A free, open-source AI learning platform with structured tracks, tool discovery, interactive games, exam prep, newsletter issues, and community paths.",
  openGraph: {
    title: "AIByDM - Learn, Build, and Ship AI",
    description:
      "Structured AI learning paths, practical tools, hands-on projects, and community momentum for modern AI builders.",
    url: "https://dipakmandlik.github.io/AIByDM/",
    siteName: "AIByDM",
    type: "website",
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
