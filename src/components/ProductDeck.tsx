import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Product } from "../lib/products";
import { useI18n } from "../lib/i18n";
import ProductCard from "./ProductCard";

type Props = {
  list: Product[];
  stock: Record<string, number>;
  cart: Record<string, number>;
  photos: Record<string, string>;
  onAdd: (p: Product) => void;
  onRemove: (p: Product) => void;
  resetKey: string; // ganti kategori / kata kunci -> kembali ke halaman pertama
};

const ROWS_DEFAULT = 3;
const MAX_ROWS = 6;
const MIN_TILE = 80;        // di bawah ini gambar produk sudah tidak terbaca
const FLAT = 0.5;           // gambar boleh gepeng sampai 50% lebarnya, lebih dari itu jelek

// 2 / 3 / 4 kolom -- harus sama dengan .page di styles.css
function columns() {
  if (window.matchMedia("(min-width:900px)").matches) return 4;
  if (window.matchMedia("(min-width:640px)").matches) return 3;
  return 2;
}

export default function ProductDeck({ list, stock, cart, photos, onAdd, onRemove, resetKey }: Props) {
  const { t, fmt } = useI18n();
  const deckRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(columns);
  const [rows, setRows] = useState(ROWS_DEFAULT);
  const [page, setPage] = useState(0);

  const per = Math.max(1, cols * rows);
  const pages = Math.max(1, Math.ceil(list.length / per));

  useEffect(() => { setPage(0); }, [resetKey]);
  useEffect(() => { if (page > pages - 1) setPage(pages - 1); }, [pages, page]);

  // Muat dalam satu layar: jumlah baris DAN tinggi gambar produk dihitung dari
  // sisa tinggi yang ada. Kartu mengecil lebih dulu; baris baru dikurangi kalau
  // gambarnya sudah terlalu gepeng.
  const measure = useCallback(() => {
    setCols(columns());
    const root = document.documentElement;
    const deck = deckRef.current;
    const card = deck?.querySelector<HTMLElement>(".card");
    const tile = deck?.querySelector<HTMLElement>(".tile");
    const pageEl = deck?.querySelector<HTMLElement>(".page");

    // Mode satu layar untuk tablet/mesin. Di layar sempit (HP) scroll justru
    // wajar, dan memaksa muat cuma menyisakan dua produk per halaman.
    const wide = window.innerWidth >= 700;
    const fits = wide ? window.innerHeight >= 600 : window.innerHeight >= 1000;
    root.classList.toggle("fit", fits);
    if (!fits || !deck || !card || !tile || !pageEl) {
      root.style.removeProperty("--tile-h");
      setRows(ROWS_DEFAULT);
      return;
    }

    const gap = parseFloat(getComputedStyle(pageEl).rowGap) || 16;
    const avail = deck.clientHeight;
    const chrome = card.offsetHeight - tile.offsetHeight;   // judul + harga + tombol + padding
    const natural = tile.offsetWidth * 0.92;                // tinggi gambar kalau tidak dipaksa
    const minTile = Math.max(MIN_TILE, tile.offsetWidth * FLAT);
    const tileFor = (r: number) => (avail - gap * (r - 1)) / r - chrome;

    let rows = ROWS_DEFAULT;
    while (rows < MAX_ROWS && tileFor(rows + 1) >= natural) rows++;  // ruang lebih: tambah baris
    while (rows > 1 && tileFor(rows) < minTile) rows--;              // ruang kurang: kurangi baris

    const h = Math.floor(Math.max(MIN_TILE, Math.min(tileFor(rows), natural)));
    if (root.style.getPropertyValue("--tile-h") !== h + "px") root.style.setProperty("--tile-h", h + "px");
    setRows(rows);
  }, []);

  useLayoutEffect(() => { measure(); }, [measure, list.length, rows]);

  // Mengubah jumlah baris ikut mengubah tinggi bar paginasi, yang mengubah lagi
  // sisa ruang deck. Tanpa ini pengukuran memakai angka lama dan kartu meluber.
  useEffect(() => {
    const deck = deckRef.current;
    if (!deck || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(deck);
    return () => ro.disconnect();
  }, [measure]);
  useEffect(() => {
    let id: number | undefined;
    const onResize = () => { window.clearTimeout(id); id = window.setTimeout(measure, 200); };
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); window.clearTimeout(id); };
  }, [measure]);

  const offsetOf = (i: number) => {
    const deck = deckRef.current;
    const kids = deck?.children;
    if (!kids || !kids[i] || !kids[0]) return 0;
    return (kids[i] as HTMLElement).offsetLeft - (kids[0] as HTMLElement).offsetLeft;
  };

  // pertahankan halaman yang sedang dilihat saat isi kartu berubah
  useLayoutEffect(() => {
    const deck = deckRef.current;
    if (deck) deck.scrollLeft = offsetOf(page);
  }, [page, per, list.length]);

  const goTo = (i: number) => {
    const next = Math.max(0, Math.min(i, pages - 1));
    setPage(next);
    deckRef.current?.scrollTo({ left: offsetOf(next), behavior: "smooth" });
  };

  const onScroll = () => {
    const deck = deckRef.current;
    if (!deck) return;
    let best = 0, gap = Infinity;
    for (let i = 0; i < deck.children.length; i++) {
      const d = Math.abs(offsetOf(i) - deck.scrollLeft);
      if (d < gap) { gap = d; best = i; }
    }
    if (best !== page) setPage(best);
  };

  if (!list.length) {
    return (
      <div className="deck" ref={deckRef}>
        <div className="noresult"><img src="/assets/m8.png" alt="" />{t("nothing")}</div>
      </div>
    );
  }

  const chunks = Array.from({ length: pages }, (_, i) => list.slice(i * per, (i + 1) * per));

  return (
    <>
      <div className="deck" ref={deckRef} onScroll={onScroll} aria-label={t("productList")} role="group">
        {chunks.map((chunk, i) => (
          <div className="page" key={i} aria-label={fmt("page", { n: i + 1, m: pages })}>
            {chunk.map((p) => (
              <ProductCard
                key={p.id}
                p={p}
                stock={stock[p.id] ?? p.stock}
                qty={cart[p.id] ?? 0}
                photo={photos[p.id]}
                onAdd={() => onAdd(p)}
                onRemove={() => onRemove(p)}
              />
            ))}
          </div>
        ))}
      </div>

      {pages > 1 && (
        <div className="deckbar">
          <button className="navbtn" type="button" aria-label={t("prevPage")} disabled={page === 0} onClick={() => goTo(page - 1)}>
            <span aria-hidden="true">‹</span>
          </button>
          <span className="dots">
            {chunks.map((_, i) => (
              <button
                key={i} type="button" aria-current={i === page}
                aria-label={fmt("page", { n: i + 1, m: pages })}
                onClick={() => goTo(i)}
              />
            ))}
          </span>
          <button className="navbtn" type="button" aria-label={t("nextPage")} disabled={page === pages - 1} onClick={() => goTo(page + 1)}>
            <span aria-hidden="true">›</span>
          </button>
          <p className="slide-hint">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h13M12.5 6.5L18 12l-5.5 5.5" /></svg>
            {t("slide")}
          </p>
        </div>
      )}
    </>
  );
}
