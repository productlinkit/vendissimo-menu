// Musik latar peta karnaval, dibangkitkan langsung oleh Web Audio:
// waltz 3/4 bergaya kotak musik dengan bas "oom-pah-pah" dan melodi
// calliope. Tidak ada berkas audio dan tidak ada urusan lisensi --
// melodinya ditulis sendiri, bukan kutipan lagu sirkus yang terkenal.

const BEAT = 60 / 168; // detik per ketuk
/** Detik per birama (3 ketuk); splash menyelaraskan fasenya ke sini. */
export const BAR = BEAT * 3;
/** Jeda dari start() sampai ketuk pertama berbunyi. */
export const LEAD = 0.1;
const LOOKAHEAD = 0.25; // detik ke depan yang dijadwalkan sekaligus
const VOLUME = 0.12;

const hz = (midi: number) => 440 * 2 ** ((midi - 69) / 12);

// [nada MIDI, panjang dalam ketuk]; tiap birama berjumlah 3 ketuk
const MELODY: [number, number][] = [
  [76, 2], [79, 1],
  [84, 2], [83, 1],
  [81, 1], [79, 1], [77, 1],
  [74, 3],
  [74, 2], [77, 1],
  [83, 2], [81, 1],
  [79, 1], [77, 1], [76, 1],
  [72, 3],
  [76, 1], [79, 1], [84, 1],
  [88, 2], [86, 1],
  [84, 1], [81, 1], [77, 1],
  [81, 3],
  [79, 2], [76, 1],
  [74, 1], [77, 1], [83, 1],
  [84, 2], [79, 1],
  [84, 3],
];

// akor per birama: [bas, nada akor untuk "pah-pah"]
const C: [number, number[]] = [48, [60, 64, 67]];
const G7: [number, number[]] = [43, [59, 62, 65]];
const F: [number, number[]] = [41, [60, 65, 69]];
const CHORDS = [C, C, G7, G7, G7, G7, C, C, C, C, F, F, C, G7, C, C];

const LOOP_BEATS = CHORDS.length * 3;

/** Waktu mulai (dalam ketuk) tiap nada melodi di dalam satu putaran. */
const MELODY_AT = MELODY.reduce<number[]>(
  (acc, _, i) => [...acc, i === 0 ? 0 : acc[i - 1] + MELODY[i - 1][1]],
  [],
);

export type Carnival = { start: () => void; stop: () => void; resume: () => void };

export function createCarnival(): Carnival | null {
  const Ctx =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;
  const ctx = new Ctx();

  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  // calliope: gelombang kotak yang dilunakkan, plus getar halus
  const tone = ctx.createBiquadFilter();
  tone.type = `lowpass`;
  tone.frequency.value = 2400;
  tone.connect(master);
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 6;
  const lfoDepth = ctx.createGain();
  lfoDepth.gain.value = 9; // sen
  lfo.connect(lfoDepth);
  lfo.start();

  function note(
    freq: number,
    at: number,
    len: number,
    type: OscillatorType,
    level: number,
    out: AudioNode,
    vibrato = false,
  ) {
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.value = freq;
    if (vibrato) lfoDepth.connect(osc.detune);
    const env = ctx.createGain();
    env.gain.setValueAtTime(0, at);
    env.gain.linearRampToValueAtTime(level, at + 0.012);
    env.gain.exponentialRampToValueAtTime(level * 0.55, at + Math.min(0.18, len * 0.5));
    env.gain.exponentialRampToValueAtTime(0.0001, at + len);
    osc.connect(env).connect(out);
    osc.start(at);
    osc.stop(at + len + 0.02);
    osc.onended = () => {
      if (vibrato) lfoDepth.disconnect(osc.detune);
      env.disconnect();
    };
  }

  let timer: number | undefined;
  let loopStart = 0; // ctx time saat ketuk 0 putaran ini
  let nextBeat = 0; // ketuk berikutnya yang belum dijadwalkan (iringan)
  let nextNote = 0; // indeks nada melodi berikutnya

  function schedule() {
    const horizon = ctx.currentTime + LOOKAHEAD;
    // iringan, per ketuk
    while (loopStart + nextBeat * BEAT < horizon) {
      const at = loopStart + nextBeat * BEAT;
      const [bass, chord] = CHORDS[Math.floor(nextBeat / 3) % CHORDS.length];
      if (nextBeat % 3 === 0) {
        note(hz(bass), at, BEAT * 0.9, `triangle`, 0.55, master);
      } else {
        for (const n of chord) note(hz(n), at, BEAT * 0.35, `triangle`, 0.12, master);
      }
      nextBeat++;
      if (nextBeat === LOOP_BEATS) {
        // putaran selesai: geser titik nol, melodi mulai lagi dari awal
        loopStart += LOOP_BEATS * BEAT;
        nextBeat = 0;
        nextNote = 0;
      }
    }
    // melodi, per nada, dalam putaran yang sama
    while (
      nextNote < MELODY.length &&
      loopStart + MELODY_AT[nextNote] * BEAT < horizon
    ) {
      const [midi, len] = MELODY[nextNote];
      const at = loopStart + MELODY_AT[nextNote] * BEAT;
      note(hz(midi), at, len * BEAT * 0.92, `square`, 0.2, tone, true);
      note(hz(midi + 12), at, len * BEAT * 0.6, `sine`, 0.08, master);
      nextNote++;
    }
  }

  return {
    start() {
      if (timer !== undefined) return;
      void ctx.resume().catch(() => {});
      loopStart = ctx.currentTime + LEAD;
      nextBeat = 0;
      nextNote = 0;
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(VOLUME, ctx.currentTime, 0.4);
      schedule();
      timer = window.setInterval(schedule, 60);
    },
    stop() {
      if (timer === undefined) return;
      window.clearInterval(timer);
      timer = undefined;
      // memudar, bukan putus mendadak
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.15);
    },
    /** Browser menahan audio sampai ada sentuhan pertama; panggil saat itu. */
    resume() {
      if (ctx.state === `suspended`) void ctx.resume().catch(() => {});
    },
  };
}
