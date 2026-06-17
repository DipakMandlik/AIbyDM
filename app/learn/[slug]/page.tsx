import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { TrackDetail } from "@/components/learn/track-detail";
import { tracks } from "@/lib/content";

export function generateStaticParams() {
  return tracks.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const track = tracks.find((t) => t.slug === slug);
  if (!track) return { title: "Track not found - AIByDM" };
  return {
    title: `${track.title} - AIByDM Learn`,
    description: track.description,
  };
}

export default async function TrackPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const track = tracks.find((t) => t.slug === slug);
  if (!track) notFound();

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <SiteNav />
      <TrackDetail track={track} />
      <SiteFooter />
    </main>
  );
}
