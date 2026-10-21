import type { ReactNode } from "react";
import type { CategoryId } from "../../types";

// Satu sumber gambar ubin untuk bento desktop dan kartu kategori di HP,
// supaya keduanya tidak pelan-pelan jadi berbeda.

/** Satu sampul per kategori. Sebelumnya memakai gambar isi yang ada
 *  (512x384 dan sejenisnya) yang pecah saat ubinnya melar di desktop;
 *  ini foto 1100px yang memang disiapkan sebagai sampul. */
const SAMPUL: Record<CategoryId, string> = {
  magazines: `/img/cover-magazines.jpg`,
  videos: `/img/cover-videos.webp`,
  games: `/img/cover-games.jpg`,
  // dua ini kembali ke ilustrasi rubah yang lama atas permintaan;
  // cover-education/cover-english tetap ada di public/img kalau nanti
  // mau ditukar balik
  education: `/img/edu-video-course.webp`,
  english: `/img/eng-trio.webp`,
};

export function categoryArt(id: CategoryId): ReactNode {
  return <img src={SAMPUL[id]} alt="" loading="lazy" />;
}
