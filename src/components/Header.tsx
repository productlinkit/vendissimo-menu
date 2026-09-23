import { useI18n } from "../lib/i18n";
import { useClock } from "../hooks/useClock";

export default function Header({ onPlay }: { onPlay: () => void }) {
  const { t, lang, setLang } = useI18n();
  const { time, date } = useClock(lang);

  return (
    <header className="khead">
      <div className="headtop">
        <img className="logo" src="/assets/logo.png" alt="Vendissimo" />
        <div className="headtools">
          <div className="clock"><b>{time}</b><span>{date}</span></div>
          <div className="lang" role="group" aria-label="Language">
            <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>English</button>
            <button type="button" aria-pressed={lang === "my"} lang="my" onClick={() => setLang("my")}>မြန်မာ</button>
          </div>
        </div>
      </div>
      <div className="headmain">
        <div className="headtitle">
          <h1>{t("title")}</h1>
          <p className="sub">{t("subtitle")}</p>
        </div>
        <button className="playbadge" type="button" onClick={onPlay}>
          <span className="words">
            <span className="w1">{t("play1")}</span>
            <span className="w2">{t("play2")}</span>
          </span>
          <span className="crew">
            <img src="/assets/m10.png" alt="" />
            <img src="/assets/m9.png" alt="" />
            <img src="/assets/m6.png" alt="" />
          </span>
        </button>
      </div>
    </header>
  );
}
