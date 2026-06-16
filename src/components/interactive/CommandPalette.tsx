import type { MouseEvent as ReactMouseEvent } from 'react';
import { startTransition, useDeferredValue, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Clock3, Search } from 'lucide-react';

import type { LearnSearchItem } from '@data/learn/catalog';
import {
  getRecentLessons,
  readLearnProgress,
  subscribeToLearnProgress,
} from '@data/learn/progress';
import { searchLearnCatalog } from '@data/learn/search';

interface CommandResult {
  id: string;
  label: string;
  href: string;
  meta: string;
  kind: string;
  duration?: string;
}

function kindLabel(kind: LearnSearchItem['kind']): string {
  switch (kind) {
    case 'track':
      return 'Track';
    case 'module':
      return 'Module';
    case 'lesson':
      return 'Lesson';
    case 'project':
      return 'Project';
    case 'resource':
      return 'Resource';
    case 'glossary':
      return 'Glossary';
    default:
      return 'Result';
  }
}

function fromSearchItem(item: LearnSearchItem): CommandResult {
  return {
    id: item.kind + ':' + item.href + ':' + item.title,
    label: item.title,
    href: item.href,
    meta: item.moduleTitle ? item.trackTitle + ' / ' + item.moduleTitle : item.trackTitle,
    kind: kindLabel(item.kind),
    duration: item.duration,
  };
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const deferredQuery = useDeferredValue(query);
  const [recentResults, setRecentResults] = useState<CommandResult[]>(() =>
    getRecentLessons(readLearnProgress(), 4).map((item) => ({
      id: item.lessonKey,
      label: item.lessonTitle,
      href: item.href,
      meta: item.trackTitle + ' / ' + item.moduleTitle,
      kind: item.completed ? 'recent-complete' : 'recent',
    })),
  );

  useEffect(() => {
    const openPalette = () => {
      setOpen(true);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        openPalette();
        return;
      }

      if (!open) {
        if (event.key === 'Escape') setOpen(false);
        return;
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveIndex((current) => current + 1);
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveIndex((current) => Math.max(0, current - 1));
      }
    };

    const openers = Array.from(document.querySelectorAll('[data-command-open]'));
    openers.forEach((opener) => opener.addEventListener('click', openPalette));
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      openers.forEach((opener) => opener.removeEventListener('click', openPalette));
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    return subscribeToLearnProgress((nextState) => {
      setRecentResults(
        getRecentLessons(nextState, 4).map((item) => ({
          id: item.lessonKey,
          label: item.lessonTitle,
          href: item.href,
          meta: item.trackTitle + ' / ' + item.moduleTitle,
          kind: item.completed ? 'recent-complete' : 'recent',
        })),
      );
    });
  }, []);

  const results = useMemo(() => {
    if (!deferredQuery.trim()) {
      const popular = searchLearnCatalog('', 8).map(fromSearchItem);
      const seen = new Set<string>();
      const merged = [...recentResults, ...popular].filter((item) => {
        const key = item.href + ':' + item.label;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      return merged.slice(0, 8);
    }

    return searchLearnCatalog(deferredQuery, 10).map(fromSearchItem);
  }, [deferredQuery, recentResults]);

  useEffect(() => {
    setActiveIndex(0);
  }, [deferredQuery, open]);

  useEffect(() => {
    if (results.length === 0) {
      setActiveIndex(0);
      return;
    }

    setActiveIndex((current) => Math.min(current, results.length - 1));
  }, [results]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && results[activeIndex]) {
        event.preventDefault();
        window.location.assign(results[activeIndex].href);
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, open, results]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="command-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={() => setOpen(false)}
        >
          <motion.div
            className="command-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Search AIByDM"
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            onMouseDown={(event: ReactMouseEvent<HTMLDivElement>) => event.stopPropagation()}
          >
            <label>
              <Search size={18} aria-hidden="true" />
              <input
                autoFocus
                value={query}
                onChange={(event) => {
                  const value = event.target.value;
                  startTransition(() => {
                    setQuery(value);
                  });
                }}
                placeholder="Search tracks, lessons, retrieval, MLOps, governance..."
                aria-label="Search query"
              />
              <kbd>Esc</kbd>
            </label>
            <div className="command-results" role="listbox" aria-label="Command palette results">
              {results.length === 0 && <p className="command-empty">No results found.</p>}
              {results.map((item, index) => (
                <a
                  href={item.href}
                  key={item.id}
                  className={index === activeIndex ? 'is-active' : undefined}
                  aria-selected={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setOpen(false)}
                >
                  <div className="command-result-copy">
                    <span className="command-result-kind">{item.kind.replace('-', ' ')}</span>
                    <span>{item.label}</span>
                    <small>{item.meta}</small>
                  </div>
                  <div className="command-result-meta">
                    {item.duration && (
                      <span>
                        <Clock3 size={14} aria-hidden="true" />
                        {item.duration}
                      </span>
                    )}
                    <ArrowRight size={16} aria-hidden="true" />
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
