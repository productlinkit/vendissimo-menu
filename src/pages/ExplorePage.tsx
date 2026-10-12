import { Icon } from "../components/Icon";
import { CATEGORIES } from "../data";
import { useI18n } from "../i18n";
import type { Category, Route } from "../types";

function ExploreCard({
  category,
  onNavigate,
}: {
  category: Category;
  onNavigate: (route: Route) => void;
}) {
  const { t } = useI18n();
  return (
    <button onClick={() => onNavigate(category.id)} className="vp-ex-card">
      <img className="vp-ex-art" src={category.art} alt="" />
      <span className="vp-ex-t">
        <b>{t(category.label)}</b>
        <small>{t(category.sub)}</small>
      </span>
      <span
        style={{
          width: 18,
          height: 18,
          color: `var(--ink-3)`,
          flexShrink: 0,
        }}
      >
        {Icon.chev}
      </span>
    </button>
  );
}

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
      <div
        style={{
          display: `grid`,
          gap: 12,
        }}
      >
        {CATEGORIES.map((category) => (
          <ExploreCard
            key={category.id}
            category={category}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
}
