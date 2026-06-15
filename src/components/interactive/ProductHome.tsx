import type { CSSProperties } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Bell,
  Blocks,
  BookOpen,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Database,
  ExternalLink,
  FileText,
  Gamepad2,
  GitBranch,
  GraduationCap,
  Layers,
  Network,
  Shield,
  Sparkles,
  Star,
  Target,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const base = import.meta.env.BASE_URL;
const withBase = (path: string) => `${base}${path.replace(/^\/+/, '')}`;

// Cubic bezier as const so TypeScript infers a tuple, not number[]
const EASE = [0.22, 1, 0.36, 1] as const;

// Shared Framer Motion variants
const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

const inViewProps = { once: true, margin: '-80px' };

// ─── Data ──────────────────────────────────────────────────────────────────

const modules: {
  title: string;
  text: string;
  metric: string;
  href: string;
  icon: LucideIcon;
  tone: string;
}[] = [
  {
    title: 'Learn',
    text: 'Structured courses, roadmap & labs',
    metric: '120+ Courses',
    href: withBase('/learn/'),
    icon: BookOpen,
    tone: 'violet',
  },
  {
    title: 'Tools',
    text: 'Discover 500+ open-source AI tools',
    metric: '500+ Tools',
    href: withBase('/tools/'),
    icon: Blocks,
    tone: 'cyan',
  },
  {
    title: 'Games',
    text: 'Play & practice with AI-themed games',
    metric: '25+ Games',
    href: withBase('/games/'),
    icon: Gamepad2,
    tone: 'pink',
  },
  {
    title: 'Exams',
    text: 'Mock tests, MCQs & interview prep',
    metric: '1000+ Questions',
    href: withBase('/exams/'),
    icon: GraduationCap,
    tone: 'amber',
  },
  {
    title: 'Newsletter',
    text: 'Weekly AI news & curated resources',
    metric: 'Weekly Updates',
    href: withBase('/newsletter/'),
    icon: Bell,
    tone: 'blue',
  },
];

const learningPaths = [
  {
    title: 'AI Engineer Path',
    subtitle: 'Beginner to Advanced',
    duration: '12 weeks',
    difficulty: 'Intermediate',
    courses: 24,
    icon: BrainCircuit,
    color: 'violet',
  },
  {
    title: 'LLM Engineer Path',
    subtitle: 'Build LLMs & Agents',
    duration: '8 weeks',
    difficulty: 'Advanced',
    courses: 18,
    icon: Bot,
    color: 'cyan',
  },
  {
    title: 'AI Governance Path',
    subtitle: 'Responsible AI & Ethics',
    duration: '6 weeks',
    difficulty: 'Beginner',
    courses: 12,
    icon: Shield,
    color: 'pink',
  },
  {
    title: 'Data Scientist Path',
    subtitle: 'ML, DL & Data Science',
    duration: '10 weeks',
    difficulty: 'Intermediate',
    courses: 20,
    icon: BarChart3,
    color: 'amber',
  },
];

const featuredTools = [
  {
    name: 'Hugging Face',
    category: 'ML Platform',
    description: 'The AI community platform for models, datasets, and spaces.',
    stars: '450K',
    icon: '🤗',
  },
  {
    name: 'LangChain',
    category: 'LLM Framework',
    description: 'Build production-grade AI applications with LLMs and agents.',
    stars: '95K',
    icon: '⛓️',
  },
  {
    name: 'Ollama',
    category: 'Local LLMs',
    description: 'Run large language models locally with a single command.',
    stars: '88K',
    icon: '🦙',
  },
  {
    name: 'ChromaDB',
    category: 'Vector DB',
    description: 'The open-source embedding database built for AI workflows.',
    stars: '14K',
    icon: '🎨',
  },
  {
    name: 'LiteLLM',
    category: 'LLM Gateway',
    description: '100+ LLM providers in one unified API interface.',
    stars: '12K',
    icon: '⚡',
  },
  {
    name: 'Instructor',
    category: 'Structured Output',
    description: 'Structured LLM outputs using Pydantic — effortlessly.',
    stars: '8K',
    icon: '📐',
  },
];

