// Premium haptic + sound feedback system

let _ctx: AudioContext | null = null;

const audioCtx = (): AudioContext => {
  if (!_ctx || _ctx.state === 'closed') {
    _ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (_ctx.state === 'suspended') _ctx.resume().catch(() => {});
  return _ctx;
};

function playTone(freq: number, duration: number, vol = 0.08, type: OscillatorType = 'sine') {
  try {
    const ctx = audioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch { /* silent fail */ }
}

function playChord(freqs: number[], duration: number, vol = 0.04, type: OscillatorType = 'sine') {
  freqs.forEach(f => playTone(f, duration, vol, type));
}

function playSweep(startFreq: number, endFreq: number, duration: number, vol = 0.06) {
  try {
    const ctx = audioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + duration);
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch { /* silent fail */ }
}

function vibrate(pattern: number | number[]) {
  try { navigator.vibrate?.(pattern); } catch { /* no-op */ }
}

export const haptics = {
  /** Light tap — buttons, selections */
  tap: () => {
    vibrate(8);
    playTone(1200, 0.05, 0.03);
  },

  /** Success — completed action, two-note chime */
  success: () => {
    vibrate([10, 30, 10]);
    playTone(784, 0.12, 0.05); // G5
    setTimeout(() => playTone(1047, 0.15, 0.06), 90); // C6
    setTimeout(() => playTone(1319, 0.18, 0.04), 200); // E6
  },

  /** Error/warning — low rumble */
  error: () => {
    vibrate([40, 20, 40]);
    playTone(180, 0.18, 0.06, 'triangle');
    setTimeout(() => playTone(140, 0.15, 0.04, 'triangle'), 80);
  },

  /** Heavy — send message, important action */
  heavy: () => {
    vibrate(20);
    playSweep(400, 800, 0.1, 0.05);
  },

  /** Navigation swoosh — tab changes */
  navigate: () => {
    vibrate(6);
    playSweep(600, 1400, 0.08, 0.03);
  },

  /** Toggle — switch on/off */
  toggle: (on: boolean) => {
    vibrate(5);
    playTone(on ? 1100 : 800, 0.06, 0.03);
  },

  /** Notification chime — alerts, new data */
  notify: () => {
    vibrate([8, 40, 8]);
    playChord([880, 1109], 0.15, 0.03);
    setTimeout(() => playChord([1047, 1319], 0.2, 0.03), 120);
  },

  /** Heartbeat — goal completion */
  heartbeat: () => {
    vibrate([30, 60, 30, 60, 30]);
    playTone(220, 0.12, 0.04, 'triangle');
    setTimeout(() => playTone(220, 0.1, 0.03, 'triangle'), 200);
  },

  /** Coin / reward collected */
  reward: () => {
    vibrate([10, 20, 10]);
    const notes = [523, 659, 784, 1047]; // C5 E5 G5 C6
    notes.forEach((f, i) => setTimeout(() => playTone(f, 0.1, 0.04), i * 60));
  },
};
