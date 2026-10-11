import type { ReactNode } from "react";
import { useI18n } from "../i18n";
import type { CategoryId, Route } from "../types";
import { Icon } from "./Icon";
import { LangSwitch } from "./LangSwitch";
import { PointsCounter } from "./PointsCounter";

const NAV_ITEMS: { id: Route; label: string; icon: ReactNode }[] = [
  {
    id: `home`,
    label: `Home`,
    icon: Icon.home,
  },
  {
    id: `explore`,
    label: `Explore`,
    icon: Icon.explore,
  },
  {
    id: `rewards`,
    label: `Rewards`,
    icon: Icon.gift,
  },
  {
    id: `profile`,
    label: `Profile`,
    icon: Icon.user,
  },
];

export const CATEGORY_ROUTES: CategoryId[] = [
  `magazines`,
  `videos`,
  `games`,
  `education`,
  `english`,
];

export function isCategoryRoute(route: Route): route is CategoryId {
  return (CATEGORY_ROUTES as Route[]).includes(route);
}

export function TopNav({
  route,
  onNavigate,
  pts,
}: {
  route: Route;
  onNavigate: (route: Route) => void;
  pts: number;
}) {
  const { t } = useI18n();
  const activeId =
    NAV_ITEMS.find(
      (item) =>
        route === item.id || (item.id === `explore` && isCategoryRoute(route)),
    )?.id ?? `home`;
  return (
    <>
      <header
        style={{
          position: `sticky`,
          top: 0,
          zIndex: 20,
          background: `rgba(255,255,255,0.1)`,
          backdropFilter: `blur(16px)`,
          WebkitBackdropFilter: `blur(16px)`,
          borderBottom: `1px solid rgba(255,255,255,0.2)`,
        }}
      >
        <div
          className="vp-header-inner"
          style={{
            maxWidth: 1120,
            margin: `0 auto`,
            padding: `0 var(--px)`,
            display: `grid`,
            gridTemplateColumns: `1fr auto 1fr`,
            alignItems: `center`,
            gap: 12,
            height: 60,
          }}
        >
          <img
            src="/img/vendissimo-logo.webp"
            alt="Vendissimo"
            style={{
              height: 26,
              width: `auto`,
              flexShrink: 0,
              justifySelf: `start`,
              filter: `drop-shadow(0 0 10px rgba(255,255,255,.3))`,
            }}
          />
          <nav className="vp-top-nav">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`vp-top-link${activeId === item.id ? ` is-on` : ``}`}
                aria-current={activeId === item.id ? `page` : undefined}
                onClick={() => onNavigate(item.id)}
              >
                {t(item.label)}
              </button>
            ))}
          </nav>
          <div
            style={{
              justifySelf: `end`,
              flexShrink: 0,
              display: `flex`,
              alignItems: `center`,
              gap: 8,
            }}
          >
            <LangSwitch />
            <div className="vp-pts-pill">
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: `50%`,
                  background: `var(--orange)`,
                  boxShadow: `0 0 8px var(--orange)`,
                  flexShrink: 0,
                }}
              />
              <PointsCounter pts={pts} />
              <span
                style={{
                  fontFamily: `var(--f-mono)`,
                  fontSize: 13,
                  color: `var(--ink-3)`,
                }}
              >
                {t(`pts`)}
              </span>
            </div>
          </div>
        </div>
      </header>
      <nav className="vp-dock" aria-label={t(`Main`)}>
        <div className="vp-dock-bar">
          {NAV_ITEMS.map((item) => {
            const active = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`vp-dock-link${active ? ` is-on` : ``}`}
                aria-current={active ? `page` : undefined}
                onClick={() => onNavigate(item.id)}
              >
                <span className="vp-dock-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="vp-dock-label">{t(item.label)}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
