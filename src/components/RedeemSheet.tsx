import { useMemo, useState } from "react";
import qrcode from "qrcode-generator";
import { useI18n } from "../i18n";
import type { Reward, Voucher } from "../types";

export const REDEEM_STEPS = [
  `Go to any Vendissimo machine`,
  `Tap “Redeem” on the machine screen`,
  `Enter your voucher code and collect your drink`,
];

// No 0/O or 1/I, so the code is easy to read off a phone and type on the machine.
const CODE_CHARS = `ABCDEFGHJKLMNPQRSTUVWXYZ23456789`;

function makeCode() {
  return Array.from(
    { length: 6 },
    () => CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)],
  ).join(``);
}

/** Berlaku sehari: cukup untuk sampai ke mesin, tidak bisa dipakai berhari-hari. */
const CODE_HOURS = 24;

export function voucherActive(v: Voucher) {
  return v.until > Date.now();
}

export function formatUntil(until: number) {
  return new Date(until).toLocaleString([], {
    day: `numeric`,
    month: `short`,
    hour: `2-digit`,
    minute: `2-digit`,
  });
}

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
  voucher: saved,
  onConfirm,
  onClose,
}: {
  reward: Reward;
  /** voucher yang sudah ada: jendela langsung menampilkan kodenya */
  voucher?: Voucher;
  /** spend the points and keep the voucher; called once, when the code is made */
  onConfirm?: (voucher: Voucher) => void;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const [voucher, setVoucher] = useState<Voucher | null>(saved ?? null);
  const code = voucher?.code ?? null;
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
              {t(`Use {n} pts to get a voucher code for {reward}?`, {
                n: reward.pts,
                reward: label,
              })}
            </p>
            <p className="vp-redeem-what">{t(reward.desc)}</p>
            <div className="vp-sheet-actions">
              <button
                type="button"
                className="vp-sheet-primary"
                onClick={() => {
                  const baru: Voucher = {
                    code: makeCode(),
                    label: reward.label,
                    img: reward.img,
                    until: Date.now() + CODE_HOURS * 3600000,
                  };
                  onConfirm?.(baru);
                  setVoucher(baru);
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
            <p className="vp-redeem-eyebrow">{t(`Your voucher code`)}</p>
            <div className="vp-redeem-code">{code}</div>
            <QrCode value={code} />
            <p>
              {t(`Swap it for {what} — show it at the machine or type it in.`, {
                what: t(reward.desc),
              })}
            </p>
            <p className="vp-redeem-expiry">
              {t(`Valid until {time}`, { time: formatUntil(voucher!.until) })}
              {` · `}
              {t(`Saved in Profile → My vouchers`)}
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
