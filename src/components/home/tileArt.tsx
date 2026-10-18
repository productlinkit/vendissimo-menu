import type { ReactNode } from "react";
import { MAGAZINES } from "../../data";
import type { CategoryId } from "../../types";

// Satu sumber gambar ubin untuk bento desktop dan kartu kategori di HP,
// supaya keduanya tidak pelan-pelan jadi berbeda.

/** Satu sampul per kategori, dipilih manual. Dulu ini blok 2x2 dan deretan
 *  gambar otomatis; satu gambar besar lebih terbaca di ubin sekecil apa pun
 *  dan tidak pecah jadi sliver di kartu dua kolom. */
const SAMPUL: Record<CategoryId, string> = {
  magazines: MAGAZINES[4].img,
  videos: `/img/v-3.webp`,
  games: `/img/g-crash.webp`,
  education: `/img/edu-video-course.webp`,
  english: `/img/eng-trio.webp`,
};

export function categoryArt(id: CategoryId): ReactNode {
  return <img src={SAMPUL[id]} alt="" loading="lazy" />;
}
