"use client";

import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { LearningMarkdown } from "@/components/learn/aifs/learning-markdown";
import type { AifsLessonSection, AifsQuizQuestion } from "@/lib/learning";

export function LessonBody({
  sections,
  quiz,
  sourcePath,
}: {
  sections: AifsLessonSection[];
  quiz: AifsQuizQuestion[];
  sourcePath: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!mounted) {
    return (
      <div className="border border-foreground/10 p-6 text-sm text-muted-foreground">
        Loading lesson sections...
      </div>
    );
  }

  return (
    <>
      {sections.map((section) => (
        <section key={section.key} id={section.key} className="scroll-mt-32">
          <div className="mb-6 flex items-center gap-3">
            <BookOpen className="h-5 w-5" aria-hidden="true" />
            <h2 className="font-display text-3xl">{displaySectionTitle(section.title)}</h2>
          </div>
          <LearningMarkdown markdown={section.markdown} sourcePath={sourcePath} />
        </section>
      ))}

      {quiz.length > 0 && (
        <section id="check-understanding" className="scroll-mt-32">
          <div className="mb-6 flex items-center gap-3">
            <BookOpen className="h-5 w-5" aria-hidden="true" />
            <h2 className="font-display text-3xl">Check Understanding</h2>
          </div>
          <div className="grid gap-px border border-foreground/10 bg-foreground/10">
            {quiz.slice(0, 5).map((question, index) => (
              <details key={question.id} className="group bg-background p-5">
                <summary className="cursor-pointer list-none font-medium text-foreground">
                  <span className="mr-3 font-mono text-xs text-muted-foreground">
                    Q{String(index + 1).padStart(2, "0")}
                  </span>
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
        </section>
      )}
    </>
  );
}

function displaySectionTitle(title: string) {
  if (/^the problem$/i.test(title)) return "Problem";
  if (/^the concept$/i.test(title)) return "Concept";
  return title;
}
