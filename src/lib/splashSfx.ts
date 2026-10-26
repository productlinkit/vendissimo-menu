// Efek suara splash bergaya game 8-bit, dibangkitkan langsung oleh Web Audio
// seperti musik karnaval. Seluruh rangkaian dijadwalkan sekaligus saat tap,
// pada jam audio, supaya tiap bunyi jatuh tepat di momen animasinya.

/** Momen-momen splash, dalam detik sejak tap. Loader memakai angka yang sama. */
export const SPLASH = {
  spin: 2.25,
  vanish: 5.45,
  out: 6.25,
  done: 6.85,
};

/** Jumlah robot yang berkumpul, dan jeda antar kedatangannya di Loader. */
const ITEMS = 10;
const itemDelay = (i: number) => 0.05 + i * 0.04;

/** Putaran cincin di Loader: 720°, `spinOrbitRing 2.8s cubic-bezier(.36,.05,.2,1)`. */
export const SPIN_LEN = 2.8;
const SPIN_EASE = [0.36, 0.05, 0.2, 1] as const;
const SPIN_TURNS = 2;

/**
 * Detik (sejak putaran mulai) saat cincin mencapai `progress` 0..1, dengan
 * membalik kurva cubic-bezier CSS yang sama.
 */
function spinTimeAt(progress: number) {
  const [x1, y1, x2, y2] = SPIN_EASE;
  const bez = (s: number, a: number, b: number) =>
    3 * a * s * (1 - s) ** 2 + 3 * b * s ** 2 * (1 - s) + s ** 3;
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2;
    if (bez(mid, y1, y2) < progress) lo = mid;
    else hi = mid;
  }
  return bez(lo, x1, x2) * SPIN_LEN;
}

const VOLUME = 0.16;
const hz = (midi: number) => 440 * 2 ** ((midi - 69) / 12);

/**
 * Mainkan semua efek splash. Panggil di dalam handler tap itu sendiri,
 * karena browser hanya mengizinkan audio dibuka di sana.
 */
export function playSplashSfx() {
  const Ctx =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return;
  const ctx = new Ctx();
  void ctx.resume().catch(() => {});
  const t0 = ctx.currentTime + 0.02;

  const master = ctx.createGain();
  master.gain.value = VOLUME;
  master.connect(ctx.destination);

  /** Satu nada chiptune; `slideTo` menggeser nada sepanjang durasinya. */
  function blip(
    at: number,
    freq: number,
    len: number,
    type: OscillatorType,
    level: number,
    slideTo?: number,
  ) {
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, at);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, at + len);
    const env = ctx.createGain();
    env.gain.setValueAtTime(0, at);
    env.gain.linearRampToValueAtTime(level, at + 0.005);
    env.gain.exponentialRampToValueAtTime(0.0001, at + len);
    osc.connect(env).connect(master);
    osc.start(at);
    osc.stop(at + len + 0.02);
  }

  /**
   * Desis angin putaran: keras dan tinggi saat cincin paling cepat, reda saat
   * melambat. `speed` berisi [detik, kecepatan 0..1] sepanjang putaran.
   */
  function whoosh(at: number, len: number, speed: [number, number][], level: number) {
    const buf = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * len), ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = `bandpass`;
    filter.Q.value = 1.4;
    filter.frequency.setValueAtTime(300, at);
    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, at);
    for (const [t, v] of speed) {
      filter.frequency.linearRampToValueAtTime(300 + v * 2600, at + t);
      env.gain.linearRampToValueAtTime(0.0001 + v * level, at + t);
    }
    env.gain.linearRampToValueAtTime(0.0001, at + len);
    src.connect(filter).connect(env).connect(master);
    src.start(at);
    src.stop(at + len);
  }

  // 1. tap: bunyi koin
  blip(t0, hz(83), 0.07, `square`, 0.35);
  blip(t0 + 0.07, hz(88), 0.32, `square`, 0.35);

  // 2. robot berkumpul: "plop" naik satu per satu, tangga nada pentatonik
  const PENTA = [0, 2, 4, 7, 9];
  for (let i = 0; i < ITEMS; i++) {
    const midi = 67 + PENTA[i % 5] + 12 * Math.floor(i / 5);
    const at = t0 + 0.12 + itemDelay(i) + 0.2;
    blip(at, hz(midi - 7), 0.11, `sine`, 0.5, hz(midi + 5));
  }

  // 3. mengisi tenaga menjelang putaran
  blip(t0 + 1.35, hz(48), SPLASH.spin - 1.35, `square`, 0.12, hz(72));

  // 4. putaran: "tik" roda hadiah tiap kali satu robot melewati puncak,
  //    rapat saat kencang dan merenggang saat melambat, plus desis angin
  const spinAt = t0 + SPLASH.spin;
  const TICKS = ITEMS * SPIN_TURNS;
  const tickAt = Array.from({ length: TICKS + 1 }, (_, k) => spinTimeAt(k / TICKS));
  const gaps = tickAt.slice(1).map((t, k) => t - tickAt[k]);
  const fastest = Math.min(...gaps);
  const speed: [number, number][] = gaps.map((g, k) => [tickAt[k + 1], fastest / g]);
  whoosh(spinAt, SPIN_LEN, speed, 0.9);
  tickAt.slice(1).forEach((t, k) => {
    const last = k === TICKS - 1;
    // nada tik naik pelan sepanjang putaran; tik terakhir jadi "klik" mantap
    blip(spinAt + t, hz(last ? 79 : 84 + k * 0.6), last ? 0.18 : 0.035, `square`, last ? 0.5 : 0.32);
  });
  blip(spinAt + SPIN_LEN, hz(67), 0.25, `triangle`, 0.4, hz(79));

  // 5. logo menghilang: fanfare "level up" + kilau
  const FANFARE = [72, 76, 79, 84];
  FANFARE.forEach((m, i) =>
    blip(t0 + SPLASH.vanish + i * 0.075, hz(m), 0.12, `square`, 0.3),
  );
  const end = t0 + SPLASH.vanish + FANFARE.length * 0.075;
  for (const m of [84, 88, 91]) blip(end, hz(m), 0.6, `triangle`, 0.22);
  for (let i = 0; i < 6; i++) {
    blip(end + 0.08 + i * 0.06, hz(96 + (i % 3) * 3), 0.1, `sine`, 0.12);
  }

  // tutup konteksnya sesudah bunyi terakhir habis
  window.setTimeout(() => void ctx.close().catch(() => {}), (SPLASH.done + 1.5) * 1000);
}
