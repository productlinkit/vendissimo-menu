import { useState, type ReactNode } from "react";
import { Icon } from "../components/Icon";
import { REWARDS } from "../data";
import { useI18n } from "../i18n";
import type { Progress, Route } from "../types";

const FEATURES = [
  `🥤 Snacks & drinks for everyone`,
  `👆 Easy touch screen`,
  `💳 Cashless payment`,
  `🔄 Restocked regularly`,
  `🏢 Offices, schools & public spaces`,
  `🎮 Play games while you wait`,
];

const PHOTOS = [
  {
    src: `/img/about-mall.jpg`,
    label: `Vendissimo machine in a busy shopping mall`,
  },
  {
    src: `/img/about-shop.jpg`,
    label: `Vendissimo machine in a lounge`,
  },
  {
    src: `/img/about-office.jpg`,
    label: `Vendissimo machine at an office`,
  },
  {
    src: `/img/about-drinks.jpg`,
    label: `Our cold drink range`,
  },
];

type ProfilePageProps = {
  S: Progress;
  onNavigate: (route: Route) => void;
};

type MenuItem = { label: string; icon: ReactNode; route: Route };

export function ProfilePage({ S, onNavigate }: ProfilePageProps) {
  const { t } = useI18n();
  const unlockedCount = REWARDS.filter((reward) => S.pts >= reward.pts).length;
  const [aboutOpen, setAboutOpen] = useState(false);
  return (
    <div className="vp-view page-enter">
      <h1
        style={{
          fontSize: `clamp(24px,4vw,38px)`,
        }}
      >
        {t("Profile")}
      </h1>
      <div
        style={{
          display: `flex`,
          alignItems: `center`,
          gap: 14,
          border: `1px solid var(--line)`,
          background: `var(--card)`,
          borderRadius: `var(--r-md)`,
          padding: 16,
          width: `100%`,
          boxSizing: `border-box`,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: `50%`,
            background: `var(--grad)`,
            display: `grid`,
            placeItems: `center`,
            color: `#fff`,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: 22,
              height: 22,
            }}
          >
            {Icon.user}
          </span>
        </div>
        <div
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <div
            style={{
              fontWeight: 600,
            }}
          >
            {t("Guest Player")}
          </div>
          <div
            style={{
              color: `var(--ink-3)`,
              fontSize: 13,
            }}
          >
            {t("Progress saved locally on this device")}
          </div>
        </div>
      </div>
      <div className="vp-stats">
        {(
          [
            [
              <span
                key={`v`}
                style={{
                  display: `flex`,
                  alignItems: `center`,
                  gap: 4,
                  justifyContent: `center`,
                }}
              >
                <img
                  src="/img/coin.svg"
                  alt=""
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
                {S.pts}
              </span>,
              `Points`,
            ],
            [`${unlockedCount}/${REWARDS.length}`, `Rewards`],
            [String(S.awarded.length), `Done today`],
          ] satisfies [value: ReactNode, label: string][]
        ).map(([value, label]) => (
          <div
            key={label}
            style={{
              border: `1px solid var(--line)`,
              background: `var(--card)`,
              borderRadius: `var(--r-md)`,
              padding: `14px 8px`,
              textAlign: `center`,
            }}
          >
            <div
              style={{
                fontFamily: `var(--f-display)`,
                fontWeight: 900,
                fontSize: `clamp(18px,4vw,22px)`,
              }}
            >
              {value}
            </div>
            <div
              style={{
                color: `var(--ink-3)`,
                fontSize: 13,
                marginTop: 4,
              }}
            >
              {t(label)}
            </div>
          </div>
        ))}
      </div>
      <ul className="vp-menu">
        {(
          [
            {
              label: `Rewards & points history`,
              icon: Icon.gift,
              route: `rewards`,
            },
            {
              label: `Explore all categories`,
              icon: Icon.explore,
              route: `explore`,
            },
          ] satisfies MenuItem[]
        ).map((item) => (
          <li key={item.label}>
            <button
              onClick={() => onNavigate(item.route)}
              style={{
                display: `flex`,
                alignItems: `center`,
                gap: 14,
                width: `100%`,
                padding: `14px 16px`,
                border: `1px solid var(--line)`,
                background: `var(--card)`,
                borderRadius: `var(--r-md)`,
                textAlign: `left`,
                cursor: `pointer`,
                transition: `all .15s`,
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.borderColor = `rgba(235,52,124,.4)`;
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.borderColor = `var(--line)`;
              }}
            >
              <span
                style={{
                  width: 20,
                  height: 20,
                  color: `var(--pink)`,
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </span>
              <span
                style={{
                  flex: 1,
                  fontWeight: 500,
                }}
              >
                {t(item.label)}
              </span>
              <span
                style={{
                  width: 18,
                  height: 18,
                  color: `var(--ink-3)`,
                }}
              >
                {Icon.chev}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <section
        style={{
          border: `1px solid var(--line)`,
          background: `var(--card)`,
          borderRadius: 20,
          overflow: `hidden`,
          width: `100%`,
          boxSizing: `border-box`,
        }}
      >
        <button
          onClick={() => setAboutOpen((open) => !open)}
          style={{
            width: `100%`,
            display: `flex`,
            alignItems: `center`,
            gap: 14,
            padding: `16px 18px`,
            background: `none`,
            border: 0,
            cursor: `pointer`,
            textAlign: `left`,
          }}
        >
          <img
            src="/img/vendissimo-logo.png"
            alt="Vendissimo"
            style={{
              height: 22,
              width: `auto`,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              flex: 1,
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            {t("About Vendissimo")}
          </span>
          <span
            style={{
              width: 20,
              height: 20,
              color: `var(--ink-3)`,
              flexShrink: 0,
              transform: aboutOpen ? `rotate(90deg)` : `none`,
              transition: `transform .25s`,
            }}
          >
            {Icon.chev}
          </span>
        </button>
        {aboutOpen && (
          <div
            style={{
              borderTop: `1px solid var(--line)`,
              padding: `20px 18px`,
              display: `grid`,
              gap: 16,
            }}
          >
            <div>
              <a
                href="https://vendissimo.io"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: `block`,
                  color: `var(--pink)`,
                  fontSize: 13,
                  fontFamily: `var(--f-mono)`,
                  textDecoration: `none`,
                  marginBottom: 12,
                }}
              >
                vendissimo.io
              </a>
              <h2
                style={{
                  fontSize: `clamp(18px,4vw,24px)`,
                  lineHeight: 1.2,
                  marginBottom: 12,
                }}
              >
                {t("The ultimate vending machine experience")}
              </h2>
              <p
                style={{
                  color: `var(--ink-2)`,
                  fontSize: 14,
                  lineHeight: 1.65,
                  marginBottom: 10,
                }}
              >
                {t(
                  "Our state-of-the-art vending machines offer a wide variety of snacks and beverages, so there's something for everyone. With user-friendly touch screens and cashless payment options, grabbing a quick bite has never been easier.",
                )}
              </p>
              <p
                style={{
                  color: `var(--ink-2)`,
                  fontSize: 14,
                  lineHeight: 1.65,
                }}
              >
                {t(
                  "Our machines are restocked regularly to guarantee freshness. Perfect for offices, schools and public spaces, they're designed to satisfy your cravings anytime, anywhere.",
                )}
              </p>
            </div>
            <div
              style={{
                display: `flex`,
                flexWrap: `wrap`,
                gap: 8,
              }}
            >
              {FEATURES.map((feature) => (
                <span
                  key={feature}
                  style={{
                    background: `rgba(255,255,255,.08)`,
                    border: `1px solid var(--line)`,
                    borderRadius: 999,
                    padding: `7px 14px`,
                    fontSize: 13,
                    color: `var(--ink-2)`,
                  }}
                >
                  {t(feature)}
                </span>
              ))}
            </div>
            <div>
              <div
                style={{
                  fontFamily: `var(--f-mono)`,
                  fontSize: 12,
                  letterSpacing: `.18em`,
                  textTransform: `uppercase`,
                  color: `var(--ink-3)`,
                  marginBottom: 12,
                }}
              >
                {t("Vendissimo Around You")}
              </div>
              <div
                style={{
                  display: `grid`,
                  gridTemplateColumns: `1fr 1fr`,
                  gap: 10,
                }}
              >
                {PHOTOS.map((photo) => (
                  <div
                    key={photo.src}
                    style={{
                      borderRadius: 12,
                      overflow: `hidden`,
                      aspectRatio: `4/3`,
                      background: `var(--surface-2)`,
                      position: `relative`,
                    }}
                  >
                    <img
                      src={photo.src}
                      alt={t(photo.label)}
                      style={{
                        width: `100%`,
                        height: `100%`,
                        objectFit: `cover`,
                      }}
                      loading="lazy"
                    />
                    <div
                      style={{
                        position: `absolute`,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: `linear-gradient(transparent,rgba(20,0,40,.8))`,
                        padding: `18px 8px 8px`,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          color: `rgba(255,255,255,.9)`,
                          lineHeight: 1.3,
                          display: `block`,
                        }}
                      >
                        {t(photo.label)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
      <p
        style={{
          textAlign: `center`,
          color: `var(--ink-3)`,
          fontSize: 13,
        }}
      >
        © 2026 Vendissimo · vendissimo.io
      </p>
    </div>
  );
}
