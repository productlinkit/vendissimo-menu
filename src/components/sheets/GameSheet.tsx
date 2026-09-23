import { useEffect, useRef, useState } from "react";
import { money } from "../../lib/products";
import { useI18n } from "../../lib/i18n";
import Sheet from "./Sheet";

const MASCOTS = ["/assets/m5.png", "/assets/m7.png", "/assets/m8.png", "/assets/m9.png", "/assets/m10.png"];
const HOLES = 9;
const SECONDS = 30;

type Props = {
  best: number;
  onBest: (n: number) => void;
  onWin: (v: { code: string; amount: number }) => void;
  onUseCoupon: () => void;
  onClose: () => void;
};

export default function GameSheet({ best, onBest, onWin, onUseCoupon, onClose }: Props) {
  const { t, fmt } = useI18n();
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(SECONDS);
  const [up, setUp] = useState<Record<number, string>>({});
  const [hit, setHit] = useState<number | null>(null);
  const [prize, setPrize] = useState<{ code: string; amount: number } | null>(null);
  const [over, setOver] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    setScore(0); setTime(SECONDS); setUp({}); setPrize(null); setOver(false);

    const spawn = window.setInterval(() => {
      const i = Math.floor(Math.random() * HOLES);
      const src = MASCOTS[Math.floor(Math.random() * MASCOTS.length)];
      setUp((u) => (u[i] ? u : { ...u, [i]: src }));
      timers.current.push(window.setTimeout(() => {
        setUp((u) => { const n = { ...u }; delete n[i]; return n; });
      }, 780));
    }, 620);

    const tick = window.setInterval(() => setTime((s) => s - 1), 1000);

    return () => {
      clearInterval(spawn); clearInterval(tick);
      timers.current.forEach(clearTimeout); timers.current = [];
    };
  }, [round]);

  useEffect(() => {
    if (time > 0 || over) return;
    setOver(true);
    setUp({});
    if (score > best) onBest(score);
    const amount = score >= 12 ? 100 : score >= 6 ? 50 : 0;
    if (amount > 0) {
      const v = { code: "VDS-" + Math.random().toString(36).slice(2, 6).toUpperCase(), amount };
      setPrize(v);
      onWin(v);
    }
  }, [time, over, score, best, onBest, onWin]);

  const whack = (i: number) => {
    if (!up[i] || over) return;
    setUp((u) => { const n = { ...u }; delete n[i]; return n; });
    setHit(i);
    window.setTimeout(() => setHit(null), 180);
    setScore((s) => s + 1);
  };

  return (
    <Sheet title={t("gameTitle")} onClose={onClose}>
      <div className="sheet-game">
        <h2>{t("gameTitle")}</h2>
        <p className="sheet-sub">{t("gameSub")}</p>

        <div className="game-head">
          <div className="stat"><span>{t("score")}</span><b>{score}</b></div>
          <div className="stat"><span>{t("time")}</span><b>{Math.max(0, time)}</b></div>
          <div className="stat"><span>{t("best")}</span><b>{Math.max(best, score)}</b></div>
      </div>

      <div className={"holes" + (over ? " compact" : "")}>
        {Array.from({ length: HOLES }, (_, i) => (
          <button
            key={i} type="button" aria-label={fmt(up[i] ? "holeUp" : "holeEmpty", { n: i + 1 })}
            className={"hole" + (up[i] ? " up" : "") + (hit === i ? " hit" : "")}
            onClick={() => whack(i)}
          >
            <img src={up[i] ?? ""} alt="" />
          </button>
        ))}
      </div>

      {over && (
        prize ? (
          <>
            <div className="reward">
              <b>{prize.code}</b>
              <p>{fmt("won", { a: money(prize.amount), n: score })}</p>
            </div>
            <button className="btn block game-btn" type="button" onClick={onUseCoupon}>{t("useCoupon")}</button>
          </>
        ) : (
          <>
            <div className="reward" style={{ borderColor: "var(--line)", background: "var(--panel)" }}>
              <b style={{ color: "var(--grape)" }}>{fmt("scoreIs", { n: score })}</b>
              <p>{t("lost")}</p>
            </div>
            <button className="btn block game-btn" type="button" onClick={() => setRound((r) => r + 1)}>{t("playAgain")}</button>
          </>
        )
      )}

      <button className="btn ghost sm block game-btn" type="button" onClick={onClose}>{t("close")}</button>
      </div>
    </Sheet>
  );
}
