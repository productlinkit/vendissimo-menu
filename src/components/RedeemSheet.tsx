import { useMemo, useState } from "react";
import qrcode from "qrcode-generator";
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

/** Codes are short-lived so a screenshot cannot be reused days later. */
const CODE_MINUTES = 15;

/** Real, scannable QR as an inline SVG — the machine reads the same string the
 *  user would otherwise type in. */
function QrCode({ value }: { value: string }) {
  const svg = useMemo(() => {
    const qr = qrcode(0, `M`);
    qr.addData(value);
    qr.make();
    const n = qr.getModuleCount();
    let path = ``;
    for (let r = 0; r < n; r++)
      for (let c = 0; c < n; c++)
        if (qr.isDark(r, c)) path += `M${c} ${r}h1v1h-1z`;
    return { n, path };
  }, [value]);
  return (
    <svg
      className="vp-redeem-qr"
      viewBox={`-1 -1 ${svg.n + 2} ${svg.n + 2}`}
      role="img"
      aria-label={value}
    >
      <rect x={-1} y={-1} width={svg.n + 2} height={svg.n + 2} fill="#fff" />
      <path d={svg.path} fill="#2a0a32" />
    </svg>
  );
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
  const [expires, setExpires] = useState<string | null>(null);
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
                  const until = new Date(Date.now() + CODE_MINUTES * 60000);
                  setExpires(
                    until.toLocaleTimeString([], {
                      hour: `2-digit`,
                      minute: `2-digit`,
                    }),
                  );
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
            <p>{t(`Show this at any Vendissimo machine`)}</p>
            <QrCode value={code} />
            <div className="vp-redeem-code">{code}</div>
            <p className="vp-redeem-expiry">
              {t(`Valid until {time}`, { time: expires ?? `` })}
            </p>
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
