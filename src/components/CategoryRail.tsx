import type { CatId } from "../lib/products";
import { useI18n, type Key } from "../lib/i18n";

const CATS: { id: CatId; icon: JSX.Element }[] = [
  { id: "all", icon: (<><rect x="4" y="4" width="7" height="7" rx="2" /><rect x="13" y="4" width="7" height="7" rx="2" /><rect x="4" y="13" width="7" height="7" rx="2" /><rect x="13" y="13" width="7" height="7" rx="2" /></>) },
  { id: "drinks", icon: (<><path d="M6 7h12l-1.4 12.2a2 2 0 0 1-2 1.8H9.4a2 2 0 0 1-2-1.8z" /><path d="M6 7l1-3h10l1 3" /></>) },
  { id: "snacks", icon: (<><path d="M7 4h10l-1 3v13H8V7z" /><path d="M8 7h8" /></>) },
  { id: "sweets", icon: (<><circle cx="12" cy="12" r="4" /><path d="M8.6 9.4L4 6l1 5-1 5 4.6-3.4" /><path d="M15.4 9.4L20 6l-1 5 1 5-4.6-3.4" /></>) },
  { id: "games", icon: (<><rect x="2.5" y="7.5" width="19" height="10" rx="5" /><path d="M7 10.5v4M5 12.5h4" /><circle cx="16" cy="11.6" r=".9" /><circle cx="18" cy="13.8" r=".9" /></>) },
];

type Props = { active: CatId; onPick: (c: CatId) => void };

export default function CategoryRail({ active, onPick }: Props) {
  const { t } = useI18n();
  return (
    <nav className="rail" aria-label={t("categories")}>
      {CATS.map((c) => (
        <button key={c.id} type="button" aria-pressed={c.id === active} onClick={() => onPick(c.id)}>
          <svg viewBox="0 0 24 24" aria-hidden="true">{c.icon}</svg>
          <span>{t(c.id as Key)}</span>
        </button>
      ))}
    </nav>
  );
}
