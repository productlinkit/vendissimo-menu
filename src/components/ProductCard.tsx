import { money, tileStyle, type Product } from "../lib/products";
import { useI18n } from "../lib/i18n";
import PackArt from "./PackArt";

type Props = {
  p: Product;
  stock: number;
  qty: number;
  photo?: string;
  onAdd: () => void;
  onRemove: () => void;
};

export default function ProductCard({ p, stock, qty, photo, onAdd, onRemove }: Props) {
  const { t, lang } = useI18n();
  const out = stock === 0;
  const name = lang === "my" ? p.my : p.en;

  return (
    <article className={"card" + (out ? " out" : "")}>
      <div className={"tile" + (photo ? " has-photo" : "")} style={tileStyle(p)}>
        <span className="chip-slot">{p.slot}</span>
        <PackArt p={p} />
        {photo && <img className="photo" src={photo} alt="" />}
        {out && <span className="soldtag">{t("soldOut")}</span>}
      </div>
      <h3>{name}</h3>
      <div className="card-foot">
        <span className="price">{money(p.price)}</span>
        {qty > 0 ? (
          <span className="stepper">
            <button type="button" aria-label="-1" onClick={onRemove}>−</button>
            <b>{qty}</b>
            <button type="button" aria-label="+1" onClick={onAdd}>+</button>
          </span>
        ) : (
          <button className="add" type="button" aria-label="+" disabled={out} onClick={onAdd}>+</button>
        )}
      </div>
    </article>
  );
}
