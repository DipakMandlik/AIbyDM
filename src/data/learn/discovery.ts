import {
  getLessonHref,
  getLearningTrack,
  getProjectHref,
  getTrackHref,
  getTrackLessonCount,
  getTrackMinutes,
  getTrackModuleCount,
  getTrackProjectCount,
  learningTracks,
  type LearningStage,
  type LearningTrack,
  type ResourceKind,
} from '@data/learn/catalog';

interface LearnTrackLink {
  slug: string;
  title: string;
  href: string;
}

export interface LearnCatalogEntry {
  track: LearningTrack;
  href: string;
  startHref: string;
  stage: LearningStage;
  moduleCount: number;
  lessonCount: number;
  projectCount: number;
  minutes: number;
  prerequisites: LearnTrackLink[];
  nextTracks: LearnTrackLink[];
  technologies: string[];
}

export interface LearnResourceLessonRef {
  trackTitle: string;
  lessonTitle: string;
  href: string;
}

export interface LearnResourceEntry {
  id: string;
  label: string;
  href: string;
  kind: ResourceKind;
  trackSlugs: string[];
  trackTitles: string[];
  trackCount: number;
  lessonCount: number;
  relatedLessons: LearnResourceLessonRef[];
  concepts: string[];
}

export type LearnGlossaryKind = 'Concept' | 'Tool' | 'Technology' | 'Skill';

export interface LearnGlossaryLocation {
  trackTitle: string;
  label: string;
  href: string;
}

export interface LearnGlossaryEntry {
  id: string;
  term: string;
  kind: LearnGlossaryKind;
  trackSlugs: string[];
  trackTitles: string[];
  trackCount: number;
  locationCount: number;
  sampleLocations: LearnGlossaryLocation[];
}

function dedupeStrings(values: string[]): string[] {
  return Array.from(
    new Set(values.map((value) => value.trim()).filter((value) => value.length > 0)),
  );
}

function getTrackLink(trackSlug: string): LearnTrackLink | undefined {
  const trackEntry = getLearningTrack(trackSlug);
  if (!trackEntry) return undefined;

  return {
    slug: trackEntry.slug,
    title: trackEntry.title,
    href: getTrackHref(trackEntry.slug),
  };
}

export const learnCatalogEntries: LearnCatalogEntry[] = learningTracks.map((trackEntry) => {
  const firstLesson = trackEntry.modules[0]?.lessons[0];

  return {
    track: trackEntry,
    href: getTrackHref(trackEntry.slug),
    startHref: firstLesson
      ? getLessonHref(trackEntry.slug, firstLesson.slug)
      : getTrackHref(trackEntry.slug),
    stage: trackEntry.stage,
    moduleCount: getTrackModuleCount(trackEntry),
    lessonCount: getTrackLessonCount(trackEntry),
    projectCount: getTrackProjectCount(trackEntry),
    minutes: getTrackMinutes(trackEntry),
    prerequisites: trackEntry.prerequisites
      .map((trackSlug) => getTrackLink(trackSlug))
      .filter((entry): entry is LearnTrackLink => Boolean(entry)),
    nextTracks: trackEntry.nextTracks
      .map((trackSlug) => getTrackLink(trackSlug))
      .filter((entry): entry is LearnTrackLink => Boolean(entry)),
    technologies: dedupeStrings([
      ...trackEntry.tooling,
      ...trackEntry.projects.flatMap((projectEntry) => projectEntry.technologies),
    ]).slice(0, 8),
  };
});

type LearnResourceBuilder = {
  id: string;
  label: string;
  href: string;
  kind: ResourceKind;
  trackSlugSet: Set<string>;
  trackTitleSet: Set<string>;
  lessonKeySet: Set<string>;
  relatedLessons: LearnResourceLessonRef[];
  conceptSet: Set<string>;
};

const learnResourceBuilderMap = new Map<string, LearnResourceBuilder>();

for (const trackEntry of learningTracks) {
  for (const moduleEntry of trackEntry.modules) {
    for (const lessonEntry of moduleEntry.lessons) {
      for (const resourceEntry of lessonEntry.resources) {
        const builderKey =
          resourceEntry.kind + '|' + resourceEntry.label + '|' + resourceEntry.href;
        const builder = learnResourceBuilderMap.get(builderKey) ?? {
          id: builderKey,
          label: resourceEntry.label,
          href: resourceEntry.href,
          kind: resourceEntry.kind,
          trackSlugSet: new Set<string>(),
          trackTitleSet: new Set<string>(),
          lessonKeySet: new Set<string>(),
          relatedLessons: [],
          conceptSet: new Set<string>(),
        };

        builder.trackSlugSet.add(trackEntry.slug);
        builder.trackTitleSet.add(trackEntry.title);

        const lessonKey = trackEntry.slug + ':' + lessonEntry.slug;
        if (!builder.lessonKeySet.has(lessonKey)) {
          builder.lessonKeySet.add(lessonKey);
          if (builder.relatedLessons.length < 6) {
            builder.relatedLessons.push({
              trackTitle: trackEntry.title,
              lessonTitle: lessonEntry.title,
              href: getLessonHref(trackEntry.slug, lessonEntry.slug),
            });
          }
        }

        lessonEntry.concepts.forEach((concept) => {
          if (builder.conceptSet.size < 12) {
            builder.conceptSet.add(concept);
          }
        });

        learnResourceBuilderMap.set(builderKey, builder);
      }
    }
  }
}

