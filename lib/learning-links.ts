import { aifsLearningPathIndex, getAifsLessonHref, getPhaseHref } from "@/lib/learning-index";

export function resolveAifsMarkdownHref(href: string, sourcePath: string) {
  if (!href || href.startsWith("#")) return href;
  if (/^(https?:|mailto:)/i.test(href)) return href;

  const directMatch = href.match(/(?:^|\.\.\/\.\.\/)?phases\/([^/]+)\/([^/#)]+)/);
  if (directMatch) return getAifsLessonHref(directMatch[1], directMatch[2]);

  const phaseMatch = href.match(/(?:^|\.\.\/\.\.\/)?phases\/([^/#)]+)/);
  if (phaseMatch) return getPhaseHref(aifsLearningPathIndex.slug, phaseMatch[1]);

  const base = sourcePath.split("/").slice(0, -1).join("/");
  const normalized = normalizePath(base + "/" + href.replace(/^\.\//, ""));
  if (normalized.startsWith("phases/")) {
    const parts = normalized.split("/");
    if (parts.length >= 3) return getAifsLessonHref(parts[1], parts[2]);
    if (parts.length >= 2) return getPhaseHref(aifsLearningPathIndex.slug, parts[1]);
  }
  return aifsLearningPathIndex.source.repository + "/tree/" + aifsLearningPathIndex.source.ref + "/" + normalized;
}

function normalizePath(value: string) {
  const parts: string[] = [];
  for (const part of value.split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") parts.pop();
    else parts.push(part);
  }
  return parts.join("/");
}
