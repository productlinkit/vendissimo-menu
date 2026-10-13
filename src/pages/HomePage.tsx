import { Icon } from "../components/Icon";
import { Bento } from "../components/home/Bento";
import { Categories } from "../components/home/Categories";
import { DailySpin } from "../components/home/DailySpin";
import { HeroCarousel } from "../components/home/HeroCarousel";
import { Missions } from "../components/home/Missions";
import { MissionsPanel } from "../components/home/MissionsPanel";
import { RedeemProgress } from "../components/home/RedeemProgress";
import { useI18n } from "../i18n";
import type { Progress, Route } from "../types";

type HomePageProps = {
  S: Progress;
  onNavigate: (route: Route) => void;
  onSpin: (pts: number) => void;
};

export function HomePage({ S, onNavigate, onSpin }: HomePageProps) {
  const { t } = useI18n();
  const spinUsed = S.awarded.includes(`spin`);
  const spinWon = spinUsed
    ? (S.log.find((entry) => entry.w === `Daily spin`)?.n ?? null)
    : null;
  return (
    <div className="vp-home page-enter">
      <div className="vp-desktop-only">
        <Bento
          S={S}
          spinUsed={spinUsed}
          onNavigate={onNavigate}
          onScrollTo={(id) =>
            document
              .getElementById(id)
              ?.scrollIntoView({ behavior: `smooth`, block: `center` })
          }
        />
      </div>
      <div className="vp-mobile-only">
        <div className="vp-scan">
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: `rgba(255,255,255,.2)`,
              border: `1px solid rgba(255,255,255,.35)`,
              display: `grid`,
              placeItems: `center`,
              color: `#FFFFFF`,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                width: 22,
                height: 22,
              }}
            >
              {Icon.qr}
            </span>
          </div>
          <div>
            <div
              style={{
                fontWeight: 600,
                color: `#FFFFFF`,
              }}
            >
              {t(`You scanned a Vendissimo machine`)}
            </div>
            <div
              style={{
                fontFamily: `var(--f-body)`,
                fontSize: 15,
                color: `var(--ink-2)`,
              }}
            >
              {t(`Play · Earn points · Redeem rewards`)}
            </div>
          </div>
        </div>
        <HeroCarousel onNavigate={onNavigate} />
        <Categories onNavigate={onNavigate} />
      </div>
      <div id="home-missions">
        <div className="vp-mobile-only">
          <Missions awarded={S.awarded} onNavigate={onNavigate} />
        </div>
        <div className="vp-desktop-only">
          <MissionsPanel awarded={S.awarded} onNavigate={onNavigate} />
        </div>
      </div>
      <div id="home-spin">
        <DailySpin onSpin={onSpin} used={spinUsed} won={spinWon} />
      </div>
      <section>
        <div className="vp-sec-head">
          <h2 className="vp-eyebrow">
            {t(`Redeem`)}
          </h2>
        </div>
        <RedeemProgress pts={S.pts} onNavigate={onNavigate} />
      </section>
      <button
        onClick={() => onNavigate(`profile`)}
        style={{
          display: `flex`,
          alignItems: `center`,
          gap: 12,
          width: `100%`,
          textAlign: `left`,
          border: `1px solid var(--line)`,
          background: `var(--card)`,
          color: `#FFFFFF`,
          backdropFilter: `blur(12px)`,
          borderRadius: `var(--r-md)`,
          padding: `15px 18px`,
          fontWeight: 600,
          cursor: `pointer`,
          boxShadow: `0 10px 40px -10px rgba(0,0,0,0.25)`,
        }}
      >
        <span
          style={{
            width: 20,
            height: 20,
            flexShrink: 0,
            color: `#FFFFFF`,
          }}
        >
          {Icon.info}
        </span>
        <span
          style={{
            flex: 1,
            color: `#FFFFFF`,
          }}
        >
          {t(`About Vendissimo machines`)}
        </span>
        <span
          style={{
            width: 18,
            height: 18,
            color: `#fff`,
          }}
        >
          {Icon.chev}
        </span>
      </button>
    </div>
  );
}
