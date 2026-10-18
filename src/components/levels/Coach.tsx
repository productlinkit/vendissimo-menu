import { useEffect, useState } from "react";
import { useI18n } from "../../i18n";
import { Icon } from "../Icon";

// Tur singkat yang menempel ke elemen asli lewat atribut data-tour.
// Hanya muncul sekali per perangkat; tombol "?" di halaman level
// memanggilnya lagi kapan saja.

const KUNCI = `vendissimo-tour-levels`;

export const TOUR = [
  {
    target: `map`,
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

export function Coach({ onClose }: { onClose: () => void }) {
  const { t } = useI18n();
  const [langkah, setLangkah] = useState(0);
  const [kotak, setKotak] = useState<DOMRect | null>(null);
  const step = TOUR[langkah];

  // posisi dihitung ulang tiap langkah: targetnya bisa di luar layar
  useEffect(() => {
    const el = document.querySelector(`[data-tour="${step.target}"]`);
    if (!el) {
      setKotak(null);
      return;
    }
    el.scrollIntoView({ block: `center`, behavior: `smooth` });
    const timer = setTimeout(() => setKotak(el.getBoundingClientRect()), 420);
    return () => clearTimeout(timer);
  }, [step.target]);

  const tutup = () => {
    try {
      localStorage.setItem(KUNCI, `1`);
    } catch {}
    onClose();
  };

  const lanjut = () => {
    if (langkah + 1 < TOUR.length) setLangkah(langkah + 1);
    else tutup();
  };

  // kartu diletakkan di bawah target bila muat, kalau tidak di atasnya
  const bawah = kotak ? kotak.bottom + 12 : null;
  const muatBawah = bawah !== null && bawah + 190 < window.innerHeight;
  const gaya: React.CSSProperties = kotak
    ? muatBawah
      ? { top: bawah! }
      : { bottom: Math.max(16, window.innerHeight - kotak.top + 12) }
    : { top: `50%`, transform: `translateY(-50%)` };

  return (
    <div className="vp-coach" role="dialog" aria-modal="true">
      <button
        type="button"
        className="vp-coach-veil"
        aria-label={t(`Close`)}
        onClick={tutup}
      />
      {kotak && (
        <span
          className="vp-coach-ring"
          aria-hidden="true"
          style={{
            top: kotak.top - 6,
            left: kotak.left - 6,
            width: kotak.width + 12,
            height: kotak.height + 12,
          }}
        />
      )}
      <div className="vp-coach-card" style={gaya}>
        <button
          type="button"
          className="vp-coach-x"
          aria-label={t(`Close`)}
          onClick={tutup}
        >
          {Icon.close}
        </button>
        <h2>{t(step.judul)}</h2>
        <p>{t(step.teks)}</p>
        <div className="vp-coach-foot">
          <span className="vp-coach-count">
            <strong>{langkah + 1}</strong>/{TOUR.length}
          </span>
          <button type="button" className="vp-coach-next" onClick={lanjut}>
            {langkah + 1 < TOUR.length ? t(`Next`) : t(`Got it`)}
          </button>
        </div>
      </div>
    </div>
  );
}
