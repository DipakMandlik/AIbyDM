import Link from "next/link";
import type { ReactNode } from "react";
import { resolveAifsMarkdownHref } from "@/lib/learning-links";

type Block =
  | { kind: "code"; language: string; value: string }
  | { kind: "heading"; level: 3 | 4; value: string }
  | { kind: "paragraph"; value: string }
  | { kind: "quote"; value: string }
  | { kind: "list"; ordered: boolean; items: string[] }
  | { kind: "table"; rows: string[][] };

export function LearningMarkdown({ markdown, sourcePath }: { markdown: string; sourcePath: string }) {
  const blocks = parseBlocks(markdown);

  return (
    <div className="space-y-5 text-muted-foreground">
      {blocks.map((block, index) => renderBlock(block, sourcePath, index))}
    </div>
  );
}

function renderBlock(block: Block, sourcePath: string, index: number) {
  if (block.kind === "code") {
    return (
      <div key={index} className="overflow-hidden border border-foreground/10 bg-foreground/[0.03]">
        {block.language && (
          <div className="border-b border-foreground/10 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            {block.language}
          </div>
        )}
        <pre className="overflow-x-auto p-4 text-sm leading-6 text-foreground">
          <code>{block.value}</code>
        </pre>
      </div>
    );
  }

  if (block.kind === "heading") {
    const Tag = block.level === 3 ? "h3" : "h4";
    return (
      <Tag key={index} className="pt-4 font-mono text-sm font-medium uppercase tracking-widest text-foreground">
        {block.value}
      </Tag>
    );
  }

  if (block.kind === "quote") {
    return (
      <blockquote key={index} className="border-l-2 border-foreground bg-foreground/[0.03] px-5 py-4 text-lg italic leading-8 text-foreground">
        {renderInline(block.value, sourcePath, index)}
      </blockquote>
    );
  }

  if (block.kind === "list") {
    const Tag = block.ordered ? "ol" : "ul";
    return (
      <Tag key={index} className={block.ordered ? "space-y-2 pl-6" : "space-y-2 pl-5"}>
        {block.items.map((item, itemIndex) => (
          <li key={itemIndex} className={block.ordered ? "list-decimal leading-7" : "list-square leading-7"}>
            {renderInline(item, sourcePath, index + "-" + itemIndex)}
          </li>
        ))}
      </Tag>
    );
  }

  if (block.kind === "table") {
    const [head, separator, ...body] = block.rows;
    const rows = isSeparatorRow(separator) ? body : block.rows.slice(1);
    return (
      <div key={index} className="overflow-x-auto border border-foreground/10">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-foreground/10 bg-foreground/[0.03] text-left font-mono text-[11px] uppercase tracking-widest text-foreground">
              {(head ?? []).map((cell, cellIndex) => (
                <th key={cellIndex} className="px-4 py-3 font-medium">
                  {renderInline(cell, sourcePath, index + "-h-" + cellIndex)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-foreground/10 last:border-b-0">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-3 align-top leading-6">
                    {renderInline(cell, sourcePath, index + "-" + rowIndex + "-" + cellIndex)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <p key={index} className="text-lg leading-8">
      {renderInline(block.value, sourcePath, index)}
    </p>
  );
}

function parseBlocks(markdown: string) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }

    const fence = line.match(/^```\s*([^`]*)\s*$/);
    if (fence) {
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push({ kind: "code", language: fence[1].trim(), value: code.join("\n") });
      continue;
    }

    const heading = line.match(/^(#{3,4})\s+(.+)$/);
    if (heading) {
      blocks.push({ kind: "heading", level: heading[1].length as 3 | 4, value: stripMarkdown(heading[2]) });
      index += 1;
      continue;
    }

    if (line.trim().startsWith("|")) {
      const rows: string[][] = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        rows.push(lines[index].split("|").slice(1, -1).map((cell) => cell.trim()));
        index += 1;
      }
      if (rows.length > 1) blocks.push({ kind: "table", rows });
      continue;
    }

    if (line.trim().startsWith(">")) {
      const quote: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quote.push(lines[index].replace(/^\s*>\s?/, ""));
        index += 1;
      }
      blocks.push({ kind: "quote", value: stripMarkdown(quote.join(" ")) });
      continue;
    }

    const listMatch = line.match(/^\s*((?:[-*])|(?:\d+\.))\s+(.+)$/);
    if (listMatch) {
      const ordered = /\d+\./.test(listMatch[1]);
      const items: string[] = [];
      while (index < lines.length) {
        const item = lines[index].match(/^\s*((?:[-*])|(?:\d+\.))\s+(.+)$/);
        if (!item) break;
        const nextOrdered = /\d+\./.test(item[1]);
        if (nextOrdered !== ordered) break;
        items.push(item[2]);
        index += 1;
      }
      blocks.push({ kind: "list", ordered, items });
      continue;
    }

    const paragraph: string[] = [];
    while (index < lines.length && lines[index].trim() && !isSpecialStart(lines[index])) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push({ kind: "paragraph", value: paragraph.join(" ") });
  }

  return blocks;
}

function renderInline(text: string, sourcePath: string, keyPrefix: string | number): ReactNode[] {
  const token = /(`[^`]+`|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/;
  const match = text.match(token);
  if (!match || match.index === undefined) return [stripMarkdown(text)];

  const before = text.slice(0, match.index);
  const value = match[0];
  const after = text.slice(match.index + value.length);
  const nodes: ReactNode[] = [];
  if (before) nodes.push(stripMarkdown(before));

  if (value.startsWith("`")) {
    nodes.push(
      <code key={keyPrefix + "-code-" + match.index} className="border border-foreground/10 bg-foreground/[0.04] px-1.5 py-0.5 font-mono text-sm text-foreground">
        {value.slice(1, -1)}
      </code>,
    );
  } else if (value.startsWith("[")) {
    const link = value.match(/^\[([^\]]+)]\(([^)]+)\)$/);
    if (link) {
      const href = resolveAifsMarkdownHref(link[2], sourcePath);
      const className = "text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground";
      nodes.push(
        href.startsWith("/") || href.startsWith("#") ? (
          <Link key={keyPrefix + "-link-" + match.index} href={href} className={className}>
            {stripMarkdown(link[1])}
          </Link>
        ) : (
          <a key={keyPrefix + "-link-" + match.index} href={href} className={className} target="_blank" rel="noreferrer">
            {stripMarkdown(link[1])}
          </a>
        ),
      );
    }
  } else {
    nodes.push(
      <strong key={keyPrefix + "-strong-" + match.index} className="font-medium text-foreground">
        {stripMarkdown(value.slice(2, -2))}
      </strong>,
    );
  }

  nodes.push(...renderInline(after, sourcePath, String(keyPrefix) + "-" + match.index));
  return nodes;
}

function isSpecialStart(line: string) {
  const trimmed = line.trim();
  return (
    trimmed.startsWith("```") ||
    trimmed.startsWith("|") ||
    trimmed.startsWith(">") ||
    /^#{3,4}\s+/.test(trimmed) ||
    /^(([-*])|(\d+\.))\s+/.test(trimmed)
  );
}

function isSeparatorRow(row?: string[]) {
  return Boolean(row?.every((cell) => /^:?-{3,}:?$/.test(cell.trim())));
}

function stripMarkdown(value: string) {
  return value
    .replace(/<[^>]+>/g, "")
    .replace(/!\[([^\]]*)]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .trim();
}
