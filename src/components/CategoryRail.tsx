import type { CatId } from "../lib/products";
import { useI18n, type Key } from "../lib/i18n";

const CATS: CatId[] = ["all", "drinks", "snacks", "sweets", "games"];

type Props = { active: CatId; onPick: (c: CatId) => void };

export default function CategoryRail({ active, onPick }: Props) {
  const { t } = useI18n();
  return (
    <nav className="rail" aria-label={t("categories")}>
      {CATS.map((id) => (
        <button key={id} type="button" aria-pressed={id === active} onClick={() => onPick(id)}>
          <img src={`/assets/cat/${id}.png`} alt="" width={128} height={128} />
          <span>{t(id as Key)}</span>
        </button>
      ))}
    </nav>
  );
}
