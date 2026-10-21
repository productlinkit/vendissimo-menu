import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "../../i18n";

/** Brand partner portal yang diiklankan sesuai jenis kontennya. */
export type PartnerId = "booksnap" | "speakeasy" | "emagz" | "gemezz";

type Partner = { name: string; url: string; img: string };

const PARTNERS: Record<PartnerId, Partner> = {
  booksnap: {
    name: `BookSnap`,
    url: `https://apps.booksnap.ai/en/video`,
    img: `/img/cover-videos.webp`,
  },
  speakeasy: {
    name: `SpeakEasy`,
    url: `https://apps.speakeasy.mobi`,
    img: `/img/eng-speaking.webp`,
  },
  emagz: {
    name: `eMagz`,
    url: `https://emagz.mobi`,
    img: `/img/cover-magazines.webp`,
  },
  gemezz: {
    name: `Gemezz`,
    url: `https://demo.gemezz.mobi/web/home`,
    img: `/img/cover-games.webp`,
  },
};

/** Iklan dari partner portal, bukan jaringan iklan luar. */
export type Promo = { kind: "partner"; id: PartnerId };

const SKIP_SECONDS = 5;

type AdBreak = { at: `mid` | `end`; promo: Promo };

/**
 * Jeda iklan sebuah viewer: paling banyak sekali di tengah konten dan sekali
 * saat keluar. Tidak pernah saat konten baru dibuka. `close` dipakai sebagai
 * pengganti onClose: pertama kali ia menampilkan iklan penutup dulu.
 */
export function useAdBreaks(pick: () => Promo, onClose: () => void) {
  const [ad, setAd] = useState<AdBreak | null>(null);
  const shown = useRef({ mid: false, end: false });
  const mid = useCallback(() => {
    if (shown.current.mid) return;
    shown.current.mid = true;
    setAd({ at: `mid`, promo: pick() });
  }, [pick]);
  const close = useCallback(() => {
    if (shown.current.end) return onClose();
    shown.current.end = true;
    setAd({ at: `end`, promo: pick() });
  }, [pick, onClose]);
  const skip = useCallback(() => {
    if (ad?.at === `end`) onClose();
    else setAd(null);
  }, [ad, onClose]);
  return { ad, mid, close, skip };
}

export function HouseAd({
  promo,
  onSkip,
}: {
  promo: Promo;
  onSkip: () => void;
}) {
  const { t } = useI18n();
  const [left, setLeft] = useState(SKIP_SECONDS);
  useEffect(() => {
    if (left <= 0) return;
    const id = window.setTimeout(() => setLeft(left - 1), 1000);
    return () => window.clearTimeout(id);
  }, [left]);

  const p = PARTNERS[promo.id];
  // kalimatnya ditulis literal di t() supaya check:i18n ikut menangkapnya
  const [title, sub, cta] = {
    booksnap: [
      t("Hundreds more book summaries"),
      t("Get the big ideas of a book in minutes. New titles every week on BookSnap."),
      t("Watch on BookSnap"),
    ],
    speakeasy: [
      t("Speak English with confidence"),
      t("Full English courses and an AI tutor that listens to you, on SpeakEasy."),
      t("Try SpeakEasy"),
    ],
    emagz: [
      t("Full issues of your favourite magazines"),
      t("Read every page of hundreds of titles on eMagz."),
      t("Read on eMagz"),
    ],
    gemezz: [
      t("Hundreds more games to play"),
      t("Join competitions, climb the leaderboard and win prizes on Gemezz."),
      t("Play on Gemezz"),
    ],
  }[promo.id];

  const ctaStyle = {
    flex: 1,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    background: `#FFFFFF`,
    color: `var(--pink-on-white)`,
    border: 0,
    borderRadius: 999,
    padding: `13px 10px`,
    fontFamily: `var(--f-display)`,
    fontWeight: 900,
    fontSize: 13,
    letterSpacing: `.06em`,
    textTransform: `uppercase`,
    textDecoration: `none`,
    boxShadow: `0 4px 18px rgba(0,0,0,.2)`,
    cursor: `pointer`,
    whiteSpace: `nowrap`,
  } as const;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("Sponsored by {brand}", { brand: p.name })}
      style={{
        position: `absolute`,
        inset: 0,
        zIndex: 30,
        background: `rgba(0,0,0,.7)`,
        backdropFilter: `blur(12px)`,
        WebkitBackdropFilter: `blur(12px)`,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
        padding: `24px 20px`,
      }}
    >
      <div
        style={{
          width: `100%`,
          maxWidth: 360,
          background: `rgba(255, 255, 255, 0.18)`,
          border: `1px solid rgba(255,255,255,0.3)`,
          borderRadius: 28,
          overflow: `hidden`,
          boxShadow: `0 24px 80px rgba(0,0,0,.45)`,
          textAlign: `center`,
          color: `#fff`,
        }}
      >
        <div style={{ position: `relative` }}>
          <img
            src={p.img}
            alt=""
            style={{
              display: `block`,
              width: `100%`,
              aspectRatio: `16 / 10`,
              objectFit: `cover`,
            }}
          />
          <span
            style={{
              position: `absolute`,
              top: 12,
              left: 12,
              padding: `4px 10px`,
              borderRadius: 999,
              background: `rgba(18,8,32,.72)`,
              fontFamily: `var(--f-mono)`,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: `.06em`,
              textTransform: `uppercase`,
            }}
          >
            {t("Sponsored by {brand}", { brand: p.name })}
          </span>
        </div>
        <div style={{ padding: `22px 24px 26px` }}>
          <h2
            style={{
              fontSize: `clamp(20px,5.5vw,24px)`,
              fontWeight: 900,
              lineHeight: 1.25,
              margin: `0 0 8px`,
              fontFamily: `var(--f-display)`,
            }}
          >
            {title}
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.55, margin: `0 0 22px` }}>{sub}</p>
          <div style={{ display: `flex`, gap: 10 }}>
            {/* situs partner dibuka di tab baru; kontennya di sini lanjut */}
            <a href={p.url} target="_blank" rel="noopener noreferrer" onClick={onSkip} style={ctaStyle}>
              {cta} →
            </a>
            <button
              onClick={onSkip}
              disabled={left > 0}
              style={{
                flex: `0 0 auto`,
                minWidth: 96,
                padding: `13px 18px`,
                borderRadius: 999,
                background: `transparent`,
                border: `1px solid rgba(255,255,255,.6)`,
                color: `#fff`,
                fontFamily: `var(--f-display)`,
                fontWeight: 700,
                fontSize: 13,
                cursor: left > 0 ? `default` : `pointer`,
                opacity: left > 0 ? 0.6 : 1,
                whiteSpace: `nowrap`,
              }}
            >
              {left > 0 ? t("Skip in {n}", { n: left }) : t("Skip")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
