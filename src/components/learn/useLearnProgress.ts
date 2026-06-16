import { useEffect, useState } from 'react';

import {
  type LearnProgressState,
  readLearnProgress,
  subscribeToLearnProgress,
} from '@data/learn/progress';

export function useLearnProgressState(): LearnProgressState {
  const [progressState, setProgressState] = useState<LearnProgressState>(() => readLearnProgress());

  useEffect(() => {
    setProgressState(readLearnProgress());
    return subscribeToLearnProgress(setProgressState);
  }, []);

  return progressState;
}
