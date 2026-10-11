import { Fragment, useState } from "react";
import { useI18n } from "../i18n";
import { LangSwitch } from "./LangSwitch";

export function Welcome({
  onPlay,
  onExplore,
}: {
  onPlay: () => void;
  onExplore: () => void;
}) {
  const { t } = useI18n();
  const [leaving, setLeaving] = useState(false);
  // Fade out first, then hand off once the opacity transition has finished.
  const leaveThen = (next: () => void) => {
    setLeaving(true);
    setTimeout(next, 400);
  };
  return (
    <div
      style={{
        position: `fixed`,
        inset: 0,
        zIndex: 90,
        overflowY: `auto`,
        background: `radial-gradient(60% 55% at 18% 22%, rgba(255,255,255,0.22), transparent 70%), radial-gradient(45% 45% at 88% 78%, rgba(255,255,255,0.14), transparent 70%), linear-gradient(to bottom right, #8F36A1 0%, #E72385 50%, #FF8157 100%)`,
        display: `flex`,
        justifyContent: `center`,
        padding: `calc(env(safe-area-inset-top,0px) + 28px) 16px calc(env(safe-area-inset-bottom,0px) + 28px)`,
        transition: `opacity .4s`,
        opacity: leaving ? 0 : 1,
        pointerEvents: leaving ? `none` : `auto`,
      }}
    >
      <div
        style={{
          width: `min(460px,100%)`,
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          textAlign: `center`,
          gap: 14,
          minHeight: `100%`,
        }}
      >
        <div style={{ alignSelf: `flex-end`, marginBottom: -6 }}>
          <LangSwitch />
        </div>
        <img
          src="/img/vendissimo-logo.webp"
          alt="Vendissimo"
          style={{
            height: `clamp(40px,9vw,58px)`,
            marginTop: 4,
            filter: `drop-shadow(0 0 12px rgba(255,255,255,.4))`,
          }}
        />
        <div
          style={{
            width: `100%`,
            maxWidth: 440,
            margin: `6px 0 4px`,
          }}
        >
          <img
            src="/img/welcome-hero.webp"
            alt={t(`Play arcade games`)}
            style={{
              width: `100%`,
              display: `block`,
              animation: `welcomeFloat 4s ease-in-out infinite`,
            }}
          />
        </div>
        <h1
          style={{
            fontSize: `clamp(28px,7.4vw,40px)`,
            fontWeight: 900,
            letterSpacing: `-.01em`,
            lineHeight: 1.1,
            color: `#FFFFFF`,
          }}
        >
          {t(`Play A Game,\nWin A Prize!`)
            .split(`\n`)
            .map((line, idx) => (
              <Fragment key={idx}>
                {idx > 0 && <br />}
                {line}
              </Fragment>
            ))}
        </h1>
        <p
          style={{
            color: `rgba(255,255,255,.9)`,
            fontSize: `clamp(15px,4vw,18px)`,
            maxWidth: `30ch`,
            lineHeight: 1.5,
          }}
        >
          {t(
            `Jump right in, no signup needed. Earn points and swap them for free coffee, drinks or vouchers at any Vendissimo machine.`,
          )}
        </p>
        <div
          style={{
            marginTop: `auto`,
            paddingTop: 22,
            width: `100%`,
            display: `grid`,
            gap: 10,
          }}
        >
          <button
            onClick={() => leaveThen(onPlay)}
            style={{
              width: `100%`,
              padding: 18,
              border: 0,
              borderRadius: 999,
              background: `#FFFFFF`,
              color: `var(--pink-on-white)`,
              fontFamily: `var(--f-display)`,
              fontWeight: 900,
              fontSize: `clamp(16px,4.4vw,20px)`,
              letterSpacing: `.04em`,
              textTransform: `uppercase`,
              boxShadow: `0 8px 24px rgba(0,0,0,0.18)`,
              cursor: `pointer`,
              transition: `box-shadow .2s, transform .2s`,
            }}
          >
            {t(`Play now — free`)}
          </button>
          <button
            onClick={() => leaveThen(onExplore)}
            style={{
              border: `1px solid rgba(255,255,255,0.6)`,
              background: `transparent`,
              color: `#FFFFFF`,
              fontSize: 14,
              padding: `12px 20px`,
              borderRadius: 999,
              cursor: `pointer`,
              fontWeight: 600,
            }}
          >
            {t(`Explore magazines, videos & more`)}
          </button>
        </div>
      </div>
      <style>
        {
          "\n        @keyframes welcomeFloat { 50% { transform: translateY(-8px); } }\n        @keyframes welcomePulse { 0% { box-shadow: 0 0 0 0 rgba(235,52,124,.55); } 70% { box-shadow: 0 0 0 16px rgba(235,52,124,0); } 100% { box-shadow: 0 0 0 0 rgba(235,52,124,0); } }\n      "
        }
      </style>
    </div>
  );
}
