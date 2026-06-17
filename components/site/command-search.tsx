"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { getSearchItems } from "@/lib/content";

export function CommandSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const items = useMemo(() => getSearchItems(), []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return items
      .filter((item) => {
        if (!normalized) return true;
        return [item.title, item.excerpt, item.meta, item.kind, ...item.keywords]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      })
      .slice(0, 8);
  }, [items, query]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden min-h-10 items-center gap-2 rounded-full border border-foreground/10 px-4 text-sm text-foreground/70 transition-colors hover:text-foreground lg:inline-flex"
        aria-label="Search AIByDM"
      >
        <Search className="h-4 w-4" aria-hidden="true" />
        Search
        <kbd className="ml-2 rounded-full border border-foreground/10 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
          Ctrl K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-background/80 p-4 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label="Search AIByDM"
        >
          <div className="mx-auto mt-20 max-w-2xl overflow-hidden border border-foreground/10 bg-background shadow-2xl">
            <div className="flex min-h-16 items-center gap-3 border-b border-foreground/10 px-4">
              <Search className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search AIByDM..."
                className="w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
                aria-label="Close search"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-3">
              {results.map((item) => (
                <Link
                  key={`${item.kind}-${item.href}-${item.title}`}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border border-transparent p-4 transition-colors hover:border-foreground/10 hover:bg-foreground/[0.03]"
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {item.kind} / {item.meta}
                  </span>
                  <span className="mt-2 block text-lg font-medium">{item.title}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{item.excerpt}</span>
                </Link>
              ))}
              {results.length === 0 && (
                <div className="p-6 text-sm text-muted-foreground">No matching results.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
