import { useEffect, useState } from "react";
import type { Lang } from "../lib/i18n";

export function useClock(lang: Lang) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 20000);
    return () => clearInterval(id);
  }, []);
  const loc = lang === "my" ? "en-GB" : "en-US";
  return {
    time: now.toLocaleTimeString(loc, { hour: "numeric", minute: "2-digit" }),
    date: now.toLocaleDateString(loc, { weekday: "short", month: "short", day: "numeric" }),
  };
}
