"use client";

import Link from "next/link";
import { ArrowLeft, Check, Circle, Lock, Play, FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLessonHref, getProjectHref, type Track } from "@/lib/content";

export function TrackDetail({ track }: { track: Track }) {
  const lessonCount = track.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = Math.round((track.progress / 100) * lessonCount);
  const firstLesson = track.modules[0]?.lessons[0];
  const nextLesson =
    track.modules.flatMap((trackModule) => trackModule.lessons)[Math.min(completedCount, lessonCount - 1)] ??
    firstLesson;

  let lessonIndex = -1;

  return (
    <>
      <section className="relative pt-36 lg:pt-44 pb-12 border-b border-foreground/10">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-foreground/10"
              style={{ top: `${20 * (i + 1)}%`, left: 0, right: 0 }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-12">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            All tracks
          </Link>

          <div className="flex items-start gap-4 mb-6">
            <span className="font-mono text-sm text-muted-foreground mt-3">{track.number}</span>
            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-display leading-[0.95] tracking-tight">
              {track.title}
            </h1>
          </div>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
            {track.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 mb-10">
            <span className="font-mono text-sm">{track.level}</span>
            <span className="font-mono text-sm text-muted-foreground">{track.duration}</span>
            <span className="font-mono text-sm text-muted-foreground">
              {track.modules.length} modules
            </span>
            <span className="font-mono text-sm text-muted-foreground">{lessonCount} lessons</span>
          </div>

          {/* Progress bar */}
          <div className="max-w-md mb-10">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-muted-foreground">
                {completedCount} / {lessonCount} complete
              </span>
              <span className="font-mono text-xs">{track.progress}%</span>
            </div>
            <div className="h-2 bg-foreground/10 overflow-hidden rounded-full">
              <div
                className="h-full bg-foreground rounded-full transition-all duration-700"
                style={{ width: `${track.progress}%` }}
              />
            </div>
          </div>

          <Button
            asChild
            size="lg"
            className="bg-foreground hover:bg-foreground/90 text-background px-8 h-14 text-base rounded-full group"
          >
            <Link href={nextLesson ? getLessonHref(track.slug, nextLesson.slug) : "/learn"}>
              <Play className="w-4 h-4 mr-2 fill-current" />
              {track.progress > 0 ? "Continue track" : "Start track"}
            </Link>
          </Button>
        </div>
      </section>

      {/* Curriculum */}
      <section className="relative py-16 lg:py-24">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Modules */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-display mb-8">Curriculum</h2>

              <div className="space-y-10">
                {track.modules.map((trackModule, mi) => (
                  <div key={trackModule.slug} id={trackModule.slug}>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="font-mono text-xs text-muted-foreground">
                        Module {String(mi + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 h-px bg-foreground/10" />
                    </div>
                    <h3 className="text-xl font-medium mb-5">{trackModule.title}</h3>

                    <div className="border border-foreground/10">
                      {trackModule.lessons.map((lesson) => {
                        lessonIndex++;
                        const done = lessonIndex < completedCount;
                        const current = lessonIndex === completedCount;
                        const locked = lessonIndex > completedCount;
                        return (
                          <Link
                            key={lesson.slug}
                            href={getLessonHref(track.slug, lesson.slug)}
                            className={`flex items-center gap-4 px-5 py-4 border-b border-foreground/10 last:border-b-0 transition-colors ${
                              current ? "bg-foreground/[0.03]" : "hover:bg-foreground/[0.02]"
                            }`}
                          >
                            <span className="shrink-0">
                              {done ? (
                                <Check className="w-4 h-4 text-green-700" />
                              ) : current ? (
                                <Circle className="w-4 h-4 text-foreground fill-foreground/20" />
                              ) : (
                                <Lock className="w-4 h-4 text-muted-foreground/40" />
                              )}
                            </span>
                            <span
                              className={`flex-1 ${
                                locked ? "text-muted-foreground" : "text-foreground"
                              }`}
                            >
                              <span className="block font-medium">{lesson.title}</span>
                              <span className="mt-1 block text-sm text-muted-foreground">
                                {lesson.summary}
                              </span>
                            </span>
                            <span className="hidden font-mono text-xs text-muted-foreground sm:block">
                              {lesson.duration}
                            </span>
                            {current && (
                              <span className="font-mono text-xs px-2 py-0.5 bg-foreground text-background">
                                Up next
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar: projects + milestones */}
            <aside className="lg:sticky lg:top-32 self-start space-y-8">
              <div className="border border-foreground/10 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <FolderGit2 className="w-4 h-4" />
                  <h3 className="font-medium">Projects you&apos;ll ship</h3>
                </div>
                <ul className="space-y-4">
                  {track.projects.map((project) => (
                    <li key={project.slug} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-foreground/40 shrink-0" />
                      <Link
                        href={getProjectHref(track.slug, project.slug)}
                        className="transition-colors hover:text-foreground"
                      >
                        <span className="block font-medium text-foreground">{project.title}</span>
                        <span className="mt-1 block">{project.summary}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-foreground/10 p-6">
                <h3 className="font-medium mb-5">On completion</h3>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-foreground" />
                    Earn a track certificate
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-foreground" />
                    Add projects to your portfolio
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-foreground" />
                    Unlock the next recommended track
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
