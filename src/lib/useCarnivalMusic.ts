import { useCallback, useEffect, useRef, useState } from "react";
import { createCarnival } from "./carnivalMusic";
import type { Carnival } from "./carnivalMusic";

const STORAGE_KEY = `vendissimo-music`;

function initialOn() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== `off`;
  } catch {
    return true;
  }
}

/**
 * Musik karnaval berbunyi selama `active` (peta tampil, tidak ada konten
 * yang sedang dibuka) dan pemain tidak mematikannya. Berhenti sendiri
 * saat tab disembunyikan.
 */
export function useCarnivalMusic(active: boolean) {
  const [on, setOn] = useState(initialOn);
  const engine = useRef<Carnival | null>(null);
  const play = active && on;

  useEffect(() => {
    if (!play) {
      engine.current?.stop();
      return;
    }
    engine.current ??= createCarnival();
    const music = engine.current;
    if (!music) return;
    const sync = () => (document.hidden ? music.stop() : music.start());
    sync();
    // audio baru boleh berbunyi setelah sentuhan pertama di halaman
    const unlock = () => music.resume();
    window.addEventListener(`pointerdown`, unlock);
    window.addEventListener(`keydown`, unlock);
    document.addEventListener(`visibilitychange`, sync);
    return () => {
      music.stop();
      window.removeEventListener(`pointerdown`, unlock);
      window.removeEventListener(`keydown`, unlock);
      document.removeEventListener(`visibilitychange`, sync);
    };
  }, [play]);

  const toggle = useCallback(() => {
    setOn((cur) => {
      const next = !cur;
      try {
        localStorage.setItem(STORAGE_KEY, next ? `on` : `off`);
      } catch {}
      return next;
    });
  }, []);

  return { on, toggle };
}
