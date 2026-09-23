import { useEffect, useState } from "react";
import { tileStyle, type Product } from "../../lib/products";
import { useI18n } from "../../lib/i18n";
import PackArt from "../PackArt";
import Sheet from "./Sheet";

type Props = {
  lines: { p: Product; qty: number }[];
  photos: Record<string, string>;
  onGame: () => void;
  onClose: () => void;
};

export default function SuccessSheet({ lines, photos, onGame, onClose }: Props) {
  const { t, lang } = useI18n();
  const [outCount, setOutCount] = useState(0);

  // produk keluar satu per satu
  useEffect(() => {
    const ids = lines.map((_, i) => setTimeout(() => setOutCount(i + 1), 700 + i * 700));
    return () => ids.forEach(clearTimeout);
  }, [lines]);

  return (
    <Sheet title={t("okTitle")} onClose={onClose}>
      <div className="sheet-done">
        <img className="win" src="/assets/success.png" alt="" />
        <h2 style={{ color: "var(--mint)" }}>{t("okTitle")}</h2>
        <p className="sheet-sub">{t("okSub")}</p>
      </div>

      <div className="dispense">
        {lines.map(({ p, qty }, i) => (
          <div className={"drop" + (i < outCount ? " done" : "")} key={p.id}>
            <span className={"li-art" + (photos[p.id] ? " has-photo" : "")} style={tileStyle(p)}>
              <PackArt p={p} />
              {photos[p.id] && <img className="photo" src={photos[p.id]} alt="" />}
            </span>
            <div className="li-txt">
              <div className="li-name">{(lang === "my" ? p.my : p.en)} x{qty}</div>
              <div className="li-meta">Slot {p.slot}</div>
            </div>
            <span className="state">{i < outCount ? t("dispensed") + " ✓" : t("preparing")}</span>
          </div>
        ))}
      </div>

      <div className="push-hint"><span className="kbd">PUSH</span><span>{t("push")}</span></div>
      <button className="btn alt block" type="button" style={{ marginTop: 16 }} onClick={onGame}>{t("playGame")}</button>
      <button className="btn ghost sm block" type="button" style={{ marginTop: 10 }} onClick={onClose}>{t("done")}</button>
    </Sheet>
  );
}
