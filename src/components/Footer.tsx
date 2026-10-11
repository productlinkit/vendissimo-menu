export function Footer() {
  return (
    <footer
      style={{
        borderTop: `1px solid var(--line)`,
        padding: `26px 0 24px`,
        color: `var(--ink-3)`,
        fontSize: 13,
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: `0 auto`,
          padding: `0 var(--px)`,
          display: `flex`,
          flexWrap: `wrap`,
          gap: `12px 24px`,
          justifyContent: `space-between`,
          alignItems: `center`,
        }}
      >
        <img
          src="/img/vendissimo-logo.webp"
          alt="Vendissimo"
          style={{
            height: 20,
            opacity: 0.8,
          }}
        />
        <nav
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            gap: 16,
          }}
        >
          {[
            {
              label: `eMagz`,
              href: `https://emagz.mobi`,
            },
            {
              label: `BookSnap`,
              href: `https://apps.booksnap.ai/en/video`,
            },
            {
              label: `OmniPlay`,
              href: `https://omniplay.mobi`,
            },
            {
              label: `SpeakEasy`,
              href: `https://apps.speakeasy.mobi`,
            },
            {
              label: `vendissimo.io`,
              href: `https://vendissimo.io`,
            },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: `none`,
                color: `inherit`,
                transition: `color .15s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = `var(--pink)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = ``;
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
