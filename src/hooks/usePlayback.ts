import * as React from "react";

export interface UsePlaybackReturn {
  index: number;
  playing: boolean;
  speed: number;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  restart: () => void;
  seek: (idx: number) => void;
  setSpeed: (speed: number) => void;
}

/**
 * Step playback hook for recorded algorithm execution.
 * Only controls an integer index over totalSteps.
 * Interval = 900ms / speed. Auto-pauses on the final step.
 */
export function usePlayback(totalSteps: number): UsePlaybackReturn {
  const [index, setIndex] = React.useState<number>(0);
  const [playing, setPlaying] = React.useState<boolean>(false);
  const [speed, setSpeedState] = React.useState<number>(1);

  // Clamp index dynamically to [0, totalSteps - 1]
  const clampedIndex =
    totalSteps <= 0 ? 0 : Math.max(0, Math.min(index, totalSteps - 1));

  const pause = React.useCallback(() => {
    setPlaying(false);
  }, []);

  const play = React.useCallback(() => {
    if (totalSteps <= 1) return;
    setIndex((curr) => {
      // If we are already at or past the last step, restart from 0
      if (curr >= totalSteps - 1) {
        return 0;
      }
      return curr;
    });
    setPlaying(true);
  }, [totalSteps]);

  const toggle = React.useCallback(() => {
    if (playing) {
      pause();
    } else {
      play();
    }
  }, [playing, pause, play]);

  const next = React.useCallback(() => {
    if (totalSteps <= 0) return;
    setIndex((curr) => {
      const nextIdx = Math.min(totalSteps - 1, curr + 1);
      if (nextIdx >= totalSteps - 1) {
        setPlaying(false);
      }
      return nextIdx;
    });
  }, [totalSteps]);

  const prev = React.useCallback(() => {
    if (totalSteps <= 0) return;
    setIndex((curr) => Math.max(0, curr - 1));
  }, [totalSteps]);

  const restart = React.useCallback(() => {
    setIndex(0);
    setPlaying(false);
  }, []);

  const seek = React.useCallback(
    (idx: number) => {
      if (totalSteps <= 0) return;
      const clamped = Math.max(0, Math.min(totalSteps - 1, idx));
      setIndex(clamped);
      if (clamped >= totalSteps - 1) {
        setPlaying(false);
      }
    },
    [totalSteps],
  );

  const setSpeed = React.useCallback((s: number) => {
    if (s > 0) {
      setSpeedState(s);
    }
  }, []);

  // Interval timer for playback: 900ms / speed
  React.useEffect(() => {
    if (!playing || totalSteps <= 1) return;

    const intervalMs = Math.max(50, Math.round(900 / speed));

    const intervalId = window.setInterval(() => {
      setIndex((curr) => {
        if (curr + 1 >= totalSteps - 1) {
          setPlaying(false);
          return totalSteps - 1;
        }
        return curr + 1;
      });
    }, intervalMs);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [playing, speed, totalSteps]);

  return {
    index: clampedIndex,
    playing,
    speed,
    play,
    pause,
    toggle,
    next,
    prev,
    restart,
    seek,
    setSpeed,
  };
}
