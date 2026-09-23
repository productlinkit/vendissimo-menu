import { useEffect, useRef, type ReactNode } from "react";
import { useI18n } from "../../lib/i18n";

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

type Props = { title: string; onClose: () => void; children: ReactNode };

export default function Sheet({ title, onClose, children }: Props) {
  const { t } = useI18n();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // fokus pindah ke dalam sheet, lalu balik ke tombol pembuka saat ditutup
    const opener = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    panel?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab" || !panel) return;

      // kurung Tab di dalam sheet selama sheet terbuka
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
        .filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (!items.length) { e.preventDefault(); panel.focus(); return; }

      const first = items[0];
      const last = items[items.length - 1];
      const here = document.activeElement;
      if (e.shiftKey && (here === first || here === panel)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && here === last) { e.preventDefault(); first.focus(); }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      opener?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="sheet" role="dialog" aria-modal="true" aria-label={title}>
      {/* hanya untuk klik di luar sheet; pengguna keyboard pakai Esc atau tombol tutup di dalam */}
      <button className="sheet-veil" aria-label={t("close")} tabIndex={-1} onClick={onClose} />
      <div className="sheet-panel" ref={panelRef} tabIndex={-1}>
        <div className="grab" aria-hidden="true" />
        {children}
      </div>
    </div>
  );
}
