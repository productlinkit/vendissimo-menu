import { useState } from "react";
import { RedeemSheet, RedeemSteps } from "../components/RedeemSheet";
import { VoucherList } from "../components/VoucherList";
import { REWARDS } from "../data";
import { useI18n } from "../i18n";
import { LEVELS, levelOf } from "../lib/levels";
import type { Progress, Reward, Voucher } from "../types";

// Halaman penukaran: poin menjadi kode voucher, kode ditukar minuman di
// mesin. Peta level tetap di beranda; di sini semua hadiah berjajar.

export function RewardsPage({
  S,
  onRedeem,
}: {
  S: Progress;
  onRedeem: (reward: Reward, voucher: Voucher) => void;
}) {
  const { t } = useI18n();
  const [menukar, setMenukar] = useState<Reward | null>(null);
  const sekarang = levelOf(S.exp);

  return (
    <div className="vp-view vp-rewards page-enter">
      <div>
        <h1 style={{ fontSize: `clamp(26px,6vw,42px)` }}>{t(`Rewards`)}</h1>
        <p
          style={{
            color: `var(--ink-2)`,
            marginTop: 6,
            fontSize: 19,
            fontWeight: 700,
            lineHeight: 1.35,
          }}
        >
          {t(`Swap your points for drink vouchers`)}
        </p>
      </div>

      <section className="vp-rw-balance vp-on-dark">
        <div>
          <span>{t(`Your points`)}</span>
          <strong>{t(`{n} pts`, { n: S.pts })}</strong>
        </div>
        <div>
          <span>{t(`Your level`)}</span>
          <strong>{t(`Level {n}`, { n: sekarang.n })}</strong>
        </div>
        <div>
          <span>{t(`EXP`)}</span>
          <strong>{S.exp}</strong>
        </div>
      </section>

      <ul className="vp-rw-list">
        {REWARDS.map((reward) => {
          // tiap voucher dibuka oleh level yang menjadikannya hadiah
          const level = LEVELS.find((lv) => lv.prize === reward.label);
          const terbuka = !level || S.exp >= level.exp;
          const kurang = reward.pts - S.pts;
          return (
            <li key={reward.label} className={`vp-rw-card vp-on-dark${terbuka ? `` : ` is-locked`}`}>
              <img src={reward.img} alt="" />
              <div className="vp-rw-text">
                <h2>{t(reward.label)}</h2>
                <p>{t(reward.desc)}</p>
                <span className="vp-rw-cost">{t(`{n} pts`, { n: reward.pts })}</span>
              </div>
              {!terbuka && level ? (
                <span className="vp-rw-state">
                  🔒 {t(`Unlocks at Level {n}`, { n: level.n })}
                </span>
              ) : kurang > 0 ? (
                <span className="vp-rw-state">
                  {t(`{n} more pts needed`, { n: kurang })}
                </span>
              ) : (
                <button
                  type="button"
                  className="vp-prize-claim"
                  onClick={() => setMenukar(reward)}
                >
                  {t(`Get voucher`)}
                </button>
              )}
            </li>
          );
        })}
      </ul>

      <section className="vp-panel vp-on-dark">
        <h2 className="vp-eyebrow">{t(`My vouchers`)}</h2>
        <VoucherList vouchers={S.vouchers ?? []} />
      </section>

      <section className="vp-panel vp-on-dark">
        <h2 className="vp-eyebrow">{t(`How to redeem`)}</h2>
        <RedeemSteps />
      </section>

      {menukar && (
        <RedeemSheet
          reward={menukar}
          onConfirm={(v) => onRedeem(menukar, v)}
          onClose={() => setMenukar(null)}
        />
      )}
    </div>
  );
}
