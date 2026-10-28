import { useEffect, useState } from "react";
import { useI18n } from "../i18n";
import { SPIN_LEN, SPLASH } from "../lib/splashSfx";

// "ready" menunggu sentuhan pertama: browser baru mengizinkan suara setelah
// itu, jadi efek suara dan animasi sama-sama mulai dari sentuhan tersebut.
type Phase = "ready" | "gather" | "spin" | "vanish" | "out";

// jadwalnya sama dengan efek suara splash, supaya tiap bunyi pas momennya
const ms = (s: number) => s * 1000;

export function Loader({
  onStart,
  onDone,
}: {
  /** Dipanggil di dalam sentuhan itu sendiri, supaya audio boleh dibuka. */
  onStart: () => void;
  onDone: () => void;
}) {
  const { t } = useI18n();
  const [phase, setPhase] = useState<Phase>(`ready`);
  const started = phase !== `ready`;
  useEffect(() => {
    if (!started) return;
    const timers = [
      setTimeout(() => setPhase(`spin`), ms(SPLASH.spin)),
      setTimeout(() => setPhase(`vanish`), ms(SPLASH.vanish)),
      setTimeout(() => setPhase(`out`), ms(SPLASH.out)),
      setTimeout(onDone, ms(SPLASH.done)),
    ];
    return () => {
      timers.forEach(clearTimeout);
    };
  }, [started, onDone]);
  const start = () => {
    if (started) return;
    onStart();
    setPhase(`gather`);
  };
  return (
    <div
      style={{
        position: `fixed`,
        inset: 0,
        zIndex: 9999,
        // same backdrop as body in app.css, so the hand-off to Home has no colour jump
        background: `radial-gradient(60% 55% at 18% 22%, #ffffff38, #0000 70%), radial-gradient(45% 45% at 88% 78%, #ffffff24, #0000 70%), var(--grad)`,
        display: `flex`,
        flexDirection: `column`,
        alignItems: `center`,
        justifyContent: `center`,
        overflow: `hidden`,
        transition: `opacity .6s cubic-bezier(.4,0,.2,1)`,
        opacity: phase === `out` ? 0 : 1,
        pointerEvents: phase === `out` ? `none` : `auto`,
      }}
    >
      <style>
        {
          "\n        @keyframes floatIdle {\n          0%, 100% { transform: translateY(0px) rotate(0deg); }\n          50%      { transform: translateY(-8px) rotate(4deg); }\n        }\n        @keyframes spinOrbitRing {\n          0%   { transform: rotate(0deg); }\n          100% { transform: rotate(720deg); }\n        }\n        @keyframes counterSpin {\n          0%   { transform: rotate(0deg); }\n          100% { transform: rotate(-720deg); }\n        }\n        @keyframes centerAuraPulse {\n          0%, 100% { transform: scale(0.92); opacity: 0.5; }\n          50%      { transform: scale(1.22); opacity: 0.9; }\n        }\n        @keyframes sparkPulse {\n          0%, 100% { opacity: .25; transform: scale(.7) rotate(0deg); }\n          50%      { opacity: 1;   transform: scale(1.35) rotate(35deg); }\n        }\n        @keyframes splashBarFill {\n          0%   { width: 0%; }\n          15%  { width: 25%; }\n          40%  { width: 55%; }\n          75%  { width: 85%; }\n          95%  { width: 98%; }\n          100% { width: 100%; }\n        }\n        @keyframes tapPrompt {\n          0%, 100% { transform: scale(1); }\n          50%      { transform: scale(1.05); }\n        }\n      "
        }
      </style>
      <div
        style={{
          position: `absolute`,
          width: 520,
          height: 520,
          borderRadius: `50%`,
          background: `radial-gradient(circle, rgba(235,52,124,.4) 0%, rgba(123,47,247,.25) 42%, transparent 72%)`,
          // berdenyut pelan sambil menunggu tap, lalu lebih cepat sesudahnya
          animation: `centerAuraPulse ${started ? 1.1 : 2.4}s ease-in-out infinite`,
          pointerEvents: `none`,
        }}
      />
      {!started && (
        <button
          type="button"
          autoFocus
          aria-label={t(`Tap to start`)}
          onClick={start}
          style={{
            position: `absolute`,
            inset: 0,
            zIndex: 20,
            border: `none`,
            background: `none`,
            cursor: `pointer`,
          }}
        />
      )}
      {[
        {
          top: `12%`,
          left: `15%`,
          size: 18,
          delay: `.1s`,
        },
        {
          top: `22%`,
          right: `14%`,
          size: 22,
          delay: `.25s`,
        },
        {
          top: `72%`,
          left: `12%`,
          size: 16,
          delay: `.4s`,
        },
        {
          top: `82%`,
          right: `16%`,
          size: 20,
          delay: `.15s`,
        },
      ].map((spark, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            position: `absolute`,
            top: spark.top,
            left: spark.left,
            right: spark.right,
            fontSize: spark.size,
            color: `#fea832`,
            lineHeight: 1,
            opacity: started ? 1 : 0,
            transform: started ? `scale(1)` : `scale(0)`,
            transition: `opacity .5s ${spark.delay} ease, transform .6s ${spark.delay} cubic-bezier(.34,1.56,.64,1)`,
            animation: `sparkPulse ${2 + i * 0.4}s ${spark.delay} ease-in-out infinite`,
            pointerEvents: `none`,
          }}
        >
          ✦
        </span>
      ))}
      <div
        style={{
          position: `relative`,
          zIndex: 10,
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          gap: 20,
          width: `100%`,
          maxWidth: 390,
        }}
      >
        <div
          style={{
            position: `relative`,
            width: 320,
            height: 320,
            display: `grid`,
            placeItems: `center`,
          }}
        >
          <div
            style={{
              position: `absolute`,
              width: 288,
              height: 288,
              borderRadius: `50%`,
              border: `2px dashed rgba(255,255,255,0.2)`,
              boxShadow: `0 0 32px rgba(235,52,124,0.25), inset 0 0 24px rgba(235,52,124,0.15)`,
              opacity: phase === `gather` || phase === `spin` ? 0.9 : 0,
              transition: `opacity 0.8s ease`,
              pointerEvents: `none`,
            }}
          />
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: `50%`,
              background: `radial-gradient(circle, #fea832 0%, #eb347c 65%, #8e2591 100%)`,
              boxShadow: `0 0 38px rgba(235,52,124,0.95), 0 0 18px rgba(254,168,50,0.85)`,
              display: `grid`,
              placeItems: `center`,
              color: `#fff`,
              fontSize: 28,
              fontWeight: 900,
              transform: phase === `vanish` ? `scale(0)` : `scale(1)`,
              opacity: phase === `vanish` ? 0 : 1,
              transition: `transform 0.6s cubic-bezier(.4,0,.2,1), opacity 0.5s ease`,
              pointerEvents: `none`,
            }}
          >
            ✦
          </div>
          <div
            style={{
              position: `absolute`,
              inset: 0,
              display: `grid`,
              placeItems: `center`,
              animation:
                phase === `spin`
                  ? `spinOrbitRing ${SPIN_LEN}s cubic-bezier(.36,.05,.2,1) forwards`
                  : `none`,
            }}
          >
            {[
              {
                id: `wave`,
                src: `/img/loader/robot_wave.webp`,
                label: `Wave Robot`,
                scatterX: -260,
                scatterY: -280,
                scatterRot: -35,
                angle: 0,
                size: 80,
              },
              {
                id: `controller`,
                src: `/img/loader/controller.webp`,
                label: `Controller`,
                scatterX: 240,
                scatterY: -290,
                scatterRot: 40,
                angle: 36,
                size: 68,
              },
              {
                id: `wink`,
                src: `/img/loader/robot_wink.webp`,
                label: `Wink Robot`,
                scatterX: 300,
                scatterY: -120,
                scatterRot: 28,
                angle: 72,
                size: 78,
              },
              {
                id: `headphones`,
                src: `/img/loader/headphones.webp`,
                label: `Headphones`,
                scatterX: 280,
                scatterY: 100,
                scatterRot: -30,
                angle: 108,
                size: 68,
              },
              {
                id: `heart`,
                src: `/img/loader/robot_heart.webp`,
                label: `Heart Robot`,
                scatterX: 220,
                scatterY: 260,
                scatterRot: 32,
                angle: 144,
                size: 80,
              },
              {
                id: `popcorn`,
                src: `/img/loader/popcorn.webp`,
                label: `Popcorn`,
                scatterX: 0,
                scatterY: 300,
                scatterRot: -24,
                angle: 180,
                size: 64,
              },
              {
                id: `star`,
                src: `/img/loader/robot_star.webp`,
                label: `Star Robot`,
                scatterX: -220,
                scatterY: 260,
                scatterRot: -38,
                angle: 216,
                size: 80,
              },
              {
                id: `books`,
                src: `/img/loader/books.webp`,
                label: `Books`,
                scatterX: -290,
                scatterY: 100,
                scatterRot: 25,
                angle: 252,
                size: 70,
              },
              {
                id: `sleep`,
                src: `/img/loader/robot_sleep.webp`,
                label: `Sleep Robot`,
                scatterX: -300,
                scatterY: -110,
                scatterRot: -28,
                angle: 288,
                size: 78,
              },
              {
                id: `laptop`,
                src: `/img/loader/laptop.webp`,
                label: `Laptop`,
                scatterX: 0,
                scatterY: -300,
                scatterRot: 22,
                angle: 324,
                size: 68,
              },
            ].map((item, i) => {
              const rad = (item.angle * Math.PI) / 180;
              const x = Math.round(Math.cos(rad) * 136);
              const y = Math.round(Math.sin(rad) * 136);
              let transform = ``;
              let opacity = 0;
              let transition = ``;
              if (phase === `ready`) {
                transform = `translate(${item.scatterX}px, ${item.scatterY}px) rotate(${item.scatterRot}deg) scale(0.35)`;
                opacity = 0;
                transition = `transform 0.5s ease-out, opacity 0.5s ease-out`;
              } else if (phase === `gather`) {
                transform = `translate(${x}px, ${y}px) rotate(0deg) scale(1)`;
                opacity = 1;
                const delay = 0.05 + i * 0.04;
                transition = `transform 0.9s ${delay}s cubic-bezier(.34,1.35,.64,1), opacity 0.55s ${delay}s ease`;
              } else if (phase === `spin`) {
                transform = `translate(${x}px, ${y}px) rotate(0deg) scale(1)`;
                opacity = 1;
                transition = `transform 0.4s ease, opacity 0.4s ease`;
              } else {
                transform = `translate(0px, 0px) rotate(270deg) scale(0)`;
                opacity = 0;
                const delay = i * 0.02;
                transition = `transform 0.65s ${delay}s cubic-bezier(.4,0,.2,1), opacity 0.5s ${delay}s ease`;
              }
              return (
                <div
                  key={item.id}
                  style={{
                    position: `absolute`,
                    width: item.size,
                    height: item.size,
                    transform,
                    opacity,
                    transition,
                    pointerEvents: `none`,
                    filter: `drop-shadow(0 8px 20px rgba(0,0,0,0.65))`,
                  }}
                >
                  <div
                    style={{
                      width: `100%`,
                      height: `100%`,
                      animation:
                        phase === `spin`
                          ? `counterSpin ${SPIN_LEN}s cubic-bezier(.36,.05,.2,1) forwards`
                          : phase === `gather`
                            ? `floatIdle ${2.6 + (i % 3) * 0.4}s ${i * 0.12}s ease-in-out infinite`
                            : `none`,
                    }}
                  >
                    <img
                      src={item.src}
                      alt={t(item.label)}
                      style={{
                        width: `100%`,
                        height: `100%`,
                        objectFit: `contain`,
                        display: `block`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div
          style={{
            width: `92%`,
            padding: `16px 26px`,
            borderRadius: 22,
            background: `rgba(255,255,255,0.08)`,
            border: `1px solid rgba(255,255,255,0.14)`,
            backdropFilter: `blur(16px)`,
            boxShadow: `0 16px 40px -10px rgba(0,0,0,0.65)`,
            display: `flex`,
            flexDirection: `column`,
            alignItems: `center`,
            gap: 8,
          }}
        >
          <img
            src="/img/vendissimo-logo.webp"
            alt="Vendissimo"
            style={{
              height: 40,
              filter: `drop-shadow(0 0 20px rgba(235,52,124,.75))`,
            }}
          />
          <span
            style={{
              fontFamily: `var(--f-mono)`,
              fontSize: 12,
              color: `#fff`,
              textTransform: `uppercase`,
              letterSpacing: `.22em`,
            }}
          >
            {t(`Smart Vending Experience`)}
          </span>
          {!started ? (
            // warna primary polos (versi aman untuk teks putih), berdenyut pelan
            <div
              aria-hidden="true"
              style={{
                marginTop: 12,
                padding: `11px 26px`,
                borderRadius: 999,
                background: `var(--accent-ink)`,
                boxShadow: `0 8px 20px -8px rgba(0,0,0,.55)`,
                fontFamily: `var(--f-display)`,
                fontSize: 15,
                fontWeight: 800,
                letterSpacing: `.08em`,
                textTransform: `uppercase`,
                color: `#fff`,
                animation: `tapPrompt 1.4s ease-in-out infinite`,
              }}
            >
              {t(`Tap to start`)}
            </div>
          ) : (
          <div
            style={{
              width: 200,
              marginTop: 10,
            }}
          >
            <div
              style={{
                height: 6,
                background: `rgba(255,255,255,.14)`,
                borderRadius: 99,
                overflow: `hidden`,
                boxShadow: `inset 0 1px 2px rgba(0,0,0,.3)`,
              }}
            >
              <div
                style={{
                  height: `100%`,
                  borderRadius: 99,
                  background: `linear-gradient(90deg,#eb347c,#fea832)`,
                  boxShadow: `0 0 14px rgba(254,168,50,.75)`,
                  animation: `splashBarFill ${SPLASH.vanish}s cubic-bezier(.4,0,.2,1) forwards`,
                }}
              />
            </div>
            <div
              style={{
                textAlign: `center`,
                marginTop: 8,
                fontFamily: `var(--f-mono)`,
                fontSize: 12,
                letterSpacing: `.18em`,
                textTransform: `uppercase`,
                color: `#fff`,
              }}
            >
              {t(`Loading…`)}
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
