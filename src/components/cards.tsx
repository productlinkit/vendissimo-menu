import { Icon } from "./Icon";
import { useI18n } from "../i18n";
import { formatTime } from "../lib/format";
import { usePress } from "../lib/usePress";
import type { Course, Game, Magazine, Video } from "../types";

export function MagCover({ mag }: { mag: Magazine }) {
  const { t } = useI18n();
  return mag.img ? (
    <img
      src={mag.img}
      alt={mag.t}
      style={{
        position: `absolute`,
        inset: 0,
        width: `100%`,
        height: `100%`,
        objectFit: `cover`,
      }}
    />
  ) : (
    <div
      style={{
        background: mag.c1,
        position: `absolute`,
        inset: 0,
        padding: 12,
        display: `flex`,
        flexDirection: `column`,
        justifyContent: `space-between`,
        color: `#fff`,
        overflow: `hidden`,
      }}
    >
      <div
        style={{
          position: `absolute`,
          right: `-18%`,
          bottom: `14%`,
          width: `80%`,
          aspectRatio: `1`,
          borderRadius: `50%`,
          background: mag.c2,
          opacity: 0.35,
        }}
      />
      <div
        style={{
          fontFamily: `var(--f-display)`,
          fontWeight: 900,
          fontSize: 26,
          lineHeight: 0.9,
          letterSpacing: `-.02em`,
          textTransform: `uppercase`,
          position: `relative`,
        }}
      >
        {mag.t}
      </div>
      <div
        style={{
          position: `relative`,
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            maxWidth: `14ch`,
            lineHeight: 1.25,
            marginBottom: 6,
          }}
        >
          {t(mag.line)}
        </div>
        <div
          style={{
            display: `flex`,
            justifyContent: `space-between`,
            fontFamily: `var(--f-mono)`,
            fontSize: 12,
            opacity: 0.9,
          }}
        >
          <span>{t(mag.cat)}</span>
          <span>{t(mag.mo)}</span>
        </div>
      </div>
    </div>
  );
}

export function MagCard({
  mag,
  onClick,
}: {
  mag: Magazine;
  onClick: () => void;
}) {
  const { t } = useI18n();
  return (
    <button onClick={onClick} className="vp-cover">
      <span
        className="vp-cover-art"
        style={{
          background: mag.c1,
        }}
      >
        <MagCover mag={mag} />
      </span>
      <span className="vp-cover-meta">
        <b className="vp-cover-title">{mag.t}</b>
        <small className="vp-cover-sub">
          {t(mag.cat)}
          {" · "}
          {t(mag.mo)}
        </small>
      </span>
    </button>
  );
}

export function VideoCard({
  video,
  onClick,
}: {
  video: Video;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="vp-vcard">
      <span className="vp-vthumb">
        <img src={video.img} alt="" loading="lazy" />
        <span className="vp-play">
          <span
            style={{
              width: 18,
              height: 18,
            }}
          >
            {Icon.play}
          </span>
        </span>
        <span className="vp-dur">{formatTime(video.dur)}</span>
      </span>
      <span className="vp-cover-meta">
        <b className="vp-cover-title">{video.t}</b>
        <small className="vp-cover-sub">{video.a}</small>
      </span>
    </button>
  );
}

export function GameCard({
  game,
  onClick,
}: {
  game: Game;
  onClick: () => void;
}) {
  const { t } = useI18n();
  const { ref, bind } = usePress<HTMLButtonElement>();
  return (
    <button
      ref={ref}
      onClick={onClick}
      {...bind}
      className="vp-card vp-game-card"
    >
      {/* ikon game itu persegi; bingkai persegi supaya judul di gambarnya
          tidak terpotong, dan tidak ada tombol yang menutupinya */}
      <div className="vp-thumb sq">
        <img src={game.img} alt="" loading="lazy" />
        <span className="vp-badge">{t(game.cat)}</span>
      </div>
      <div className="vp-card-body">
        <b>{game.t}</b>
        <div className="vp-card-foot">
          <em>{t("+{n} pts", { n: game.pts })}</em>
          <span className="vp-game-go">
            <span aria-hidden="true">{Icon.play}</span>
            {t("Play")}
          </span>
        </div>
      </div>
    </button>
  );
}

export function CourseCard({
  course,
  onClick,
  ptsLabel,
}: {
  // English sets are shown as courses too, so the description is optional
  course: Pick<Course, "t" | "cat" | "img" | "lvl">;
  onClick: () => void;
  ptsLabel: string;
}) {
  const { t } = useI18n();
  const { ref, bind } = usePress<HTMLButtonElement>();
  return (
    <button
      ref={ref}
      onClick={onClick}
      {...bind}
      className="vp-card vp-edu-card"
    >
      <div className="vp-thumb edu-img">
        <img src={course.img} alt="" loading="lazy" />
        <span className="vp-badge">{t(course.cat)}</span>
      </div>
      <div className="vp-card-body">
        <b>{t(course.t)}</b>
        <div className="vp-card-foot">
          <span>{t(course.lvl)}</span>
          <em>{ptsLabel}</em>
        </div>
      </div>
    </button>
  );
}
