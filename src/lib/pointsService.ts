/**
 * The single place where points are granted.
 *
 * TODO: replace with a server API.
 * The balance lives in localStorage, so it can still be edited by hand. This
 * module only closes the open-and-close loophole — it does not make points
 * tamper-proof. Points buy real products, so the award decision has to move
 * server-side before launch; when it does, only the body of `award` changes.
 */

export type ContentKind =
  | `game`
  | `magazine`
  | `video`
  | `english`
  | `education`;

/** Embedded games are third-party iframes on another origin and send us no
 *  game-over event, so time played is the only completion signal we have. */
export const GAME_MIN_SECONDS = 60;

/** Share of a magazine or video that counts as finished. */
export const COMPLETION_RATIO = 0.8;

/** Mission ticked by each kind. Magazines and videos share one mission. */

/** Row written into Points History. */
const LABEL_OF: Record<ContentKind, string> = {
  game: `Played a game`,
  magazine: `Read a magazine`,
  video: `Watched a video`,
  english: `English practice`,
  education: `Finished a course`,
};

export type PointsApi = {
  /** Awards once per key per day and writes one history row. */
  earnOnce: (key: string, pts: number, what: string) => void;
  /** Marks a mission done. Writes no history row, so the list stays clean. */
  /** Keys already paid out today. */
  awarded: string[];
};

export type Award = { pts: number; label: string };

/** Key for one piece of content; `kind` prefix keeps it clear of mission keys. */
export function contentKey(kind: ContentKind, contentId: string) {
  return `${kind}-${contentId}`;
}

/**
 * Grant points for a finished item — once per content id per device per day.
 * Returns what was granted, or null when it was already paid out today.
 */
export function award(
  api: PointsApi,
  kind: ContentKind,
  contentId: string,
  pts: number,
): Award | null {
  const key = contentKey(kind, contentId);
  if (api.awarded.includes(key)) return null;
  api.earnOnce(key, pts, LABEL_OF[kind]);
  return { pts, label: LABEL_OF[kind] };
}
