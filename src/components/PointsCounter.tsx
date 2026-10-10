import { useEffect, useRef, useState } from "react";

export function PointsCounter({ pts }: { pts: number }) {
  const [shown, setShown] = useState(pts);
  const [bump, setBump] = useState(false);
  const prevPts = useRef(pts);
  useEffect(() => {
    if (pts === prevPts.current) return;
    const from = prevPts.current;
    prevPts.current = pts;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 700);
      const eased = 1 - (1 - progress) ** 3;
      setShown(Math.round(from + (pts - from) * eased));
      if (progress < 1) requestAnimationFrame(tick);
      else setBump(true);
    };
    requestAnimationFrame(tick);
  }, [pts]);
  return (
    <span
      className={bump ? `bump` : ``}
      onAnimationEnd={() => setBump(false)}
      style={{
        fontFamily: `var(--f-mono)`,
        fontSize: 15,
        fontVariantNumeric: `tabular-nums`,
        fontWeight: 700,
      }}
    >
      {shown}
    </span>
  );
}
