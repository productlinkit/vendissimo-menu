import { Icon } from "../components/Icon";
import { CourseCard, GameCard, MagCard, VideoCard } from "../components/cards";
import {
  CATEGORIES,
  COURSES,
  ENGLISH_SETS,
  GAMES,
  MAGAZINES,
  POINTS,
  VIDEOS,
} from "../data";
import { useI18n } from "../i18n";
import type { CategoryId } from "../types";

type MoreLink = { q: string; sub: string; btn: string; url: string };

const MORE_LINKS: Record<CategoryId, MoreLink> = {
  magazines: {
    q: `Want to read more magazines?`,
    sub: `Visit emagz.mobi for more titles and full issues.`,
    btn: `Visit emagz.mobi`,
    url: `https://emagz.mobi`,
  },
  videos: {
    q: `Want to watch more videos?`,
    sub: `Hundreds more book summary videos on BookSnap.`,
    btn: `Visit booksnap.ai`,
    url: `https://apps.booksnap.ai/en/video`,
  },
  games: {
    q: `Want to play more games?`,
    sub: `OmniPlay has 50+ games, tournaments and prizes.`,
    btn: `Visit omniplay.mobi`,
    url: `https://omniplay.mobi`,
  },
  education: {
    q: `Want to learn more?`,
    sub: `Full English courses and AI tutor on SpeakEasy.`,
    btn: `Visit speakeasy.mobi`,
    url: `https://apps.speakeasy.mobi`,
  },
  english: {
    q: `Want to learn more?`,
    sub: `Full English courses and AI tutor on SpeakEasy.`,
    btn: `Visit speakeasy.mobi`,
    url: `https://apps.speakeasy.mobi`,
  },
};

type CategoryPageProps = {
  catId: CategoryId;
  onBack: () => void;
  onMag: (idx: number) => void;
  onVideo: (idx: number) => void;
  onGame: (idx: number) => void;
  onEng: (idx: number, from?: `education`) => void;
};

export function CategoryPage({
  catId,
  onBack,
  onMag,
  onVideo,
  onGame,
  onEng,
}: CategoryPageProps) {
  const { t } = useI18n();
  // catId always names an entry in CATEGORIES
  const category = CATEGORIES.find(({ id }) => id === catId)!;
  const gridClass =
    catId === `magazines`
      ? `vp-grid covers`
      : catId === `videos`
        ? `vp-grid vgrid`
        : `vp-grid`;
  const more = MORE_LINKS[catId];
  return (
    <div className="vp-view page-enter">
      <button
        onClick={onBack}
        style={{
          display: `inline-flex`,
          alignItems: `center`,
          gap: 8,
          color: `var(--ink)`,
          fontWeight: 600,
          fontSize: 15,
        }}
      >
        <span
          style={{
            width: 18,
            height: 18,
          }}
        >
          {Icon.back}
        </span>
        {` ${t("Home")}`}
      </button>
      <div className="vp-cat-head">
        <img
          src={category.art}
          alt={t(category.label)}
          style={{
            width: 64,
            height: 64,
            objectFit: `contain`,
            flexShrink: 0,
          }}
        />
        <div>
          <h1
            style={{
              fontSize: `clamp(22px,4vw,36px)`,
            }}
          >
            {t(category.label)}
          </h1>
          <p
            style={{
              color: `var(--ink-2)`,
              marginTop: 4,
            }}
          >
            {t(category.sub)}
          </p>
        </div>
      </div>
      <div className={gridClass}>
        {catId === `magazines` &&
          MAGAZINES.map((mag, idx) => (
            <MagCard key={idx} mag={mag} onClick={() => onMag(idx)} />
          ))}
        {catId === `videos` &&
          VIDEOS.map((video, idx) => (
            <VideoCard key={idx} video={video} onClick={() => onVideo(idx)} />
          ))}
        {catId === `games` &&
          GAMES.map((game, idx) => (
            <GameCard key={idx} game={game} onClick={() => onGame(idx)} />
          ))}
        {catId === `education` &&
          COURSES.map((course, idx) => (
            <CourseCard
              key={idx}
              course={course}
              onClick={() => onEng(idx % ENGLISH_SETS.length, `education`)}
              ptsLabel={t("+{n} pts", { n: POINTS.lesson })}
            />
          ))}
        {catId === `english` &&
          ENGLISH_SETS.map((set, idx) => (
            <CourseCard
              key={idx}
              course={{
                t: set.t,
                cat: `English`,
                img: set.img,
                lvl: set.lvl,
              }}
              onClick={() => onEng(idx)}
              ptsLabel={t("+{n} pts", { n: POINTS.english })}
            />
          ))}
      </div>
      {more && (
        <a
          href={more.url}
          target="_blank"
          rel="noopener noreferrer"
          className="vp-on-dark"
          style={{
            display: `flex`,
            alignItems: `center`,
            gap: 14,
            padding: `16px 18px`,
            background: `var(--card)`,
            borderRadius: `var(--r-lg)`,
            textDecoration: `none`,
            // gaya inline mengalahkan kelas, jadi `inherit` di sini membuat
            // teksnya ikut tinta halaman yang gelap di atas kartu gelap
            color: `var(--ink-on-dark)`,
            transition: `border-color .15s`,
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.borderColor = `rgba(235,52,124,.5)`;
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.borderColor = ``;
          }}
        >
          <span
            style={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <b
              style={{
                display: `block`,
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              {t(more.q)}
            </b>
            <small
              style={{
                font: `500 13px/1.45 var(--f-mono)`,
                color: `var(--ink-3)`,
              }}
            >
              {t(more.sub)}
            </small>
          </span>
          <span
            style={{
              background: `#FFFFFF`,
              color: `var(--pink-on-white)`,
              borderRadius: 999,
              padding: `8px 14px`,
              fontFamily: `var(--f-display)`,
              fontWeight: 900,
              fontSize: 14,
              letterSpacing: `.04em`,
              textTransform: `uppercase`,
              whiteSpace: `nowrap`,
              flexShrink: 0,
              boxShadow: `0 4px 12px rgba(0,0,0,.15)`,
            }}
          >
            {t(more.btn)}
          </span>
        </a>
      )}
    </div>
  );
}
