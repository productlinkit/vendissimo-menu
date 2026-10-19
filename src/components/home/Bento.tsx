import type { ReactNode } from "react";
import { CATEGORIES, REWARDS } from "../../data";
import { levelOf } from "../../lib/levels";
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
  onNavigate,
}: {
  S: Progress;
  onNavigate: (route: Route) => void;
}) {
  const { t } = useI18n();
  const category = (id: CategoryId) => CATEGORIES.find((c) => c.id === id)!;
  const tileProps = (id: CategoryId) => ({
    title: t(category(id).label),
    sub: t(category(id).sub),
    onClick: () => onNavigate(id),
  });
  const nextReward = REWARDS.find((reward) => S.pts < reward.pts);
  const level = levelOf(S.exp);

  return (
    <section className="vp-bento" aria-label={t(`Categories`)}>
      <Tile
        className="vp-tile-games"
        {...tileProps(`games`)}
        art={categoryArt(`games`)}
      />
      <Tile
        className="vp-tile-videos"
        {...tileProps(`videos`)}
        art={categoryArt(`videos`)}
      />
      <Tile
        className="vp-tile-mags"
        {...tileProps(`magazines`)}
        art={categoryArt(`magazines`)}
      />
      <Tile
        className="vp-tile-edu"
        {...tileProps(`education`)}
        art={categoryArt(`education`)}
      />
      <Tile
        className="vp-tile-eng"
        {...tileProps(`english`)}
        art={categoryArt(`english`)}
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
          art={<img src="/img/tile-rewards.webp" alt="" loading="lazy" />}
          onClick={() => onNavigate(`rewards`)}
        />
        <Tile
          className="vp-tile-small vp-tile-spin"
          title={t(`Level {n}`, { n: level.n })}
          sub={t(`{n} EXP · see your prize`, { n: S.exp })}
          art={<img src="/img/tile-level.webp" alt="" loading="lazy" />}
          onClick={() => onNavigate(`rewards`)}
        />
        <Tile
          className="vp-tile-small vp-tile-about"
          title={t(`Discover`)}
          sub={t(`About Vendissimo machines`)}
          art={<img src="/img/tile-discover.webp" alt="" />}
          onClick={() => onNavigate(`profile`)}
        />
      </div>
    </section>
  );
}
