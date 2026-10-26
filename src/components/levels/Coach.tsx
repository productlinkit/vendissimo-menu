import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useI18n } from "../../i18n";

// Tur singkat yang menempel ke elemen asli lewat atribut data-tour.
// Hanya muncul sekali per perangkat; tombol "?" di peta memanggilnya lagi.

const KUNCI = `vendissimo-tour-levels`;
const JARAK = 14; // celah antara sorotan dan kartu
const TEPI = 12; // jarak minimum kartu ke tepi layar
const PAD = 8; // ruang sorotan di sekeliling target

export const TOUR = [
  {
    target: `level`,
    judul: `Levels`,
    teks: `Each level has its own games and its own prize. Earn EXP to open the next one.`,
  },
  {
    target: `exp`,
    judul: `EXP`,
    teks: `EXP comes from finishing games. It only ever goes up — spending points on a reward never costs you a level.`,
  },
  {
    target: `prize`,
    judul: `Prize`,
    teks: `This is what you get at this level. Points pay for it, EXP unlocks it.`,
  },
];

export function sudahPernahTur() {
  try {
    return localStorage.getItem(KUNCI) === `1`;
  } catch {
    return false;
  }
}

type Letak = {
  ring: { top: number; left: number; width: number; height: number };
  card: { top: number; left: number };
  /** panah di sisi atas kartu (target di atasnya) atau bawah, dan posisi x-nya */
  panah: { sisi: `atas` | `bawah`; x: number } | null;
};

const cari = (target: string) =>
  document.querySelector<HTMLElement>(`[data-tour="${target}"]`);

export function Coach({ onClose }: { onClose: () => void }) {
  const { t } = useI18n();
  // langkah yang targetnya tidak ada di halaman ini dilewati, bukan
  // ditampilkan melayang tanpa sorotan
  // dihitung setelah halaman terpasang: saat render pertama targetnya
  // belum ada di DOM
  const [langkahList, setLangkahList] = useState<typeof TOUR | null>(null);
  useLayoutEffect(() => {
    setLangkahList(TOUR.filter((s) => cari(s.target)));
  }, []);
  const [i, setI] = useState(0);
  const [letak, setLetak] = useState<Letak | null>(null);
  const kartu = useRef<HTMLDivElement>(null);
  const step = langkahList?.[i];

  const ukur = useCallback(() => {
    const el = step && cari(step.target);
    const card = kartu.current;
    if (!el || !card) return setLetak(null);
    const r = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const cw = card.offsetWidth;
    const ch = card.offsetHeight;
    const ring = {
      top: r.top - PAD,
      left: r.left - PAD,
      width: r.width + PAD * 2,
      height: r.height + PAD * 2,
    };
    const bawah = ring.top + ring.height + JARAK;
    const atas = ring.top - JARAK - ch;
    let top: number;
    let sisi: `atas` | `bawah` | null;
    if (bawah + ch <= vh - TEPI) [top, sisi] = [bawah, `atas`];
    else if (atas >= TEPI) [top, sisi] = [atas, `bawah`];
    else [top, sisi] = [vh - ch - TEPI, null]; // target hampir sebesar layar
    const pusat = r.left + r.width / 2;
    const left = Math.min(Math.max(pusat - cw / 2, TEPI), vw - cw - TEPI);
    setLetak({
      ring,
      card: { top, left },
      panah: sisi
        ? { sisi, x: Math.min(Math.max(pusat - left, 24), cw - 24) }
        : null,
    });
  }, [step]);

  // gulir target ke layar hanya bila memang belum terlihat utuh
  useLayoutEffect(() => {
    const el = step && cari(step.target);
    if (!el) return;
    const r = el.getBoundingClientRect();
    const terlihat = r.top >= 70 && r.bottom <= window.innerHeight - 90;
    if (!terlihat) el.scrollIntoView({ block: `center`, behavior: `smooth` });
    ukur();
    const timer = window.setTimeout(ukur, terlihat ? 0 : 420);
    return () => window.clearTimeout(timer);
  }, [step, ukur]);

  useEffect(() => {
    window.addEventListener(`resize`, ukur);
    window.addEventListener(`scroll`, ukur, true);
    return () => {
      window.removeEventListener(`resize`, ukur);
      window.removeEventListener(`scroll`, ukur, true);
    };
  }, [ukur]);

  const tutup = useCallback(() => {
    try {
      localStorage.setItem(KUNCI, `1`);
    } catch {}
    onClose();
  }, [onClose]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === `Escape` && tutup();
    window.addEventListener(`keydown`, esc);
    return () => window.removeEventListener(`keydown`, esc);
  }, [tutup]);

  // tidak ada satu pun target di halaman ini: tur tidak punya isi
  useEffect(() => {
    if (langkahList?.length === 0) onClose();
  }, [langkahList, onClose]);

  if (!step || !langkahList) return null;
  const terakhir = i + 1 === langkahList.length;

  // dipasang langsung di body: halaman induknya beranimasi transform,
  // yang membuat position:fixed ikut bergeser bersama halaman
  return createPortal(
    <div className="vp-coach" role="dialog" aria-modal="true" aria-labelledby="vp-coach-title">
      {/* menangkap sentuhan di luar kartu supaya peta di baliknya tidak
          ikut terbuka; tur ditutup lewat Skip atau Esc */}
      <div className="vp-coach-veil" />
      {letak && (
        <span className="vp-coach-ring" aria-hidden="true" style={letak.ring} />
      )}
      <div
        ref={kartu}
        className={`vp-coach-card${letak ? ` is-ready` : ``}`}
        style={letak ? letak.card : undefined}
      >
        {letak?.panah && (
          <span
            className={`vp-coach-arrow is-${letak.panah.sisi}`}
            style={{ left: letak.panah.x }}
            aria-hidden="true"
          />
        )}
        <div className="vp-coach-head">
          <span className="vp-coach-step">{i + 1}</span>
          <h2 id="vp-coach-title">{t(step.judul)}</h2>
        </div>
        <p>{t(step.teks)}</p>
        <div className="vp-coach-foot">
          <span className="vp-coach-dots" aria-label={`${i + 1}/${langkahList.length}`}>
            {langkahList.map((s, n) => (
              <span key={s.target} className={n === i ? `is-on` : undefined} />
            ))}
          </span>
          {!terakhir && (
            <button type="button" className="vp-coach-skip" onClick={tutup}>
              {t(`Skip`)}
            </button>
          )}
          {i > 0 && (
            <button type="button" className="vp-coach-back" onClick={() => setI(i - 1)}>
              {t(`Back`)}
            </button>
          )}
          <button
            type="button"
            className="vp-coach-next"
            onClick={() => (terakhir ? tutup() : setI(i + 1))}
            autoFocus
          >
            {terakhir ? t(`Got it`) : t(`Next`)}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
