import { useCallback, useEffect, useRef, useState } from "react";
import { GAMES, REWARDS } from "../../data";
import { useI18n } from "../../i18n";
import type { Reward } from "../../types";

/** Brand partner portal yang diiklankan sesuai jenis kontennya. */
export type PartnerId = "booksnap" | "speakeasy" | "emagz";

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
};

/** Iklan milik portal sendiri dan partnernya, bukan jaringan iklan luar. */
export type Promo =
  | { kind: "reward"; reward: Reward }
  | { kind: "game"; idx: number }
  | { kind: "partner"; id: PartnerId };

const SKIP_SECONDS = 5;

/** Promo Vendissimo acak untuk game; game yang sedang dimainkan tidak ikut. */
export function pickGamePromo(currentGameId: string): Promo {
  const pool: Promo[] = [
    ...REWARDS.map((reward): Promo => ({ kind: `reward`, reward })),
    ...GAMES.flatMap((g, idx): Promo[] => (g.id === currentGameId ? [] : [{ kind: `game`, idx }])),
  ];
  return pool[Math.floor(Math.random() * pool.length)];
}

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
  onCta,
}: {
  promo: Promo;
  onSkip: () => void;
  /** Ajakan promo Vendissimo (hadiah / game lain); partner cukup membuka situsnya. */
  onCta?: (promo: Promo) => void;
}) {
  const { t } = useI18n();
  const [left, setLeft] = useState(SKIP_SECONDS);
  useEffect(() => {
    if (left <= 0) return;
    const id = window.setTimeout(() => setLeft(left - 1), 1000);
    return () => window.clearTimeout(id);
  }, [left]);

  let img: string, title: string, sub: string, cta: string, by: string;
  let href: string | null = null;
  if (promo.kind === `game`) {
    const game = GAMES[promo.idx];
    [img, title, sub, cta, by] = [game.img, game.t, t(game.d), t("Play now"), `Vendissimo`];
  } else if (promo.kind === `reward`) {
    const r = promo.reward;
    img = r.img;
    title = t(r.label);
    sub = t("Redeem it for {n} pts — {desc}", { n: r.pts, desc: t(r.desc) });
    cta = t("See rewards");
    by = `Vendissimo`;
  } else {
    const p = PARTNERS[promo.id];
    // kalimatnya ditulis literal di t() supaya check:i18n ikut menangkapnya
    const copy = {
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
    }[promo.id];
    [img, title, sub, cta, by, href] = [p.img, ...copy, p.name, p.url] as [
      string, string, string, string, string, string,
    ];
  }

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
      aria-label={t("Sponsored by {brand}", { brand: by })}
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
            src={img}
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
            {t("Sponsored by {brand}", { brand: by })}
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
            {href ? (
              // situs partner dibuka di tab baru; kontennya di sini lanjut
              <a href={href} target="_blank" rel="noopener noreferrer" onClick={onSkip} style={ctaStyle}>
                {cta} →
              </a>
            ) : (
              <button onClick={() => onCta?.(promo)} style={ctaStyle}>
                {cta} →
              </button>
            )}
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
