import { useCallback, useState } from "react";
import type { Progress } from "../types";

function today() {
  return new Date().toISOString().slice(0, 10);
}

const STORAGE_KEY = `vendissimo-play-react`;

const KOSONG: Progress = {
  pts: 0,
  exp: 0,
  log: [],
  day: today(),
  opened: [],
  awarded: [],
  played: [],
};

function loadState(): Progress {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || `null`);
    // simpanan lama tidak punya exp/played; tanpa penambalan ini aritmetika
    // levelnya jadi NaN di perangkat yang sudah pernah dipakai
    if (saved) return { ...KOSONG, ...saved };
  } catch {}
  return { ...KOSONG };
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
          exp: prev.exp + Math.max(0, pts),
          awarded: [...prev.awarded, key],
          log: [{ w: what, n: pts }, ...prev.log].slice(0, 50),
        };
        saveState(next);
        return next;
      });
    }, []),
    /** Menukar hadiah lewat sini dengan jumlah negatif: poin berkurang,
     *  EXP tidak, jadi level tidak ikut turun. */
    addPts: useCallback((pts: number, what: string) => {
      setState((prev) => {
        const next = {
          ...prev,
          pts: prev.pts + pts,
          exp: prev.exp + Math.max(0, pts),
          log: [{ w: what, n: pts }, ...prev.log].slice(0, 50),
        };
        saveState(next);
        return next;
      });
    }, []),
    /** Catatan seumur hidup untuk kemajuan level. */
    markPlayed: useCallback((id: string) => {
      setState((prev) => {
        if (prev.played.includes(id)) return prev;
        const next = { ...prev, played: [...prev.played, id] };
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
