import { useCallback, useEffect, useMemo, useState } from "react";
import { PRODUCTS, type CatId, type Product } from "./lib/products";
import { LangContext, makeI18n, type Lang } from "./lib/i18n";
import { load, save } from "./lib/storage";
import { usePhotos } from "./hooks/usePhotos";
import Header from "./components/Header";
import StepsBar from "./components/StepsBar";
import CategoryRail from "./components/CategoryRail";
import ProductDeck from "./components/ProductDeck";
import CartBar from "./components/CartBar";
import CartSheet, { type PayMethod } from "./components/sheets/CartSheet";
import PaymentSheet from "./components/sheets/PaymentSheet";
import SuccessSheet from "./components/sheets/SuccessSheet";
import GameSheet from "./components/sheets/GameSheet";

type SheetName = null | "cart" | "pay" | "done" | "game";
type Voucher = { code: string; amount: number } | null;

const saved = load();

export default function App() {
  const [lang, setLangState] = useState<Lang>(saved.lang ?? "en");
  const [cat, setCat] = useState<CatId>("all");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [stock, setStock] = useState<Record<string, number>>(
    () => Object.fromEntries(PRODUCTS.map((p) => [p.id, p.stock])),
  );
  const [sheet, setSheet] = useState<SheetName>(null);
  const [method, setMethod] = useState<PayMethod>("qris");
  const [voucher, setVoucher] = useState<Voucher>(saved.voucher ?? null);
  const [best, setBest] = useState(saved.best ?? 0);
  const [toast, setToast] = useState("");
  const [paidLines, setPaidLines] = useState<{ p: Product; qty: number }[]>([]);

  const photos = usePhotos();

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    save({ ...load(), lang: l });
  }, []);

  const i18n = useMemo(() => makeI18n(lang, setLang), [lang, setLang]);
  const { t, fmt } = i18n;

  useEffect(() => { document.documentElement.setAttribute("lang", lang); }, [lang]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(""), 1900);
    return () => clearTimeout(id);
  }, [toast]);

  const lines = useMemo(
    () => PRODUCTS.filter((p) => (cart[p.id] ?? 0) > 0).map((p) => ({ p, qty: cart[p.id] })),
    [cart],
  );
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = lines.reduce((s, l) => s + l.p.price * l.qty, 0);
  const discount = voucher ? Math.min(voucher.amount, subtotal) : 0;
  const total = Math.max(0, subtotal - discount);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const inCat = cat === "all" || p.cat === cat;
      const inQ = !q || p.en.toLowerCase().includes(q) || p.my.toLowerCase().includes(q);
      return inCat && inQ;
    });
  }, [cat, query]);

  const add = (p: Product) => {
    const have = cart[p.id] ?? 0;
    const left = stock[p.id] ?? p.stock;
    if (have >= left) { setToast(fmt("onlyLeft", { n: left, s: p.slot })); return; }
    setCart((c) => ({ ...c, [p.id]: have + 1 }));
    if (have === 0) setToast(`${lang === "my" ? p.my : p.en} ${t("added")}`);
  };
  const remove = (p: Product) => setCart((c) => ({ ...c, [p.id]: Math.max(0, (c[p.id] ?? 0) - 1) }));
  const kill = (p: Product) => {
    setCart((c) => ({ ...c, [p.id]: 0 }));
    setToast(`${lang === "my" ? p.my : p.en} ${t("removed")}`);
  };

  const onPaid = () => {
    setPaidLines(lines);
    setStock((s) => {
      const next = { ...s };
      lines.forEach(({ p, qty }) => { next[p.id] = Math.max(0, (next[p.id] ?? p.stock) - qty); });
      return next;
    });
    setCart({});
    if (voucher) { setVoucher(null); save({ ...load(), voucher: null }); }
    setSheet("done");
  };

  return (
    <LangContext.Provider value={i18n}>
      <div className="stage">
        <div className="kiosk">
          <Header onPlay={() => setSheet("game")} />
          <StepsBar />

          <div className="kbody">
            <CategoryRail active={cat} onPick={setCat} />
            <main className="deckcol">
              <div className="toolbar" role="search">
                <label className="search">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.6-3.6" /></svg>
                  <input
                    id="search" type="search" placeholder={t("search")} aria-label={t("searchLabel")}
                    value={query} onChange={(e) => setQuery(e.target.value)}
                  />
                </label>
              </div>

              <ProductDeck
                list={visible} stock={stock} cart={cart} photos={photos}
                onAdd={add} onRemove={remove} resetKey={cat + "|" + query}
              />
            </main>
          </div>

          <CartBar count={count} total={total} onOpen={() => setSheet("cart")} />
        </div>

        <div className="notes">
          <span>{t("note1")}</span>
          <span className="right">{t("note2")}</span>
        </div>
      </div>

      {sheet === "cart" && (
        <CartSheet
          lines={lines} photos={photos} subtotal={subtotal} discount={discount} total={total}
          voucher={voucher} method={method} onMethod={setMethod}
          onAdd={add} onRemove={remove} onKill={kill}
          onPay={() => setSheet("pay")} onClose={() => setSheet(null)}
        />
      )}

      {sheet === "pay" && (
        <PaymentSheet
          method={method} total={total}
          onPaid={onPaid} onBack={() => setSheet("cart")}
          onExpire={() => { setSheet("cart"); setToast(t("expired")); }}
          onClose={() => setSheet(null)}
        />
      )}

      {sheet === "done" && (
        <SuccessSheet lines={paidLines} photos={photos} onGame={() => setSheet("game")} onClose={() => setSheet(null)} />
      )}

      {sheet === "game" && (
        <GameSheet
          best={best}
          onBest={(n) => { setBest(n); save({ ...load(), best: n }); }}
          onWin={(v) => { setVoucher(v); save({ ...load(), voucher: v }); }}
          onUseCoupon={() => setSheet("cart")}
          onClose={() => setSheet(null)}
        />
      )}

      {toast && <div className="toast" role="status">{toast}</div>}
    </LangContext.Provider>
  );
}
