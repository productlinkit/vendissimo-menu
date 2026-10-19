import { useEffect } from "react";
import { GAME_MIN_SECONDS } from "../../lib/pointsService";
import { useI18n } from "../../i18n";
import { Icon } from "../Icon";
import type { Game } from "../../types";

export function GamePlayer({
  game,
  onClose,
  onFinish,
}: {
  game: Game;
  onClose: () => void;
  onFinish: () => void;
}) {
  const { t } = useI18n();
  // The games are third-party iframes on another origin, so there is no
  // game-over message to listen for. Time played is the only signal we get.
  useEffect(() => {
    const id = window.setTimeout(onFinish, GAME_MIN_SECONDS * 1000);
    return () => window.clearTimeout(id);
  }, [onFinish]);
  return (
    <div
      style={{
        position: `fixed`,
        inset: 0,
        zIndex: 80,
        background: `#000`,
        display: `flex`,
        flexDirection: `column`,
      }}
    >
      <div
        style={{
          position: `absolute`,
          top: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          display: `flex`,
          alignItems: `center`,
          gap: 12,
          padding: `calc(env(safe-area-inset-top,0px) + 10px) 14px 22px`,
          // kerudung memudar, bukan bidang pekat: bagian atas game tetap
          // terlihat di baliknya
          background: `linear-gradient(to bottom, rgba(18,8,32,.92), rgba(18,8,32,0))`,
          pointerEvents: `none`,
        }}
        className="vp-game-bar"
      >
        <button
          onClick={onClose}
          aria-label={t("Close")}
          style={{
            width: 44,
            height: 44,
            borderRadius: `50%`,
            background: `rgba(18,8,32,.72)`,
            border: `1px solid rgba(255,255,255,.22)`,
            display: `grid`,
            placeItems: `center`,
            color: `#fff`,
            flexShrink: 0,
            // induknya pointerEvents:none supaya game di baliknya tetap
            // bisa disentuh; tombolnya sendiri harus tetap bisa diklik
            pointerEvents: `auto`,
          }}
        >
          <span
            style={{
              width: 18,
              height: 18,
            }}
          >
            {Icon.close}
          </span>
        </button>
        {/* judul dan poin menutupi UI game itu sendiri, jadi ia menyingkir
            sendiri setelah beberapa detik; tombol tutup tetap tinggal */}
        <div
          className="vp-game-meta"
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <div
            style={{
              fontWeight: 600,
              fontSize: 15,
              whiteSpace: `nowrap`,
              overflow: `hidden`,
              textOverflow: `ellipsis`,
            }}
          >
            {game.t}
          </div>
          <div
            style={{
              fontFamily: `var(--f-mono)`,
              fontSize: 12,
              color: `#fff`,
              fontWeight: 700,
            }}
          >
            {t("+{n} pts on first play", { n: game.pts })}
          </div>
        </div>
      </div>
      <iframe
        src={game.url}
        title={game.t}
        style={{
          position: `absolute`,
          inset: 0,
          border: 0,
          width: `100%`,
          height: `100%`,
        }}
        allow="accelerometer; gyroscope; fullscreen"
      />
    </div>
  );
}
