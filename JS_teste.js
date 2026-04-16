// ============================================================
//  SEP Dashboard — Transmissão de Energia
//  script.js
// ============================================================

const state = { left: false, right: false };

// Base values for simulation
const BASE = {
  volt: 230, amp: 320, pow: 73.6, fp: 0.95
};

let ticker = null;

// ─── DOM References ──────────────────────────────────────
const el = id => document.getElementById(id);

// ─── Utility: random fluctuation ─────────────────────────
const jitter = (base, pct) => (base + (Math.random() - 0.5) * base * pct);
const fmt    = (n, d=1)    => n.toFixed(d);

// ─── Sparks effect on button click ───────────────────────
function spawnSparks(event) {
  const container = el('sparksContainer');
  const x = event.clientX, y = event.clientY;
  for (let i = 0; i < 14; i++) {
    const s = document.createElement('div');
    s.className = 'spark';
    const angle = Math.random() * Math.PI * 2;
    const dist  = 30 + Math.random() * 60;
    s.style.setProperty('--dx', `${Math.cos(angle)*dist}px`);
    s.style.setProperty('--dy', `${Math.sin(angle)*dist}px`);
    s.style.left = `${x}px`;
    s.style.top  = `${y}px`;
    s.style.background = Math.random() > 0.5 ? '#FF6B00' : '#FFD000';
    s.style.animationDuration = `${0.5 + Math.random()*0.5}s`;
    container.appendChild(s);
    setTimeout(() => s.remove(), 900);
  }
}

// ─── Update global status dot/label ──────────────────────
function updateGlobal() {
  const dot   = el('globalDot');
  const label = el('globalLabel');
  const bolt  = el('boltWrap');

  if (state.left && state.right) {
    dot.className   = 'dot online';
    label.textContent = 'Sistema Online';
    bolt.classList.add('alive');
  } else if (state.left || state.right) {
    dot.className   = 'dot partial';
    label.textContent = 'Sistema Parcial';
    bolt.classList.add('alive');
  } else {
    dot.className   = 'dot';
    label.textContent = 'Sistema Offline';
    bolt.classList.remove('alive');
  }

  // Flow animation
  const fp = el('flowPulse');
  if (state.left && state.right) {
    fp.classList.add('active');
    el('lineVolt').textContent = `${fmt(jitter(BASE.volt*Math.sqrt(3),0.01), 1)} kV`;
  } else {
    fp.classList.remove('active');
    el('lineVolt').textContent = '— kV';
  }
}

// ─── Activate panel ──────────────────────────────────────
function activatePanel(side) {
  const prefix = side === 'left' ? 'l' : 'r';
  const panelId = side === 'left' ? 'panelLeft' : 'panelRight';
  const badgeId = side === 'left' ? 'badgeLeft'  : 'badgeRight';

  el(panelId).classList.add('active');
  el(badgeId).className = 'badge online';
  el(badgeId).textContent = 'ONLINE';

  // Glow cards
  ['V','A','W','F'].forEach(k => {
    const c = el(`c${side === 'left' ? 'L' : 'R'}${k}`);
    if (c) c.classList.add('glow');
  });

  // Live insulators
  document.querySelectorAll(`#t${side === 'left' ? 'L' : 'R'} .insulator`)
    .forEach(ins => ins.classList.add('live'));
}

// ─── Deactivate panel ────────────────────────────────────
function deactivatePanel(side) {
  const prefix = side === 'left' ? 'l' : 'r';
  const ids = {
    volt: `${prefix}Volt`, amp: `${prefix}Amps`,
    pow:  `${prefix}Pow`,  fp:  `${prefix}FP`
  };
  const bars = {
    V: `b${side==='left'?'L':'R'}V`, A: `b${side==='left'?'L':'R'}A`,
    W: `b${side==='left'?'L':'R'}W`, F: `b${side==='left'?'L':'R'}F`
  };

  el(`${prefix}Volt`).textContent = '—';
  el(`${prefix}Amps`).textContent = '—';
  el(`${prefix}Pow`).textContent  = '—';
  el(`${prefix}FP`).textContent   = '—';
  Object.values(bars).forEach(b => { if(el(b)) el(b).style.width = '0%'; });

  const panelId = side === 'left' ? 'panelLeft' : 'panelRight';
  const badgeId = side === 'left' ? 'badgeLeft'  : 'badgeRight';
  el(panelId).classList.remove('active');
  el(badgeId).className = 'badge offline';
  el(badgeId).textContent = 'OFFLINE';

  ['V','A','W','F'].forEach(k => {
    const c = el(`c${side === 'left' ? 'L' : 'R'}${k}`);
    if (c) c.classList.remove('glow');
  });

  document.querySelectorAll(`#t${side === 'left' ? 'L' : 'R'} .insulator`)
    .forEach(ins => ins.classList.remove('live'));
}

// ─── Real-time metric update ──────────────────────────────
function updateMetrics() {
  ['left','right'].forEach(side => {
    if (!state[side]) return;
    const p = side === 'left' ? 'l' : 'r';
    const P = side === 'left' ? 'L' : 'R';

    const v  = jitter(BASE.volt, 0.015);
    const a  = jitter(BASE.amp,  0.02);
    const pw = (v * a * Math.sqrt(3) * BASE.fp) / 1e6;
    const fp = jitter(BASE.fp, 0.008).toFixed(2);

    el(`${p}Volt`).textContent = fmt(v, 1);
    el(`${p}Amps`).textContent = fmt(a, 0);
    el(`${p}Pow`).textContent  = fmt(pw, 2);
    el(`${p}FP`).textContent   = fp;

    el(`b${P}V`).style.width = `${Math.min((v/300)*100, 100)}%`;
    el(`b${P}A`).style.width = `${Math.min((a/500)*100, 100)}%`;
    el(`b${P}W`).style.width = `${Math.min((pw/100)*100, 100)}%`;
    el(`b${P}F`).style.width = `${parseFloat(fp)*100}%`;
  });

  if (state.left && state.right) {
    el('lineVolt').textContent = `${fmt(jitter(BASE.volt*Math.sqrt(3),0.01),1)} kV`;
  }
}

// ─── Start/stop ticker ───────────────────────────────────
function startTicker() {
  if (ticker) return;
  ticker = setInterval(updateMetrics, 800);
}
function stopTicker() {
  if (!state.left && !state.right) {
    clearInterval(ticker);
    ticker = null;
  }
}

// ─── Public Controls ─────────────────────────────────────
function ligarEsquerda(event) {
  if (event) spawnSparks(event);
  state.left = true;
  activatePanel('left');
  updateGlobal();
  startTicker();
}
function desligarEsquerda(event) {
  state.left = false;
  deactivatePanel('left');
  updateGlobal();
  stopTicker();
}
function ligarDireita(event) {
  if (event) spawnSparks(event);
  state.right = true;
  activatePanel('right');
  updateGlobal();
  startTicker();
}
function desligarDireita(event) {
  state.right = false;
  deactivatePanel('right');
  updateGlobal();
  stopTicker();
}
function desligarTudo() {
  state.left = false;
  state.right = false;
  deactivatePanel('left');
  deactivatePanel('right');
  updateGlobal();
  stopTicker();
}

// ─── Wire buttons with spark effect ──────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.btn-on').forEach(btn => {
    btn.addEventListener('click', e => {
      spawnSparks(e);
    });
  });
});