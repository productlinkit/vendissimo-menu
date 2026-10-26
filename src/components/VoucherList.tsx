import { useState } from "react";
import { REWARDS } from "../data";
import { useI18n } from "../i18n";
import type { Voucher } from "../types";
import { RedeemSheet, formatUntil, voucherActive } from "./RedeemSheet";

/** Kode voucher yang sudah ditukar; yang masih berlaku bisa dibuka lagi
 *  untuk ditunjukkan di mesin. Dipakai di halaman Rewards dan Profil. */
export function VoucherList({ vouchers }: { vouchers: Voucher[] }) {
  const { t } = useI18n();
  const [lihat, setLihat] = useState<Voucher | null>(null);
  if (vouchers.length === 0)
    return (
      <p style={{ color: `var(--ink-3)`, fontSize: 15 }}>
        {t("No vouchers yet. Reach a level, then swap your points for a drink voucher.")}
      </p>
    );
  return (
    <>
      <ul className="vp-vouchers">
        {vouchers.map((v) => {
          const aktif = voucherActive(v);
          return (
            <li key={v.code} className={aktif ? undefined : `is-expired`}>
              <img src={v.img} alt="" />
              <span className="vp-voucher-text">
                <b>{v.code}</b>
                <small>
                  {t(v.label)}
                  {` · `}
                  {aktif
                    ? t(`Valid until {time}`, { time: formatUntil(v.until) })
                    : t(`Expired`)}
                </small>
              </span>
              {aktif && (
                <button type="button" onClick={() => setLihat(v)}>
                  {t(`Show`)}
                </button>
              )}
            </li>
          );
        })}
      </ul>
      {lihat && (
        <RedeemSheet
          reward={
            REWARDS.find((r) => r.label === lihat.label) ?? {
              img: lihat.img,
              label: lihat.label,
              pts: 0,
              desc: ``,
            }
          }
          voucher={lihat}
          onClose={() => setLihat(null)}
        />
      )}
    </>
  );
}
