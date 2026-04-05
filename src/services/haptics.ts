// Lightweight haptic + sound feedback for premium app feel

const audioCtx = () => {
  if (!(window as any).__bodifyAudioCtx) {
    (window as any).__bodifyAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return (window as any).__bodifyAudioCtx as AudioContext;
};

function playTone(freq: number, duration: number, vol = 0.08) {
  try {
    const ctx = audioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
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
    playTone(1200, 0.06, 0.04);
  },

  /** Success — completed action */
  success: () => {
    vibrate([10, 30, 10]);
    playTone(880, 0.1, 0.06);
    setTimeout(() => playTone(1320, 0.12, 0.06), 100);
  },

  /** Error/warning */
  error: () => {
    vibrate([40, 20, 40]);
    playTone(220, 0.15, 0.05);
  },

  /** Heavy — important action like send */
  heavy: () => {
    vibrate(20);
    playTone(660, 0.08, 0.05);
  },

  /** Heartbeat — goal completion */
  heartbeat: () => {
    vibrate([30, 60, 30, 60, 30]);
  },
};
