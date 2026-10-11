import { useI18n } from "../../i18n";
import { Icon } from "../Icon";

type MoreOnSiteProps = {
  headline: string;
  sub: string;
  siteName: string;
  siteUrl: string;
  onClose: () => void;
};

export function MoreOnSite({
  headline,
  sub,
  siteName,
  siteUrl,
  onClose,
}: MoreOnSiteProps) {
  const { t } = useI18n();
  return (
    <div
      style={{
        position: `absolute`,
        inset: 0,
        zIndex: 20,
        background: `rgba(0,0,0,.6)`,
        backdropFilter: `blur(12px)`,
        WebkitBackdropFilter: `blur(12px)`,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
        padding: `24px 20px`,
      }}
    >
      <div
        style={{
          width: `100%`,
          maxWidth: 360,
          background: `rgba(255, 255, 255, 0.18)`,
          backdropFilter: `blur(20px)`,
          WebkitBackdropFilter: `blur(20px)`,
          border: `1px solid rgba(255,255,255,0.3)`,
          borderRadius: 28,
          padding: `36px 28px 32px`,
          boxShadow: `0 24px 80px rgba(0,0,0,.45)`,
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          gap: 0,
          textAlign: `center`,
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            background: `#FFFFFF`,
            color: `var(--pink-on-white)`,
            display: `grid`,
            placeItems: `center`,
            boxShadow: `0 8px 28px rgba(0,0,0,.2)`,
            marginBottom: 22,
          }}
        >
          <span
            style={{
              width: 34,
              height: 34,
            }}
          >
            {Icon.arrow}
          </span>
        </div>
        <h2
          style={{
            fontSize: `clamp(22px,6vw,26px)`,
            fontWeight: 900,
            lineHeight: 1.25,
            margin: `0 0 10px`,
            fontFamily: `var(--f-display)`,
            color: `#FFFFFF`,
          }}
        >
          {t(headline)}
        </h2>
        <p
          style={{
            fontSize: 14,
            color: `rgba(255,255,255,.9)`,
            lineHeight: 1.55,
            margin: `0 0 28px`,
            maxWidth: 280,
          }}
        >
          {t(sub)}
        </p>
        <div
          style={{
            display: `flex`,
            gap: 10,
            width: `100%`,
          }}
        >
          <a
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              display: `flex`,
              alignItems: `center`,
              justifyContent: `center`,
              gap: 6,
              background: `#FFFFFF`,
              color: `var(--pink-on-white)`,
              border: 0,
              borderRadius: 999,
              padding: `13px 10px`,
              fontFamily: `var(--f-display)`,
              fontWeight: 900,
              fontSize: 13,
              letterSpacing: `.06em`,
              textTransform: `uppercase`,
              textDecoration: `none`,
              boxShadow: `0 4px 18px rgba(0,0,0,.2)`,
              whiteSpace: `nowrap`,
            }}
          >
            {t("Visit {site}", { site: siteName })}{" "}
            <span
              style={{
                fontSize: 15,
              }}
            >
              →
            </span>
          </a>
          <button
            onClick={onClose}
            style={{
              flex: `0 0 auto`,
              padding: `13px 20px`,
              borderRadius: 999,
              background: `transparent`,
              border: `1px solid rgba(255,255,255,.6)`,
              color: `#fff`,
              fontFamily: `var(--f-display)`,
              fontWeight: 700,
              fontSize: 13,
              cursor: `pointer`,
              whiteSpace: `nowrap`,
            }}
          >
            {t("Back")}
          </button>
        </div>
      </div>
    </div>
  );
}
