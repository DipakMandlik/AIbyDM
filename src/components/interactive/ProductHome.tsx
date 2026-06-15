import type { CSSProperties } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Bell,
  Blocks,
  BookOpen,
  Bot,
  BrainCircuit,
  Code2,
  Database,
  Flame,
  Gamepad2,
  GitBranch,
  GraduationCap,
  Network,
  Rocket,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const base = import.meta.env.BASE_URL;
const withBase = (path: string) => `${base}${path.replace(/^\/+/, '')}`;

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
    text: 'Structured courses, projects & roadmap',
    metric: '120+ Courses',
    href: withBase('/learn/'),
    icon: BookOpen,
    tone: 'violet',
  },
  {
    title: 'Tools',
    text: 'Discover 500+ free open-source AI tools',
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
    text: 'Prepare with exams, MCQs & mock tests',
    metric: '1000+ Questions',
    href: withBase('/exams/'),
    icon: GraduationCap,
    tone: 'amber',
  },
  {
    title: 'Newsletter',
    text: 'Stay updated with AI news & resources',
    metric: 'Weekly Updates',
    href: withBase('/newsletter/'),
    icon: Bell,
    tone: 'blue',
  },
];

const learningPaths: {
  title: string;
  subtitle: string;
  progress: number;
  count: string;
  icon: LucideIcon;
}[] = [
  {
    title: 'AI Engineer Path',
    subtitle: 'Beginner to Advanced',
    progress: 68,
    count: '24 Courses',
    icon: BrainCircuit,
  },
  {
    title: 'LLM Engineer Path',
    subtitle: 'Build LLMs & Agents',
    progress: 55,
    count: '18 Courses',
    icon: Bot,
  },
  {
    title: 'AI Governance Path',
    subtitle: 'Responsible AI & Ethics',
    progress: 40,
    count: '12 Courses',
    icon: Sparkles,
  },
  {
    title: 'Data Scientist Path',
    subtitle: 'ML, DL & Data Science',
    progress: 72,
    count: '20 Courses',
    icon: Database,
  },
];

const leaderboard = [
  { rank: 1, name: 'Alex Dev', xp: '15,230 XP' },
  { rank: 2, name: 'AI Explorer', xp: '12,840 XP' },
  { rank: 3, name: 'NeuralNinja', xp: '9,420 XP' },
  { rank: 4, name: 'CodeMaster', xp: '8,910 XP' },
];

const newsletterItems = [
  { title: 'OpenAI Releases GPT-5 Turbo', date: 'May 10, 2026' },
  { title: 'Top 10 Open Source LLMs in 2026', date: 'May 8, 2026' },
  { title: 'AI Agents Are Changing the Game', date: 'May 5, 2026' },
];

const stats: { value: string; label: string; icon: LucideIcon }[] = [
  { value: '50K+', label: 'Learners', icon: Users },
  { value: '500+', label: 'Open Source Tools', icon: Blocks },
  { value: '100+', label: 'Hands-on Projects', icon: Code2 },
  { value: '25+', label: 'Exciting Games', icon: Gamepad2 },
  { value: '1000+', label: 'Exam Questions', icon: GraduationCap },
  { value: '100+', label: 'Contributors', icon: GitBranch },
];

export default function ProductHome() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const glowY = useSpring(mouseY, { stiffness: 80, damping: 25 });
  const glowStyle = {
    left: useTransform(glowX, (value) => `${value}px`),
    top: useTransform(glowY, (value) => `${value}px`),
  };

  return (
    <div
      className="dash-wrap"
      onMouseMove={(event) => {
        mouseX.set(event.clientX);
        mouseY.set(event.clientY);
      }}
    >
      <motion.div className="cursor-glow" style={glowStyle} aria-hidden="true" />

      <div className="dash">
        <div className="dash-main">
          <Hero />
          <section className="module-grid" aria-label="Platform modules">
            {modules.map((module, index) => (
              <motion.a
                className={`premium-card module-card tone-${module.tone}`}
                href={module.href}
                key={module.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -6 }}
              >
                <span className="icon-tile">
                  <module.icon size={22} />
                </span>
                <span className="module-title">{module.title}</span>
                <span className="module-copy">{module.text}</span>
                <span className="card-link">
                  {module.metric}
                  <ArrowRight size={16} />
                </span>
              </motion.a>
            ))}
          </section>

          <PathsSection />
        </div>

        <aside className="dash-rail" aria-label="Your dashboard">
          <StreakCard />
          <ContinueCard />
          <LeaderboardCard />
          <NewsletterCard />
        </aside>
      </div>

      <StatsStrip />
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="mesh-bg" aria-hidden="true" />
      <div className="particle-field" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, index) => (
          <span key={index} style={{ '--i': index } as CSSProperties} />
        ))}
      </div>
      <motion.div
        className="hero-copy"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>
          <span>Learn AI.</span>
          <span>Build AI.</span>
          <span className="hero-accent">Master AI.</span>
        </h1>
        <p>
          Your all-in-one platform to learn, build, explore tools, play games, and prepare for exams
          — all for free.
        </p>
        <div className="hero-actions">
          <motion.a
            className="primary-action"
            href={withBase('/learn/')}
            whileTap={{ scale: 0.97 }}
          >
            Start Learning
            <ArrowRight size={18} />
          </motion.a>
          <motion.a
            className="secondary-action"
            href={withBase('/tools/')}
            whileTap={{ scale: 0.97 }}
          >
            Explore Tools
          </motion.a>
        </div>
      </motion.div>
      <AiEcosystem />
    </section>
  );
}