const featuredGames = [
  {
    title: 'Prompt Engineering Duel',
    description: 'Craft perfect prompts to outsmart the AI judge. Compete in real-time.',
    xp: '+150 XP',
    difficulty: 'Medium',
    players: '2.4K',
    tag: '🔥 Daily Challenge',
    featured: true,
  },
  {
    title: 'AI Concept Quest',
    description: 'Race through AI concepts in this knowledge battle against the clock.',
    xp: '+100 XP',
    difficulty: 'Beginner',
    players: '5.1K',
    tag: '⭐ Popular',
    featured: false,
  },
  {
    title: 'Model Matchup',
    description: 'Identify AI models from their outputs and climb the competitive ladder.',
    xp: '+200 XP',
    difficulty: 'Hard',
    players: '1.8K',
    tag: '🏆 Competitive',
    featured: false,
  },
];

const examCategories = [
  {
    title: 'Mock Tests',
    description: 'Full-length AI certification exam simulations',
    count: '50+',
    icon: FileText,
    color: 'violet',
  },
  {
    title: 'Question Bank',
    description: 'Curated MCQs across all AI engineering domains',
    count: '1000+',
    icon: Database,
    color: 'cyan',
  },
  {
    title: 'Interview Prep',
    description: 'Real ML and AI engineer interview questions',
    count: '200+',
    icon: Target,
    color: 'pink',
  },
  {
    title: 'Flashcards',
    description: 'Quick-review AI concepts and key terminology',
    count: '500+',
    icon: Layers,
    color: 'amber',
  },
];

const newsletterIssues = [
  { title: 'OpenAI Releases GPT-5 Turbo — What Changed?', date: 'Jun 10, 2026', tag: '🔥 Hot' },
  {
    title: 'Top 10 Open Source LLMs You Should Know in 2026',
    date: 'Jun 3, 2026',
    tag: '⭐ Featured',
  },
  {
    title: 'AI Agents Are Changing the Engineering Game',
    date: 'May 27, 2026',
    tag: '📚 Deep Dive',
  },
];

const stats: { value: string; label: string; icon: LucideIcon }[] = [
  { value: '50K+', label: 'Learners', icon: Users },
  { value: '500+', label: 'Open Source Tools', icon: Blocks },
  { value: '100+', label: 'Hands-on Projects', icon: Code2 },
  { value: '25+', label: 'Exciting Games', icon: Gamepad2 },
  { value: '1000+', label: 'Exam Questions', icon: GraduationCap },
  { value: '100+', label: 'Contributors', icon: GitBranch },
];

// ─── Root component ────────────────────────────────────────────────────────

