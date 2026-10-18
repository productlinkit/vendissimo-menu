import { GAMES, GAME_GROUPS, LEVELS } from "../data";
import type { Game, GameGroup, Level, Progress } from "../types";

// Aturan level di satu tempat supaya peta, halaman level, dan header
// tidak pernah menghitung hal yang sama dengan cara berbeda.

/** Level tertinggi yang EXP-nya sudah terlampaui. */
export function levelOf(exp: number): Level {
  let hasil = LEVELS[0];
  for (const lv of LEVELS) if (exp >= lv.exp) hasil = lv;
  return hasil;
}

export function nextLevel(exp: number): Level | null {
  return LEVELS.find((lv) => exp < lv.exp) ?? null;
}

/** Kemajuan 0..1 menuju level berikutnya; 1 kalau sudah level terakhir. */
export function levelProgress(exp: number) {
  const now = levelOf(exp);
  const next = nextLevel(exp);
  if (!next) return { pct: 100, sisa: 0, next: null as Level | null };
  const rentang = next.exp - now.exp;
  const maju = exp - now.exp;
  return {
    pct: Math.max(0, Math.min(100, (maju / rentang) * 100)),
    sisa: Math.max(0, next.exp - exp),
    next,
  };
}

export function gamesOf(group: GameGroup): Game[] {
  return GAMES.filter((game) => game.cat === group.cat);
}

export type Objective = { label: string; done: boolean };

/** Tiga sasaran per kelompok, semuanya dihitung dari `played` yang
 *  seumur hidup — bukan dari `awarded` yang direset tiap hari. */
export function objectivesOf(group: GameGroup, S: Progress) {
  const daftar = gamesOf(group);
  const selesai = daftar.filter((game) => S.played.includes(game.id)).length;
  const poin = selesai * (daftar[0]?.pts ?? 0);
  const objectives: Objective[] = [
    { label: `Play your first game here`, done: selesai >= 1 },
    { label: `Play {n} games in this group`, done: selesai >= daftar.length },
    { label: `Earn {n} pts from this group`, done: poin >= 100 },
  ];
  return { objectives, selesai, total: daftar.length, poin };
}

/** Berapa dari tiga sasaran yang sudah selesai, untuk label "(1/3)". */
export function doneCount(group: GameGroup, S: Progress) {
  return objectivesOf(group, S).objectives.filter((o) => o.done).length;
}

export { GAME_GROUPS, LEVELS };
