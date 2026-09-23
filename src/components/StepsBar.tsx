import { Fragment } from "react";
import { useI18n } from "../lib/i18n";

export default function StepsBar() {
  const { t } = useI18n();
  const steps = [
    { n: 1, label: t("s1"), sub: t("s1sub"), icon: (<><path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11" /><path d="M12 11V9.5a1.5 1.5 0 0 1 3 0V12" /><path d="M15 12v-1a1.5 1.5 0 0 1 3 0v5.5a5 5 0 0 1-5 5h-1.6a4 4 0 0 1-3.1-1.5L6 17l-1.4-2a1.4 1.4 0 0 1 2-1.9L9 15" /></>) },
    { n: 2, label: t("s2"), sub: t("s2sub"), icon: (<><path d="M3 4h2.2l2.3 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2" /><circle cx="10" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /></>) },
    { n: 3, label: t("s3"), sub: t("s3sub"), icon: (<><rect x="3" y="12" width="18" height="8" rx="2" /><path d="M6.5 12a5.5 5.5 0 0 1 11 0" /></>) },
  ];
  return (
    <div className="steps">
      {steps.map((s, i) => (
        <Fragment key={s.n}>
          {i > 0 && <span className="chev" aria-hidden="true">›</span>}
          <div className="step">
            <span className="num">{s.n}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">{s.icon}</svg>
            <span className="txt"><b>{s.label}</b><small>{s.sub}</small></span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
