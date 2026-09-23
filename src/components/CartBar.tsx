import { money } from "../lib/products";
import { useI18n } from "../lib/i18n";

type Props = { count: number; total: number; onOpen: () => void };

export default function CartBar({ count, total, onOpen }: Props) {
  const { t } = useI18n();
  const note = count === 0 ? t("noItems") : count === 1 ? t("oneItem") : `${count} ${t("nItems")}`;

  return (
    <div className="cartbar">
      <button className="cart-open" type="button" onClick={onOpen}>
        <span className="cart-ico">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 4h2.2l2.3 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2" />
            <circle cx="10" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" />
          </svg>
          <span className="badge">{count}</span>
        </span>
        <span className="cart-txt">
          <h3>{t("yourCart")}</h3>
          <p aria-live="polite">{note}</p>
        </span>
        <span className="cart-total"><span>{t("total")}</span><b>{money(total)}</b></span>
      </button>
      <button className="btn" type="button" disabled={count === 0} onClick={onOpen}>{t("checkout")}</button>
    </div>
  );
}