export const learnResourceEntries: LearnResourceEntry[] = Array.from(
  learnResourceBuilderMap.values(),
)
  .map((builder) => ({
    id: builder.id,
    label: builder.label,
    href: builder.href,
    kind: builder.kind,
    trackSlugs: Array.from(builder.trackSlugSet).sort(),
    trackTitles: Array.from(builder.trackTitleSet).sort((left, right) => left.localeCompare(right)),
    trackCount: builder.trackSlugSet.size,
    lessonCount: builder.lessonKeySet.size,
    relatedLessons: builder.relatedLessons,
    concepts: Array.from(builder.conceptSet).sort((left, right) => left.localeCompare(right)),
  }))
  .sort(
    (left, right) =>
      right.trackCount - left.trackCount ||
      right.lessonCount - left.lessonCount ||
      left.label.localeCompare(right.label),
  );

type LearnGlossaryBuilder = {
  id: string;
  term: string;
  kind: LearnGlossaryKind;
  trackSlugSet: Set<string>;
  trackTitleSet: Set<string>;
  locationKeySet: Set<string>;
  sampleLocations: LearnGlossaryLocation[];
};

const learnGlossaryBuilderMap = new Map<string, LearnGlossaryBuilder>();

function addGlossaryTerm(
  term: string,
  kind: LearnGlossaryKind,
  trackEntry: LearningTrack,
  location: LearnGlossaryLocation,
): void {
  const normalizedTerm = term.trim();
  if (!normalizedTerm) return;

  const builderKey = kind + '|' + normalizedTerm.toLowerCase();
  const builder = learnGlossaryBuilderMap.get(builderKey) ?? {
    id: builderKey,
    term: normalizedTerm,
    kind,
    trackSlugSet: new Set<string>(),
    trackTitleSet: new Set<string>(),
    locationKeySet: new Set<string>(),
    sampleLocations: [],
  };

  builder.trackSlugSet.add(trackEntry.slug);
  builder.trackTitleSet.add(trackEntry.title);

  const locationKey = location.href + '|' + location.label;
  if (!builder.locationKeySet.has(locationKey)) {
    builder.locationKeySet.add(locationKey);
    if (builder.sampleLocations.length < 6) {
      builder.sampleLocations.push(location);
    }
  }

  learnGlossaryBuilderMap.set(builderKey, builder);
}

for (const trackEntry of learningTracks) {
  addGlossaryTerm(trackEntry.title, 'Concept', trackEntry, {
    trackTitle: trackEntry.title,
    label: trackEntry.title + ' overview',
    href: getTrackHref(trackEntry.slug),
  });

  for (const toolEntry of trackEntry.tooling) {
    addGlossaryTerm(toolEntry, 'Tool', trackEntry, {
      trackTitle: trackEntry.title,
      label: trackEntry.title + ' overview',
      href: getTrackHref(trackEntry.slug),
    });
  }

  for (const projectEntry of trackEntry.projects) {
    for (const technologyEntry of projectEntry.technologies) {
      addGlossaryTerm(technologyEntry, 'Technology', trackEntry, {
        trackTitle: trackEntry.title,
        label: projectEntry.title,
        href: getProjectHref(trackEntry.slug, projectEntry.slug),
      });
    }

    for (const skillEntry of projectEntry.skills) {
      addGlossaryTerm(skillEntry, 'Skill', trackEntry, {
        trackTitle: trackEntry.title,
        label: projectEntry.title,
        href: getProjectHref(trackEntry.slug, projectEntry.slug),
      });
    }
  }

  for (const moduleEntry of trackEntry.modules) {
    for (const lessonEntry of moduleEntry.lessons) {
      for (const conceptEntry of lessonEntry.concepts) {
        addGlossaryTerm(conceptEntry, 'Concept', trackEntry, {
          trackTitle: trackEntry.title,
          label: lessonEntry.title,
          href: getLessonHref(trackEntry.slug, lessonEntry.slug),
        });
      }
    }
  }
}

export const learnGlossaryEntries: LearnGlossaryEntry[] = Array.from(
  learnGlossaryBuilderMap.values(),
)
  .map((builder) => ({
    id: builder.id,
    term: builder.term,
    kind: builder.kind,
    trackSlugs: Array.from(builder.trackSlugSet).sort(),
    trackTitles: Array.from(builder.trackTitleSet).sort((left, right) => left.localeCompare(right)),
    trackCount: builder.trackSlugSet.size,
    locationCount: builder.locationKeySet.size,
    sampleLocations: builder.sampleLocations,
  }))
  .sort(
    (left, right) =>
      right.trackCount - left.trackCount ||
      right.locationCount - left.locationCount ||
      left.term.localeCompare(right.term),
  );
