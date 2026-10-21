import { useEffect, useState, useRef } from "react";
import { COMPLETION_RATIO } from "../../lib/pointsService";
import { useI18n } from "../../i18n";
import { Icon } from "../Icon";
import { MoreOnSite } from "./MoreOnSite";
import { HouseAd, useAdBreaks } from "./HouseAd";
import type { Promo } from "./HouseAd";
import { VIDEOS } from "../../data";
import { formatTime } from "../../lib/format";
import type { Video } from "../../types";

const pickAd = (): Promo => ({ kind: `partner`, id: `booksnap` });

type VideoPlayerProps = {
  video: Video;
  onClose: () => void;
  onOther: (index: number) => void;
  /** Called once the current video passes the watched-enough threshold. */
  onFinish: () => void;
};

export function VideoPlayer({
  video,
  onClose,
  onOther,
  onFinish,
}: VideoPlayerProps) {
  const { t } = useI18n();
  // Fires once per mount; award() also guards, this just avoids calling it on
  // every timeupdate tick after the threshold.
  const counted = useRef(false);
  const currentIndex = VIDEOS.indexOf(video);
  // The selected video first, then the rest in order, wrapping around.
  const queue = [
    ...VIDEOS.slice(currentIndex),
    ...VIDEOS.slice(0, currentIndex),
  ];
  const [showMore, setShowMore] = useState(false);
  // Video diiklankan BookSnap: sekali di tengah video, sekali saat keluar.
  const { ad, mid, close, skip } = useAdBreaks(pickAd, onClose);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Video dijeda selama iklan tengah dan lanjut setelah dilewati.
  useEffect(() => {
    const el = videoRef.current;
    if (!el || ad?.at !== `mid`) return;
    el.pause();
    return () => void el.play().catch(() => {});
  }, [ad]);

  return (
    <div
      style={{
        position: `fixed`,
        inset: 0,
        zIndex: 80,
        background: `#000`,
        overflow: `hidden`,
      }}
    >
      <button
        onClick={close}
        aria-label={t("Back")}
        style={{
          position: `absolute`,
          top: 14,
          left: 14,
          zIndex: 10,
          width: 40,
          height: 40,
          borderRadius: `50%`,
          background: `rgba(0,0,0,.55)`,
          backdropFilter: `blur(8px)`,
          border: `1px solid rgba(255,255,255,.2)`,
          display: `grid`,
          placeItems: `center`,
          color: `#fff`,
          cursor: `pointer`,
        }}
      >
        <span
          style={{
            width: 20,
            height: 20,
          }}
        >
          {Icon.back}
        </span>
      </button>
      <div
        style={{
          position: `absolute`,
          top: 18,
          left: 0,
          right: 0,
          zIndex: 10,
          textAlign: `center`,
          fontFamily: `var(--f-mono)`,
          fontSize: 12,
          letterSpacing: `.18em`,
          textTransform: `uppercase`,
          color: `#fff`,
          pointerEvents: `none`,
        }}
      >
        {t("Book Summaries")}
      </div>
      <div
        style={{
          width: `100%`,
          height: `100%`,
          overflowY: `scroll`,
          scrollSnapType: `y mandatory`,
          scrollbarWidth: `none`,
        }}
      >
        {queue.map((item, position) => {
          const index = VIDEOS.indexOf(item);
          return (
            <div
              key={item.t}
              style={{
                width: `100%`,
                height: `100%`,
                scrollSnapAlign: `start`,
                position: `relative`,
                flexShrink: 0,
                background: `#000`,
              }}
            >
              {position === 0 ? (
                <video
                  ref={videoRef}
                  src={item.url}
                  controls
                  autoPlay
                  playsInline
                  onTimeUpdate={(event) => {
                    const el = event.currentTarget;
                    if (!el.duration) return;
                    if (el.currentTime / el.duration >= 0.5) mid();
                    if (counted.current) return;
                    if (el.currentTime / el.duration >= COMPLETION_RATIO) {
                      counted.current = true;
                      onFinish();
                    }
                  }}
                  style={{
                    position: `absolute`,
                    inset: 0,
                    width: `100%`,
                    height: `100%`,
                    objectFit: `contain`,
                  }}
                />
              ) : (
                <div
                  style={{
                    position: `absolute`,
                    inset: 0,
                    cursor: `pointer`,
                  }}
                  onClick={() => onOther(index)}
                >
                  <img
                    src={item.img}
                    alt={item.t}
                    style={{
                      position: `absolute`,
                      inset: 0,
                      width: `100%`,
                      height: `100%`,
                      objectFit: `cover`,
                    }}
                    loading="lazy"
                  />
                  <div
                    style={{
                      position: `absolute`,
                      inset: 0,
                      background: `rgba(10,0,28,.45)`,
                    }}
                  />
                  <div
                    style={{
                      position: `absolute`,
                      inset: 0,
                      display: `grid`,
                      placeItems: `center`,
                    }}
                  >
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: `50%`,
                        background: `rgba(235,52,124,.85)`,
                        backdropFilter: `blur(4px)`,
                        display: `grid`,
                        placeItems: `center`,
                        boxShadow: `0 4px 24px rgba(235,52,124,.5)`,
                      }}
                    >
                      <span
                        style={{
                          width: 28,
                          height: 28,
                          color: `#fff`,
                        }}
                      >
                        {Icon.play}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div
                style={{
                  position: `absolute`,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  pointerEvents: `none`,
                  background: `linear-gradient(to top, rgba(10,0,28,.95) 0%, rgba(10,0,28,.5) 40%, transparent 75%)`,
                  padding: `80px 18px 40px`,
                }}
              >
                <div
                  style={{
                    fontFamily: `var(--f-mono)`,
                    fontSize: 12,
                    letterSpacing: `.16em`,
                    textTransform: `uppercase`,
                    color: `var(--pink)`,
                    marginBottom: 6,
                  }}
                >
                  {t("{cat} · Book Summary", { cat: t(item.cat) })}
                </div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: `clamp(18px,5vw,24px)`,
                    lineHeight: 1.2,
                    marginBottom: 8,
                  }}
                >
                  {item.t}
                </div>
                <div
                  style={{
                    display: `flex`,
                    alignItems: `center`,
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      fontFamily: `var(--f-mono)`,
                      fontSize: 13,
                      color: `#fff`,
                    }}
                  >
                    {item.a}
                  </span>
                  <span
                    style={{
                      width: 3,
                      height: 3,
                      borderRadius: `50%`,
                      background: `rgba(255,255,255,.4)`,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: `var(--f-mono)`,
                      fontSize: 13,
                      color: `#fff`,
                    }}
                  >
                    {formatTime(item.dur)}
                  </span>
                </div>
              </div>
              {position === 0 && (
                <div
                  style={{
                    position: `absolute`,
                    right: 16,
                    bottom: 120,
                    display: `flex`,
                    flexDirection: `column`,
                    alignItems: `center`,
                    gap: 4,
                    pointerEvents: `none`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: `var(--f-mono)`,
                      fontSize: 11,
                      color: `#fff`,
                      letterSpacing: `.1em`,
                      textTransform: `uppercase`,
                      writingMode: `vertical-rl`,
                      transform: `rotate(180deg)`,
                    }}
                  >
                    {t("swipe up")}
                  </div>
                  <div
                    style={{
                      width: 2,
                      height: 28,
                      background: `linear-gradient(to bottom, rgba(255,255,255,.4), transparent)`,
                      borderRadius: 99,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
        <div
          className="vp-on-dark"
          style={{
            width: `100%`,
            height: `100%`,
            scrollSnapAlign: `start`,
            position: `relative`,
            background: `linear-gradient(160deg, #2a0850 0%, #4a1078 50%, #1e0340 100%)`,
            display: `flex`,
            flexDirection: `column`,
            alignItems: `center`,
            justifyContent: `center`,
            padding: `32px 28px`,
            gap: 20,
            textAlign: `center`,
          }}
        >
          {[`12% 20%`, `82% 15%`, `18% 75%`, `78% 72%`, `50% 10%`].map(
            (pos, i) => (
              <span
                key={i}
                style={{
                  position: `absolute`,
                  top: pos.split(` `)[1],
                  left: pos.split(` `)[0],
                  fontSize: [14, 10, 12, 10, 14][i],
                  color: `rgba(255,255,255,.18)`,
                  pointerEvents: `none`,
                  animation: `sparkle 2s ease-in-out infinite`,
                  animationDelay: `${i * 0.4}s`,
                }}
              >
                ✦
              </span>
            ),
          )}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: `50%`,
              background: `var(--grad)`,
              display: `grid`,
              placeItems: `center`,
              boxShadow: `0 8px 32px rgba(235,52,124,.45)`,
            }}
          >
            <span
              style={{
                width: 32,
                height: 32,
                color: `#fff`,
              }}
            >
              {Icon.play}
            </span>
          </div>
          <div>
            <div
              style={{
                fontFamily: `var(--f-mono)`,
                fontSize: 12,
                letterSpacing: `.2em`,
                textTransform: `uppercase`,
                color: `var(--pink)`,
                marginBottom: 10,
              }}
            >
              {t("You've seen all summaries")}
            </div>
            <h2
              style={{
                fontSize: `clamp(22px,5vw,28px)`,
                fontWeight: 800,
                lineHeight: 1.2,
                marginBottom: 10,
              }}
            >
              {t("Want more book summaries?")}
            </h2>
            <p
              style={{
                color: `var(--ink-2)`,
                fontSize: 14,
                lineHeight: 1.6,
              }}
            >
              {t("Explore the full library — new titles added every week.")}
            </p>
          </div>
          <div
            style={{
              display: `flex`,
              flexDirection: `column`,
              gap: 12,
              width: `100%`,
              maxWidth: 280,
            }}
          >
            <button
              onClick={() => setShowMore(true)}
              style={{
                display: `flex`,
                alignItems: `center`,
                justifyContent: `center`,
                gap: 8,
                background: `#FFFFFF`,
                color: `var(--pink-on-white)`,
                border: 0,
                borderRadius: 999,
                padding: `14px 28px`,
                fontFamily: `var(--f-display)`,
                fontWeight: 900,
                fontSize: 15,
                letterSpacing: `.06em`,
                textTransform: `uppercase`,
                boxShadow: `0 6px 24px rgba(0,0,0,.25)`,
                cursor: `pointer`,
              }}
            >
              {t("Browse All Videos")}{" "}
              <span
                style={{
                  width: 18,
                  height: 18,
                }}
              >
                {Icon.arrow}
              </span>
            </button>
            <button
              onClick={close}
              style={{
                display: `flex`,
                alignItems: `center`,
                justifyContent: `center`,
                background: `transparent`,
                color: `#FFFFFF`,
                border: `1px solid rgba(255,255,255,.6)`,
                borderRadius: 999,
                padding: `12px 28px`,
                fontFamily: `var(--f-body)`,
                fontWeight: 600,
                fontSize: 14,
                cursor: `pointer`,
              }}
            >
              {t("Back to Home")}
            </button>
          </div>
        </div>
      </div>
      {showMore && (
        <MoreOnSite
          headline="Want more book summaries?"
          sub="New titles added every week on BookSnap."
          siteName="BookSnap"
          siteUrl="https://booksnap.ai"
          onClose={close}
        />
      )}
      {ad && <HouseAd key={ad.at} promo={ad.promo} onSkip={skip} />}
    </div>
  );
}
