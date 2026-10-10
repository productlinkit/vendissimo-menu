// Field names are kept short as in the original Figma Make source:
// t = title, d = description, a = author / answer, cat = category label,
// lvl = level, dur = duration in seconds, mo = issue month.

export type CategoryId = "magazines" | "videos" | "games" | "education" | "english";
export type Route = "home" | "explore" | "rewards" | "profile" | CategoryId;

export type Reward = { img: string; label: string; pts: number; desc: string };

export type Game = {
  id: string;
  t: string;
  cat: string;
  d: string;
  pts: number;
  img: string;
  url: string;
};

export type Article = { k: string; h: string; p: string[] };

export type Magazine = {
  t: string;
  line: string;
  cat: string;
  mo: string;
  /** cover gradient colours, used while the cover image is missing */
  c1: string;
  c2: string;
  read: string;
  img: string;
  url: string;
  toc: string[];
  art: Article[];
};

export type Video = { t: string; a: string; cat: string; dur: number; img: string; url: string };

/** o = options, a = index of the correct option */
export type Question = { q: string; o: string[]; a: number; tip: string };

export type EnglishSet = { t: string; img: string; lvl: string; daily: boolean; q: Question[] };

export type Course = { t: string; cat: string; img: string; lvl: string; d: string };

export type Category = { id: CategoryId; label: string; sub: string; art: string; emoji: string };

export type Mission = { label: string; key: string; route: Route };

/** w = what was earned, n = points */
export type LogEntry = { w: string; n: number };

export type Progress = {
  pts: number;
  log: LogEntry[];
  /** YYYY-MM-DD; opened/awarded reset when the day changes */
  day: string;
  opened: string[];
  awarded: string[];
};

export type Viewer =
  | { type: "mag"; idx: number }
  | { type: "video"; idx: number }
  | { type: "game"; idx: number }
  | { type: "eng"; idx: number };
