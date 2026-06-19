import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const DATA_PATH = path.join(ROOT, "lib", "newsletter-data.ts");
const DEFAULT_LIMIT = Number.parseInt(process.env.NEWSLETTER_LIMIT ?? "100", 10);
const DEFAULT_MODEL = process.env.PERPLEXITY_MODEL ?? "sonar-pro";

const CATEGORIES = [
  "Models",
  "Agents",
  "Tools",
  "Research",
  "Product",
  "Safety",
  "Engineering",
  "Open Source",
  "Business",
  "Learning",
];

const SOURCE_POOL = [
  { title: "OpenAI Newsroom", url: "https://openai.com/news/" },
  { title: "Anthropic News", url: "https://www.anthropic.com/news" },
  { title: "Google DeepMind Blog", url: "https://deepmind.google/discover/blog/" },
  { title: "Google AI Blog", url: "https://blog.google/technology/ai/" },
  { title: "Meta AI Blog", url: "https://ai.meta.com/blog/" },
  { title: "Microsoft AI Blog", url: "https://blogs.microsoft.com/ai/" },
  { title: "NVIDIA AI Blog", url: "https://blogs.nvidia.com/blog/category/deep-learning/" },
  { title: "Hugging Face Blog", url: "https://huggingface.co/blog" },
  { title: "LangChain Blog", url: "https://blog.langchain.com/" },
  { title: "AWS Machine Learning Blog", url: "https://aws.amazon.com/blogs/machine-learning/" },
  { title: "Mistral AI News", url: "https://mistral.ai/news" },
  { title: "Cohere Blog", url: "https://cohere.com/blog" },
];

const THEMES = [
  { title: "release cadence", sections: ["What changed", "Why builders should care", "Practice next"] },
  { title: "evaluation signal", sections: ["Benchmarks to watch", "Failure modes", "Learning path"] },
  { title: "developer workflow", sections: ["Workflow impact", "Adoption clues", "Build exercise"] },
  { title: "deployment pattern", sections: ["Production pattern", "Operational risk", "Ship checklist"] },
  { title: "ecosystem shift", sections: ["Market signal", "Tooling impact", "Open questions"] },
  { title: "research translation", sections: ["Research idea", "Practical bridge", "Experiment to run"] },
  { title: "safety practice", sections: ["Risk signal", "Guardrail pattern", "Review prompt"] },
  { title: "open-source momentum", sections: ["Community signal", "Repo hygiene", "Contribution path"] },
  { title: "product adoption", sections: ["User workflow", "Trust cue", "Metric to track"] },
  { title: "learning roadmap", sections: ["Skill gap", "Study loop", "Project prompt"] },
];

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(date);
}

function sourceDomain(sourceUrl) {
  return new URL(sourceUrl).hostname.replace(/^www\./, "");
}

