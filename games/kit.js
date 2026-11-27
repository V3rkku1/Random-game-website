// Shared game helpers: synth sound effects (Web Audio, no audio files), M to mute, P/Esc to pause.
// Usage: <script src="../kit.js"></script>, then kit.sfx("jump"), kit.xp(25, "why"), kit.pausable(() => state === "play"), and skip update() while kit.paused.
(() => {
  let ac, noiseBuf, muted = false;
  try { muted = localStorage.getItem("kit-muted") === "1"; } catch {}
  const audio = () => {
    if (!ac) {
      ac = new (window.AudioContext || window.webkitAudioContext)();
      noiseBuf = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
      const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    if (ac.state === "suspended") ac.resume();
    return ac;
  };
  function tone(type, f0, f1, dur, vol = .2, delay = 0) {
    const a = audio(), t = a.currentTime + delay, o = a.createOscillator(), g = a.createGain();
    o.type = type; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.001, t + dur);
    o.connect(g).connect(a.destination); o.start(t); o.stop(t + dur + .02);
  }
  function noise(dur, vol = .3, cutoff = 2000) {
    const a = audio(), t = a.currentTime, s = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain();
    s.buffer = noiseBuf; f.type = "lowpass"; f.frequency.setValueAtTime(cutoff, t); f.frequency.exponentialRampToValueAtTime(80, t + dur);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.001, t + dur);
    s.connect(f).connect(g).connect(a.destination); s.start(t); s.stop(t + dur);
  }
  const SFX = {
    jump: p => tone("square", 280 * p, 620 * p, .14, .08),
    coin: p => { tone("square", 990 * p, 990 * p, .06, .06); tone("square", 1480 * p, 1480 * p, .12, .06, .06); },
    shoot: p => tone("square", 900 * p, 180 * p, .09, .05),
    hit: p => { noise(.18, .3, 1800 * p); tone("sawtooth", 160 * p, 60 * p, .2, .12); },
    boom: p => { noise(.7, .5, 1200 * p); tone("sine", 90 * p, 30 * p, .6, .3); },
    pop: p => tone("sine", 700 * p, 260 * p, .08, .18),
    bounce: p => tone("sine", 520 * p, 520 * p, .05, .12),
    click: p => tone("triangle", 1200 * p, 900 * p, .03, .1),
    knock: p => { noise(.12, .35, 3000 * p); tone("triangle", 380 * p, 200 * p, .1, .12); },
    win: p => [523, 659, 784, 1047].forEach((f, i) => tone("triangle", f * p, f * p, .16, .14, i * .09)),
    lose: p => tone("sawtooth", 320 * p, 70 * p, .55, .12),
  };
  // XP: one shared pot across all games (localStorage, same origin as the site). Level L starts at 50*L*(L-1) XP.
  const GAME = (location.pathname.match(/games\/([^/]+)\//) || [])[1] || "game";
  const num = k => { try { return +localStorage.getItem(k) || 0; } catch { return 0; } };
  let lastOnce;
  const levelOf = xp => Math.floor((1 + Math.sqrt(1 + xp / 12.5)) / 2);
  const kit = window.kit = {
    levelOf, need: L => 50 * L * (L - 1),
    get xpTotal() { return num("kit-xp"); },
    xp(n, why = "", once) { // award XP; toast it; celebrate level-ups. `once`: skip if same token as last award (end screens that re-render)
      n = Math.round(n); if (!(n > 0) || (once != null && once === lastOnce)) return; lastOnce = once;
      const before = num("kit-xp"), after = before + n;
      try { localStorage.setItem("kit-xp", after); localStorage.setItem("kit-xp:" + GAME, num("kit-xp:" + GAME) + n); } catch {}
      const L0 = levelOf(before), L1 = levelOf(after);
      if (L1 > L0) { toast(`⭐ Level ${L1}!`, 1800); kit.sfx("win"); } else toast(`+${n} XP${why ? " · " + why : ""}`);
    },
    paused: false,
    get muted() { return muted; },
    sfx(name, pitch = 1) { if (muted || kit.paused) return; try { SFX[name](pitch); } catch {} },
    toggleMute() {
      muted = !muted; try { localStorage.setItem("kit-muted", muted ? "1" : "0"); } catch {}
      toast(muted ? "🔇 Sound off" : "🔊 Sound on"); if (btn) btn.textContent = muted ? "🔇 Sound off" : "🔊 Sound on";
    },
    pausable(isActive) {
      active = isActive;
      let seen = false; try { seen = localStorage.getItem("kit-hint"); } catch {}
      if (!seen) addEventListener("pointerdown", () => { toast("P pause · M mute"); try { localStorage.setItem("kit-hint", 1); } catch {} }, { once: true });
    },
    setPaused(p) {
      if (p && !(active && active())) return;
      kit.paused = p; mount(); overlay.style.display = p ? "grid" : "none"; btn.textContent = muted ? "🔇 Sound off" : "🔊 Sound on";
    },
  };
  let active = null, overlay, btn, toastEl;
  function mount() {
    if (overlay) return;
    const css = "position:fixed;z-index:9999;font:700 16px system-ui,sans-serif;color:#fff;";
    overlay = document.createElement("div");
    overlay.style.cssText = css + "inset:0;display:grid;place-items:center;background:#000a;backdrop-filter:blur(3px);text-align:center;cursor:pointer";
    overlay.innerHTML = `<div><div style="font-size:42px;font-weight:900">Paused</div><p style="opacity:.8;margin:8px 0 16px">Tap or press P to resume · M to mute</p></div>`;
    btn = document.createElement("button");
    btn.style.cssText = "font:700 15px system-ui;border:0;border-radius:10px;padding:10px 18px;background:#fff2;color:#fff;cursor:pointer";
    btn.onclick = e => { e.stopPropagation(); kit.toggleMute(); };
    overlay.firstChild.append(btn);
    overlay.onclick = () => kit.setPaused(false);
    overlay.onpointerdown = overlay.onpointerup = e => e.stopPropagation(); // the game must not see the resume tap
    document.body.append(overlay);
  }
  function toast(text, ms = 1100) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.style.cssText = "position:fixed;z-index:10000;left:50%;bottom:20%;transform:translateX(-50%);padding:8px 16px;border-radius:99px;background:#000b;color:#fff;font:700 15px system-ui;pointer-events:none;transition:opacity .3s"; document.body.append(toastEl); }
    toastEl.textContent = text; toastEl.style.opacity = 1; clearTimeout(toast.t); toast.t = setTimeout(() => toastEl.style.opacity = 0, ms);
  }
  addEventListener("keydown", e => { // registered before the game's own listeners, so it can swallow keys while paused
    if (e.code === "KeyM" && !e.repeat && kit.keys !== false) kit.toggleMute(); // typing games set kit.keys = false
    else if ((e.code === "KeyP" || e.code === "Escape") && !e.repeat && active) kit.setPaused(!kit.paused);
    else if (kit.paused) { e.stopImmediatePropagation(); e.preventDefault(); }
  }, true);
  addEventListener("blur", () => kit.setPaused(true)); // clicking outside the game iframe or switching tabs
  document.addEventListener("visibilitychange", () => document.hidden && kit.setPaused(true));
  addEventListener("pointerdown", () => ac && ac.state === "suspended" && ac.resume(), true);
})();
