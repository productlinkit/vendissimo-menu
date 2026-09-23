export type Saved = { best?: number; lang?: "en" | "my"; voucher?: { code: string; amount: number } | null };

const KEY = "vds_kiosk";

export function load(): Saved {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Saved) : {};
  } catch {
    return {};
  }
}

export function save(data: Saved) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* mode penyamaran atau penyimpanan diblokir - abaikan */
  }
}
