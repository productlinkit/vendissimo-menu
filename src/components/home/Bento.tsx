import type { ReactNode } from "react";
import {
  CATEGORIES,
  GAMES,
  MAGAZINES,
  MISSIONS,
  REWARDS,
  VIDEOS,
} from "../../data";
import { useI18n } from "../../i18n";
import type { CategoryId, Progress, Route } from "../../types";

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

/** Four images in a 2x2 block — for the tall tiles, where a row of
 *  side-by-side pictures would leave each one a narrow sliver. */
function Mosaic({ images }: { images: string[] }) {
  return (
    <span className="vp-tile-mosaic">
      {images.map((src) => (
        <img key={src} src={src} alt="" loading="lazy" />
      ))}
    </span>
  );
}

/** Several images side by side, each cropped to fill its slot. */
function Strip({ images }: { images: string[] }) {
  return (
    <span className="vp-tile-strip">
      {images.map((src) => (
        <img key={src} src={src} alt="" loading="lazy" />
      ))}
    </span>
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
        art={<Mosaic images={GAMES.slice(0, 4).map((game) => game.img)} />}
      />
      <Tile
        className="vp-tile-videos"
        {...tileProps(`videos`)}
        art={<Strip images={VIDEOS.slice(0, 4).map((v) => v.img)} />}
      />
      <Tile
        className="vp-tile-mags"
        {...tileProps(`magazines`)}
        art={<Strip images={MAGAZINES.slice(0, 4).map((m) => m.img)} />}
      />
      <Tile
        className="vp-tile-edu"
        {...tileProps(`education`)}
        art={
          <Strip
            images={[
              `/img/edu-video-course.webp`,
              `/img/edu-tutor.webp`,
              `/img/edu-movie.webp`,
            ]}
          />
        }
      />
      <Tile
        className="vp-tile-eng"
        {...tileProps(`english`)}
        art={<img src="/img/eng-trio.webp" alt="" loading="lazy" />}
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
