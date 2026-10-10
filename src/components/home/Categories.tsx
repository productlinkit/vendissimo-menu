import { CATEGORIES } from "../../data";
import { useI18n } from "../../i18n";
import { usePress } from "../../lib/usePress";
import type { Category, Route } from "../../types";

type CategoryCardProps = {
  c: Category;
  onNavigate: (route: Route) => void;
};

function CategoryCard({ c, onNavigate }: CategoryCardProps) {
  const { t } = useI18n();
  const { ref, bind } = usePress<HTMLButtonElement>();
  return (
    <button
      ref={ref}
      onClick={() => onNavigate(c.id)}
      {...bind}
      style={{
        display: `flex`,
        flexDirection: `column`,
        alignItems: `center`,
        justifyContent: `flex-end`,
        gap: 0,
        paddingBottom: 16,
        border: `1px solid rgba(255,255,255,.22)`,
        background: `rgba(255,255,255,.15)`,
        backdropFilter: `blur(12px)`,
        WebkitBackdropFilter: `blur(12px)`,
        boxShadow: `0 10px 40px -10px rgba(0,0,0,0.25)`,
        borderRadius: 20,
        textAlign: `center`,
        cursor: `pointer`,
        minHeight: `clamp(140px, 40vw, 180px)`,
        position: `relative`,
        overflow: `hidden`,
      }}
    >
      <img
        src={c.art}
        alt={t(c.label)}
        style={{
          width: `82%`,
          maxWidth: 120,
          objectFit: `contain`,
          marginBottom: 12,
          filter: `drop-shadow(0 6px 16px rgba(0,0,0,.45))`,
        }}
      />
      <span
        style={{
          fontFamily: `var(--f-display)`,
          fontWeight: 900,
          fontSize: `clamp(13px,3.8vw,16px)`,
          lineHeight: 1.2,
          color: `#fff`,
          padding: `0 8px`,
        }}
      >
        {t(c.label)}
      </span>
    </button>
  );
}

function CategoryCardWide({ c, onNavigate }: CategoryCardProps) {
  const { t } = useI18n();
  const { ref, bind } = usePress<HTMLButtonElement>();
  return (
    <button
      ref={ref}
      onClick={() => onNavigate(c.id)}
      {...bind}
      style={{
        gridColumn: `1 / -1`,
        display: `flex`,
        flexDirection: `row`,
        alignItems: `center`,
        border: `1px solid rgba(255,255,255,.22)`,
        background: `rgba(255,255,255,.15)`,
        backdropFilter: `blur(12px)`,
        WebkitBackdropFilter: `blur(12px)`,
        boxShadow: `0 10px 40px -10px rgba(0,0,0,0.25)`,
        borderRadius: 20,
        overflow: `hidden`,
        cursor: `pointer`,
        height: `clamp(120px,35vw,160px)`,
        position: `relative`,
        textAlign: `left`,
      }}
    >
      <div
        style={{
          width: `clamp(110px,32%,150px)`,
          flexShrink: 0,
          alignSelf: `stretch`,
          position: `relative`,
          padding: `12px 0 12px 14px`,
        }}
      >
        <img
          src={c.art}
          alt=""
          style={{
            width: `100%`,
            height: `100%`,
            objectFit: `contain`,
            objectPosition: `left bottom`,
            filter: `drop-shadow(4px 0 14px rgba(0,0,0,.45))`,
          }}
        />
      </div>
      <div
        style={{
          flex: 1,
          padding: `0 20px`,
          minWidth: 0,
        }}
      >
        <span
          style={{
            fontFamily: `var(--f-display)`,
            fontWeight: 900,
            fontSize: `clamp(16px,4.5vw,22px)`,
            lineHeight: 1.2,
            color: `#fff`,
            display: `block`,
          }}
        >
          {t(c.label)}
        </span>
      </div>
    </button>
  );
}

export function Categories({
  onNavigate,
}: {
  onNavigate: (route: Route) => void;
}) {
  const { t } = useI18n();
  const gridCategories = CATEGORIES.filter(
    (category) => category.id !== `english`,
  );
  // English always exists in CATEGORIES and is rendered as the wide card
  const englishCategory = CATEGORIES.find(
    (category) => category.id === `english`,
  )!;
  return (
    <section>
      <div
        style={{
          marginBottom: 14,
        }}
      >
        <span
          style={{
            fontFamily: `var(--f-mono)`,
            fontSize: 12,
            letterSpacing: `.18em`,
            textTransform: `uppercase`,
            color: `var(--ink-3)`,
          }}
        >
          {t(`Categories`)}
        </span>
      </div>
      <div className="vp-cat-grid">
        {gridCategories.map((category) => (
          <CategoryCard
            key={category.id}
            c={category}
            onNavigate={onNavigate}
          />
        ))}
        <CategoryCardWide c={englishCategory} onNavigate={onNavigate} />
      </div>
    </section>
  );
}
