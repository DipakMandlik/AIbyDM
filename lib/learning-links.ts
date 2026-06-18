import { aifsLearningPathIndex, getAifsLessonHref, getPhaseHref } from "@/lib/learning-index";

const UPSTREAM_AIFS_REPO = "https://github.com/rohitg00/ai-engineering-from-scratch";
const AIBYDM_REPO = "https://github.com/DipakMandlik/AIByDM";

export function resolveAifsMarkdownHref(href: string, sourcePath: string) {
  if (!href || href.startsWith("#")) return href;

  const upstreamPath = getGitHubRepoPath(href, UPSTREAM_AIFS_REPO);
  if (upstreamPath) return getAibydmGitHubPath(upstreamPath);

  if (/^(https?:|mailto:)/i.test(href)) return href;

  const explicitPath = normalizePath(href.replace(/^\.\//, ""));
  if (explicitPath.startsWith("phases/")) return resolveAifsPath(explicitPath);

  const normalized = normalizePath(sourcePath + "/" + href.replace(/^\.\//, ""));
  if (normalized.startsWith("phases/")) return resolveAifsPath(normalized);

  return getAibydmGitHubPath(normalized);
}

function resolveAifsPath(normalized: string) {
  const parts = normalized.split("/");
  if (parts.length >= 4) return getAibydmGitHubPath(normalized);
  if (parts.length >= 3) return getAifsLessonHref(parts[1], parts[2]);
  if (parts.length >= 2) return getPhaseHref(aifsLearningPathIndex.slug, parts[1]);
  return getAibydmGitHubPath(normalized);
}

function getGitHubRepoPath(href: string, repository: string) {
  const prefixes = [repository + "/tree/", repository + "/blob/"];
  for (const prefix of prefixes) {
    if (!href.toLowerCase().startsWith(prefix.toLowerCase())) continue;
    const rest = href.slice(prefix.length);
    const slashIndex = rest.indexOf("/");
    if (slashIndex < 0) return undefined;
    return normalizePath(decodeURIComponent(rest.slice(slashIndex + 1)));
  }
  return undefined;
}

function getAibydmGitHubPath(normalized: string) {
  return AIBYDM_REPO + "/tree/" + aifsLearningPathIndex.source.ref + "/" + normalized;
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
