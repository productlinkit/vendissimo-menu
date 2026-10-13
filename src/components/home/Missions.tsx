import { Icon } from "../Icon";
import { MISSIONS } from "../../data";
import { useI18n } from "../../i18n";
import type { Route } from "../../types";

export function Missions({
  awarded,
  onNavigate,
}: {
  awarded: string[];
  onNavigate: (route: Route) => void;
}) {
  const { t } = useI18n();
  const completed = MISSIONS.map((mission) => awarded.includes(mission.key));
  const doneCount = completed.filter(Boolean).length;
  const progressPercent = (doneCount / 3) * 100;
  return (
    <section
      style={{
        border: `1px solid var(--line)`,
        background: `var(--card)`,
        borderRadius: `var(--r-md)`,
        padding: `18px 16px 16px`,
        width: `100%`,
        boxSizing: `border-box`,
      }}
    >
      <div
        style={{
          display: `flex`,
          alignItems: `center`,
          justifyContent: `space-between`,
          marginBottom: 10,
        }}
      >
        <h2 className="vp-eyebrow">
          {t(`Today's Missions`)}
        </h2>
        <span
          className={`vp-chip ${doneCount === 3 ? `vp-chip-good` : `vp-chip-count`}`}
        >
          {doneCount}/3
        </span>
      </div>
      <div
        style={{
          height: 4,
          borderRadius: 99,
          background: `rgba(255,255,255,.08)`,
          marginBottom: 16,
          overflow: `hidden`,
        }}
      >
        <div
          style={{
            width: `${progressPercent}%`,
            height: `100%`,
            background: `var(--pink)`,
            borderRadius: `inherit`,
            transition: `width .6s cubic-bezier(.22,1,.36,1)`,
          }}
        />
      </div>
      <div
        style={{
          display: `grid`,
          gap: 14,
        }}
      >
        {MISSIONS.map((mission, index) => {
          const isDone = completed[index];
          return (
            <div
              key={mission.key}
              style={{
                display: `flex`,
                alignItems: `center`,
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: `50%`,
                  background: isDone ? `var(--good)` : `rgba(255,255,255,.1)`,
                  border: isDone ? `none` : `1px solid rgba(255,255,255,.2)`,
                  display: `grid`,
                  placeItems: `center`,
                  flexShrink: 0,
                }}
              >
                {isDone ? (
                  <span
                    style={{
                      width: 16,
                      height: 16,
                      color: `#fff`,
                    }}
                  >
                    {Icon.check}
                  </span>
                ) : (
                  <span
                    style={{
                      fontFamily: `var(--f-display)`,
                      fontWeight: 900,
                      fontSize: 14,
                      color: `var(--ink-3)`,
                    }}
                  >
                    {index + 1}
                  </span>
                )}
              </div>
              <span
                style={{
                  flex: 1,
                  color: isDone ? `var(--ink-3)` : `var(--ink)`,
                  textDecoration: isDone ? `line-through` : `none`,
                  fontSize: 15,
                  lineHeight: 1.35,
                }}
              >
                {t(mission.label)}
              </span>
              {isDone ? (
                <span className="vp-chip vp-chip-good">
                  {t(`Done`)}
                </span>
              ) : (
                <button
                  onClick={() => onNavigate(mission.route)}
                  aria-label={t(`Go — {mission}`, {
                    mission: t(mission.label),
                  })}
                  style={{
                    flexShrink: 0,
                    border: `1px solid var(--line-2)`,
                    borderRadius: 999,
                    padding: `5px 16px`,
                    fontSize: 14,
                    fontWeight: 600,
                    color: `var(--ink)`,
                    background: `rgba(255,255,255,.07)`,
                    cursor: `pointer`,
                  }}
                >
                  {t(`Go`)}
                </button>
              )}
            </div>
          );
        })}
      </div>
      <p
        style={{
          color: `var(--ink-3)`,
          fontSize: 14,
          marginTop: 14,
        }}
      >
        {t(`Complete all 3 for a +25 pts bonus`)}
      </p>
    </section>
  );
}
