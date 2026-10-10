import { useState } from "react";
import { useI18n } from "../i18n";
import type { Reward } from "../types";

export const REDEEM_STEPS = [
  `Go to any Vendissimo machine`,
  `Tap “Redeem” on the machine screen`,
  `Enter your code and collect your reward`,
];

// No 0/O or 1/I, so the code is easy to read off a phone and type on the machine.
const CODE_CHARS = `ABCDEFGHJKLMNPQRSTUVWXYZ23456789`;

function makeCode() {
  return Array.from(
    { length: 6 },
    () => CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)],
  ).join(``);
}

export function RedeemSteps() {
  const { t } = useI18n();
  return (
    <ol className="vp-redeem-steps">
      {REDEEM_STEPS.map((step, idx) => (
        <li key={step}>
          <span>{idx + 1}</span>
          {t(step)}
        </li>
      ))}
    </ol>
  );
}

export function RedeemSheet({
  reward,
  onConfirm,
  onClose,
}: {
  reward: Reward;
  /** spend the points; called once, when the code is generated */
  onConfirm: () => void;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const [code, setCode] = useState<string | null>(null);
  const label = t(reward.label);
  return (
    <div
      className="vp-sheet"
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <button
        type="button"
        className="vp-sheet-veil"
        aria-label={t(`Close`)}
        onClick={onClose}
      />
      <div className="vp-sheet-card">
        <img src={reward.img} alt="" className="vp-sheet-img" />
        <h2>{label}</h2>
        {code === null ? (
          <>
            <p>
              {t(`Use {n} pts to get a code for {reward}?`, {
                n: reward.pts,
                reward: label,
              })}
            </p>
            <div className="vp-sheet-actions">
              <button
                type="button"
                className="vp-sheet-primary"
                onClick={() => {
                  onConfirm();
                  setCode(makeCode());
                }}
              >
                {t(`Get my code`)}
              </button>
              <button
                type="button"
                className="vp-sheet-secondary"
                onClick={onClose}
              >
                {t(`Cancel`)}
              </button>
            </div>
          </>
        ) : (
          <>
            <p>{t(`Your code`)}</p>
            <div className="vp-redeem-code">{code}</div>
            <RedeemSteps />
            <button
              type="button"
              className="vp-sheet-primary"
              onClick={onClose}
            >
              {t(`Done`)}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
