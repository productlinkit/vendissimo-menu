import type { ReactNode } from "react";
import { GAMES, MAGAZINES, VIDEOS } from "../../data";
import type { CategoryId } from "../../types";

// Satu sumber gambar ubin untuk bento desktop dan kartu kategori di HP,
// supaya keduanya tidak pelan-pelan jadi berbeda.

/** Empat gambar dalam blok 2x2 — untuk ubin yang tinggi atau sempit, di mana
 *  deretan gambar bersebelahan hanya menyisakan sliver tipis per gambar. */
export function Mosaic({ images }: { images: string[] }) {
  return (
    <span className="vp-tile-mosaic">
      {images.map((src) => (
        <img key={src} src={src} alt="" loading="lazy" />
      ))}
    </span>
  );
}

/** Beberapa gambar bersebelahan, masing-masing dipotong mengisi slotnya. */
export function Strip({ images }: { images: string[] }) {
  return (
    <span className="vp-tile-strip">
      {images.map((src) => (
        <img key={src} src={src} alt="" loading="lazy" />
      ))}
    </span>
  );
}

const EDU_ART = [
  `/img/edu-video-course.webp`,
  `/img/edu-tutor.webp`,
  `/img/edu-movie.webp`,
  `/img/edu-career.webp`,
];

/** Gambar isi asli per kategori. `layout` memilih deretan atau blok 2x2:
 *  ubin lebar di desktop muat deretan, kartu dua kolom di HP tidak. */
export function categoryArt(
  id: CategoryId,
  layout: `strip` | `mosaic`,
): ReactNode {
  if (id === `english`) {
    return <img src="/img/eng-trio.webp" alt="" loading="lazy" />;
  }
  const images =
    id === `games`
      ? GAMES.slice(0, 4).map((game) => game.img)
      : id === `videos`
        ? VIDEOS.slice(0, 4).map((video) => video.img)
        : id === `magazines`
          ? MAGAZINES.slice(0, 4).map((magazine) => magazine.img)
          : EDU_ART;
  // deretan Education tetap tiga gambar seperti sebelumnya; empat di sana
  // membuat tiap gambar terlalu sempit
  const shown =
    layout === `strip` && id === `education` ? images.slice(0, 3) : images;
  return layout === `strip` ? (
    <Strip images={shown} />
  ) : (
    <Mosaic images={shown} />
  );
}
