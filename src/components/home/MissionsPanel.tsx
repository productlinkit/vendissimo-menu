import { MISSIONS } from "../../data";
import { useI18n } from "../../i18n";
import type { Route } from "../../types";
import { Icon } from "../Icon";

// Category art shown at the end of each mission row.
const ROUTE_ART: Partial<Record<Route, string>> = {
  games: `/img/cat-games.webp`,
  magazines: `/img/cat-magazines.webp`,
  english: `/img/cat-english.webp`,
};

/** Desktop version of Today's Missions: photo on the left, one row per mission on the right. */
export function MissionsPanel({
  awarded,
  onNavigate,
}: {
  awarded: string[];
  onNavigate: (route: Route) => void;
}) {
  const { t } = useI18n();
  const done = MISSIONS.filter((mission) =>
    awarded.includes(mission.key),
  ).length;
  return (
    <section className="vp-missions-panel">
      <div className="vp-missions-photo">
        <img src="/img/missions-photo.webp" alt="" />
        <div className="vp-missions-photo-text">
          <h2>{t(`Today's Missions`)}</h2>
          <p>{t(`Complete all 3 for a +25 pts bonus`)}</p>
          <div
            className="vp-missions-progress"
            aria-label={t(`{done} of {total} done`, {
              done,
              total: MISSIONS.length,
            })}
          >
            <span style={{ width: `${(done / MISSIONS.length) * 100}%` }} />
          </div>
          <strong>{`${done}/${MISSIONS.length}`}</strong>
        </div>
      </div>
      <ol className="vp-missions-list">
        {MISSIONS.map((mission) => {
          const isDone = awarded.includes(mission.key);
          return (
            <li key={mission.key} className={isDone ? `done` : undefined}>
              <span className="vp-missions-check">{isDone && Icon.check}</span>
              <span className="vp-missions-label">{t(mission.label)}</span>
              {ROUTE_ART[mission.route] && (
                <img src={ROUTE_ART[mission.route]} alt="" />
              )}
              {isDone ? (
                <span className="vp-missions-done">{t(`Done`)}</span>
              ) : (
                <button type="button" onClick={() => onNavigate(mission.route)}>
                  {t(`Go`)}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
