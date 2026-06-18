"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { LearningMarkdown } from "@/components/learn/aifs/learning-markdown";
import { Button } from "@/components/ui/button";
import type { AifsLessonSection, AifsQuizQuestion } from "@/lib/learning";

type LessonPage =
  | { key: string; title: string; kind: "section"; section: AifsLessonSection }
  | { key: "check-understanding"; title: "Check Understanding"; kind: "quiz" };

export function LessonBody({
  sections,
  quiz,
  sourcePath,
}: {
  sections: AifsLessonSection[];
  quiz: AifsQuizQuestion[];
  sourcePath: string;
}) {
  const pages = useLessonPages(sections, quiz.length > 0);
  const pageScrollRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [activePageIndex, setActivePageIndex] = useState(0);

  const setPageByIndex = useCallback(
    (nextIndex: number) => {
      const clamped = Math.max(0, Math.min(nextIndex, pages.length - 1));
      const page = pages[clamped];
      if (!page) return;
      setActivePageIndex(clamped);
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", `#${page.key}`);
        window.dispatchEvent(new Event("hashchange"));
      }
    },
    [pages],
  );

  const syncFromHash = useCallback(() => {
    if (typeof window === "undefined") return;
    const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    const nextIndex = pages.findIndex((page) => page.key === hash);
    setActivePageIndex(nextIndex >= 0 ? nextIndex : 0);
    if (nextIndex < 0 && pages[0] && window.location.hash) {
      window.history.replaceState(null, "", `#${pages[0].key}`);
    }
  }, [pages]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMounted(true);
      syncFromHash();
    });
    window.addEventListener("hashchange", syncFromHash);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, [syncFromHash]);

  useEffect(() => {
    pageScrollRef.current?.scrollTo({ top: 0 });
  }, [activePageIndex]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const tagName = target?.tagName.toLowerCase();
      if (tagName === "input" || tagName === "textarea" || tagName === "select" || target?.isContentEditable) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setPageByIndex(activePageIndex - 1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setPageByIndex(activePageIndex + 1);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activePageIndex, setPageByIndex]);

  if (!mounted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center border border-foreground/10 p-6 text-sm text-muted-foreground">
        Loading lesson page...
      </div>
    );
  }

  const activePage = pages[activePageIndex] ?? pages[0];
  const previousDisabled = activePageIndex === 0;
  const nextDisabled = activePageIndex >= pages.length - 1;

  return (
    <section className="flex h-[calc(100dvh-8rem)] min-h-0 flex-col border border-foreground/10 bg-background/80 shadow-sm backdrop-blur lg:h-full">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-foreground/10 px-5 py-4 lg:px-7">
        <div className="min-w-0">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Page {activePageIndex + 1} / {pages.length}
          </p>
          <h2 className="mt-1 line-clamp-2 font-display text-2xl leading-tight lg:text-3xl">
            {displaySectionTitle(activePage.title)}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" size="sm" className="min-h-10 rounded-full" onClick={() => setPageByIndex(activePageIndex - 1)} disabled={previousDisabled}>
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button type="button" size="sm" className="min-h-10 rounded-full" onClick={() => setPageByIndex(activePageIndex + 1)} disabled={nextDisabled}>
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div ref={pageScrollRef} className="min-h-0 flex-1 overflow-y-auto px-5 py-7 lg:px-8 lg:py-8">
        <div id={activePage.key} className="mx-auto max-w-[72ch]">
          <div className="mb-6 flex items-center gap-3">
            <BookOpen className="h-5 w-5 shrink-0" aria-hidden="true" />
            <h3 className="font-display text-3xl leading-tight">{displaySectionTitle(activePage.title)}</h3>
          </div>
          {activePage.kind === "section" ? (
            <LearningMarkdown markdown={activePage.section.markdown} sourcePath={sourcePath} />
          ) : (
            <QuizPage quiz={quiz} />
          )}
        </div>
      </div>

      <div className="border-t border-foreground/10 px-5 py-4 lg:px-7">
        <div className="flex items-center gap-1.5" aria-label="Lesson pages">
          {pages.map((page, index) => (
            <button
              key={page.key}
              type="button"
              aria-label={`Go to ${displaySectionTitle(page.title)}`}
              aria-current={index === activePageIndex ? "step" : undefined}
              onClick={() => setPageByIndex(index)}
              className="group flex h-8 flex-1 items-center"
            >
              <span
                className={`h-2 w-full rounded-full transition-colors ${
                  index === activePageIndex ? "bg-foreground" : "bg-foreground/15 group-hover:bg-foreground/30"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}


export function LessonTableOfContents({ sections, hasQuiz }: { sections: AifsLessonSection[]; hasQuiz: boolean }) {
  const pages = useLessonPages(sections, hasQuiz);
  const [activeKey, setActiveKey] = useState(pages[0]?.key ?? "");

  const setPageByKey = useCallback((key: string) => {
    window.history.replaceState(null, "", `#${key}`);
    window.dispatchEvent(new Event("hashchange"));
  }, []);

  useEffect(() => {
    function syncFromHash() {
      const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      setActiveKey(pages.some((page) => page.key === hash) ? hash : pages[0]?.key ?? "");
    }

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [pages]);

  return (
    <section className="border border-foreground/10 p-6">
      <h2 className="font-medium">On this page</h2>
      <div className="mt-5 space-y-1.5">
        {pages.map((page, index) => (
          <button
            key={page.key}
            type="button"
            onClick={() => setPageByKey(page.key)}
            aria-current={page.key === activeKey ? "step" : undefined}
            className={`block w-full border-l-2 py-2 pl-3 text-left text-sm transition-colors ${
              page.key === activeKey
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            <span className="mr-2 font-mono text-[10px] text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
            {displaySectionTitle(page.title)}
          </button>
        ))}
      </div>
    </section>
  );
}

function QuizPage({ quiz }: { quiz: AifsQuizQuestion[] }) {
  return (
    <div className="grid gap-px border border-foreground/10 bg-foreground/10">
      {quiz.slice(0, 5).map((question, index) => (
        <details key={question.id} className="group bg-background p-5">
          <summary className="cursor-pointer list-none font-medium text-foreground">
            <span className="mr-3 font-mono text-xs text-muted-foreground">Q{String(index + 1).padStart(2, "0")}</span>
            {question.question}
          </summary>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            {question.options.map((option, optionIndex) => (
              <p key={option} className={optionIndex === question.correct ? "text-foreground" : undefined}>
                {String.fromCharCode(65 + optionIndex)}. {option}
              </p>
            ))}
            <p className="border-l-2 border-foreground/20 pl-4 leading-6">{question.explanation}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

function useLessonPages(sections: AifsLessonSection[], hasQuiz: boolean) {
  return useMemo<LessonPage[]>(() => {
    const pages: LessonPage[] = sections.map((section) => ({
      key: section.key,
      title: section.title,
      kind: "section",
      section,
    }));
    if (hasQuiz) pages.push({ key: "check-understanding", title: "Check Understanding", kind: "quiz" });
    return pages;
  }, [sections, hasQuiz]);
}

function displaySectionTitle(title: string) {
  if (/^the problem$/i.test(title)) return "Problem";
  if (/^the concept$/i.test(title)) return "Concept";
  return title;
}
