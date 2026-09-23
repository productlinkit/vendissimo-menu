import { createContext, useContext } from "react";

export type Lang = "en" | "my";

export const STR = {
  en: {
    title: "Snacks & Drinks", subtitle: "Pick your favourite!",
    search: "Search product...",
    yourCart: "Your Cart", total: "Total", checkout: "Checkout",
    noItems: "Tap here to see your items", nItems: "items in cart", oneItem: "1 item in cart",
    play1: "PLAY GAME", play2: "WHILE YOU WAIT",
    s1: "Select", s1sub: "Tap product to add",
    s2: "Checkout", s2sub: "Confirm your items",
    s3: "Collect", s3sub: "Take your product",
    note1: "Good snacks, brighter days!", note2: "Snack · Play · Repeat",
    all: "All", drinks: "Drinks", snacks: "Snacks", sweets: "Sweets", games: "Games",
    soldOut: "Sold out", added: "added to cart", removed: "removed",
    onlyLeft: "Only {n} left in slot {s}", nothing: "Nothing here. Try another category.",
    slide: "Slide sideways for more", page: "Page {n} of {m}",
    cartTitle: "Your Cart", cartSub: "Machine VDS-014 · Lobby Building A",
    emptyCart: "Your cart is empty", emptySub: "Add something tasty from the menu.",
    addMore: "Add more items", removeItem: "Remove", subtotal: "Subtotal", coupon: "Coupon",
    qrLabel: "Scan QR code", walletLabel: "Mobile wallet", cardLabel: "Bank card",
    pay: "Pay", payTitle: "Complete payment",
    qrHint: "Scan this MMQR code with KBZPay, AYA Pay or CB Pay",
    walletHint: "Open your wallet app and approve the bill",
    cardHint: "Tap your card on the reader at the machine",
    qrTag: "MMQR · Myanmar national QR", walletTag: "Works with every wallet app below",
    expires: "Expires in", paid: "I have paid", backCart: "Back to cart", expired: "Payment time is over",
    okTitle: "Payment successful", okSub: "The machine is dispensing your order",
    preparing: "Preparing...", dispensed: "Dispensed",
    push: "Collect your items from the flap at the bottom of the machine.",
    playGame: "Play a game while you wait", done: "Done",
    gameTitle: "Snack Catch",
    gameSub: "Tap the snacks as they pop up. 30 seconds — score 6 or more to win a coupon.",
    score: "Score", time: "Time", best: "Best", playAgain: "Play again", close: "Close",
    useCoupon: "Use it in my cart",
    won: "{a} off, applied automatically at checkout. Your score: {n}",
    lost: "You need 6 points for a coupon. One more try?", scoreIs: "Score {n}",
  },
  my: {
    title: "မုန့်နှင့် အဖျော်ယမကာ", subtitle: "နှစ်သက်ရာ ရွေးချယ်ပါ",
    search: "ပစ္စည်း ရှာရန်...",
    yourCart: "စျေးခြင်း", total: "စုစုပေါင်း", checkout: "ငွေရှင်းရန်",
    noItems: "ပစ္စည်းများကြည့်ရန် ဤနေရာကို နှိပ်ပါ", nItems: "ခု ထည့်ထားသည်", oneItem: "၁ ခု ထည့်ထားသည်",
    play1: "ဂိမ်းကစားပါ", play2: "စောင့်နေစဉ်",
    s1: "ရွေးပါ", s1sub: "ပစ္စည်းကို နှိပ်ပါ",
    s2: "ငွေရှင်းပါ", s2sub: "ပစ္စည်းများ အတည်ပြုပါ",
    s3: "ထုတ်ယူပါ", s3sub: "ပစ္စည်းကို ယူပါ",
    note1: "မုန့်ကောင်းလေး၊ နေ့ကောင်းလေး", note2: "စား · ကစား · ထပ်လာပါ",
    all: "အားလုံး", drinks: "အဖျော်ယမကာ", snacks: "မုန့်", sweets: "အချိုပွဲ", games: "ဂိမ်း",
    soldOut: "ကုန်သွားပြီ", added: "ကို ထည့်ပြီးပါပြီ", removed: "ကို ဖယ်ပြီးပါပြီ",
    onlyLeft: "{s} တွင် {n} ခုသာ ကျန်ပါသည်", nothing: "ဤနေရာတွင် မရှိပါ။ အခြားအမျိုးအစား ရွေးကြည့်ပါ။",
    slide: "ဆက်ကြည့်ရန် ဘေးသို့ ပွတ်ဆွဲပါ", page: "စာမျက်နှာ {n} / {m}",
    cartTitle: "စျေးခြင်း", cartSub: "စက် VDS-014 · Lobby A",
    emptyCart: "စျေးခြင်း ဗလာဖြစ်နေသည်", emptySub: "မီနူးမှ တစ်ခုခု ရွေးထည့်ပါ။",
    addMore: "ပစ္စည်း ထပ်ထည့်ရန်", removeItem: "ဖယ်ရှားရန်", subtotal: "ပစ္စည်းတန်ဖိုး", coupon: "ကူပွန်",
    qrLabel: "QR ကုဒ် စကင်ဖတ်ရန်", walletLabel: "မိုဘိုင်း ပိုက်ဆံအိတ်", cardLabel: "ဘဏ်ကတ်",
    pay: "ပေးချေရန်", payTitle: "ငွေပေးချေပါ",
    qrHint: "ဤ MMQR ကုဒ်ကို KBZPay, AYA Pay သို့မဟုတ် CB Pay ဖြင့် စကင်ဖတ်ပါ",
    walletHint: "ပိုက်ဆံအိတ်အက်ပ်ကို ဖွင့်၍ အတည်ပြုပါ",
    cardHint: "ကတ်ကို စက်ရှိ reader တွင် ထိပါ",
    qrTag: "MMQR · မြန်မာ့ QR စံ", walletTag: "အောက်ပါ အက်ပ်အားလုံးဖြင့် ရပါသည်",
    expires: "သက်တမ်းကုန်ရန်", paid: "ငွေပေးချေပြီးပါပြီ", backCart: "စျေးခြင်းသို့ ပြန်ရန်",
    expired: "ငွေပေးချေချိန် ကုန်သွားပါပြီ",
    okTitle: "ငွေပေးချေမှု အောင်မြင်ပါသည်", okSub: "စက်မှ ပစ္စည်း ထုတ်ပေးနေပါသည်",
    preparing: "ပြင်ဆင်နေသည်...", dispensed: "ထုတ်ပေးပြီး",
    push: "စက်အောက်ခြေရှိ တံခါးမှ ပစ္စည်းကို ထုတ်ယူပါ။",
    playGame: "စောင့်နေစဉ် ဂိမ်းကစားပါ", done: "ပြီးပါပြီ",
    gameTitle: "မုန့်ဖမ်းဂိမ်း",
    gameSub: "ပေါ်လာသော မုန့်များကို နှိပ်ပါ။ ၃၀ စက္ကန့် — ၆ မှတ်ရလျှင် ကူပွန်ရပါမည်။",
    score: "ရမှတ်", time: "အချိန်", best: "အမြင့်ဆုံး", playAgain: "ထပ်ကစားရန်", close: "ပိတ်ရန်",
    useCoupon: "စျေးခြင်းတွင် သုံးရန်",
    won: "{a} လျှော့ပေးမည်၊ ငွေရှင်းချိန် အလိုအလျောက် သုံးပါမည်။ ရမှတ် - {n}",
    lost: "ကူပွန်ရရန် ၆ မှတ် လိုပါသည်။ ထပ်ကစားမလား။", scoreIs: "ရမှတ် {n}",
  },
} as const;

export type Key = keyof typeof STR.en;

export type I18n = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: Key) => string;
  fmt: (k: Key, vals: Record<string, string | number>) => string;
};

export const LangContext = createContext<I18n>({
  lang: "en",
  setLang: () => {},
  t: (k) => STR.en[k],
  fmt: (k) => STR.en[k],
});

export const useI18n = () => useContext(LangContext);

export function makeI18n(lang: Lang, setLang: (l: Lang) => void): I18n {
  const t = (k: Key) => (STR[lang] as Record<string, string>)[k] ?? STR.en[k];
  const fmt = (k: Key, vals: Record<string, string | number>) =>
    t(k).replace(/\{(\w+)\}/g, (_, n: string) => String(vals[n] ?? ""));
  return { lang, setLang, t, fmt };
}
