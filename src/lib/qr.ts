// Kode QR tiruan untuk peragaan - polanya tetap sama untuk jumlah yang sama.
export function drawQR(cv: HTMLCanvasElement, seedBase: number) {
  const ctx = cv.getContext("2d");
  if (!ctx) return;
  const n = 29;
  const size = cv.width / n;
  let seed = 7 + seedBase;
  const rnd = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, cv.width, cv.height);
  ctx.fillStyle = "#2B1150";
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if ((x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9)) continue;
      if (rnd() > 0.52) ctx.fillRect(x * size, y * size, size, size);
    }
  }
  const finder = (fx: number, fy: number) => {
    ctx.fillStyle = "#2B1150"; ctx.fillRect(fx * size, fy * size, 7 * size, 7 * size);
    ctx.fillStyle = "#FFFFFF"; ctx.fillRect((fx + 1) * size, (fy + 1) * size, 5 * size, 5 * size);
    ctx.fillStyle = "#F5187E"; ctx.fillRect((fx + 2) * size, (fy + 2) * size, 3 * size, 3 * size);
  };
  finder(0, 0); finder(n - 7, 0); finder(0, n - 7);
}
