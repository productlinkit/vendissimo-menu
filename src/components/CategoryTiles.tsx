import { CATEGORIES } from "../data";
import { useI18n } from "../i18n";
import type { Category, Route } from "../types";
import { categoryArt } from "./home/tileArt";

// Mosaik kategori yang dipakai bersama oleh beranda dan halaman Explore.
// Satu tempat, supaya keduanya tidak pelan-pelan jadi berbeda.

type CategoryTileProps = {
  c: Category;
  wide?: boolean;
  onNavigate: (route: Route) => void;
};

function CategoryTile({ c, wide, onNavigate }: CategoryTileProps) {
  const { t } = useI18n();
  return (
    <button
      type="button"
      onClick={() => onNavigate(c.id)}
      className={`vp-tile vp-cat-tile${wide ? ` vp-cat-tile-wide` : ``}`}
    >
      <span className="vp-tile-art" aria-hidden="true">
        {categoryArt(c.id, wide ? `strip` : `mosaic`)}
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
  const gridCategories = CATEGORIES.filter(
    (category) => category.id !== `english`,
  );
  // English always exists in CATEGORIES and is rendered as the wide tile
  const englishCategory = CATEGORIES.find(
    (category) => category.id === `english`,
  )!;
  return (
    <div className={`vp-cat-grid${variant ? ` is-${variant}` : ``}`}>
      {gridCategories.map((category) => (
        <CategoryTile key={category.id} c={category} onNavigate={onNavigate} />
      ))}
      <CategoryTile c={englishCategory} wide onNavigate={onNavigate} />
    </div>
  );
}
