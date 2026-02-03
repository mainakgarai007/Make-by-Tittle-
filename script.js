// Animation parameters
const scanLine = document.getElementById('scan-line');
const heart = document.querySelector('.heart-icon');
const statusEl = document.getElementById('status');

// Vertical scan limits (SVG coordinates)
const scanMin = 80;
const scanMax = 180;

// Heart pulse parameters
const pulseMin = 1.0;
const pulseMax = 1.14;
const pulseMs = 1640;

// Scanner status messages
const statuses = [
  "Scanning emotions…",
  "Analyzing heart signals…",
  "Assessing rhythm…",
  "Detecting patterns…",
  "Scan complete"
];
let statusIndex = 0;

// Animate scan line
function animateScanLine() {
  let dir = 1; // 1 = down, -1 = up
  let pos = scanMin;
  const speed = 0.27; // px per ms
  let lastTime = null;

  function move(ts) {
    if (!lastTime) lastTime = ts;
    const delta = ts - lastTime;
    pos += dir * speed * delta;

    if (pos >= scanMax) { dir = -1; pos = scanMax; }
    if (pos <= scanMin) { dir = 1; pos = scanMin; }

    scanLine.setAttribute('y', pos.toFixed(2));
    lastTime = ts;
    requestAnimationFrame(move);
  }
  requestAnimationFrame(move);
}

// Animate heart pulsing
function animateHeartPulse() {
  let start;
  function pulse(ts) {
    if (!start) start = ts;
    const t = ((ts - start) % pulseMs) / pulseMs;
    // Smooth pulse using sinusoidal ease
    const scale = pulseMin + (pulseMax - pulseMin) * 0.5 * (1 - Math.cos(2 * Math.PI * t));
    heart.setAttribute('transform', `scale(${scale.toFixed(3)})`);
    requestAnimationFrame(pulse);
  }
  requestAnimationFrame(pulse);
}

// Status text cycling
function animateStatus() {
  setInterval(() => {
    statusIndex = (statusIndex + 1) % statuses.length;
    statusEl.textContent = statuses[statusIndex];
  }, 2200);
}

// Start all animations
animateScanLine();
animateHeartPulse();
animateStatus();