export default function ProductHome() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const glowY = useSpring(mouseY, { stiffness: 80, damping: 25 });
  const glowStyle = {
    left: useTransform(glowX, (v) => `${v}px`),
    top: useTransform(glowY, (v) => `${v}px`),
  };

  return (
    <div
      className="lp-wrap"
      onMouseMove={(e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }}
    >
      <motion.div className="cursor-glow" style={glowStyle} aria-hidden="true" />
      <HeroSection />
      <ModuleNav />
      <FeaturedPaths />
      <FeaturedTools />
      <FeaturedGames />
      <FeaturedExams />
      <NewsletterSection />
      <CommunitySection />
      <StatsSection />
    </div>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="lp-hero">
      <div className="mesh-bg" aria-hidden="true" />
      <div className="particle-field" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} style={{ '--i': i } as CSSProperties} />
        ))}
      </div>

      <div className="lp-hero-inner">
        {/* Left: copy */}
        <motion.div className="lp-hero-copy" variants={stagger} initial="hidden" animate="visible">
          <motion.div variants={fadeInUp} className="lp-eyebrow">
            <span className="lp-eyebrow-dot" aria-hidden="true" />
            Open Source · Free Forever · Community Driven
          </motion.div>

          <motion.h1 variants={fadeInUp} className="lp-headline">
            <span>Learn AI.</span>
            <span>Build AI.</span>
            <span className="hero-accent">Master AI.</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="lp-subheadline">
            Master AI engineering through structured learning paths, open-source tools, interactive
            challenges, and real-world projects — all for free.
          </motion.p>

          <motion.div variants={fadeInUp} className="lp-hero-ctas">
            <motion.a
              href={withBase('/learn/')}
              className="primary-action"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Start Learning <ArrowRight size={18} />
            </motion.a>
            <motion.a
              href={withBase('/tools/')}
              className="secondary-action"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Tools
            </motion.a>
          </motion.div>

          <motion.div variants={fadeInUp} className="lp-trust-row">
            {['500+ Tools', '100+ Projects', '1000+ Questions', 'Open Source'].map((item) => (
              <span key={item} className="lp-trust-chip">
                <CheckCircle2 size={13} />
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: ecosystem visual */}
        <motion.div
          className="lp-hero-visual"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: EASE }}
        >
          <AiEcosystem />
        </motion.div>
      </div>
    </section>
  );
}

