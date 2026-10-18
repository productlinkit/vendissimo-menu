import { CATEGORIES } from "../data";
import { useI18n } from "../i18n";
import type { Category, Route } from "../types";
import { categoryArt } from "./home/tileArt";

// Mosaik kategori yang dipakai bersama oleh beranda dan halaman Explore.
// Satu tempat, supaya keduanya tidak pelan-pelan jadi berbeda.

function CategoryTile({
  c,
  onNavigate,
}: {
  c: Category;
  onNavigate: (route: Route) => void;
}) {
  const { t } = useI18n();
  return (
    <button
      type="button"
      onClick={() => onNavigate(c.id)}
      className={`vp-tile vp-cat-tile is-${c.id}`}
    >
      <span className="vp-tile-art" aria-hidden="true">
        {categoryArt(c.id)}
      </span>
      <span className="vp-tile-text">
        <span className="vp-tile-title">{t(c.label)}</span>
        <span className="vp-tile-sub">{t(c.sub)}</span>
      </span>
    </button>
  );
}

export function CategoryTiles({
  onNavigate,
  variant,
}: {
  onNavigate: (route: Route) => void;
  /** `explore` memberi ubin yang lebih tinggi dan tiga kolom di layar lebar */
  variant?: `explore`;
}) {
  return (
    <div className={`vp-cat-grid${variant ? ` is-${variant}` : ``}`}>
      {CATEGORIES.map((category) => (
        <CategoryTile
          key={category.id}
          c={category}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}
