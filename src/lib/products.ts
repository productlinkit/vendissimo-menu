export type Shape = "can" | "tube" | "bottle" | "bag" | "box" | "bar" | "cup" | "token";
export type CatId = "all" | "drinks" | "snacks" | "sweets" | "games";

export type Product = {
  id: string;
  slot: string;
  en: string;
  my: string;
  mark: string;
  price: number; // dalam sen
  cat: Exclude<CatId, "all">;
  shape: Shape;
  bg: [string, string];
  ink: string;
  stock: number;
};

export const PRODUCTS: Product[] = [
  { id: "cola",   slot: "A1", en: "Coca-Cola",          my: "Coca-Cola",            mark: "Cola",    price: 150, cat: "drinks", shape: "can",    bg: ["#FF5A5A", "#C8102E"], ink: "#C8102E", stock: 8 },
  { id: "sprite", slot: "A2", en: "Sprite",             my: "Sprite",               mark: "Sprite",  price: 150, cat: "drinks", shape: "can",    bg: ["#5FD97B", "#0E8A3E"], ink: "#0E8A3E", stock: 6 },
  { id: "fanta",  slot: "A3", en: "Fanta",              my: "Fanta",                mark: "Fanta",   price: 150, cat: "drinks", shape: "can",    bg: ["#FFB245", "#EE7203"], ink: "#EE7203", stock: 0 },
  { id: "aqua",   slot: "A4", en: "Drinking Water",     my: "သောက်ရေသန့်",            mark: "Water",   price: 100, cat: "drinks", shape: "bottle", bg: ["#9FD8FF", "#1E7FD6"], ink: "#1E7FD6", stock: 12 },
  { id: "lays",   slot: "B1", en: "Lay's Classic",      my: "Lay's Classic",        mark: "Lay's",   price: 150, cat: "snacks", shape: "bag",    bg: ["#FFE066", "#F0B400"], ink: "#C88A00", stock: 7 },
  { id: "prin",   slot: "B2", en: "Pringles",           my: "Pringles",             mark: "Pringles",price: 200, cat: "snacks", shape: "tube",   bg: ["#FF7B7B", "#C1121F"], ink: "#C1121F", stock: 5 },
  { id: "oreo",   slot: "B3", en: "Oreo",               my: "Oreo",                 mark: "Oreo",    price: 150, cat: "sweets", shape: "box",    bg: ["#5B9BFF", "#12379B"], ink: "#12379B", stock: 9 },
  { id: "pocky",  slot: "B4", en: "Pocky",              my: "Pocky",                mark: "Pocky",   price: 150, cat: "sweets", shape: "box",    bg: ["#FF6B7A", "#B3121F"], ink: "#B3121F", stock: 4 },
  { id: "kitkat", slot: "C1", en: "KitKat",             my: "KitKat",               mark: "KitKat",  price: 150, cat: "sweets", shape: "bar",    bg: ["#FF6F6F", "#B3121F"], ink: "#B3121F", stock: 6 },
  { id: "mms",    slot: "C2", en: "M&M's",              my: "M&M's",                mark: "M&M",     price: 150, cat: "sweets", shape: "bag",    bg: ["#FFD84D", "#E8A400"], ink: "#C07C00", stock: 5 },
  { id: "taro",   slot: "C3", en: "Taro Snack",         my: "Taro မုန့်",             mark: "Taro",    price: 150, cat: "snacks", shape: "bag",    bg: ["#6BC96B", "#14612B"], ink: "#14612B", stock: 6 },
  { id: "noodle", slot: "C4", en: "Instant Noodles",    my: "ခေါက်ဆွဲခွက်",           mark: "Noodles", price: 200, cat: "snacks", shape: "cup",    bg: ["#FFC978", "#E06A10"], ink: "#C2540A", stock: 4 },
  { id: "token",  slot: "D1", en: "Arcade Token",       my: "ဂိမ်းတိုကင်",             mark: "Token",   price: 100, cat: "games",  shape: "token",  bg: ["#B98BFF", "#5B21B6"], ink: "#5B21B6", stock: 30 },
  { id: "claw",   slot: "D2", en: "Claw Machine Play",  my: "ကလော်စက် ကစားခွင့်",      mark: "Claw",    price: 200, cat: "games",  shape: "token",  bg: ["#FF8ACB", "#C2005F"], ink: "#C2005F", stock: 20 },
];

export type BrandKey = "kbz" | "wave" | "aya" | "cb" | "mmqr" | "mpu" | "visa" | "mc" | "okd";
export const BRANDS: Record<BrandKey, { name: string; bg: string; fg: string }> = {
  kbz:  { name: "KBZPay",     bg: "#0A3A82", fg: "#fff" },
  wave: { name: "Wave Pay",   bg: "#FFC20E", fg: "#16274F" },
  aya:  { name: "AYA Pay",    bg: "#F26522", fg: "#fff" },
  cb:   { name: "CB Pay",     bg: "#005BAA", fg: "#fff" },
  mmqr: { name: "MMQR",       bg: "#0F8F8F", fg: "#fff" },
  mpu:  { name: "MPU",        bg: "#0B7A4B", fg: "#fff" },
  visa: { name: "VISA",       bg: "#1A1F71", fg: "#fff" },
  mc:   { name: "Mastercard", bg: "#EB001B", fg: "#fff" },
  okd:  { name: "OK$",        bg: "#E30613", fg: "#fff" },
};

export const money = (cents: number) => "$" + (cents / 100).toFixed(2);
export const tileStyle = (p: Product) => ({ background: `linear-gradient(160deg, ${p.bg[0]}, ${p.bg[1]})` });
