import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { MY } from "./my";

export type Lang = "en" | "my";
type Vars = Record<string, string | number>;

const STORAGE_KEY = `vendissimo-lang`;

/** Saved choice first, otherwise follow the device language (Burmese -> Myanmar). */
function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === `en` || saved === `my`) return saved;
  } catch {}
  return navigator.language?.toLowerCase().startsWith(`my`) ? `my` : `en`;
}

/**
 * Strings are looked up by their English text, so `t("Rewards")` shows the
 * English as-is and falls back to it when a Myanmar translation is missing.
 * `{name}` placeholders are filled from `vars` after translation.
 */
function translate(lang: Lang, text: string, vars?: Vars) {
  const out = (lang === `my` && MY[text]) || text;
  return vars ? out.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ``)) : out;
}

type I18n = { lang: Lang; setLang: (lang: Lang) => void; t: (text: string, vars?: Vars) => string };

const LangContext = createContext<I18n>({
  lang: `en`,
  setLang: () => {},
  t: (text, vars) => translate(`en`, text, vars),
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const value = useMemo(
    () => ({ lang, setLang, t: (text: string, vars?: Vars) => translate(lang, text, vars) }),
    [lang, setLang],
  );
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useI18n = () => useContext(LangContext);
