import {
  getProjectHref,
  getTrackHref,
  learningTracks,
  type LearningProject,
  type LearningProjectLevel,
  type LearningTrack,
} from '@data/learn/catalog';
import { getTrackProgress, type LearnProgressState } from '@data/learn/progress';

export interface TrackRecommendation {
  track: LearningTrack;
  href: string;
  reason: string;
  status: 'not-started' | 'in-progress' | 'ready' | 'locked' | 'complete';
  percentage: number;
}

export interface ProjectRecommendation {
  track: LearningTrack;
  project: LearningProject;
  href: string;
  reason: string;
}

function getCompletedTrackSlugs(progressState: LearnProgressState): Set<string> {
  return new Set(
    learningTracks
      .filter((trackEntry) => {
        const progress = getTrackProgress(progressState, trackEntry.slug);
        return progress.total > 0 && progress.completed === progress.total;
      })
      .map((trackEntry) => trackEntry.slug),
  );
}

function prerequisitesMet(trackEntry: LearningTrack, completedTrackSlugs: Set<string>): boolean {
  return trackEntry.prerequisites.every((slug) => completedTrackSlugs.has(slug));
}

export function getTrackStatus(
  progressState: LearnProgressState,
  trackEntry: LearningTrack,
): 'not-started' | 'in-progress' | 'ready' | 'locked' | 'complete' {
  const progress = getTrackProgress(progressState, trackEntry.slug);
  const completedTrackSlugs = getCompletedTrackSlugs(progressState);

  if (progress.total > 0 && progress.completed === progress.total) return 'complete';
  if (progress.completed > 0) return 'in-progress';
  if (trackEntry.prerequisites.length === 0 || prerequisitesMet(trackEntry, completedTrackSlugs)) {
    return 'ready';
  }
  return 'locked';
}

export function getRecommendedTracks(
  progressState: LearnProgressState,
  limit = 4,
): TrackRecommendation[] {
  const completedTrackSlugs = getCompletedTrackSlugs(progressState);
  const lastTrackSlug = progressState.lastLessonKey?.split(':')[0];
  const lastTrack = learningTracks.find((trackEntry) => trackEntry.slug === lastTrackSlug);
  const directNextTrackSlugs = new Set(lastTrack?.nextTracks ?? []);

  return learningTracks
    .map((trackEntry) => {
      const progress = getTrackProgress(progressState, trackEntry.slug);
      const status = getTrackStatus(progressState, trackEntry);
      let score = 0;
      let reason = 'Start with the roadmap entry that matches your current stage.';

      if (status === 'complete') score -= 1000;
      if (status === 'in-progress') {
        score += 420 + progress.percentage;
        reason = 'Resume the track you already started and keep the current momentum alive.';
      } else if (status === 'ready') {
        score += 250;
        reason =
          trackEntry.prerequisites.length > 0
            ? 'Your prerequisites are in place, so this track is ready for the next step.'
            : 'This is a strong starting point if you want to build the foundation first.';
      } else if (status === 'locked') {
        score += 40;
        reason = 'Finish the prerequisite tracks first to unlock this path cleanly.';
      } else {
        score += 110;
      }

      if (directNextTrackSlugs.has(trackEntry.slug)) {
        score += 120;
        reason = 'This is the cleanest next track after your most recent lesson path.';
      }

      if (lastTrack && lastTrack.stage === trackEntry.stage) {
        score += 35;
      }

      if (trackEntry.stage === 'core' && status !== 'locked') {
        score += 20;
      }

      if (completedTrackSlugs.has(trackEntry.slug)) {
        reason = 'You already completed this track locally.';
      }

      return {
        track: trackEntry,
        href: getTrackHref(trackEntry.slug),
        reason,
        status,
        percentage: progress.percentage,
        score,
      };
    })
    .filter((entry) => entry.score > -999)
    .sort(
      (left, right) =>
        right.score - left.score || left.track.title.localeCompare(right.track.title),
    )
    .slice(0, limit)
    .map((entry) => ({
      track: entry.track,
      href: entry.href,
      reason: entry.reason,
      status: entry.status,
      percentage: entry.percentage,
    }));
}

function preferredProjectLevels(percentage: number): LearningProjectLevel[] {
  if (percentage >= 85) return ['Capstone', 'Advanced', 'Intermediate', 'Beginner'];
  if (percentage >= 55) return ['Advanced', 'Intermediate', 'Capstone', 'Beginner'];
  if (percentage >= 25) return ['Intermediate', 'Beginner', 'Advanced', 'Capstone'];
  return ['Beginner', 'Intermediate', 'Advanced', 'Capstone'];
}

export function getRecommendedProjects(
  progressState: LearnProgressState,
  limit = 4,
): ProjectRecommendation[] {
  const recommendedTracks = getRecommendedTracks(progressState, 6);

  return recommendedTracks
    .flatMap((trackRecommendation) => {
      const order = preferredProjectLevels(trackRecommendation.percentage);
      return trackRecommendation.track.projects.map((projectEntry) => ({
        track: trackRecommendation.track,
        project: projectEntry,
        href: getProjectHref(trackRecommendation.track.slug, projectEntry.slug),
        reason:
          projectEntry.level === order[0]
            ? 'This project matches the depth of your current progress in the track.'
            : 'Use this project as the next stretch milestone once the current lessons feel steady.',
        score: 100 - order.indexOf(projectEntry.level) * 20 + trackRecommendation.percentage,
      }));
    })
    .sort(
      (left, right) =>
        right.score - left.score || left.project.title.localeCompare(right.project.title),
    )
    .slice(0, limit)
    .map((entry) => ({
      track: entry.track,
      project: entry.project,
      href: entry.href,
      reason: entry.reason,
    }));
}
