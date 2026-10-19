import { REWARDS } from "../../data";
import { useI18n } from "../../i18n";
import { LEVELS, levelOf, levelProgress } from "../../lib/levels";
import type { Progress } from "../../types";

// Peta karnaval: jalur berkelok berlampu, tiap level jadi perhentian di
// atasnya. Proyek ini tidak punya aset ilustrasi karnaval, jadi jalur,
// lampu, dan medalinya digambar dengan SVG + CSS, bukan gambar tempelan.

/** Posisi perhentian dalam persen kotak peta, dipilih supaya tiap objek
 *  berdiri di atas teras pada ilustrasinya. Nilainya berbeda antara HP
 *  dan desktop karena kedua ilustrasi itu komposisinya tidak sama. */
const TITIK: Record<number, { x: number; y: number }> = {
  1: { x: 27, y: 70 },
  2: { x: 63, y: 45 },
  3: { x: 31, y: 19 },
};

export function LevelMap({
  S,
  onOpen,
}: {
  S: Progress;
  onOpen: (n: number) => void;
}) {
  const { t } = useI18n();
  const sekarang = levelOf(S.exp);
  const { pct, sisa, next } = levelProgress(S.exp);
  const hadiah = (label: string) => REWARDS.find((r) => r.label === label);

  return (
    <section className="vp-levels" aria-label={t(`Levels`)}>
      <div className="vp-level-head" data-tour="exp">
        <div className="vp-level-badge">
          <span>{t(`Level {n}`, { n: sekarang.n })}</span>
          <strong>{t(`{n} EXP`, { n: S.exp })}</strong>
        </div>
        <div className="vp-level-bar" aria-hidden="true">
          <span style={{ width: `${pct}%` }} />
        </div>
        <p className="vp-level-next">
          {next
            ? t(`{n} EXP more to reach level {lvl}`, { n: sisa, lvl: next.n })
            : t(`Top level reached — every reward is open`)}
        </p>
      </div>

      <div className="vp-map" data-tour="map">
        <p className="vp-map-stage">
          <span>{t(`Current stage`)}</span>
          <strong>{t(`Level {n}`, { n: sekarang.n })}</strong>
        </p>

        <ol className="vp-map-stops">
          {LEVELS.map((lv) => {
            const terbuka = S.exp >= lv.exp;
            const kini = lv.n === sekarang.n;
            const r = hadiah(lv.prize);
            const pos = TITIK[lv.n];
            return (
              <li
                key={lv.n}
                className="vp-map-slot"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                <button
                  type="button"
                  className={`vp-map-stop is-lv${lv.n}${terbuka ? `` : ` is-locked`}${kini ? ` is-now` : ``}`}
                  onClick={() => onOpen(lv.n)}
                  aria-label={
                    terbuka
                      ? t(`Level {n} — prize {prize}`, {
                          n: lv.n,
                          prize: t(lv.prize),
                        })
                      : t(`Level {n} — locked, unlocks at {exp} EXP`, {
                          n: lv.n,
                          exp: lv.exp,
                        })
                  }
                >
                  <span className="vp-map-medal" aria-hidden="true">
                    <img src={lv.img} alt="" loading="lazy" />
                    {r && <img className="vp-map-prize" src={r.img} alt="" />}
                  </span>
                  <span className="vp-map-label">
                    {t(`Level {n}`, { n: lv.n })}
                  </span>
                  <span className="vp-map-note">
                    {terbuka ? t(lv.prize) : t(`{n} EXP`, { n: lv.exp })}
                  </span>
                  {kini && (
                    <span className="vp-map-you">{t(`You are here`)}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
