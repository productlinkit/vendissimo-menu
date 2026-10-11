import { useEffect, useRef, useState } from "react";
import { SPIN_PRIZES } from "../../data";
import { useI18n } from "../../i18n";

const SEGMENT_COLORS = [
  `#eb347c`,
  `#9e35a1`,
  `#fea832`,
  `#e5288a`,
  `#3ccf93`,
  `#ff8559`,
];

export function DailySpin({
  onSpin,
  used,
  won,
}: {
  onSpin: (prize: number) => void;
  used: boolean;
  won: number | null;
}) {
  const { t } = useI18n();
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext(`2d`);
    if (!canvas || !ctx) return;
    const size = canvas.width;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 4;
    const segmentAngle = (Math.PI * 2) / SPIN_PRIZES.length;
    ctx.clearRect(0, 0, size, size);
    SPIN_PRIZES.forEach((prize, index) => {
      const startAngle = segmentAngle * index - Math.PI / 2;
      const endAngle = startAngle + segmentAngle;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = SEGMENT_COLORS[index];
      ctx.fill();
      ctx.save();
      ctx.translate(centerX, centerY);
      const mid = startAngle + segmentAngle / 2;
      ctx.rotate(mid);
      ctx.fillStyle = `#fff`;
      ctx.font = `900 14px "Outfit"`;
      // Labels on the left half would come out upside down, so those get
      // turned around and drawn the other way.
      if (Math.cos(mid) < 0) {
        ctx.rotate(Math.PI);
        ctx.textAlign = `left`;
        ctx.fillText(`+${prize}`, -(radius - 10), 5);
      } else {
        ctx.textAlign = `right`;
        ctx.fillText(`+${prize}`, radius - 10, 5);
      }
      ctx.restore();
    });
    ctx.beginPath();
    ctx.arc(centerX, centerY, 16, 0, Math.PI * 2);
    ctx.fillStyle = `#2a1140`;
    ctx.fill();
  }, []);

  function spin() {
    if (spinning || used) return;
    const prizeIndex = Math.floor(Math.random() * SPIN_PRIZES.length);
    // Four full turns, then stop with the chosen segment under the pointer
    setRotation(
      rotation +
        1440 +
        (360 -
          (360 / SPIN_PRIZES.length) * prizeIndex -
          360 / SPIN_PRIZES.length / 2),
    );
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
      onSpin(SPIN_PRIZES[prizeIndex]);
    }, 2500);
  }

  return (
    <section className="vp-spin-section">
      <div className="vp-spin-text">
        <h2 className="vp-eyebrow">
          {t(`Daily Spin`)}
        </h2>
        {won === null ? (
          used ? (
            <>
              <div
                style={{
                  fontFamily: `var(--f-display)`,
                  fontWeight: 900,
                  fontSize: `clamp(16px,4vw,22px)`,
                  lineHeight: 1.1,
                }}
              >
                {t(`Come back tomorrow!`)}
              </div>
              <div
                style={{
                  color: `var(--ink-2)`,
                  fontSize: 13,
                }}
              >
                {t(`A new free spin unlocks tomorrow.`)}
              </div>
              <button
                disabled
                style={{
                  alignSelf: `flex-start`,
                  background: `rgba(255,255,255,.1)`,
                  color: `var(--ink-3)`,
                  borderRadius: 999,
                  padding: `10px 18px`,
                  fontFamily: `var(--f-display)`,
                  fontWeight: 900,
                  letterSpacing: `.06em`,
                  textTransform: `uppercase`,
                  fontSize: 13,
                  border: `1px solid var(--line)`,
                  cursor: `default`,
                }}
              >
                {t(`Spun Today`)}
              </button>
            </>
          ) : (
            <>
              <div
                style={{
                  fontFamily: `var(--f-display)`,
                  fontWeight: 900,
                  fontSize: `clamp(18px,5vw,26px)`,
                  lineHeight: 1.1,
                }}
              >
                {t(`Spin & Win!`)}
              </div>
              <div
                style={{
                  color: `var(--ink-2)`,
                  fontSize: 13,
                  lineHeight: 1.4,
                }}
              >
                {t(`One free spin every day.`)}
              </div>
              <button
                onClick={spin}
                disabled={spinning}
                style={{
                  alignSelf: `flex-start`,
                  background: `var(--grad)`,
                  color: `#fff`,
                  borderRadius: 999,
                  padding: `10px 18px`,
                  fontFamily: `var(--f-display)`,
                  fontWeight: 900,
                  letterSpacing: `.06em`,
                  textTransform: `uppercase`,
                  fontSize: 13,
                  border: 0,
                  cursor: `pointer`,
                  opacity: spinning ? 0.7 : 1,
                  transition: `opacity .2s`,
                }}
              >
                {spinning ? t(`Spinning…`) : t(`Spin to Win`)}
              </button>
            </>
          )
        ) : (
          <>
            <div
              style={{
                fontFamily: `var(--f-display)`,
                fontWeight: 900,
                fontSize: `clamp(18px,5vw,26px)`,
                lineHeight: 1.1,
              }}
            >
              {t(`You won {n} pts!`, { n: won })}
            </div>
            <div
              style={{
                color: `var(--ink-2)`,
                fontSize: 13,
                lineHeight: 1.4,
              }}
            >
              {t(`A new free spin unlocks tomorrow.`)}
            </div>
            <button
              disabled
              style={{
                alignSelf: `flex-start`,
                background: `rgba(255,255,255,.1)`,
                color: `var(--ink-3)`,
                borderRadius: 999,
                padding: `10px 18px`,
                fontFamily: `var(--f-display)`,
                fontWeight: 900,
                letterSpacing: `.06em`,
                textTransform: `uppercase`,
                fontSize: 13,
                border: `1px solid var(--line)`,
                cursor: `default`,
              }}
            >
              {t(`Spun Today`)}
            </button>
          </>
        )}
      </div>
      <div className="vp-spin-canvas-wrap">
        <div className="vp-spin-pointer" />
        <canvas
          ref={canvasRef}
          width={130}
          height={130}
          style={{
            borderRadius: `50%`,
            display: `block`,
            width: `100%`,
            height: `100%`,
            transform: `rotate(${rotation}deg)`,
            transition: spinning
              ? `transform 2.4s cubic-bezier(.2,0,.1,1)`
              : `none`,
            boxShadow: `0 8px 28px rgba(0,0,0,.4)`,
          }}
        />
      </div>
    </section>
  );
}
