import { useI18n } from "../../i18n";
import { Icon } from "../Icon";
import type { Game } from "../../types";

export function GamePlayer({
  game,
  onClose,
}: {
  game: Game;
  onClose: () => void;
}) {
  const { t } = useI18n();
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
          display: `flex`,
          alignItems: `center`,
          gap: 12,
          padding: `10px 14px`,
          background: `rgba(30,4,55,.9)`,
          flexShrink: 0,
        }}
      >
        <button
          onClick={onClose}
          aria-label={t("Close")}
          style={{
            width: 36,
            height: 36,
            borderRadius: `50%`,
            background: `rgba(255,255,255,.1)`,
            display: `grid`,
            placeItems: `center`,
            color: `#fff`,
            flexShrink: 0,
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
        <div
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
          flex: 1,
          border: 0,
          width: `100%`,
        }}
        allow="accelerometer; gyroscope; fullscreen"
      />
    </div>
  );
}
