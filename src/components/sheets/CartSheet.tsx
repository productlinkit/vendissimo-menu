import { money, tileStyle, type BrandKey, type Product } from "../../lib/products";
import { useI18n } from "../../lib/i18n";
import PackArt from "../PackArt";
import Sheet from "./Sheet";
import Brands from "./Brands";
import { CardIcon, QrIcon, TrashIcon, WalletIcon } from "./icons";

export type PayMethod = "qris" | "wallet" | "card";
export type Line = { p: Product; qty: number };

type Props = {
  lines: Line[];
  photos: Record<string, string>;
  subtotal: number;
  discount: number;
  total: number;
  voucher: { code: string; amount: number } | null;
  method: PayMethod;
  onMethod: (m: PayMethod) => void;
  onAdd: (p: Product) => void;
  onRemove: (p: Product) => void;
  onKill: (p: Product) => void;
  onPay: () => void;
  onClose: () => void;
};

function Art({ p, photo }: { p: Product; photo?: string }) {
  return (
    <span className={"li-art" + (photo ? " has-photo" : "")} style={tileStyle(p)}>
      <PackArt p={p} />
      {photo && <img className="photo" src={photo} alt="" />}
    </span>
  );
}

export default function CartSheet(props: Props) {
  const { t, lang } = useI18n();
  const { lines, photos, subtotal, discount, total, voucher, method, onMethod, onClose } = props;
  const name = (p: Product) => (lang === "my" ? p.my : p.en);

  const options: { id: PayMethod; label: string; keys: BrandKey[]; bg: string; ink: string; icon: JSX.Element }[] = [
    { id: "qris",   label: t("qrLabel"),     keys: ["mmqr", "kbz", "aya", "cb"],  bg: "#E4F3F1", ink: "#0B7A74", icon: QrIcon },
    { id: "wallet", label: t("walletLabel"), keys: ["kbz", "wave", "aya", "okd"], bg: "#FFECF4", ink: "#C2005F", icon: WalletIcon },
    { id: "card",   label: t("cardLabel"),   keys: ["mpu", "visa", "mc"],         bg: "#EDE7FB", ink: "#4A1C93", icon: CardIcon },
  ];

  return (
    <Sheet onClose={onClose}>
      <h2>{t("cartTitle")}</h2>
      <p className="sheet-sub">{t("cartSub")}</p>

      {lines.length === 0 ? (
        <>
          <div className="empty">
            <img src="/assets/m9.png" alt="" />
            <b>{t("emptyCart")}</b><br />{t("emptySub")}
          </div>
          <button className="btn ghost block" type="button" style={{ marginTop: 16 }} onClick={onClose}>
            {t("addMore")}
          </button>
        </>
      ) : (
        <>
          {lines.map(({ p, qty }) => (
            <div className="line-item" key={p.id}>
              <Art p={p} photo={photos[p.id]} />
              <div className="li-txt">
                <div className="li-name">{name(p)}</div>
                <div className="li-meta">Slot {p.slot} · {money(p.price)}</div>
              </div>
              <div className="li-right">
                <div className="li-price">{money(p.price * qty)}</div>
                <div className="li-ctrl">
                  <button type="button" className="kill" aria-label={t("removeItem")} onClick={() => props.onKill(p)}>{TrashIcon}</button>
                  <button type="button" aria-label="-1" onClick={() => props.onRemove(p)}>−</button>
                  <b>{qty}</b>
                  <button type="button" aria-label="+1" onClick={() => props.onAdd(p)}>+</button>
                </div>
              </div>
            </div>
          ))}

          <div className="totals">
            <div><span>{t("subtotal")}</span><span>{money(subtotal)}</span></div>
            {discount > 0 && voucher && (
              <div className="save"><span>{t("coupon")} {voucher.code}</span><span>− {money(discount)}</span></div>
            )}
            <div className="grand"><span>{t("total")}</span><span>{money(total)}</span></div>
          </div>

          <div className="pay-opts" role="group">
            {options.map((o) => (
              <button key={o.id} className="pay" type="button" aria-pressed={method === o.id} onClick={() => onMethod(o.id)}>
                <span className="mark" style={{ background: o.bg, color: o.ink }}>{o.icon}</span>
                <span>{o.label}<Brands keys={o.keys} /></span>
                <span className="radio" />
              </button>
            ))}
          </div>

          <button className="btn block" type="button" onClick={props.onPay}>{t("pay")} {money(total)}</button>
          <button className="btn ghost block sm" type="button" style={{ marginTop: 10 }} onClick={onClose}>{t("addMore")}</button>
        </>
      )}
    </Sheet>
  );
}
