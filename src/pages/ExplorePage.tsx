import { CategoryTiles } from "../components/CategoryTiles";
import { useI18n } from "../i18n";
import type { Route } from "../types";

export function ExplorePage({
  onNavigate,
}: {
  onNavigate: (route: Route) => void;
}) {
  const { t } = useI18n();
  return (
    <div className="vp-view page-enter">
      <div>
        <h1
          style={{
            fontSize: `clamp(26px,6vw,42px)`,
          }}
        >
          {t("Explore")}
        </h1>
        <p
          style={{
            color: `var(--ink-2)`,
            marginTop: 6,
            fontSize: 19,
            fontWeight: 700,
            lineHeight: 1.35,
          }}
        >
          {t("Read, watch, play and learn while you wait")}
        </p>
      </div>
      <CategoryTiles onNavigate={onNavigate} variant="explore" />
    </div>
  );
}
