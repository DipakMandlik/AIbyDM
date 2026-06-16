import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  GitBranch,
  LockKeyhole,
  PlayCircle,
  Radar,
  Search,
  Sparkles,
  Users,
} from 'lucide-react';

import { useLearnProgressState } from '@components/learn/useLearnProgress';
import { getContinueLearning, getProgressSummary } from '@data/learn/progress';
import { getLearningTrack, getTrackHref } from '@data/learn/catalog';
import { getRecommendedTracks, getTrackStatus } from '@data/learn/recommendations';

type TrackStatus = ReturnType<typeof getTrackStatus>;
type StageKey = 'core' | 'builder' | 'systems' | 'enterprise';

interface ProductMetric {
  label: string;
  value: string;
  detail: string;
}

interface ProductArea {
  title: string;
  href: string;
  metric: string;
  description: string;
  accent: string;
  eyebrow: string;
  cta: string;
}

interface TrackPreview {
  slug: string;
  title: string;
  strapline: string;
  difficulty: string;
  estimatedWeeks: string;
  lessons: number;
  projects: number;
}

interface StagePreview {
  stage: StageKey;
  eyebrow: string;
  title: string;
  summary: string;
  tracks: TrackPreview[];
}

interface ProductHomeProps {
  repoUrl: string;
  discussionUrl: string;
  communityHref: string;
  roadmapHref: string;
  searchHref: string;
  learnHref: string;
  modules: ProductArea[];
  metrics: ProductMetric[];
  stages: StagePreview[];
}

function statusLabel(status: TrackStatus): string {
  switch (status) {
    case 'complete':
      return 'Complete';
    case 'in-progress':
      return 'In progress';
    case 'ready':
      return 'Ready';
    case 'locked':
      return 'Locked';
    default:
      return 'Not started';
  }
}

function statusTone(status: TrackStatus): string {
  switch (status) {
    case 'complete':
      return 'border-[rgba(52,211,153,0.28)] bg-[rgba(52,211,153,0.12)] text-[var(--color-text-primary)]';
    case 'in-progress':
      return 'border-[rgba(56,189,248,0.28)] bg-[rgba(56,189,248,0.12)] text-[var(--color-text-primary)]';
    case 'ready':
      return 'border-[rgba(245,158,11,0.24)] bg-[rgba(245,158,11,0.12)] text-[var(--color-text-primary)]';
    case 'locked':
      return 'border-[var(--color-border)] bg-[var(--color-bg-panel)] text-[var(--color-text-secondary)]';
    default:
      return 'border-[var(--color-border)] bg-[var(--color-bg-panel)] text-[var(--color-text-secondary)]';
  }
}

function stageAccent(stage: StageKey): string {
  switch (stage) {
    case 'core':
      return 'var(--color-learn)';
    case 'builder':
      return 'var(--color-tools)';
    case 'systems':
      return 'var(--color-games)';
    case 'enterprise':
      return 'var(--color-community)';
    default:
      return 'var(--color-accent)';
  }
}

function stageTrackStatus(
  trackSlug: string,
  progressState: ReturnType<typeof useLearnProgressState>,
): TrackStatus {
  const track = getLearningTrack(trackSlug);
  return track ? getTrackStatus(progressState, track) : 'not-started';
}

function statusIcon(status: TrackStatus) {
  switch (status) {
    case 'complete':
      return <CheckCircle2 className="h-4 w-4 text-[var(--color-accent)]" aria-hidden="true" />;
    case 'in-progress':
      return <PlayCircle className="h-4 w-4 text-[var(--color-learn)]" aria-hidden="true" />;
    case 'locked':
      return (
        <LockKeyhole className="h-4 w-4 text-[var(--color-text-tertiary)]" aria-hidden="true" />
      );
    default:
      return <Compass className="h-4 w-4 text-[var(--color-text-tertiary)]" aria-hidden="true" />;
  }
}

