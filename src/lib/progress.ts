import { useCallback, useState } from "react";
import type { Progress } from "../types";

function today() {
  return new Date().toISOString().slice(0, 10);
}

const STORAGE_KEY = `vendissimo-play-react`;

function loadState(): Progress {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || `null`);
    if (saved) return saved;
  } catch {}
  return { pts: 0, log: [], day: today(), opened: [], awarded: [] };
}

function saveState(state: Progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

/** Points, history and today's opened/awarded items, persisted in localStorage. */
export function useProgress() {
  const [state, setState] = useState(() => {
    const loaded = loadState();
    if (loaded.day !== today()) {
      loaded.day = today();
      loaded.opened = [];
      loaded.awarded = [];
    }
    return loaded;
  });
  return {
    S: state,
    /** Award points for `key` only the first time today. */
    earnOnce: useCallback((key: string, pts: number, what: string) => {
      setState((prev) => {
        if (prev.awarded.includes(key)) return prev;
        const next = {
          ...prev,
          pts: prev.pts + pts,
          awarded: [...prev.awarded, key],
          log: [{ w: what, n: pts }, ...prev.log].slice(0, 50),
        };
        saveState(next);
        return next;
      });
    }, []),
    addPts: useCallback((pts: number, what: string) => {
      setState((prev) => {
        const next = {
          ...prev,
          pts: prev.pts + pts,
          log: [{ w: what, n: pts }, ...prev.log].slice(0, 50),
        };
        saveState(next);
        return next;
      });
    }, []),
    /** Mission done. Deliberately writes no log row: mission keys used to be
     *  pushed through earnOnce with 0 pts, which left blank rows in history. */
    markMission: useCallback((key: string) => {
      setState((prev) => {
        if (prev.awarded.includes(key)) return prev;
        const next = { ...prev, awarded: [...prev.awarded, key] };
        saveState(next);
        return next;
      });
    }, []),
    markOpened: useCallback((key: string) => {
      setState((prev) => {
        if (prev.opened.includes(key)) return prev;
        const next = { ...prev, opened: [...prev.opened, key] };
        saveState(next);
        return next;
      });
    }, []),
  };
}
