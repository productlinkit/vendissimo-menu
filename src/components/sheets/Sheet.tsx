import { useEffect, type ReactNode } from "react";
import { useI18n } from "../../lib/i18n";

export default function Sheet({ onClose, children }: { onClose: () => void; children: ReactNode }) {
  const { t } = useI18n();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="sheet" role="dialog" aria-modal="true">
      <button className="sheet-veil" aria-label={t("close")} onClick={onClose} />
      <div className="sheet-panel">
        <div className="grab" />
        {children}
      </div>
    </div>
  );
}
