import { REWARDS } from "../../data";
import { useI18n } from "../../i18n";
import { LEVELS, levelOf, levelProgress } from "../../lib/levels";
import type { Progress } from "../../types";

// Peta karnaval: jalur berkelok berlampu, tiap level jadi perhentian di
// atasnya. Proyek ini tidak punya aset ilustrasi karnaval, jadi jalur,
// lampu, dan medalinya digambar dengan SVG + CSS, bukan gambar tempelan.

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
      <div className="vp-map">
        {/* satu-satunya tempat EXP muncul sekarang; langkah tur "exp"
            menempel ke sini */}
        <div className="vp-map-stage" data-tour="exp">
          <span>{t(`Current stage`)}</span>
          <strong>{t(`Level {n}`, { n: sekarang.n })}</strong>
          <em>{t(`{n} EXP`, { n: S.exp })}</em>
          <span className="vp-level-bar" aria-hidden="true">
            <span style={{ width: `${pct}%` }} />
          </span>
          <small>
            {next
              ? t(`{n} EXP more to reach level {lvl}`, { n: sisa, lvl: next.n })
              : t(`Top level reached — every reward is open`)}
          </small>
        </div>

        <ol className="vp-map-stops">
          {LEVELS.map((lv) => {
            const terbuka = S.exp >= lv.exp;
            const kini = lv.n === sekarang.n;
            const r = hadiah(lv.prize);
            return (
              <li key={lv.n} className={`vp-map-slot is-lv${lv.n}`}>
                <button
                  type="button"
                  // tur menyorot perhentian yang sedang ditempati, bukan
                  // seluruh peta yang memenuhi layar
                  data-tour={kini ? `level` : undefined}
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
                    {r && (
                      <img
                        className="vp-map-prize"
                        src={r.img}
                        alt=""
                        data-tour={kini ? `prize` : undefined}
                      />
                    )}
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
