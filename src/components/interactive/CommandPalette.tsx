import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Command, Search } from 'lucide-react';

const base = import.meta.env.BASE_URL;
const withBase = (path: string) => `${base}${path.replace(/^\/+/, '')}`;

type Item = { label: string; href: string };

const commandItems: Item[] = [
  { label: 'Open AI Engineer Path', href: withBase('/learn/') },
  { label: 'Browse the AI tools directory', href: withBase('/tools/') },
  { label: 'Compare LangChain vs LlamaIndex', href: withBase('/tools/') },
  { label: 'Start a daily game quest', href: withBase('/games/') },
  { label: 'Review GPT interview flashcards', href: withBase('/exams/') },
  { label: 'Read the latest newsletter', href: withBase('/newsletter/') },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === 'Escape') setOpen(false);
    };

    const openers = Array.from(document.querySelectorAll('[data-command-open]'));
    const open = () => {
      const sidebar = document.getElementById('app-sidebar');
      const scrim = document.getElementById('sidebar-scrim');
      sidebar?.classList.remove('is-open');
      if (scrim) scrim.hidden = true;
      setOpen(true);
    };
    openers.forEach((opener) => opener.addEventListener('click', open));
    window.addEventListener('keydown', onKeyDown);
    return () => {
      openers.forEach((opener) => opener.removeEventListener('click', open));
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return commandItems;
    return commandItems.filter((item) => item.label.toLowerCase().includes(value));
  }, [query]);

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
            onMouseDown={(event) => event.stopPropagation()}
          >
            <label>
              <Search size={18} aria-hidden="true" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search paths, tools, games, exams..."
                aria-label="Search query"
              />
              <kbd>Esc</kbd>
            </label>
            <div className="command-results">
              {filtered.length === 0 && <p className="command-empty">No results found.</p>}
              {filtered.map((item) => (
                <a href={item.href} key={item.label} onClick={() => setOpen(false)}>
                  <Command size={16} aria-hidden="true" />
                  <span>{item.label}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
