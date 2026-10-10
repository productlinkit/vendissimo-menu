import { useState } from "react";
import { useI18n } from "../../i18n";
import { Icon } from "../Icon";
import { MoreOnSite } from "./MoreOnSite";
import type { EnglishSet } from "../../types";

type EnglishPracticeProps = {
  set: EnglishSet;
  onClose: () => void;
  onEarn: () => void;
  /** Accepted for API compatibility; not currently used. */
  onOtherSet: (index: number) => void;
};

export function EnglishPractice({
  set,
  onClose,
  onEarn,
}: EnglishPracticeProps) {
  const { t } = useI18n();
  const questions = set.q;
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [earned, setEarned] = useState(false);
  const question = questions[current];
  const progress = questions.length
    ? ((current + 1) / questions.length) * 100
    : 0;

  function answer(option: number) {
    if (selected !== null) return;
    setSelected(option);
    if (option === question.a) setScore((prev) => prev + 1);
    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        setFinished(true);
        if (!earned) {
          onEarn();
          setEarned(true);
        }
      }
    }, 900);
  }

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
          gap: 10,
          padding: `12px 16px 10px`,
          flexShrink: 0,
          maxWidth: 720,
          width: `100%`,
          marginInline: `auto`,
          boxSizing: `border-box`,
        }}
      >
        <button
          onClick={onClose}
          aria-label={t("Back")}
          style={{
            width: 38,
            height: 38,
            borderRadius: `50%`,
            background: `rgba(255,255,255,.1)`,
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
              letterSpacing: `.16em`,
              textTransform: `uppercase`,
              color: `var(--pink)`,
            }}
          >
            {t("English")}
          </div>
          <div
            style={{
              fontWeight: 700,
              fontSize: 15,
              whiteSpace: `nowrap`,
              overflow: `hidden`,
              textOverflow: `ellipsis`,
            }}
          >
            {t(set.t)}
          </div>
        </div>
        {!finished && (
          <span
            style={{
              fontFamily: `var(--f-mono)`,
              fontSize: 13,
              color: `var(--ink-3)`,
              flexShrink: 0,
            }}
          >
            {current + 1}/{questions.length}
          </span>
        )}
      </div>
      <div
        style={{
          height: 3,
          background: `rgba(255,255,255,.1)`,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            height: `100%`,
            width: finished ? `100%` : `${progress}%`,
            background: `var(--pink)`,
            borderRadius: 99,
            transition: `width .4s cubic-bezier(.22,1,.36,1)`,
          }}
        />
      </div>
      {!finished && (
        <div
          style={{
            flex: 1,
            overflowY: `auto`,
            padding: `24px 16px 32px`,
            display: `flex`,
            flexDirection: `column`,
            alignItems: `stretch`,
          }}
        >
          <div
            style={{
              width: `100%`,
              maxWidth: 720,
              marginInline: `auto`,
              display: `flex`,
              flexDirection: `column`,
              gap: 20,
              flex: 1,
            }}
          >
            <div
              style={{
                background: `var(--card)`,
                border: `1px solid var(--line)`,
                borderRadius: 20,
                padding: `22px 20px`,
              }}
            >
              <div
                style={{
                  fontFamily: `var(--f-mono)`,
                  fontSize: 12,
                  letterSpacing: `.14em`,
                  textTransform: `uppercase`,
                  color: `var(--ink-3)`,
                  marginBottom: 10,
                }}
              >
                {t("Question {n}", { n: current + 1 })}
              </div>
              <h2
                style={{
                  fontSize: `clamp(16px,4vw,22px)`,
                  fontWeight: 700,
                  lineHeight: 1.4,
                }}
              >
                {question.q}
              </h2>
            </div>
            <div className="eq-options">
              {question.o.map((text, idx) => {
                const isAnswer = idx === question.a;
                const isWrong =
                  selected !== null && idx === selected && !isAnswer;
                const isRight = selected !== null && isAnswer;
                return (
                  <button
                    key={idx}
                    onClick={() => answer(idx)}
                    style={{
                      border: `2px solid ${isRight ? `var(--good)` : isWrong ? `var(--bad)` : `var(--line)`}`,
                      background: isRight
                        ? `rgba(60,207,147,.13)`
                        : isWrong
                          ? `rgba(255,107,107,.12)`
                          : `var(--card)`,
                      color: isRight
                        ? `var(--good)`
                        : isWrong
                          ? `var(--bad)`
                          : `var(--ink)`,
                      borderRadius: 14,
                      padding: `14px 18px`,
                      textAlign: `left`,
                      fontSize: 15,
                      fontWeight: 600,
                      transition: `all .2s`,
                      cursor: selected === null ? `pointer` : `default`,
                      display: `flex`,
                      alignItems: `center`,
                      gap: 12,
                    }}
                  >
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: `50%`,
                        flexShrink: 0,
                        fontSize: 13,
                        fontFamily: `var(--f-mono)`,
                        fontWeight: 700,
                        background: isRight
                          ? `rgba(60,207,147,.2)`
                          : isWrong
                            ? `rgba(255,107,107,.2)`
                            : `rgba(255,255,255,.08)`,
                        display: `grid`,
                        placeItems: `center`,
                      }}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {text}
                  </button>
                );
              })}
            </div>
            {selected !== null && question.tip && (
              <div
                style={{
                  padding: `12px 16px`,
                  background: `rgba(254,168,50,.08)`,
                  border: `1px solid rgba(254,168,50,.25)`,
                  borderRadius: 12,
                  fontSize: 13,
                  color: `var(--ink-2)`,
                  lineHeight: 1.55,
                }}
              >
                <span
                  style={{
                    color: `var(--orange)`,
                    fontWeight: 700,
                  }}
                >
                  {t("💡 Tip: ")}
                </span>
                {t(question.tip)}
              </div>
            )}
          </div>
        </div>
      )}
      {finished && (
        <MoreOnSite
          headline="Want to keep learning English?"
          sub={t(
            "You got {score}/{total} correct. Practice more with native speakers.",
            { score, total: questions.length },
          )}
          siteName="SpeakEasy"
          siteUrl="https://www.speakeasy.com"
          onClose={onClose}
        />
      )}
    </div>
  );
}