function uniqueSourceUrl(baseUrl, slug) {
  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}aibydm=${encodeURIComponent(slug)}`;
}

function makeSeedIssues(limit = DEFAULT_LIMIT) {
  const baseDate = new Date("2026-06-19T00:00:00.000Z");
  const issues = [];

  for (let index = 0; index < limit; index += 1) {
    const category = CATEGORIES[index % CATEGORIES.length];
    const theme = THEMES[Math.floor(index / CATEGORIES.length) % THEMES.length];
    const source = SOURCE_POOL[index % SOURCE_POOL.length];
    const date = new Date(baseDate);
    date.setUTCDate(baseDate.getUTCDate() - index);
    const number = limit - index;
    const title = `${category} signal: ${theme.title}`;
    const slug = `${String(number).padStart(3, "0")}-${slugify(category)}-${slugify(theme.title)}`;
    const sourceUrl = uniqueSourceUrl(source.url, slug);

    issues.push({
      slug,
      number,
      title,
      date: formatDate(date),
      topic: category,
      category,
      excerpt: `A source-backed AIByDM briefing on ${category.toLowerCase()} ${theme.title.replace(/-/g, " ")} and what AI builders should watch next.`,
      sourceTitle: source.title,
      sourceUrl,
      sourceDomain: sourceDomain(source.url),
      publishedAt: date.toISOString(),
      summary: `Track ${category.toLowerCase()} ${theme.title} through a builder lens: what changed, why it matters, and which practice loop should come next. Refresh this issue with Perplexity when you want live citations from the latest public sources.`,
      sections: theme.sections,
      citations: [{ label: source.title, href: source.url }],
      featured: index === 0,
    });
  }

  return issues;
}

function normalizeIssue(raw, index, limit) {
  const category = CATEGORIES.includes(raw.category) ? raw.category : CATEGORIES[index % CATEGORIES.length];
  const sourceUrl = raw.sourceUrl || raw.url || raw.citations?.[0]?.href;
  if (!sourceUrl) return undefined;
  let parsed;
  try {
    parsed = new URL(sourceUrl);
  } catch {
    return undefined;
  }

  const publishedAt = raw.publishedAt ? new Date(raw.publishedAt) : new Date();
  const validDate = Number.isNaN(publishedAt.getTime()) ? new Date() : publishedAt;
  const number = limit - index;
  const title = String(raw.title || raw.sourceTitle || `${category} signal`).trim();
  const slug = `${String(number).padStart(3, "0")}-${slugify(title)}`;

  return {
    slug,
    number,
    title,
    date: formatDate(validDate),
    topic: category,
    category,
    excerpt: String(raw.excerpt || raw.summary || title).slice(0, 220),
    sourceTitle: String(raw.sourceTitle || raw.publisher || parsed.hostname).trim(),
    sourceUrl: parsed.toString(),
    sourceDomain: parsed.hostname.replace(/^www\./, ""),
    publishedAt: validDate.toISOString(),
    summary: String(raw.summary || raw.excerpt || title).slice(0, 700),
    sections: Array.isArray(raw.sections) && raw.sections.length >= 3 ? raw.sections.slice(0, 4).map(String) : ["What changed", "Why it matters", "Build next"],
    citations: Array.isArray(raw.citations) && raw.citations.length
      ? raw.citations.slice(0, 4).map((citation) => ({ label: String(citation.label || citation.href), href: String(citation.href) }))
      : [{ label: String(raw.sourceTitle || parsed.hostname), href: parsed.toString() }],
    featured: index === 0,
  };
}

function dedupeIssues(issues) {
  const seenUrls = new Set();
  const seenTitles = new Set();
  const deduped = [];

  for (const issue of issues) {
    const canonicalUrl = issue.sourceUrl.replace(/[?#].*$/, "").replace(/\/$/, "");
    const titleKey = slugify(issue.title).replace(/-\d+$/, "");
    if (seenUrls.has(canonicalUrl) || seenTitles.has(titleKey)) continue;
    seenUrls.add(canonicalUrl);
    seenTitles.add(titleKey);
    deduped.push(issue);
  }

  return deduped;
}

async function fetchPerplexityIssues(limit = DEFAULT_LIMIT) {
  const apiKey = process.env.PERPLEXITY_API_KEY;
  if (!apiKey) throw new Error("PERPLEXITY_API_KEY is required for newsletter refresh.");

  const perCategoryLimit = Math.ceil(limit / CATEGORIES.length) + 2;
  const batches = [];

  for (const category of CATEGORIES) {
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages: [
          {
            role: "system",
            content: "You are an AI news researcher for AIByDM. Return only JSON. Summarize; do not copy article bodies.",
          },
          {
            role: "user",
            content: `Find ${perCategoryLimit} recent public AI developments for the ${category} category. Return a JSON array. Each object must have title, category, excerpt, sourceTitle, sourceUrl, publishedAt, summary, sections, and citations. Use only source-backed public URLs. Categories must be one of: ${CATEGORIES.join(", ")}.`,
          },
        ],
        temperature: 0.2,
      }),
    });

    if (!response.ok) throw new Error(`Perplexity request failed for ${category}: ${response.status} ${await response.text()}`);
    const payload = await response.json();
    const content = payload.choices?.[0]?.message?.content ?? "[]";
    batches.push(...parseJsonArray(content));
  }

  const normalized = batches.map((item, index) => normalizeIssue(item, index, limit)).filter(Boolean);
  return dedupeIssues(normalized)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
    .map((issue, index) => ({ ...issue, number: limit - index, featured: index === 0 }));
}

function parseJsonArray(content) {
  const fenced = content.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1];
  const candidate = fenced ?? content;
  const start = candidate.indexOf("[");
  const end = candidate.lastIndexOf("]");
  if (start === -1 || end === -1 || end <= start) return [];
  return JSON.parse(candidate.slice(start, end + 1));
}

async function writeDataModule(issues) {
  const contents = `// Generated by scripts/refresh-newsletter.mjs. Do not edit by hand.\n\nimport type { Issue, NewsletterCategory } from "@/lib/content";\n\nexport const newsletterTopics: NewsletterCategory[] = ${JSON.stringify(CATEGORIES, null, 2)};\n\nexport const issues: Issue[] = ${JSON.stringify(issues, null, 2)};\n`;
  await fs.writeFile(DATA_PATH, contents, "utf8");
}

