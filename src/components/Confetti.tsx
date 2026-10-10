import { useEffect, useRef } from "react";

const COLORS = [`#eb347c`, `#fea832`, `#ffffff`, `#9e35a1`, `#3ccf93`];

export function Confetti({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    const ctx = canvas.getContext(`2d`)!;
    const pieces = Array.from({ length: 120 }, () => ({
      x: innerWidth / 2,
      y: innerHeight * 0.45,
      vx: (Math.random() - 0.5) * 14,
      vy: -Math.random() * 14 - 4,
      size: Math.random() * 6 + 4,
      color: COLORS[(Math.random() * COLORS.length) | 0],
      angle: Math.random() * 6,
      spin: (Math.random() - 0.5) * 0.4,
    }));
    const start = performance.now();
    let frame: number;
    const draw = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35;
        p.angle += p.spin;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });
      if (now - start < 2600) frame = requestAnimationFrame(draw);
      else onDone();
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [onDone]);
  return <canvas ref={canvasRef} className="confetti-canvas" />;
}
