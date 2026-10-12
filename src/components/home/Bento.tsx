import type { ReactNode } from "react";
import { CATEGORIES, MISSIONS, REWARDS } from "../../data";
import { useI18n } from "../../i18n";
import type { CategoryId, Progress, Route } from "../../types";
import { categoryArt } from "./tileArt";

// Desktop/landscape home: one screen of picture tiles, in the style of an
// in-flight entertainment menu. Phones keep the scrolling home instead.

function Tile({
  className,
  title,
  sub,
  art,
  onClick,
}: {
  className: string;
  title: string;
  sub?: string;
  art: ReactNode;
  onClick: () => void;
}) {
  return (
    <button type="button" className={`vp-tile ${className}`} onClick={onClick}>
      <span className="vp-tile-art" aria-hidden="true">
        {art}
      </span>
      <span className="vp-tile-text">
        <span className="vp-tile-title">{title}</span>
        {sub && <span className="vp-tile-sub">{sub}</span>}
      </span>
    </button>
  );
}

export function Bento({
  S,
  spinUsed,
  onNavigate,
  onScrollTo,
}: {
  S: Progress;
  spinUsed: boolean;
  onNavigate: (route: Route) => void;
  onScrollTo: (id: string) => void;
}) {
  const { t } = useI18n();
  const category = (id: CategoryId) => CATEGORIES.find((c) => c.id === id)!;
  const tileProps = (id: CategoryId) => ({
    title: t(category(id).label),
    sub: t(category(id).sub),
    onClick: () => onNavigate(id),
  });
  const nextReward = REWARDS.find((reward) => S.pts < reward.pts);
  const missionsDone = MISSIONS.filter((m) => S.awarded.includes(m.key)).length;

  return (
    <section className="vp-bento" aria-label={t(`Categories`)}>
      <Tile
        className="vp-tile-games"
        {...tileProps(`games`)}
        art={categoryArt(`games`, `mosaic`)}
      />
      <Tile
        className="vp-tile-videos"
        {...tileProps(`videos`)}
        art={categoryArt(`videos`, `strip`)}
      />
      <Tile
        className="vp-tile-mags"
        {...tileProps(`magazines`)}
        art={categoryArt(`magazines`, `strip`)}
      />
      <Tile
        className="vp-tile-edu"
        {...tileProps(`education`)}
        art={categoryArt(`education`, `strip`)}
      />
      <Tile
        className="vp-tile-eng"
        {...tileProps(`english`)}
        art={categoryArt(`english`, `strip`)}
      />
      <div className="vp-bento-side">
        <Tile
          className="vp-tile-small vp-tile-points"
          title={t(`{n} pts`, { n: S.pts })}
          sub={
            nextReward
              ? t(`{n} more pts for a {reward}`, {
                  n: nextReward.pts - S.pts,
                  reward: t(nextReward.label),
                })
              : t(`🎉 All rewards unlocked!`)
          }
          art={<img src="/img/rewards-photo.webp" alt="" loading="lazy" />}
          onClick={() => onNavigate(`rewards`)}
        />
        <Tile
          className="vp-tile-small vp-tile-spin"
          title={t(`Daily Spin`)}
          sub={
            spinUsed ? t(`Come back tomorrow`) : t(`One free spin every day.`)
          }
          art={<img src="/img/spin-photo.webp" alt="" loading="lazy" />}
          onClick={() => onScrollTo(`home-spin`)}
        />
        <Tile
          className="vp-tile-small vp-tile-missions"
          title={t(`Today's Missions`)}
          sub={t(`{done} of {total} done`, {
            done: missionsDone,
            total: MISSIONS.length,
          })}
          art={
            <>
              <img src="/img/missions-photo.webp" alt="" />
              <span className="vp-mini-count">{`${missionsDone}/${MISSIONS.length}`}</span>
            </>
          }
          onClick={() => onScrollTo(`home-missions`)}
        />
        <Tile
          className="vp-tile-small vp-tile-about"
          title={t(`Discover`)}
          sub={t(`About Vendissimo machines`)}
          art={<img src="/img/about-shop.webp" alt="" />}
          onClick={() => onNavigate(`profile`)}
        />
      </div>
    </section>
  );
}
