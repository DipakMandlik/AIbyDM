"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CLAUDE_GAME_STORAGE_KEY,
  emptyGameProgress,
  mergeAttemptIntoProgress,
} from "@/lib/games/engine";
import { claudeCertifiedArchitectChallenge } from "@/lib/games/claude-certified-architect";
import type { GameAttempt, GameProgressState } from "@/lib/games/types";

function readProgress(): GameProgressState {
  if (typeof window === "undefined") return emptyGameProgress();
  try {
    const raw = window.localStorage.getItem(CLAUDE_GAME_STORAGE_KEY);
    if (!raw) return emptyGameProgress();
    const parsed = JSON.parse(raw) as Partial<GameProgressState>;
    if (parsed.version !== 1 || !Array.isArray(parsed.attempts) || !parsed.floorProgress) {
      return emptyGameProgress();
    }
    return {
      version: 1,
      xp: typeof parsed.xp === "number" ? parsed.xp : 0,
      level: typeof parsed.level === "number" ? parsed.level : 1,
      streakDays: typeof parsed.streakDays === "number" ? parsed.streakDays : 0,
      lastPlayedAt: typeof parsed.lastPlayedAt === "number" ? parsed.lastPlayedAt : undefined,
      attempts: parsed.attempts,
      floorProgress: parsed.floorProgress,
      unlockedAchievements: Array.isArray(parsed.unlockedAchievements) ? parsed.unlockedAchievements : [],
      badges: Array.isArray(parsed.badges) ? parsed.badges : [],
      updatedAt: typeof parsed.updatedAt === "number" ? parsed.updatedAt : 0,
    };
  } catch {
    return emptyGameProgress();
  }
}

function writeProgress(next: GameProgressState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CLAUDE_GAME_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage can be unavailable in private windows. The current session still works.
  }
}

export function useGameProgress() {
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<GameProgressState>(emptyGameProgress);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setState(readProgress());
      setReady(true);
    });

    function onStorage(event: StorageEvent) {
      if (event.key === CLAUDE_GAME_STORAGE_KEY) setState(readProgress());
    }

    window.addEventListener("storage", onStorage);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const recordAttempt = useCallback((attempt: GameAttempt) => {
    setState((current) => {
      const base = current.updatedAt ? current : readProgress();
      const next = mergeAttemptIntoProgress(base, claudeCertifiedArchitectChallenge, attempt);
      writeProgress(next);
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    const next = emptyGameProgress();
    setState(next);
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(CLAUDE_GAME_STORAGE_KEY);
    } catch {
      // Ignore storage failures.
    }
  }, []);

  return useMemo(
    () => ({
      ready,
      state,
      recordAttempt,
      resetProgress,
    }),
    [ready, recordAttempt, resetProgress, state],
  );
}
