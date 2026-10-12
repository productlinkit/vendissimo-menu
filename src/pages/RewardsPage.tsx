import { POINTS, REWARDS } from "../data";
import { useState } from "react";
import { RedeemSheet, RedeemSteps } from "../components/RedeemSheet";
import { useI18n } from "../i18n";
import type { Progress, Reward } from "../types";

// Amounts are message templates filled with `n` at render time.
const EARN_WAYS: [label: string, amount: string, n: number][] = [
  [`Play a game`, `+{n} pts`, 40],
  [`Finish Education course`, `+{n} pts`, POINTS.lesson],
  [`Complete English practice`, `+{n} pts`, POINTS.english],
  [`Watch a video`, `+{n} pts`, POINTS.video],
  [`Read a magazine`, `+{n} pts`, POINTS.magazine],
  [`Daily spin`, `up to +{n} pts`, 50],
];

export function RewardsPage({
  S,
  onRedeem,
}: {
  S: Progress;
  onRedeem: (reward: Reward) => void;
}) {
  const { t } = useI18n();
  const [redeeming, setRedeeming] = useState<Reward | null>(null);
  const nextReward = REWARDS.find((reward) => S.pts < reward.pts);
  return (
    <div className="vp-view page-enter">
      <div>
        <h1
          style={{
            fontSize: `clamp(24px,4vw,38px)`,
          }}
        >
          {t("Rewards")}
        </h1>
        <p
          style={{
            color: `var(--ink-2)`,
            marginTop: 6,
            fontSize: 19,
            fontWeight: 700,
            lineHeight: 1.35,
          }}
        >
          {t("Earn points and redeem at any Vendissimo machine")}
        </p>
      </div>
      <section
        style={{
          borderRadius: `var(--r-lg)`,
          border: `1px solid var(--line)`,
          background: `var(--grad-card)`,
          padding: 24,
          width: `100%`,
          boxSizing: `border-box`,
          overflow: `hidden`,
        }}
      >
        <div className="vp-pts-hero">
          <img
            src="/img/coin.svg"
            alt={t("coin")}
            style={{
              width: 64,
              height: 64,
              flexShrink: 0,
            }}
          />
          <div
            style={{
              minWidth: 0,
              flex: 1,
            }}
          >
            <div
              style={{
                fontFamily: `var(--f-mono)`,
                fontSize: 13,
                letterSpacing: `.18em`,
                textTransform: `uppercase`,
                color: `var(--ink-3)`,
              }}
            >
              {t("Your points")}
            </div>
            <div
              style={{
                fontFamily: `var(--f-display)`,
                fontWeight: 900,
                fontSize: `clamp(30px,7vw,56px)`,
                lineHeight: 1,
                color: `#fff`,
                fontVariantNumeric: `tabular-nums`,
              }}
            >
              {S.pts}{" "}
              <small
                style={{
                  fontSize: `.4em`,
                  opacity: 0.7,
                }}
              >
                {t("pts")}
              </small>
            </div>
            <p
              style={{
                fontSize: 14,
                color: `var(--ink-3)`,
                marginTop: 4,
              }}
            >
              {nextReward
                ? t("{n} more pts for a {reward}", {
                    n: nextReward.pts - S.pts,
                    reward: t(nextReward.label),
                  })
                : t("🎉 All rewards unlocked!")}
            </p>
          </div>
        </div>
      </section>
      <section>
        <div
          style={{
            marginBottom: 12,
          }}
        >
          <h2 className="vp-eyebrow">
            {t("Rewards")}
          </h2>
        </div>
        <div className="vp-rewards-grid">
          {REWARDS.map((reward, idx) => {
            const unlocked = S.pts >= reward.pts;
            return (
              <div
                key={idx}
                style={{
                  border: `1px solid var(--line)`,
                  background: `var(--card)`,
                  borderRadius: `var(--r-md)`,
                  padding: 16,
                }}
              >
                <div className="vp-reward-card">
                  <img
                    src={reward.img}
                    alt={t(reward.label)}
                    style={{
                      width: 64,
                      height: 64,
                      objectFit: `contain`,
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      {t(reward.label)}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        color: `var(--ink-3)`,
                        marginBottom: 4,
                      }}
                    >
                      {t(reward.desc)}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: `flex`,
                    alignItems: `center`,
                    gap: 10,
                    marginTop: 12,
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      height: 6,
                      borderRadius: 99,
                      background: `rgba(255,255,255,.08)`,
                      overflow: `hidden`,
                    }}
                  >
                    <div
                      style={{
                        width: `${Math.min(100, (S.pts / reward.pts) * 100)}%`,
                        height: `100%`,
                        background: `var(--pink)`,
                        borderRadius: `inherit`,
                        transition: `width .8s`,
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: `var(--f-mono)`,
                      fontSize: 14,
                      color: `#fff`,
                      fontWeight: 700,
                      whiteSpace: `nowrap`,
                    }}
                  >
                    {unlocked ? t("Unlocked") : t("{n} pts", { n: reward.pts })}
                  </span>
                  <button
                    disabled={!unlocked}
                    title={
                      unlocked
                        ? undefined
                        : t(`Need {n} more pts`, { n: reward.pts - S.pts })
                    }
                    aria-label={
                      unlocked
                        ? undefined
                        : `${t(reward.label)} — ${t(`Need {n} more pts`, { n: reward.pts - S.pts })}`
                    }
                    onClick={() => setRedeeming(reward)}
                    style={{
                      background: unlocked ? `var(--pink)` : `var(--card)`,
                      border: unlocked ? `none` : `1px solid var(--line)`,
                      color: unlocked ? `#fff` : `var(--ink-3)`,
                      borderRadius: 999,
                      padding: `6px 14px`,
                      fontSize: 14,
                      fontWeight: 600,
                      opacity: unlocked ? 1 : 0.5,
                      whiteSpace: `nowrap`,
                    }}
                  >
                    {unlocked
                      ? t("Redeem")
                      : t(`Need {n} more pts`, { n: reward.pts - S.pts })}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="vp-panel">
        <h2 className="vp-eyebrow">
          {t("How to redeem")}
        </h2>
        <RedeemSteps />
      </section>
      <section className="vp-panel">
        <h2 className="vp-eyebrow">
          {t("How to earn")}
        </h2>
        <ul className="vp-earn">
          {EARN_WAYS.map(([label, amount, n]) => (
            <li key={label}>
              <span>{t(label)}</span>
              <em
                style={{
                  fontFamily: `var(--f-mono)`,
                  fontSize: 14,
                  fontStyle: `normal`,
                  color: `#fff`,
                  fontWeight: 700,
                  whiteSpace: `nowrap`,
                }}
              >
                {t(amount, { n })}
              </em>
            </li>
          ))}
        </ul>
      </section>
      <section className="vp-panel">
        <h2 className="vp-eyebrow">
          {t("Points history")}
        </h2>
        {S.log.length === 0 ? (
          <p
            style={{
              color: `var(--ink-3)`,
              fontSize: 15,
            }}
          >
            {t("No points yet. Play a game or try English practice.")}
          </p>
        ) : (
          <ul
            style={{
              display: `grid`,
              gap: 8,
              maxHeight: 220,
              overflowY: `auto`,
            }}
          >
            {S.log
              .filter((entry) => entry.n !== 0)
              .map((entry, idx) => (
              <li
                key={idx}
                style={{
                  display: `flex`,
                  justifyContent: `space-between`,
                  fontSize: 15,
                  gap: 10,
                  color: `var(--ink-2)`,
                }}
              >
                <span>{t(entry.w)}</span>
                <small
                  className={`vp-chip ${entry.n >= 0 ? `vp-chip-good` : `vp-chip-count`}`}
                >
                  {t("{n} pts", { n: `${entry.n > 0 ? `+` : ``}${entry.n}` })}
                </small>
              </li>
            ))}
          </ul>
        )}
      </section>
      {redeeming && (
        <RedeemSheet
          reward={redeeming}
          onConfirm={() => onRedeem(redeeming)}
          onClose={() => setRedeeming(null)}
        />
      )}
    </div>
  );
}
