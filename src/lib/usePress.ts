import { useRef } from "react";

/** Springy press-down scale for tappable elements. `base` is any transform to keep. */
export function usePress<T extends HTMLElement = HTMLElement>(base = ``) {
  const ref = useRef<T>(null);
  const set = (pressed: boolean, duration: string, easing: string) => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = `transform ${duration} ${easing}, box-shadow ${duration} ease`;
    el.style.transform = pressed ? `${base} scale(0.93)`.trim() : base;
  };
  return {
    ref,
    bind: {
      onPointerDown: () => set(true, `0.08s`, `ease`),
      onPointerUp: () => set(false, `0.45s`, `cubic-bezier(.34,1.56,.64,1)`),
      onPointerLeave: () => set(false, `0.35s`, `cubic-bezier(.34,1.56,.64,1)`),
      onPointerCancel: () => set(false, `0.35s`, `cubic-bezier(.34,1.56,.64,1)`),
    },
  };
}
