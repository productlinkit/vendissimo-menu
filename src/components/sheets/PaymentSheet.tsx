import { useEffect, useRef, useState } from "react";
import { money } from "../../lib/products";
import { useI18n } from "../../lib/i18n";
import { drawQR } from "../../lib/qr";
import Sheet from "./Sheet";
import Brands from "./Brands";
import { TapCardArt } from "./icons";
import type { PayMethod } from "./CartSheet";

type Props = {
  method: PayMethod;
  total: number;
  onPaid: () => void;
  onBack: () => void;
  onExpire: () => void;
  onClose: () => void;
};

export default function PaymentSheet({ method, total, onPaid, onBack, onExpire, onClose }: Props) {
  const { t } = useI18n();
  const [left, setLeft] = useState(300);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvas.current) drawQR(canvas.current, total);
  }, [total, method]);

  useEffect(() => {
    const id = setInterval(() => setLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => { if (left <= 0) onExpire(); }, [left, onExpire]);

  const mm = Math.max(0, Math.floor(left / 60));
  const ss = Math.max(0, left % 60);
  const hint = method === "qris" ? t("qrHint") : method === "wallet" ? t("walletHint") : t("cardHint");

  return (
    <Sheet onClose={onClose}>
      <h2>{t("payTitle")}</h2>
      <p className="sheet-sub">{hint}</p>

      {method === "card" ? (
        <>
          <div className="tapart">{TapCardArt}</div>
          <div className="qr-wrap"><Brands keys={["mpu", "visa", "mc"]} /></div>
        </>
      ) : (
        <div className="qr-wrap">
          <div className="qr-box">
            <canvas ref={canvas} width={228} height={228} aria-label="QR" />
          </div>
          <div><span className="qr-tag">{method === "qris" ? t("qrTag") : t("walletTag")}</span></div>
          <Brands keys={method === "qris" ? ["kbz", "aya", "cb", "wave"] : ["kbz", "wave", "aya", "okd"]} />
        </div>
      )}

      <p className="timer">{t("expires")} <b>{mm}:{ss < 10 ? "0" : ""}{ss}</b></p>
      <div className="totals" style={{ borderTop: "none", paddingTop: 0 }}>
        <div className="grand"><span>{t("total")}</span><span>{money(total)}</span></div>
      </div>
      <button className="btn block" type="button" style={{ marginTop: 16 }} onClick={onPaid}>{t("paid")}</button>
      <button className="btn ghost sm block" type="button" style={{ marginTop: 10 }} onClick={onBack}>{t("backCart")}</button>
    </Sheet>
  );
}
