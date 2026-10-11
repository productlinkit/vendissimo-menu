import { useEffect, useState, useRef } from "react";
import { Icon } from "../Icon";
import { MagCover } from "../cards";
import { GAMES, MAGAZINES, POINTS, VIDEOS } from "../../data";
import { useI18n } from "../../i18n";
import type { Magazine, Route } from "../../types";

type Slide = {
  tag: string;
  h: string;
  p: string;
  btn: string;
  act: () => void;
  img: string | null;
  mag: Magazine | null;
  /** show `img` inside a rounded frame instead of free-standing */
  frame: boolean;
};

export function HeroCarousel({
  onNavigate,
}: {
  onNavigate: (route: Route) => void;
}) {
  const { t } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);
  const slides: Slide[] = [
    {
      tag: t(`Featured`),
      h: t(`Play a Game,\nWin a Prize`),
      p: t(`No sign-up needed to start`),
      btn: t(`Play now`),
      act: () => onNavigate(`games`),
      img: `/img/hero-crash-tower.webp`,
      mag: null,
      frame: false,
    },
    {
      tag: t(`Game of the Day`),
      h: GAMES[0].t,
      p: t(GAMES[0].d),
      btn: t(`Play instantly`),
      act: () => onNavigate(`games`),
      // potongan tanpa latar supaya truknya berdiri bebas, bukan foto berbingkai
      img: `/img/g-crash-cut.webp`,
      mag: null,
      frame: false,
    },
    {
      tag: t(`Now Showing`),
      h: VIDEOS[7].t,
      p: t(`Book summary · {author}`, { author: VIDEOS[7].a }),
      btn: t(`Watch now`),
      act: () => onNavigate(`videos`),
      img: VIDEOS[7].img,
      mag: null,
      frame: true,
    },
    {
      tag: t(`Magazine Pick`),
      h: t(MAGAZINES[0].line),
      p: `${MAGAZINES[0].t} · ${t(MAGAZINES[0].mo)}`,
      btn: t(`Read now`),
      act: () => onNavigate(`magazines`),
      img: null,
      mag: MAGAZINES[0],
      frame: false,
    },
    {
      tag: t(`Daily Challenge`),
      h: t(`5 quick English\nquestions`),
      p: t(`Earn +{n} pts in about a minute`, { n: POINTS.english }),
      btn: t(`Start`),
      act: () => onNavigate(`english`),
      img: `/img/cat-english.webp`,
      mag: null,
      frame: false,
    },
  ];
  const [paused, setPaused] = useState(false);
  const hovering = useRef(false);
  const focused = useRef(false);
  // Respect the OS setting: no automatic movement for reduced-motion users.
  const reduceMotion =
    typeof window !== `undefined` &&
    window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
  const [held, setHeld] = useState(false);
  const stopped = paused || held || reduceMotion;

  useEffect(() => {
    if (stopped) return;
    const timer = setInterval(
      () => setActiveIndex((index) => (index + 1) % slides.length),
      4500,
    );
    return () => clearInterval(timer);
  }, [slides.length, stopped]);

  // Hover and keyboard focus both hold the carousel still.
  const hold = (which: `hover` | `focus`, on: boolean) => {
    if (which === `hover`) hovering.current = on;
    else focused.current = on;
    setHeld(hovering.current || focused.current);
  };
  const slide = slides[activeIndex];
  return (
    <section
      role="region"
      aria-roledescription={t(`carousel`)}
      aria-label={t(`Featured`)}
      onMouseEnter={() => hold(`hover`, true)}
      onMouseLeave={() => hold(`hover`, false)}
      onFocusCapture={() => hold(`focus`, true)}
      onBlurCapture={() => hold(`focus`, false)}
      className="vp-carousel"
      style={{
        background: `rgba(255, 255, 255, 0.16)`,
        backdropFilter: `blur(16px)`,
        WebkitBackdropFilter: `blur(16px)`,
        border: `1px solid rgba(255, 255, 255, 0.25)`,
        boxShadow: `0 10px 40px -10px rgba(0,0,0,0.25)`,
      }}
    >
      {[
        {
          top: `12%`,
          right: `48%`,
          delay: `0s`,
          size: 16,
        },
        {
          top: `8%`,
          right: `14%`,
          delay: `0.6s`,
          size: 12,
        },
        {
          top: `55%`,
          right: `8%`,
          delay: `1.1s`,
          size: 18,
        },
        {
          top: `22%`,
          right: `6%`,
          delay: `0.3s`,
          size: 10,
        },
        {
          top: `70%`,
          right: `44%`,
          delay: `1.5s`,
          size: 12,
        },
      ].map((sparkle, index) => (
        <span
          key={index}
          className="vp-sparkle"
          style={{
            top: sparkle.top,
            right: sparkle.right,
            fontSize: sparkle.size,
            animationDelay: sparkle.delay,
          }}
        >
          ✦
        </span>
      ))}
      <div className="vp-carousel-copy">
        <span className="vp-carousel-tag">{slide.tag}</span>
        <h1 className="vp-carousel-h1">{slide.h}</h1>
        <p className="vp-carousel-p">{slide.p}</p>
        <button onClick={slide.act} className="vp-carousel-btn">
          {slide.btn}{" "}
          <span
            style={{
              width: 14,
              height: 14,
              flexShrink: 0,
            }}
          >
            {Icon.arrow}
          </span>
        </button>
        <div
          style={{
            display: `flex`,
            gap: 4,
            marginTop: `auto`,
            paddingTop: 8,
          }}
        >
          <button
            type="button"
            className="vp-carousel-pause"
            aria-label={
              stopped ? t(`Play slideshow`) : t(`Pause slideshow`)
            }
            onClick={() => setPaused((was) => !was)}
          >
            <span aria-hidden="true">{stopped ? `▶` : `❚❚`}</span>
          </button>
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className="vp-carousel-dot"
              aria-label={t(`Slide {n} of {m}`, {
                n: index + 1,
                m: slides.length,
              })}
              aria-current={index === activeIndex ? `true` : undefined}
              onClick={() => setActiveIndex(index)}
            >
              <span aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
      <div
        className="vp-carousel-art"
        style={{
          position: `relative`,
          overflow: `hidden`,
          background: `radial-gradient(ellipse at 60% 80%, rgba(235,52,124,.22) 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      >
        {slide.mag ? (
          <div
            className="carousel-art-img"
            style={{
              position: `absolute`,
              inset: 0,
              top: 14,
              margin: `0 6px`,
            }}
          >
            <MagCover mag={slide.mag} />
          </div>
        ) : slide.img && slide.frame ? (
          <div
            style={{
              position: `absolute`,
              bottom: 0,
              right: 6,
              left: 6,
              height: `90%`,
              borderRadius: 22,
              overflow: `hidden`,
              border: `2.5px solid rgba(255,255,255,.65)`,
              boxShadow: `0 8px 28px rgba(0,0,0,.45), 0 0 0 1px rgba(255,255,255,.12) inset`,
            }}
          >
            <img
              src={slide.img}
              alt=""
              className="carousel-art-img"
              style={{
                width: `100%`,
                height: `100%`,
                objectFit: `cover`,
                objectPosition: `center`,
                display: `block`,
              }}
            />
          </div>
        ) : slide.img ? (
          <img
            src={slide.img}
            alt=""
            className="carousel-art-img"
            style={{
              position: `absolute`,
              inset: 0,
              width: `100%`,
              height: `100%`,
              objectFit: `contain`,
              objectPosition: `center bottom`,
              display: `block`,
            }}
          />
        ) : null}
      </div>
    </section>
  );
}