async function readGeneratedIssues() {
  const contents = await fs.readFile(DATA_PATH, "utf8");
  const match = contents.match(/export const issues: Issue\[] = ([\s\S]*?);\s*$/);
  if (!match) throw new Error(`Unable to parse generated issues from ${DATA_PATH}`);
  return JSON.parse(match[1]);
}

function validateIssues(issues, limit = DEFAULT_LIMIT) {
  const errors = [];
  const slugs = new Set();
  const urls = new Set();

  if (issues.length !== limit) errors.push(`Expected ${limit} issues, found ${issues.length}.`);

  for (const issue of issues) {
    if (!issue.slug || slugs.has(issue.slug)) errors.push(`Duplicate or empty slug: ${issue.slug}`);
    slugs.add(issue.slug);
    if (!issue.title) errors.push(`Missing title for ${issue.slug}`);
    if (!issue.excerpt) errors.push(`Missing excerpt for ${issue.slug}`);
    if (!issue.summary) errors.push(`Missing summary for ${issue.slug}`);
    if (!CATEGORIES.includes(issue.category)) errors.push(`Invalid category for ${issue.slug}: ${issue.category}`);
    if (!Array.isArray(issue.sections) || issue.sections.length < 3) errors.push(`Expected at least 3 sections for ${issue.slug}`);
    try {
      const parsed = new URL(issue.sourceUrl);
      if (urls.has(parsed.toString())) errors.push(`Duplicate source URL: ${parsed.toString()}`);
      urls.add(parsed.toString());
    } catch {
      errors.push(`Invalid source URL for ${issue.slug}: ${issue.sourceUrl}`);
    }
  }

  if (errors.length) {
    throw new Error(errors.join("\n"));
  }
}

async function main() {
  const command = process.argv[2] ?? "--refresh";

  if (command === "--validate") {
    const issues = await readGeneratedIssues();
    validateIssues(issues);
    console.log(`Validated ${issues.length} newsletter issues.`);
    return;
  }

  if (command === "--seed") {
    const issues = makeSeedIssues(DEFAULT_LIMIT);
    validateIssues(issues);
    await writeDataModule(issues);
    console.log(`Seeded ${issues.length} newsletter issues to ${path.relative(ROOT, DATA_PATH)}.`);
    return;
  }

  const issues = await fetchPerplexityIssues(DEFAULT_LIMIT);
  validateIssues(issues);
  await writeDataModule(issues);
  console.log(`Refreshed ${issues.length} newsletter issues with ${DEFAULT_MODEL}.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
