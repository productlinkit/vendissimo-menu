import type { ReactNode } from "react";
import { useI18n } from "../i18n";
import type { CategoryId, Route } from "../types";
import { Icon } from "./Icon";
import { LangSwitch } from "./LangSwitch";
import { PointsCounter } from "./PointsCounter";

type NavItem = { id: Route; label: string; icon: ReactNode };

/** Bar atas desktop: sama isinya dengan dock HP. Beranda kini peta
 *  karnaval (dulu halaman Rewards), jadi Rewards diganti Explore yang
 *  berisi beranda lama dengan kelima kategori. */
const NAV_ITEMS: NavItem[] = [
  {
    id: `home`,
    label: `Home`,
    icon: Icon.home,
  },
  {
    id: `games`,
    label: `Games`,
    icon: Icon.game,
  },
  {
    id: `videos`,
    label: `Videos`,
    icon: Icon.video,
  },
  {
    id: `explore`,
    label: `Explore`,
    icon: Icon.explore,
  },
  {
    id: `profile`,
    label: `Profile`,
    icon: Icon.user,
  },
];

/** Dock HP: isinya sama dengan bar atas. */
const DOCK_ITEMS: NavItem[] = [
  {
    id: `home`,
    label: `Home`,
    icon: Icon.home,
  },
  {
    id: `games`,
    label: `Games`,
    icon: Icon.game,
  },
  {
    id: `videos`,
    label: `Videos`,
    icon: Icon.video,
  },
  {
    id: `explore`,
    label: `Explore`,
    icon: Icon.explore,
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
  // Games dan Videos punya butirnya sendiri; kategori lain tidak
  // menyalakan apa pun, karena asalnya dari kartu di beranda
  const activeId =
    NAV_ITEMS.find((item) => route === item.id)?.id ??
    (isCategoryRoute(route) ? undefined : `home`);
  // dock punya daftarnya sendiri: Games dan Videos adalah halaman betulan di
  // sini, jadi keduanya bisa jadi aktif tanpa lewat Explore
  const activeDockId =
    DOCK_ITEMS.find((item) => route === item.id)?.id ??
    (isCategoryRoute(route) ? undefined : `home`);
  return (
    <>
      <header
        style={{
          position: `sticky`,
          top: 0,
          zIndex: 20,
          // kaca putih dulu dipakai untuk melunakkan gradien terang;
          // di latar gelap ia justru jadi kabut abu-abu
          background: `rgba(20,10,36,.72)`,
          backdropFilter: `blur(18px) saturate(1.3)`,
          WebkitBackdropFilter: `blur(18px) saturate(1.3)`,
          borderBottom: `1px solid var(--card-border)`,
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
              // dipaku ke kolom terakhir: tanpa ini, nav tengah yang
              // display:none di HP membuat kelompok ini naik ke kolom 2
              gridColumn: 3,
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
          {DOCK_ITEMS.map((item) => {
            const active = activeDockId === item.id;
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
