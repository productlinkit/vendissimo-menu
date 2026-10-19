import { useState } from "react";
import { REWARDS } from "../../data";
import { useI18n } from "../../i18n";
import {
  GAME_GROUPS,
  LEVELS,
  doneCount,
  gamesOf,
  levelProgress,
  objectivesOf,
} from "../../lib/levels";
import type { GameGroup, Progress, Reward } from "../../types";
import { Icon } from "../Icon";

// Halaman satu level: kelompok game, sasaran misi, dan hadiah yang didapat.
// Referensinya punya papan peringkat di sini; diganti kartu hadiah karena
// yang ditanya pengguna selalu "saya dapat apa", bukan "saya peringkat berapa".

function Group({
  group,
  S,
  onPlay,
}: {
  group: GameGroup;
  S: Progress;
  onPlay: (group: GameGroup) => void;
}) {
  const { t } = useI18n();
  const [terbuka, setTerbuka] = useState(false);
  const { objectives, total } = objectivesOf(group, S);
  const selesai = doneCount(group, S);
  const daftar = gamesOf(group);
  const poinKelompok = total * (daftar[0]?.pts ?? 0);

  return (
    <article className="vp-group">
      <span className="vp-group-art" aria-hidden="true">
        <img src={group.img} alt="" loading="lazy" />
      </span>
      <div className="vp-group-body">
        <h3 className="vp-group-title">{t(group.label)}</h3>
        <p className="vp-group-sub">{t(group.sub)}</p>
        <dl className="vp-group-stats">
          <div>
            <dt>{t(`Games`)}</dt>
            <dd>{total}</dd>
          </div>
          <div>
            <dt>{t(`Points on offer`)}</dt>
            <dd>{t(`{n} pts`, { n: poinKelompok })}</dd>
          </div>
        </dl>
        <button
          type="button"
          className="vp-group-go"
          onClick={() => onPlay(group)}
          aria-label={t(`Play {group}`, { group: t(group.label) })}
        >
          {t(`Go`)}
        </button>
        <button
          type="button"
          className="vp-group-toggle"
          aria-expanded={terbuka}
          onClick={() => setTerbuka((was) => !was)}
        >
          {t(`Mission objectives ({done}/{total})`, {
            done: selesai,
            total: objectives.length,
          })}
          <span
            className="vp-group-caret"
            aria-hidden="true"
            data-open={terbuka ? `true` : undefined}
          >
            {Icon.chev}
          </span>
        </button>
        {terbuka && (
          <ul className="vp-group-objectives">
            {objectives.map((o) => (
              <li key={o.label} className={o.done ? `done` : undefined}>
                <span className="vp-group-tick" aria-hidden="true">
                  {o.done ? Icon.check : null}
                </span>
                {t(o.label, { n: o.label.includes(`pts`) ? 100 : total })}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

export function LevelDetail({
  n,
  S,
  onBack,
  onPlay,
  onClaim,
}: {
  n: number;
  S: Progress;
  onBack: () => void;
  onPlay: (group: GameGroup) => void;
  onClaim: (reward: Reward) => void;
}) {
  const { t } = useI18n();
  // nomor level selalu datang dari LEVELS, jadi entri ini pasti ada
  const level = LEVELS.find((lv) => lv.n === n)!;
  const hadiah = REWARDS.find((r) => r.label === level.prize);
  const terbuka = S.exp >= level.exp;
  const cukupPoin = S.pts >= (hadiah?.pts ?? 0);
  // kemajuan harus mengacu ke level yang sedang dibuka, bukan level
  // pengguna saat ini: kalau tidak, "Level 3" bisa berbunyi "menuju level 2"
  const global = levelProgress(S.exp);
  const pct = terbuka
    ? global.pct
    : Math.max(0, Math.min(100, (S.exp / level.exp) * 100));
  const sisaKeLevel = Math.max(0, level.exp - S.exp);

  return (
    <div className="vp-view vp-level-detail page-enter">
      <button onClick={onBack} className="vp-level-back">
        <span aria-hidden="true">{Icon.back}</span>
        {t(`Levels`)}
      </button>

      <header className="vp-level-hero">
        <div>
          <h1>{t(`Level {n}`, { n: level.n })}</h1>
          <p className="vp-level-hero-sub">
            {!terbuka
              ? t(`{n} EXP more to reach level {lvl}`, {
                  n: sisaKeLevel,
                  lvl: level.n,
                })
              : global.next
                ? t(`{n} EXP more to reach level {lvl}`, {
                    n: global.sisa,
                    lvl: global.next.n,
                  })
                : t(`Top level reached — every reward is open`)}
          </p>
          <div className="vp-level-bar" aria-hidden="true">
            <span style={{ width: `${pct}%` }} />
          </div>
        </div>
        <img src={level.img} alt="" className="vp-level-hero-art" />
      </header>

      {/* Menggantikan papan peringkat di referensi, dan sekarang juga
          satu-satunya jalan menukar poin: daftar hadiah yang lama sudah
          tidak ada lagi di halaman Rewards. */}
      <section className="vp-prize" data-tour="prize">
        {hadiah && <img src={hadiah.img} alt="" aria-hidden="true" />}
        <div>
          <h2>{t(`Your prize at this level`)}</h2>
          <p>
            {!terbuka
              ? t(`Reach {n} EXP to unlock {prize}`, {
                  n: level.exp,
                  prize: t(level.prize),
                })
              : cukupPoin
                ? t(`{prize} — ready to claim`, { prize: t(level.prize) })
                : t(`{prize} — {n} more pts needed`, {
                    prize: t(level.prize),
                    n: (hadiah?.pts ?? 0) - S.pts,
                  })}
          </p>
        </div>
        {terbuka && hadiah && (
          <button
            type="button"
            className="vp-prize-claim"
            disabled={!cukupPoin}
            onClick={() => onClaim(hadiah)}
          >
            {t(`Redeem`)}
          </button>
        )}
      </section>

      <div className="vp-group-list">
        {GAME_GROUPS.map((group) => (
          <Group key={group.id} group={group} S={S} onPlay={onPlay} />
        ))}
      </div>
    </div>
  );
}
