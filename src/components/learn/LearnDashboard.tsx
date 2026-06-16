import {
  ArrowRight,
  BookOpen,
  Clock3,
  Layers3,
  LockKeyhole,
  PlayCircle,
  Radar,
  Search,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react';

import {
  getTrackHref,
  getTrackLessonCount,
  getTrackMinutes,
  getTrackProjectCount,
  learningStageGroups,
  learnTotals,
} from '@data/learn/catalog';
import {
  getContinueLearning,
  getProgressSummary,
  getRecentLessons,
  getTrackProgress,
} from '@data/learn/progress';
import {
  getRecommendedProjects,
  getRecommendedTracks,
  getTrackStatus,
} from '@data/learn/recommendations';

import LearnControlCenter from '@components/learn/LearnControlCenter';
import LearningAtlas from '@components/learn/LearningAtlas';
import { useLearnProgressState } from '@components/learn/useLearnProgress';

function formatVisitedAt(value: string): string {
  if (!value) return 'Not started yet';

  const parsed = new Date(value);
  if (Number.isNaN(parsed.valueOf())) return 'Not started yet';
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(parsed);
}

function statusPill(status: ReturnType<typeof getTrackStatus>): string {
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

export default function LearnDashboard() {
  const progressState = useLearnProgressState();
  const progressSummary = getProgressSummary(progressState);
  const continueItem = getContinueLearning(progressState);
  const recentItems = getRecentLessons(progressState, 4);
  const recommendedTracks = getRecommendedTracks(progressState, 4);
  const recommendedProjects = getRecommendedProjects(progressState, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="relative overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.2),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.18),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent),var(--color-bg-surface)] p-6 shadow-[0_24px_90px_rgba(2,8,23,0.35)] sm:p-8 lg:p-10">
        <div
          className="absolute -top-24 right-0 h-56 w-56 rounded-full bg-[rgba(56,189,248,0.12)] blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-[rgba(34,197,94,0.12)] blur-3xl"
          aria-hidden="true"
        />
        <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[rgba(148,163,184,0.22)] bg-[rgba(15,23,42,0.55)] px-4 text-sm text-[var(--color-text-secondary)]">
              <Sparkles className="h-4 w-4 text-[var(--color-learn)]" aria-hidden="true" />
              AIByDM Learn OS
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
              Learn AI the way production teams actually build it.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--color-text-secondary)] sm:text-lg">
              Explore structured tracks across foundations, model building, LLM systems, MLOps,
              security, and enterprise rollout. Your progress stays local in the browser, so you can
              keep momentum without setting up an account first.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={continueItem?.href ?? getTrackHref('ai-foundations')}
                className="command-button border border-transparent bg-[var(--color-accent)] text-[var(--color-accent-contrast)] hover:bg-[var(--color-accent-hover)]"
              >
                <PlayCircle className="h-5 w-5" aria-hidden="true" />
                {continueItem ? 'Continue learning' : 'Start with AI Foundations'}
              </a>
              <a
                href={import.meta.env.BASE_URL + 'search/'}
                className="command-button border border-[var(--color-border)] bg-[rgba(15,23,42,0.55)] text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-hover)]"
              >
                <Search className="h-5 w-5" aria-hidden="true" />
                Search the curriculum
              </a>
              <a
                href="#learn-atlas"
                className="command-button border border-[var(--color-border)] bg-[rgba(15,23,42,0.55)] text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-hover)]"
              >
                <Layers3 className="h-5 w-5" aria-hidden="true" />
                Browse the atlas
              </a>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-[var(--color-border)] bg-[rgba(15,23,42,0.48)] p-4">
                <p className="font-mono text-xs tracking-[0.24em] text-[var(--color-text-tertiary)] uppercase">
                  Tracks
                </p>
                <p className="mt-3 text-3xl font-semibold text-[var(--color-text-primary)]">
                  {learnTotals.tracks}
                </p>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                  Built as one connected roadmap.
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--color-border)] bg-[rgba(15,23,42,0.48)] p-4">
                <p className="font-mono text-xs tracking-[0.24em] text-[var(--color-text-tertiary)] uppercase">
                  Lessons
                </p>
                <p className="mt-3 text-3xl font-semibold text-[var(--color-text-primary)]">
                  {learnTotals.lessons}
                </p>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                  Short lessons, labs, and systems drills.
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--color-border)] bg-[rgba(15,23,42,0.48)] p-4">
                <p className="font-mono text-xs tracking-[0.24em] text-[var(--color-text-tertiary)] uppercase">
                  Projects
                </p>
                <p className="mt-3 text-3xl font-semibold text-[var(--color-text-primary)]">
                  {learnTotals.projects}
                </p>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                  Starter builds through capstones.
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--color-border)] bg-[rgba(15,23,42,0.48)] p-4">
                <p className="font-mono text-xs tracking-[0.24em] text-[var(--color-text-tertiary)] uppercase">
                  Estimated Time
                </p>
                <p className="mt-3 text-3xl font-semibold text-[var(--color-text-primary)]">
                  {Math.round(learnTotals.minutes / 60)}h
                </p>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                  A full builder-to-systems journey.
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-[28px] border border-[var(--color-border)] bg-[rgba(2,6,23,0.68)] p-5 backdrop-blur sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-mono text-xs tracking-[0.24em] text-[var(--color-text-tertiary)] uppercase">
                  Your Progress
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-[var(--color-text-primary)]">
                  Learning cockpit
                </h2>
              </div>
              <Radar className="h-8 w-8 text-[var(--color-learn)]" aria-hidden="true" />
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4">
                <p className="text-sm text-[var(--color-text-secondary)]">Lessons completed</p>
                <p className="mt-2 text-3xl font-semibold text-[var(--color-text-primary)]">
                  {progressSummary.completedLessons}
                  <span className="ml-1 text-lg text-[var(--color-text-tertiary)]">
                    / {progressSummary.totalLessons}
                  </span>
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4">
                <p className="text-sm text-[var(--color-text-secondary)]">Modules cleared</p>
                <p className="mt-2 text-3xl font-semibold text-[var(--color-text-primary)]">
                  {progressSummary.completedModules}
                  <span className="ml-1 text-lg text-[var(--color-text-tertiary)]">
                    / {progressSummary.totalModules}
                  </span>
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4">
                <p className="text-sm text-[var(--color-text-secondary)]">Tracks finished</p>
                <p className="mt-2 text-3xl font-semibold text-[var(--color-text-primary)]">
                  {progressSummary.completedTracks}
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4">
                <p className="text-sm text-[var(--color-text-secondary)]">Current streak</p>
                <p className="mt-2 text-3xl font-semibold text-[var(--color-text-primary)]">
                  {progressSummary.streakDays} days
                </p>
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                  Continue path
                </h3>
                <Target className="h-4 w-4 text-[var(--color-text-tertiary)]" aria-hidden="true" />
              </div>
              {continueItem ? (
                <a
                  href={continueItem.href}
                  className="mt-4 block rounded-2xl border border-[var(--color-border)] bg-[rgba(56,189,248,0.08)] p-4 transition hover:border-[var(--color-border-hover)] hover:bg-[rgba(56,189,248,0.12)]"
                >
                  <p className="font-mono text-xs tracking-[0.24em] text-[var(--color-text-tertiary)] uppercase">
                    {continueItem.trackTitle}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[var(--color-text-primary)]">
                    {continueItem.lessonTitle}
                  </p>
                  <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                    {continueItem.moduleTitle}
                  </p>
                </a>
              ) : (
                <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
                  Start a lesson to unlock continue-learning shortcuts here.
                </p>
              )}
            </div>
          </aside>
        </div>
      </section>

      <LearnControlCenter />

      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6 shadow-[0_20px_60px_rgba(2,8,23,0.18)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-mono text-xs tracking-[0.24em] text-[var(--color-text-tertiary)] uppercase">
                Recommended Learning
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[var(--color-text-primary)]">
                What to pick up next
              </h2>
            </div>
            <Target className="h-7 w-7 text-[var(--color-learn)]" aria-hidden="true" />
          </div>
          <div className="mt-6 space-y-3">
            {recommendedTracks.map((entry) => (
              <a
                key={entry.track.slug}
                href={entry.href}
                className="block rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-5 transition hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-hover)]"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-secondary)]">
                    {statusPill(entry.status)}
                  </span>
                  <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-secondary)]">
                    {entry.track.stage}
                  </span>
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
                      {entry.track.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
                      {entry.reason}
                    </p>
                  </div>
                  <ArrowRight
                    className="mt-1 h-5 w-5 shrink-0 text-[var(--color-text-tertiary)]"
                    aria-hidden="true"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6 shadow-[0_20px_60px_rgba(2,8,23,0.18)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-mono text-xs tracking-[0.24em] text-[var(--color-text-tertiary)] uppercase">
                Project Ladder
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[var(--color-text-primary)]">
                Recommended builds
              </h2>
            </div>
            <Layers3 className="h-7 w-7 text-[var(--color-learn)]" aria-hidden="true" />
          </div>
          <div className="mt-6 space-y-3">
            {recommendedProjects.map((entry) => (
              <a
                key={entry.track.slug + entry.project.slug}
                href={entry.href}
                className="block rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-5 transition hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-hover)]"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-secondary)]">
                    {entry.project.level}
                  </span>
                  <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-secondary)]">
                    {entry.project.duration}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-[var(--color-text-primary)]">
                  {entry.project.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
                  {entry.reason}
                </p>
                <p className="mt-2 text-sm text-[var(--color-text-tertiary)]">
                  {entry.track.title}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6 shadow-[0_20px_60px_rgba(2,8,23,0.18)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-mono text-xs tracking-[0.24em] text-[var(--color-text-tertiary)] uppercase">
                How It Works
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[var(--color-text-primary)]">
                One curriculum, four stages
              </h2>
            </div>
            <Layers3 className="h-7 w-7 text-[var(--color-learn)]" aria-hidden="true" />
          </div>
          <div className="mt-6 space-y-4">
            {learningStageGroups.map((group) => (
              <div
                key={group.stage}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4"
              >
                <p className="font-mono text-xs tracking-[0.24em] text-[var(--color-text-tertiary)] uppercase">
                  {group.eyebrow}
                </p>
                <div className="mt-2 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                      {group.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
                      {group.summary}
                    </p>
                  </div>
                  <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-secondary)]">
                    {group.tracks.length} tracks
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6 shadow-[0_20px_60px_rgba(2,8,23,0.18)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-mono text-xs tracking-[0.24em] text-[var(--color-text-tertiary)] uppercase">
                Recent Activity
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[var(--color-text-primary)]">
                Momentum log
              </h2>
            </div>
            <TrendingUp className="h-7 w-7 text-[var(--color-learn)]" aria-hidden="true" />
          </div>
          {recentItems.length > 0 ? (
            <div className="mt-6 space-y-3">
              {recentItems.map((item) => (
                <a
                  key={item.lessonKey}
                  href={item.href}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4 transition hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-hover)]"
                >
                  <div>
                    <p className="font-mono text-xs tracking-[0.24em] text-[var(--color-text-tertiary)] uppercase">
                      {item.trackTitle}
                    </p>
                    <p className="mt-2 text-base font-semibold text-[var(--color-text-primary)]">
                      {item.lessonTitle}
                    </p>
                    <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                      {item.moduleTitle}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex min-h-11 items-center rounded-full border border-[var(--color-border)] px-3 text-sm text-[var(--color-text-secondary)]">
                      {item.completed ? 'Complete' : 'In progress'}
                    </span>
                    <p className="mt-2 text-xs text-[var(--color-text-tertiary)]">
                      {formatVisitedAt(item.visitedAt)}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg-panel)] p-6 text-sm leading-7 text-[var(--color-text-secondary)]">
              Start any lesson and your recent learning trail will appear here, along with a local
              streak and resume shortcut.
            </div>
          )}
        </div>
      </section>

      <LearningAtlas />

      <section className="mt-8 space-y-8">
        {learningStageGroups.map((group) => (
          <div key={group.stage}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-xs tracking-[0.24em] text-[var(--color-text-tertiary)] uppercase">
                  {group.eyebrow}
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-[var(--color-text-primary)]">
                  {group.title}
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-[var(--color-text-secondary)]">
                {group.summary}
              </p>
            </div>
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {group.tracks.map((track) => {
                const progress = getTrackProgress(progressState, track.slug);
                const lessons = getTrackLessonCount(track);
                const projects = getTrackProjectCount(track);
                const minutes = getTrackMinutes(track);
                const status = getTrackStatus(progressState, track);
                return (
                  <article
                    key={track.slug}
                    className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6 shadow-[0_18px_50px_rgba(2,8,23,0.16)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-mono text-xs tracking-[0.24em] text-[var(--color-text-tertiary)] uppercase">
                            {track.difficulty}
                          </p>
                          <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text-secondary)]">
                            {statusPill(status)}
                          </span>
                        </div>
                        <h3 className="mt-2 text-2xl font-semibold text-[var(--color-text-primary)]">
                          {track.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
                          {track.summary}
                        </p>
                      </div>
                      {status === 'locked' ? (
                        <LockKeyhole
                          className="mt-1 h-6 w-6 text-[var(--color-text-tertiary)]"
                          aria-hidden="true"
                        />
                      ) : (
                        <BookOpen
                          className="mt-1 h-6 w-6 text-[var(--color-learn)]"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg-panel)] px-3 py-1 text-sm text-[var(--color-text-secondary)]">
                        {track.estimatedWeeks}
                      </span>
                      <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg-panel)] px-3 py-1 text-sm text-[var(--color-text-secondary)]">
                        {lessons} lessons
                      </span>
                      <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg-panel)] px-3 py-1 text-sm text-[var(--color-text-secondary)]">
                        {projects} projects
                      </span>
                      <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg-panel)] px-3 py-1 text-sm text-[var(--color-text-secondary)]">
                        {Math.round(minutes / 60)}h path
                      </span>
                    </div>
                    <div className="mt-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] p-4">
                      <div className="flex items-center justify-between gap-3 text-sm text-[var(--color-text-secondary)]">
                        <span>Local progress</span>
                        <span>
                          {progress.completed}/{progress.total}
                        </span>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[rgba(148,163,184,0.14)]">
                        <div
                          className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-learn),var(--color-accent))]"
                          style={{ width: progress.percentage + '%' }}
                        />
                      </div>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {track.outcomes.slice(0, 2).map((outcome) => (
                        <span
                          key={outcome}
                          className="rounded-2xl border border-[var(--color-border)] px-3 py-2 text-sm leading-6 text-[var(--color-text-secondary)]"
                        >
                          {outcome}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <a
                        href={getTrackHref(track.slug)}
                        className="command-button border border-transparent bg-[var(--color-accent)] text-[var(--color-accent-contrast)] hover:bg-[var(--color-accent-hover)]"
                      >
                        Explore track
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                      <div className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--color-border)] px-4 text-sm text-[var(--color-text-secondary)]">
                        <Clock3 className="h-4 w-4" aria-hidden="true" />
                        {track.weeklyRhythm}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
