import { useEffect, useState } from "react";
import { PRODUCTS } from "../lib/products";

const EXTS = ["png", "jpg", "jpeg", "webp"];

/**
 * Mencari foto asli di public/assets/products/<id>.<ext> satu kali saat halaman dibuka.
 * Produk yang fotonya belum ada tetap memakai gambar kemasan bawaan.
 */
export function usePhotos() {
  const [photos, setPhotos] = useState<Record<string, string>>({});

  useEffect(() => {
    let alive = true;
    const found: Record<string, string> = {};
    let left = PRODUCTS.length;

    const finish = () => {
      if (--left === 0 && alive && Object.keys(found).length) setPhotos(found);
    };

    PRODUCTS.forEach((p) => {
      let i = 0;
      const tryNext = () => {
        if (i >= EXTS.length) return finish();
        const url = `/assets/products/${p.id}.${EXTS[i++]}`;
        const img = new Image();
        img.onload = () => { found[p.id] = url; finish(); };
        img.onerror = tryNext;
        img.src = url;
      };
      tryNext();
    });

    return () => { alive = false; };
  }, []);

  return photos;
}