function AiEcosystem() {
  const nodes: [string, LucideIcon, string][] = [
    ['LLM', BrainCircuit, 'node-a'],
    ['Agents', Bot, 'node-b'],
    ['RAG', Network, 'node-c'],
    ['Vector DBs', Database, 'node-d'],
    ['Code', Code2, 'node-e'],
    ['Vision', Sparkles, 'node-f'],
  ];

  return (
    <div className="ecosystem reveal" aria-label="Animated AI ecosystem visualization">
      <svg className="network-lines" viewBox="0 0 620 520" aria-hidden="true">
        <path d="M310 260 C160 120 120 170 110 250" />
        <path d="M310 260 C450 110 510 160 520 245" />
        <path d="M310 260 C180 340 170 420 250 450" />
        <path d="M310 260 C430 350 455 420 380 455" />
        <path d="M310 260 C285 110 350 85 420 120" />
        <path d="M310 260 C280 390 240 425 175 390" />
      </svg>
      <div className="orbital-core">
        <BrainCircuit size={72} />
        <span />
      </div>
      {nodes.map(([label, Icon, cls], i) => (
        <motion.div
          className={`eco-node ${cls}`}
          key={label}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon size={22} />
          <span>{label}</span>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Module nav ────────────────────────────────────────────────────────────

function ModuleNav() {
  return (
    <section className="lp-section lp-modules" aria-label="Platform modules">
      <motion.div
        className="module-grid"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={inViewProps}
      >
        {modules.map((m) => (
          <motion.a
            key={m.title}
            className={`premium-card module-card tone-${m.tone} reveal`}
            href={m.href}
            variants={fadeInUp}
            whileHover={{ y: -6 }}
          >
            <span className="icon-tile">
              <m.icon size={22} />
            </span>
            <span className="module-title">{m.title}</span>
            <span className="module-copy">{m.text}</span>
            <span className="card-link">
              {m.metric} <ArrowRight size={16} />
            </span>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}

// ─── Featured Paths ────────────────────────────────────────────────────────

function FeaturedPaths() {
  return (
    <section className="lp-section">
      <SectionHeader
        badge="Learning"
        badgeTone="violet"
        title="Featured Learning Paths"
        subtitle="Structured journeys from beginner to AI engineer. Real projects, real skills, zero cost."
        href={withBase('/learn/')}
        linkText="View all paths"
      />
      <motion.div
        className="lp-paths-grid"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={inViewProps}
      >
        {learningPaths.map((path) => (
          <motion.a
            key={path.title}
            className="lp-path-card"
            href={withBase('/learn/')}
            variants={fadeInUp}
            whileHover={{ y: -8, transition: { duration: 0.25 } }}
          >
            <div className="lp-path-card-header">
              <span className={`icon-tile tone-${path.color}`}>
                <path.icon size={20} />
              </span>
              <span className={`lp-diff-badge diff-${path.color}`}>{path.difficulty}</span>
            </div>
            <h3 className="lp-path-title">{path.title}</h3>
            <p className="lp-path-subtitle">{path.subtitle}</p>
            <div className="lp-path-meta">
              <span>⏱ {path.duration}</span>
              <span>📁 {path.courses} courses</span>
            </div>
            <div className="lp-path-footer">
              <span className="lp-start-btn">
                Start Path <ArrowRight size={15} />
              </span>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}

// ─── Featured Tools ────────────────────────────────────────────────────────

function FeaturedTools() {
  return (
    <section className="lp-section lp-tools-section">
      <SectionHeader
        badge="Tools"
        badgeTone="cyan"
        title="500+ Open Source AI Tools"
        subtitle="Discover, compare, and integrate the best open-source AI tools — curated for engineers by engineers."
        href={withBase('/tools/')}
        linkText="Browse all tools"
      />
      <motion.div
        className="lp-tools-grid"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={inViewProps}
      >
        {featuredTools.map((tool) => (
          <motion.a
            key={tool.name}
            className="lp-tool-card"
            href={withBase('/tools/')}
            variants={fadeInUp}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            <div className="lp-tool-header">
              <span className="lp-tool-icon">{tool.icon}</span>
              <span className="lp-tool-category">{tool.category}</span>
            </div>
            <h3 className="lp-tool-name">{tool.name}</h3>
            <p className="lp-tool-desc">{tool.description}</p>
            <div className="lp-tool-footer">
              <span className="lp-tool-stars">
                <Star size={13} /> {tool.stars}
              </span>
              <span className="lp-tool-link">
                View Tool <ExternalLink size={13} />
              </span>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}

// ─── Featured Games ────────────────────────────────────────────────────────

function FeaturedGames() {
  return (
    <section className="lp-section">
      <SectionHeader
        badge="Games"
        badgeTone="pink"
        title="Learn by Playing"
        subtitle="Gamified AI challenges that make learning addictive. Earn XP, unlock achievements, climb leaderboards."
        href={withBase('/games/')}
        linkText="Play all games"
      />
      <motion.div
        className="lp-games-grid"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={inViewProps}
      >
        {featuredGames.map((game) => (
          <motion.a
            key={game.title}
            className={game.featured ? 'lp-game-card lp-game-featured' : 'lp-game-card'}
            href={withBase('/games/')}
            variants={fadeInUp}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            <div className="lp-game-tag">{game.tag}</div>
            <div className="lp-game-icon">
              <Gamepad2 size={28} />
            </div>
            <h3 className="lp-game-title">{game.title}</h3>
            <p className="lp-game-desc">{game.description}</p>
            <div className="lp-game-footer">
              <span className="lp-xp-badge">{game.xp}</span>
              <span className="lp-game-meta">
                <Users size={13} /> {game.players} players
              </span>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}

// ─── Featured Exams ────────────────────────────────────────────────────────

function FeaturedExams() {
  return (
    <section className="lp-section">
      <SectionHeader
        badge="Exams"
        badgeTone="amber"
        title="AI Certification Prep"
        subtitle="Prepare for AI roles with full mock tests, curated question banks, and interview simulations."
        href={withBase('/exams/')}
        linkText="Start preparing"
      />
      <motion.div
        className="lp-exams-grid"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={inViewProps}
      >
        {examCategories.map((cat) => (
          <motion.a
            key={cat.title}
            className="lp-exam-card"
            href={withBase('/exams/')}
            variants={fadeInUp}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            <div className="lp-exam-header">
              <span className={`icon-tile tone-${cat.color}`}>
                <cat.icon size={20} />
              </span>
              <span className="lp-exam-count">{cat.count}</span>
            </div>
            <h3 className="lp-exam-title">{cat.title}</h3>
            <p className="lp-exam-desc">{cat.description}</p>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}

// ─── Newsletter ────────────────────────────────────────────────────────────

function NewsletterSection() {
  return (
    <section className="lp-section">
      <SectionHeader
        badge="Newsletter"
        badgeTone="blue"
        title="Stay Ahead in AI"
        subtitle="Weekly curated AI news, tool discoveries, and tutorials — delivered to your inbox."
        href={withBase('/newsletter/')}
        linkText="View all issues"
      />
      <motion.div
        className="lp-newsletter-inner"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={inViewProps}
      >
        <motion.div className="lp-newsletter-issues" variants={fadeInUp}>
          {newsletterIssues.map((issue) => (
            <a key={issue.title} className="lp-nl-item" href={withBase('/newsletter/')}>
              <span className="lp-nl-icon" aria-hidden="true">
                <Sparkles size={18} />
              </span>
              <span className="lp-nl-body">
                <b>{issue.title}</b>
                <small>{issue.date}</small>
              </span>
              <span className="lp-nl-tag">{issue.tag}</span>
            </a>
          ))}
        </motion.div>

        <motion.div className="lp-newsletter-subscribe" variants={fadeInUp}>
          <Bell size={32} />
          <h3>Join 50,000+ AI Engineers</h3>
          <p>Get the latest AI insights, tool discoveries, and learning resources every week.</p>
          <form className="lp-subscribe-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="your@email.com" aria-label="Email address" />
            <button type="submit">Subscribe Free</button>
          </form>
          <small>No spam. Unsubscribe anytime.</small>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Community CTA ─────────────────────────────────────────────────────────

function CommunitySection() {
  return (
    <section className="lp-section">
      <motion.div
        className="lp-community-card"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inViewProps}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <div className="lp-community-bg" aria-hidden="true" />
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          style={{ color: 'var(--text-muted)' }}
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
        <h2>Built Open Source, Together</h2>
        <p>
          AIByDM is 100% open source. Contribute tools, courses, games, and ideas. Join 100+
          contributors shaping the future of AI education.
        </p>
        <div className="lp-community-actions">
          <motion.a
            href="https://github.com/DipakMandlik/AIbyDM"
            target="_blank"
            rel="noopener noreferrer"
            className="primary-action"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Star on GitHub
          </motion.a>
          <motion.a
            href="https://github.com/DipakMandlik/AIbyDM/discussions"
            target="_blank"
            rel="noopener noreferrer"
            className="secondary-action"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Join Discussions
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Stats ─────────────────────────────────────────────────────────────────

function StatsSection() {
  return (
    <section className="lp-section" aria-label="AIByDM platform statistics">
      <motion.div
        className="lp-stats-grid"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={inViewProps}
      >
        {stats.map(({ value, label, icon: Icon }) => (
          <motion.div key={label} className="lp-stat-item" variants={fadeInUp}>
            <span className="icon-tile">
              <Icon size={20} />
            </span>
            <b className="lp-stat-value">{value}</b>
            <small className="lp-stat-label">{label}</small>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ─── Shared section header ─────────────────────────────────────────────────

function SectionHeader({
  badge,
  badgeTone,
  title,
  subtitle,
  href,
  linkText,
}: {
  badge: string;
  badgeTone: string;
  title: string;
  subtitle: string;
  href?: string;
  linkText?: string;
}) {
  return (
    <motion.div
      className="lp-section-header"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewProps}
      transition={{ duration: 0.55, ease: EASE }}
    >
      <span className={`lp-badge tone-${badgeTone}`}>{badge}</span>
      <h2 className="lp-section-title">{title}</h2>
      <p className="lp-section-subtitle">{subtitle}</p>
      {href && linkText && (
        <a className="lp-see-all" href={href}>
          {linkText} <ArrowRight size={16} />
        </a>
      )}
    </motion.div>
  );
}