export default function ProductHome({
  repoUrl,
  discussionUrl,
  communityHref,
  roadmapHref,
  searchHref,
  learnHref,
  modules,
  metrics,
  stages,
}: ProductHomeProps) {
  const progressState = useLearnProgressState();
  const progressSummary = getProgressSummary(progressState);
  const continueItem = getContinueLearning(progressState);
  const recommendedTracks = getRecommendedTracks(progressState, 3);
  const firstTrack = stages[0]?.tracks[0];
  const primaryHref =
    continueItem?.href ?? (firstTrack ? getTrackHref(firstTrack.slug) : learnHref);
  const primaryLabel = continueItem ? 'Continue learning' : 'Start with foundations';
  const openTrackCount = stages
    .flatMap((stage) => stage.tracks)
    .filter((track) => {
      const status = stageTrackStatus(track.slug, progressState);
      return status === 'ready' || status === 'in-progress' || status === 'complete';
    }).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="relative overflow-hidden rounded-[36px] border border-[var(--color-border)] bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_24rem),radial-gradient(circle_at_bottom_right,rgba(52,211,153,0.14),transparent_24rem),linear-gradient(180deg,rgba(255,255,255,0.03),transparent),var(--color-bg-surface)] p-6 shadow-[0_32px_120px_rgba(2,8,23,0.32)] sm:p-8 lg:p-10">
        <div className="relative grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div>
            <div className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[rgba(148,163,184,0.22)] bg-[rgba(7,12,22,0.62)] px-4 text-sm text-[var(--color-text-secondary)]">
              <Sparkles className="h-4 w-4 text-[var(--color-accent)]" aria-hidden="true" />
              Learn AI. Build AI. Master AI.
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
              AIByDM is a guided AI learning product, not a pile of tabs.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--color-text-secondary)] sm:text-lg">
              Follow a connected path from foundations to production AI with structured tracks,
              project ladders, roadmap unlocks, local progress tracking, and an open-source
              community that helps you keep shipping.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={primaryHref}
                className="command-button border border-transparent bg-[var(--color-accent)] text-[var(--color-accent-contrast)] hover:bg-[var(--color-accent-hover)]"
              >
                <BookOpen className="h-5 w-5" aria-hidden="true" />
                {primaryLabel}
              </a>
              <a
                href={roadmapHref}
                className="command-button border border-[var(--color-border)] bg-[rgba(7,12,22,0.52)] text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-hover)]"
              >
                <GitBranch className="h-5 w-5" aria-hidden="true" />
                Explore roadmap
              </a>
              <a
                href={searchHref}
                className="command-button border border-[var(--color-border)] bg-[rgba(7,12,22,0.52)] text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-hover)]"
              >
                <Search className="h-5 w-5" aria-hidden="true" />
                Search curriculum
              </a>
              <a
                href={communityHref}
                className="command-button border border-[var(--color-border)] bg-[rgba(7,12,22,0.52)] text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-hover)]"
              >
                <Users className="h-5 w-5" aria-hidden="true" />
                Join community
              </a>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[24px] border border-[var(--color-border)] bg-[rgba(7,12,22,0.52)] p-4 backdrop-blur"
                >
                  <p className="text-xs tracking-[0.22em] text-[var(--color-text-tertiary)] uppercase">
                    {metric.label}
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-[var(--color-text-primary)]">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                    {metric.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-[var(--color-border)] bg-[rgba(2,8,23,0.64)] p-5 shadow-[0_24px_80px_rgba(2,8,23,0.24)] backdrop-blur sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs tracking-[0.22em] text-[var(--color-text-tertiary)] uppercase">
                  Learning cockpit
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-[var(--color-text-primary)]">
                  Know where you are and what to do next.
                </h2>
              </div>
              <Radar className="h-7 w-7 text-[var(--color-learn)]" aria-hidden="true" />
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[22px] border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4">
                <p className="text-sm text-[var(--color-text-secondary)]">Lessons done</p>
                <p className="mt-2 text-3xl font-semibold text-[var(--color-text-primary)]">
                  {progressSummary.completedLessons}
                  <span className="ml-1 text-lg text-[var(--color-text-tertiary)]">
                    / {progressSummary.totalLessons}
                  </span>
                </p>
              </div>
              <div className="rounded-[22px] border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4">
                <p className="text-sm text-[var(--color-text-secondary)]">Tracks open</p>
                <p className="mt-2 text-3xl font-semibold text-[var(--color-text-primary)]">
                  {openTrackCount}
                </p>
              </div>
              <div className="rounded-[22px] border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4">
                <p className="text-sm text-[var(--color-text-secondary)]">Current streak</p>
                <p className="mt-2 text-3xl font-semibold text-[var(--color-text-primary)]">
                  {progressSummary.streakDays}d
                </p>
              </div>
            </div>
            <div className="mt-6 rounded-[24px] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(56,189,248,0.12),transparent),var(--color-bg-panel)] p-5">
              <p className="text-xs tracking-[0.22em] text-[var(--color-text-tertiary)] uppercase">
                Continue path
              </p>
              <p className="mt-2 text-xl font-semibold text-[var(--color-text-primary)]">
                {continueItem?.lessonTitle ?? firstTrack?.title ?? 'AI Foundations'}
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
                {continueItem
                  ? `${continueItem.trackTitle} / ${continueItem.moduleTitle}`
                  : 'Start with the first stage, then unlock each next system in sequence.'}
              </p>
              <a
                href={primaryHref}
                className="command-button mt-4 border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-hover)]"
              >
                Open current step
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {stages.map((stage) => (
                <span
                  key={stage.stage}
                  className="inline-flex min-h-11 items-center rounded-full border px-4 text-sm"
                  style={{
                    borderColor: `color-mix(in srgb, ${stageAccent(stage.stage)} 24%, transparent)`,
                    background: `color-mix(in srgb, ${stageAccent(stage.stage)} 10%, transparent)`,
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {stage.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs tracking-[0.22em] text-[var(--color-text-tertiary)] uppercase">
              Recommended route
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-[var(--color-text-primary)] sm:text-4xl">
              The next best milestones are already waiting.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[var(--color-text-secondary)]">
            AIByDM uses your local progress and prerequisites to surface the clearest next tracks
            instead of leaving you to assemble a learning journey alone.
          </p>
        </div>
        <div className="mt-6 grid gap-4 xl:grid-cols-3">
          {recommendedTracks.map((entry) => (
            <a
              key={entry.track.slug}
              href={entry.href}
              className="group rounded-[28px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6 shadow-[0_20px_60px_rgba(2,8,23,0.16)] transition hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-hover)]"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full border px-3 py-1 text-sm ${statusTone(entry.status)}`}
                >
                  {statusLabel(entry.status)}
                </span>
                <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-secondary)]">
                  {entry.track.stage}
                </span>
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-[var(--color-text-primary)]">
                    {entry.track.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
                    {entry.reason}
                  </p>
                </div>
                <ArrowRight
                  className="mt-1 h-5 w-5 shrink-0 text-[var(--color-text-tertiary)] transition group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-secondary)]">
                  {entry.track.difficulty}
                </span>
                <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-secondary)]">
                  {entry.track.estimatedWeeks}
                </span>
                <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-secondary)]">
                  {entry.percentage}% complete
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs tracking-[0.22em] text-[var(--color-text-tertiary)] uppercase">
              Curriculum architecture
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-[var(--color-text-primary)] sm:text-4xl">
              Four stages, visible prerequisites, no dead ends.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[var(--color-text-secondary)]">
            Each stage makes your current position obvious, keeps track status visible, and shows
            the next unlock before you arrive there.
          </p>
        </div>
        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {stages.map((stage) => (
            <div
              key={stage.stage}
              className="rounded-[30px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6 shadow-[0_18px_50px_rgba(2,8,23,0.14)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs tracking-[0.22em] text-[var(--color-text-tertiary)] uppercase">
                    {stage.eyebrow}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-[var(--color-text-primary)]">
                    {stage.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
                    {stage.summary}
                  </p>
                </div>
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border text-sm font-semibold"
                  style={{
                    borderColor: `color-mix(in srgb, ${stageAccent(stage.stage)} 28%, transparent)`,
                    background: `color-mix(in srgb, ${stageAccent(stage.stage)} 12%, transparent)`,
                    color: stageAccent(stage.stage),
                  }}
                >
                  {String(stage.tracks.length).padStart(2, '0')}
                </span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-secondary)]">
                  {stage.tracks.reduce((total, track) => total + track.lessons, 0)} lessons
                </span>
                <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-secondary)]">
                  {stage.tracks.reduce((total, track) => total + track.projects, 0)} projects
                </span>
              </div>
              <div className="mt-5 space-y-3">
                {stage.tracks.map((track) => {
                  const status = stageTrackStatus(track.slug, progressState);
                  return (
                    <a
                      key={track.slug}
                      href={getTrackHref(track.slug)}
                      className="flex items-start justify-between gap-4 rounded-[22px] border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4 transition hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-hover)]"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{statusIcon(status)}</div>
                        <div>
                          <p className="text-base font-semibold text-[var(--color-text-primary)]">
                            {track.title}
                          </p>
                          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                            {track.estimatedWeeks} / {track.difficulty}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                            {track.strapline}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`rounded-full border px-3 py-1 text-sm ${statusTone(status)}`}
                      >
                        {statusLabel(status)}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs tracking-[0.22em] text-[var(--color-text-tertiary)] uppercase">
              Platform surfaces
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-[var(--color-text-primary)] sm:text-4xl">
              One system to learn, search, practice, assess, and collaborate.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[var(--color-text-secondary)]">
            AIByDM is organized like a product ecosystem. Every surface supports the same journey
            instead of competing for your attention.
          </p>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {modules.map((module, index) => (
            <a
              key={module.title}
              href={module.href}
              className={[
                'group rounded-[28px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5 shadow-[0_18px_48px_rgba(2,8,23,0.12)] transition hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-hover)]',
                index === 0 ? 'xl:col-span-2' : '',
                module.title === 'Community' ? 'lg:col-span-2 xl:col-span-2' : '',
              ].join(' ')}
              style={{
                boxShadow: `0 18px 48px rgba(2, 8, 23, 0.12), inset 0 1px 0 color-mix(in srgb, ${module.accent} 16%, transparent)`,
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className="inline-flex min-h-11 items-center rounded-full border px-4 text-sm"
                  style={{
                    borderColor: `color-mix(in srgb, ${module.accent} 28%, transparent)`,
                    background: `color-mix(in srgb, ${module.accent} 12%, transparent)`,
                    color: module.accent,
                  }}
                >
                  {module.eyebrow}
                </span>
                <span className="text-sm text-[var(--color-text-tertiary)]">{module.metric}</span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-[var(--color-text-primary)]">
                {module.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
                {module.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text-primary)]">
                {module.cta}
                <ArrowRight
                  className="h-4 w-4 transition group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-[34px] border border-[var(--color-border)] bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.16),transparent_22rem),linear-gradient(180deg,rgba(255,255,255,0.03),transparent),var(--color-bg-surface)] p-6 shadow-[0_24px_90px_rgba(2,8,23,0.2)] sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-xs tracking-[0.22em] text-[var(--color-text-tertiary)] uppercase">
              Open-source by design
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-[var(--color-text-primary)] sm:text-4xl">
              Learn in public. Improve the platform together.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-8 text-[var(--color-text-secondary)] sm:text-base">
              The platform is built to grow with contributors. Curriculum, tooling guides, games,
              exams, launch storytelling, and product UX all have visible lanes for contribution.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
                className="command-button border border-transparent bg-[var(--color-accent)] text-[var(--color-accent-contrast)] hover:bg-[var(--color-accent-hover)]"
              >
                View repository
              </a>
              <a
                href={discussionUrl}
                target="_blank"
                rel="noreferrer"
                className="command-button border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-hover)]"
              >
                Join discussions
              </a>
              <a
                href={communityHref}
                className="command-button border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-hover)]"
              >
                Community hub
              </a>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-5">
              <p className="text-lg font-semibold text-[var(--color-text-primary)]">
                Contributor-ready
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
                Documentation, roadmap, release notes, and contribution guides are visible from the
                repo.
              </p>
            </div>
            <div className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-5">
              <p className="text-lg font-semibold text-[var(--color-text-primary)]">Static-first</p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
                GitHub Pages compatibility, SEO, and local-first progress keep the experience fast
                and portable.
              </p>
            </div>
            <div className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-5">
              <p className="text-lg font-semibold text-[var(--color-text-primary)]">
                Progress with context
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
                Every major screen answers where you are, what you can do, and what to learn next.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
