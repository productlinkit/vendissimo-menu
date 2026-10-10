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
          style={{
            maxWidth: 1120,
            margin: `0 auto`,
            padding: `0 var(--px)`,
            display: `flex`,
            alignItems: `center`,
            gap: 12,
            height: 60,
          }}
        >
          <img
            src="/img/vendissimo-logo.png"
            alt="Vendissimo"
            style={{
              height: 26,
              width: `auto`,
              flexShrink: 0,
              filter: `drop-shadow(0 0 10px rgba(255,255,255,.3))`,
            }}
          />
          <nav
            className="vp-top-nav"
            style={{
              gap: 4,
              margin: `0 auto`,
            }}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                style={{
                  background:
                    activeId === item.id ? `rgba(255,255,255,0.22)` : `none`,
                  padding: `8px 16px`,
                  borderRadius: 999,
                  fontWeight: 600,
                  color: `#FFFFFF`,
                  opacity: activeId === item.id ? 1 : 0.8,
                  transition: `all .15s`,
                }}
              >
                {t(item.label)}
              </button>
            ))}
          </nav>
          <div
            style={{
              marginLeft: `auto`,
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
      <div className="vp-dock">
        <div
          style={{
            display: `flex`,
            alignItems: `center`,
            justifyContent: `space-around`,
            padding: `6px 8px`,
            borderRadius: 999,
            background: `rgba(255,255,255,0.2)`,
            backdropFilter: `blur(20px) saturate(1.4)`,
            WebkitBackdropFilter: `blur(20px) saturate(1.4)`,
            border: `1px solid rgba(255,255,255,0.35)`,
            boxShadow: `0 16px 40px -8px rgba(0,0,0,0.35)`,
          }}
        >
          {NAV_ITEMS.map((item) => {
            const active = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                style={{
                  display: `flex`,
                  alignItems: `center`,
                  gap: active ? 8 : 0,
                  height: 50,
                  // slim enough that the longest label ("ဆုလက်ဆောင်") still fits on a 360px phone
                  padding: active ? `0 14px` : `0 11px`,
                  borderRadius: 999,
                  background: active ? `#FFFFFF` : `none`,
                  color: active ? `#E72385` : `rgba(255,255,255,.85)`,
                  boxShadow: active
                    ? `0 6px 20px -4px rgba(0,0,0,.25)`
                    : `none`,
                  transition: `all .28s cubic-bezier(.3,1.1,.5,1)`,
                  overflow: `hidden`,
                  flex: active ? `1 1 auto` : `0 0 auto`,
                  justifyContent: `center`,
                  maxWidth: active ? 160 : 60,
                }}
              >
                <span
                  style={{
                    width: 24,
                    height: 24,
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </span>
                {active && (
                  <span
                    style={{
                      whiteSpace: `nowrap`,
                      fontFamily: `var(--f-display)`,
                      fontWeight: 900,
                      fontSize: 15,
                    }}
                  >
                    {t(item.label)}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
