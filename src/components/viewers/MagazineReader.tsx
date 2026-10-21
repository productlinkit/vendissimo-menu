import { useState, useEffect } from "react";
import { COMPLETION_RATIO } from "../../lib/pointsService";
import { useI18n } from "../../i18n";
import { Icon } from "../Icon";
import { MagCover } from "../cards";
import { MoreOnSite } from "./MoreOnSite";
import { HouseAd, useAdBreaks } from "./HouseAd";
import type { Promo } from "./HouseAd";
import type { Magazine } from "../../types";

const pickAd = (): Promo => ({ kind: `partner`, id: `emagz` });

export function MagazineReader({
  mag,
  onClose,
  onFinish,
}: {
  mag: Magazine;
  onClose: () => void;
  onFinish: () => void;
}) {
  const { t } = useI18n();
  // cover + contents + one page per story
  const pageCount = 2 + mag.toc.length;
  const [page, setPage] = useState(0);
  const [showMore, setShowMore] = useState(false);
  // Majalah diiklankan eMagz: sekali di halaman tengah, sekali saat keluar.
  const { ad, mid, close, skip } = useAdBreaks(pickAd, onClose);
  useEffect(() => {
    if (pageCount >= 4 && page === Math.floor(pageCount / 2)) mid();
  }, [page, pageCount, mid]);
  const isCover = page === 0;
  const isContents = page === 1;
  const isStory = page >= 2;
  const storyIndex = page - 2;
  const article = isStory
    ? mag.art[Math.min(storyIndex, mag.art.length - 1)]
    : null;
  const storyNumber = storyIndex + 1;
  const progressPct = ((page + 1) / pageCount) * 100;

  // Counts as read once the reader has reached 80% of the pages.
  useEffect(() => {
    if ((page + 1) / pageCount >= COMPLETION_RATIO) onFinish();
  }, [page, pageCount, onFinish]);
  const isLastPage = page === pageCount - 1;
  const goNext = () => {
    if (isLastPage) setShowMore(true);
    else setPage((current) => current + 1);
  };
  const goPrev = () => {
    if (page > 0) setPage((current) => current - 1);
    else close();
  };
  return (
    <div
      style={{
        position: `fixed`,
        inset: 0,
        zIndex: 80,
        background: `var(--bg)`,
        display: `flex`,
        flexDirection: `column`,
        overflow: `hidden`,
      }}
    >
      <div
        style={{
          display: `flex`,
          alignItems: `center`,
          gap: 12,
          padding: `12px 16px 10px`,
          flexShrink: 0,
        }}
      >
        <button
          onClick={close}
          aria-label={t("Close")}
          style={{
            width: 38,
            height: 38,
            borderRadius: `50%`,
            background: `rgba(255,255,255,.12)`,
            border: 0,
            display: `grid`,
            placeItems: `center`,
            color: `#fff`,
            cursor: `pointer`,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: 18,
              height: 18,
            }}
          >
            {Icon.back}
          </span>
        </button>
        <div>
          <div
            style={{
              fontFamily: `var(--f-mono)`,
              fontSize: 12,
              letterSpacing: `.16em`,
              textTransform: `uppercase`,
              color: `var(--ink-3)`,
            }}
          >
            {t("Digital Magazine")}
          </div>
          <div
            style={{
              fontWeight: 700,
              fontSize: 16,
              lineHeight: 1.2,
            }}
          >
            {mag.t}
          </div>
        </div>
      </div>
      <div
        style={{
          height: 3,
          background: `rgba(255,255,255,.12)`,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            height: `100%`,
            width: `${progressPct}%`,
            background: `var(--pink)`,
            borderRadius: 99,
            transition: `width .4s cubic-bezier(.22,1,.36,1)`,
          }}
        />
      </div>
      <div
        style={{
          flex: 1,
          overflow: `hidden`,
          position: `relative`,
        }}
      >
        <div
          style={{
            position: `absolute`,
            inset: 0,
            overflowY: `auto`,
            display: `flex`,
            flexDirection: `column`,
            padding: `0 14px 8px`,
          }}
        >
          <div
            style={{
              height: 56,
              flexShrink: 0,
            }}
          />
          {isCover && (
            <div
              style={{
                flex: 1,
                background: `#fff`,
                borderRadius: 20,
                overflow: `hidden`,
                display: `flex`,
                flexDirection: `column`,
              }}
            >
              <div
                style={{
                  position: `relative`,
                  background: mag.c1,
                  height: `55%`,
                  overflow: `hidden`,
                  flexShrink: 0,
                }}
              >
                <MagCover mag={mag} />
              </div>
              <div
                style={{
                  padding: `22px 20px 28px`,
                }}
              >
                <div
                  style={{
                    fontFamily: `var(--f-mono)`,
                    fontSize: 12,
                    letterSpacing: `.16em`,
                    textTransform: `uppercase`,
                    // #999 di atas putih hanya 2,85:1
                    color: `#6b6b6b`,
                    marginBottom: 6,
                  }}
                >
                  {t(mag.cat)}
                  {" · "}
                  {t(mag.mo)}
                </div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 22,
                    color: `#111`,
                    lineHeight: 1.2,
                    marginBottom: 10,
                  }}
                >
                  {t(mag.line)}
                </div>
                <div
                  style={{
                    fontFamily: `var(--f-mono)`,
                    fontSize: 13,
                    // #aaa di atas putih hanya 2,32:1
                    color: `#6b6b6b`,
                  }}
                >
                  {t("{read} read · {n} stories", {
                    read: t(mag.read),
                    n: mag.toc.length,
                  })}
                </div>
              </div>
            </div>
          )}
          {isContents && (
            <div
              style={{
                flex: 1,
                background: `#fff`,
                borderRadius: 20,
                padding: `22px 20px 24px`,
                color: `#111`,
                display: `flex`,
                flexDirection: `column`,
              }}
            >
              <div
                style={{
                  fontFamily: `var(--f-mono)`,
                  fontSize: 12,
                  letterSpacing: `.14em`,
                  textTransform: `uppercase`,
                  color: `#999`,
                  marginBottom: 6,
                }}
              >
                {t("Contents · {month}", { month: t(mag.mo) })}
              </div>
              <h2
                style={{
                  fontSize: `clamp(22px,5vw,28px)`,
                  fontWeight: 800,
                  color: `#111`,
                  marginBottom: 20,
                }}
              >
                {t("In this issue")}
              </h2>
              {mag.toc.map((title, index) => {
                const kicker =
                  mag.art[Math.min(index, mag.art.length - 1)]?.k ?? ``;
                return (
                  <div key={index}>
                    <button
                      onClick={() => setPage(index + 2)}
                      style={{
                        display: `flex`,
                        alignItems: `flex-start`,
                        gap: 14,
                        padding: `14px 0`,
                        background: `none`,
                        border: 0,
                        width: `100%`,
                        textAlign: `left`,
                        cursor: `pointer`,
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: `50%`,
                          flexShrink: 0,
                          background: mag.c1,
                          color: `#fff`,
                          display: `grid`,
                          placeItems: `center`,
                          fontFamily: `var(--f-display)`,
                          fontWeight: 800,
                          fontSize: 16,
                        }}
                      >
                        {index + 1}
                      </div>
                      <div
                        style={{
                          flex: 1,
                          minWidth: 0,
                        }}
                      >
                        <div
                          style={{
                            fontFamily: `var(--f-mono)`,
                            fontSize: 12,
                            letterSpacing: `.14em`,
                            textTransform: `uppercase`,
                            color: `#aaa`,
                            marginBottom: 3,
                          }}
                        >
                          {t(kicker)}
                        </div>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: 14,
                            lineHeight: 1.35,
                            color: index === 1 ? `#c2304a` : `#111`,
                          }}
                        >
                          {t(title)}
                        </div>
                      </div>
                      <div
                        style={{
                          fontFamily: `var(--f-mono)`,
                          fontSize: 13,
                          color: `#ccc`,
                          flexShrink: 0,
                          marginTop: 14,
                        }}
                      >
                        {t("p.\u00A0{n}", { n: (index + 1) * 8 })}
                      </div>
                    </button>
                    {index < mag.toc.length - 1 && (
                      <div
                        style={{
                          height: 1,
                          background: `#f0ecf7`,
                        }}
                      />
                    )}
                  </div>
                );
              })}
              <div
                style={{
                  marginTop: `auto`,
                  paddingTop: 20,
                  color: `#ccc`,
                  fontSize: 13,
                  lineHeight: 1.5,
                }}
              >
                {t("Tap a story to jump to it, or swipe to turn the page.")}
              </div>
            </div>
          )}
          {isStory && article && (
            <div
              style={{
                flex: 1,
                background: `#fff`,
                borderRadius: 20,
                overflow: `hidden`,
                color: `#111`,
                display: `flex`,
                flexDirection: `column`,
              }}
            >
              <div
                style={{
                  background: `linear-gradient(135deg, ${mag.c1} 0%, ${mag.c2} 100%)`,
                  padding: `22px 20px 26px`,
                  color: `#fff`,
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    fontFamily: `var(--f-mono)`,
                    fontSize: 12,
                    letterSpacing: `.14em`,
                    textTransform: `uppercase`,
                    opacity: 0.75,
                    marginBottom: 6,
                  }}
                >
                  {mag.t}
                  {" · "}
                  {t(mag.mo)}
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 18,
                  }}
                >
                  {t("Story {n} of {total}", {
                    n: storyNumber,
                    total: mag.toc.length,
                  })}
                </div>
              </div>
              <div
                style={{
                  padding: `20px 20px 32px`,
                  flex: 1,
                  overflowY: `auto`,
                }}
              >
                <div
                  style={{
                    fontFamily: `var(--f-mono)`,
                    fontSize: 12,
                    letterSpacing: `.14em`,
                    textTransform: `uppercase`,
                    color: `var(--pink)`,
                    marginBottom: 10,
                  }}
                >
                  {t(article.k)}
                </div>
                <h2
                  style={{
                    fontSize: `clamp(18px,4.5vw,22px)`,
                    fontWeight: 800,
                    lineHeight: 1.25,
                    color: `#111`,
                    marginBottom: 18,
                  }}
                >
                  {t(article.h)}
                </h2>
                {article.p.map((paragraph, paragraphIndex) => (
                  <div
                    key={paragraphIndex}
                    style={{
                      display: `flex`,
                      gap: 12,
                      marginBottom: 16,
                    }}
                  >
                    {paragraphIndex === 0 && (
                      <div
                        style={{
                          width: 4,
                          borderRadius: 99,
                          background: `var(--pink)`,
                          flexShrink: 0,
                          alignSelf: `stretch`,
                          minHeight: 48,
                        }}
                      />
                    )}
                    <p
                      style={{
                        color: `#333`,
                        lineHeight: 1.75,
                        fontSize: 15,
                        margin: 0,
                      }}
                    >
                      {t(paragraph)}
                    </p>
                  </div>
                ))}
                <div
                  style={{
                    textAlign: `right`,
                    fontFamily: `var(--f-mono)`,
                    fontSize: 13,
                    color: `#ccc`,
                    marginTop: 8,
                  }}
                >
                  {t("p.\u00A0{n}", { n: storyNumber * 8 })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          display: `flex`,
          alignItems: `center`,
          justifyContent: `space-between`,
          padding: `12px 16px 22px`,
          flexShrink: 0,
        }}
      >
        <button
          onClick={goPrev}
          style={{
            display: `inline-flex`,
            alignItems: `center`,
            gap: 6,
            padding: `11px 20px`,
            borderRadius: 999,
            border: `1px solid rgba(255,255,255,.6)`,
            background: `transparent`,
            color: `#fff`,
            fontFamily: `var(--f-display)`,
            fontWeight: 700,
            fontSize: 14,
            cursor: `pointer`,
          }}
        >
          <span
            style={{
              width: 16,
              height: 16,
            }}
          >
            {Icon.back}
          </span>{" "}
          {t("Prev")}
        </button>
        <span
          style={{
            fontFamily: `var(--f-mono)`,
            fontSize: 13,
            color: `#fff`,
          }}
        >
          {page + 1}
          {" / "}
          {pageCount}
        </span>
        <button
          onClick={goNext}
          style={{
            display: `inline-flex`,
            alignItems: `center`,
            gap: 6,
            padding: `11px 22px`,
            borderRadius: 999,
            background: `#FFFFFF`,
            color: `var(--pink-on-white)`,
            border: 0,
            fontFamily: `var(--f-display)`,
            fontWeight: 700,
            fontSize: 14,
            boxShadow: `0 4px 18px rgba(0,0,0,.2)`,
            cursor: `pointer`,
          }}
        >
          {isLastPage ? t("FINISH") : t("NEXT")}{" "}
          <span
            style={{
              width: 16,
              height: 16,
            }}
          >
            {Icon.arrow}
          </span>
        </button>
      </div>
      {showMore && (
        <MoreOnSite
          headline="Want to read more magazines?"
          sub="Find more titles and full issues on Magzter."
          siteName="Magzter"
          siteUrl="https://www.magzter.com"
          onClose={close}
        />
      )}
      {ad && <HouseAd key={ad.at} promo={ad.promo} onSkip={skip} />}
    </div>
  );
}
