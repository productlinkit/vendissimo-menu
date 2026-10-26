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
    // audio baru boleh berbunyi setelah sentuhan pertama di halaman. Di layar
    // sentuh, pointerdown belum dihitung sebagai izin dari pengguna; baru
    // touchend/pointerup/click yang dihitung, jadi semuanya didengarkan.
    const unlock = () => music.resume();
    const events = [`pointerdown`, `pointerup`, `touchend`, `click`, `keydown`];
    for (const e of events) window.addEventListener(e, unlock);
    document.addEventListener(`visibilitychange`, sync);
    return () => {
      music.stop();
      for (const e of events) window.removeEventListener(e, unlock);
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

  /**
   * Panggil langsung di dalam handler sentuhan (mis. tap di splash): audio
   * hanya boleh dibuka di sana, sebelum `active` sempat menjalankan musik.
   */
  const unlock = useCallback(() => {
    engine.current ??= createCarnival();
    engine.current?.resume();
  }, []);

  return { on, toggle, unlock };
}
