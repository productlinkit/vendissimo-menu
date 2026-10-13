import { REWARDS } from "../../data";
import { useI18n } from "../../i18n";
import type { Route } from "../../types";
import { Icon } from "../Icon";

export function RedeemProgress({
  pts,
  onNavigate,
}: {
  pts: number;
  onNavigate: (route: Route) => void;
}) {
  const { t } = useI18n();
  // Same rule as the Rewards page: aim for the cheapest reward not yet reached.
  const target =
    REWARDS.find((reward) => pts < reward.pts) ?? REWARDS[REWARDS.length - 1];
  const ptsLeft = Math.max(0, target.pts - pts);
  const progressPercent = Math.min(100, (pts / target.pts) * 100);
  const unlocked = ptsLeft === 0;
  return (
    <button
      type="button"
      onClick={() => onNavigate(`rewards`)}
      aria-label={t(`See rewards and how to redeem`)}
      style={{
        display: `flex`,
        alignItems: `center`,
        gap: 14,
        border: `1px solid var(--line)`,
        background: `var(--card)`,
        borderRadius: `var(--r-md)`,
        padding: `14px 16px`,
        width: `100%`,
        boxSizing: `border-box`,
        textAlign: `left`,
        cursor: `pointer`,
      }}
    >
      <img
        src={target.img}
        alt={t(target.label)}
        style={{
          width: 44,
          height: 44,
          objectFit: `contain`,
          flexShrink: 0,
        }}
      />
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: `grid`,
          gap: 8,
        }}
      >
        <div
          style={{
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          {unlocked
            ? t(`🎉 {reward} unlocked!`, { reward: t(target.label) })
            : t(`{n} more pts for a {reward}`, {
                n: ptsLeft,
                reward: t(target.label),
              })}
        </div>
        <div
          style={{
            height: 6,
            borderRadius: 99,
            background: `rgba(255,255,255,.08)`,
            overflow: `hidden`,
          }}
        >
          <div
            style={{
              width: `${progressPercent}%`,
              height: `100%`,
              background: `var(--pink)`,
              borderRadius: `inherit`,
              transition: `width .8s cubic-bezier(.22,1,.36,1)`,
            }}
          />
        </div>
        <small
          style={{
            fontFamily: `var(--f-mono)`,
            fontSize: 14,
            color: `var(--ink-3)`,
          }}
        >
          {t(`{pts} / {total} pts`, { pts, total: target.pts })}
          {` · `}
          {t(`How to redeem`)}
        </small>
      </div>
      <span
        style={{
          width: 18,
          height: 18,
          color: unlocked ? `var(--pink)` : `var(--ink-3)`,
          flexShrink: 0,
        }}
      >
        {Icon.chev}
      </span>
    </button>
  );
}
