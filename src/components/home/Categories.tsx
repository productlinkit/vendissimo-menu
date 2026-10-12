import { useI18n } from "../../i18n";
import type { Route } from "../../types";
import { CategoryTiles } from "../CategoryTiles";

export function Categories({
  onNavigate,
}: {
  onNavigate: (route: Route) => void;
}) {
  const { t } = useI18n();
  return (
    <section>
      <div
        style={{
          marginBottom: 14,
        }}
      >
        <h2 className="vp-eyebrow">
          {t(`Categories`)}
        </h2>
      </div>
      <CategoryTiles onNavigate={onNavigate} />
    </section>
  );
}