function AiEcosystem() {
  const nodes = [
    ['LLM', BrainCircuit, 'node-a'],
    ['Agents', Bot, 'node-b'],
    ['RAG', Network, 'node-c'],
    ['Vector DBs', Database, 'node-d'],
    ['Code', Code2, 'node-e'],
    ['Vision', Sparkles, 'node-f'],
  ] as const;

  return (
    <motion.div
      className="ecosystem"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.15 }}
      aria-label="Animated AI ecosystem visualization"
    >
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
      {nodes.map(([label, Icon, className], index) => (
        <motion.div
          className={`eco-node ${className}`}
          key={label}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4 + index * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon size={22} />
          <span>{label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

function PathsSection() {
  return (
    <section className="paths-section">
      <div className="section-row">
        <div>
          <h2>Popular Learning Paths</h2>
          <p>Explore curated paths to master AI step by step</p>
        </div>
        <a className="see-all" href={withBase('/learn/')}>
          View all paths <ArrowRight size={16} />
        </a>
      </div>
      <div className="path-grid">
        {learningPaths.map(({ title, subtitle, progress, count, icon: Icon }) => (
          <motion.a
            className="premium-card path-card"
            href={withBase('/learn/')}
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            whileHover={{ y: -6 }}
          >
            <div className="card-head">
              <span className="icon-tile">
                <Icon size={20} />
              </span>
            </div>
            <h3>{title}</h3>
            <p>{subtitle}</p>
            <div className="progress-line" aria-label={`${progress}% complete`}>
              <span style={{ width: `${progress}%` }} />
            </div>
            <div className="card-meta">
              <span>{count}</span>
              <span>{progress}%</span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

function StreakCard() {
  return (
    <motion.div
      className="rail-card streak-card"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="rail-card-head">
        <span className="rail-icon flame">
          <Flame size={16} />
        </span>
        <b>Daily Streak</b>
        <em>+20 XP</em>
      </div>
      <strong className="streak-count">
        12 <small>days</small>
      </strong>
      <p className="rail-note">Keep it up, AI Engineer!</p>
      <div className="streak-dots" aria-hidden="true">
        <span className="on"></span>
        <span className="on"></span>
        <span className="on"></span>
        <span className="on"></span>
        <span className="flame-dot">
          <Flame size={13} />
        </span>
      </div>
    </motion.div>
  );
}

function ContinueCard() {
  return (
    <motion.div
      className="rail-card continue-card"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.05 }}
    >
      <div className="rail-card-head">
        <span className="rail-icon">
          <Rocket size={16} />
        </span>
        <b>Continue Learning</b>
      </div>
      <a className="continue-row" href={withBase('/learn/')}>
        <span className="continue-thumb" aria-hidden="true">
          <BrainCircuit size={20} />
        </span>
        <span className="continue-body">
          <b>Transformers From Scratch</b>
          <span className="progress-line">
            <span style={{ width: '65%' }} />
          </span>
        </span>
        <em>65%</em>
      </a>
    </motion.div>
  );
}

function LeaderboardCard() {
  return (
    <motion.div
      className="rail-card leaderboard-card"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="rail-card-head">
        <span className="rail-icon">
          <Trophy size={16} />
        </span>
        <b>Leaderboard</b>
        <a className="rail-link" href={withBase('/games/')}>
          See all
        </a>
      </div>
      <ul className="lb-list">
        {leaderboard.map((row) => (
          <li className="lb-row" key={row.name}>
            <span className={`lb-rank rank-${row.rank}`}>{row.rank}</span>
            <span className="lb-name">{row.name}</span>
            <span className="lb-xp">{row.xp}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function NewsletterCard() {
  return (
    <motion.div
      className="rail-card news-card"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.15 }}
    >
      <div className="rail-card-head">
        <span className="rail-icon">
          <Bell size={16} />
        </span>
        <b>Latest from Newsletter</b>
        <a className="rail-link" href={withBase('/newsletter/')}>
          View all
        </a>
      </div>
      <ul className="news-list">
        {newsletterItems.map((item) => (
          <li key={item.title}>
            <a href={withBase('/newsletter/')}>
              <span className="news-thumb" aria-hidden="true">
                <Sparkles size={16} />
              </span>
              <span className="news-body">
                <b>{item.title}</b>
                <small>{item.date}</small>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function StatsStrip() {
  return (
    <section className="stats-strip" aria-label="AIByDM platform statistics">
      {stats.map(({ value, label, icon: Icon }) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="icon-tile">
            <Icon size={20} />
          </span>
          <b>{value}</b>
          <small>{label}</small>
        </motion.div>
      ))}
    </section>
  );
}
