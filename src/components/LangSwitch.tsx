import { useI18n, type Lang } from "../i18n";

const OPTIONS: { lang: Lang; label: string }[] = [
  { lang: `en`, label: `EN` },
  { lang: `my`, label: `မြန်မာ` },
];

export function LangSwitch() {
  const { lang, setLang, t } = useI18n();
  return (
    <div className="vp-lang" role="group" aria-label={t(`Language`)}>
      {OPTIONS.map((option) => (
        <button
          key={option.lang}
          type="button"
          lang={option.lang}
          aria-pressed={lang === option.lang}
          onClick={() => setLang(option.lang)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
