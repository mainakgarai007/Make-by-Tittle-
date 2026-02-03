// ---------------------
// Heart Scanner Animations
// ---------------------

// --- Heart Pulse Animation ---
const heartPath = document.querySelector('.heart-icon');

// Pulse settings
const pulseMin = 1.0;
const pulseMax = 1.13; // Peak scale
const pulsePeriod = 1700; // ms for one pulse (calm, slow)

function animateHeartPulse() {
  let start;
  function pulse(ts) {
    if (!start) start = ts;
    // Fraction in [0,1]
    const t = ((ts - start) % pulsePeriod) / pulsePeriod;
    // Smooth sinusoidal scaling
    const scale = pulseMin + (pulseMax - pulseMin) * 0.5 * (1 - Math.cos(2 * Math.PI * t));
    // Set transform directly (origin at the heart center)
    heartPath.setAttribute("transform", `scale(${scale}) translate(${160/scale-160},${142/scale-142})`);
    requestAnimationFrame(pulse);
  }
  requestAnimationFrame(pulse);
}

// --- Scan Line Animation ---
const scanLine = document.getElementById('scan-line');
// SVG y bounds for scanning
const scanYMin = 65;    // Top inside ring
const scanYMax = 205;   // Bottom inside ring
const scanPeriod = 2600; // ms top to bottom and loop

function animateScanLine() {
  let start;
  function scan(ts) {
    if (!start) start = ts;
    // Progress from 0 to 1, then loop
    const t = ((ts - start) % scanPeriod) / scanPeriod;
    // Animate from top to bottom linearly
    const y = scanYMin + (scanYMax - scanYMin) * t;
    scanLine.setAttribute('y', y);
    requestAnimationFrame(scan);
  }
  requestAnimationFrame(scan);
}

// --- Status Message Animation ---
const statusEl = document.getElementById('status');
const statuses = [
  "Scanning emotions…",
  "Analyzing heart signals…",
  "Processing data…",
  "Scan complete"
];

let statusIndex = 0;
let fadeInterval = 3500;

function animateStatus() {
  setInterval(() => {
    // Fade out
    statusEl.style.opacity = 0;
    setTimeout(() => {
      // Change text & fade in
      statusIndex = (statusIndex + 1) % statuses.length;
      statusEl.textContent = statuses[statusIndex];
      statusEl.style.opacity = 1;
    }, 800); // Duration matches CSS transition
  }, fadeInterval);
}

// ------------ SVG SCAN LINE GRADIENT ------------
// (This must be injected when the DOM is ready)
function insertScanLineGradient() {
  // Create gradient element
  const svg = document.querySelector('.scanner-svg');
  const defs = svg.querySelector('defs') || (function() {
    const d=document.createElementNS('http://www.w3.org/2000/svg','defs');
    svg.appendChild(d); return d;
  })();

  const lg = document.createElementNS('http://www.w3.org/2000/svg','linearGradient');
  lg.setAttribute('id','scanLineGradient');
  lg.setAttribute('x1','0'); lg.setAttribute('y1','0');
  lg.setAttribute('x2','0'); lg.setAttribute('y2','1');
  lg.innerHTML = `
    <stop offset="0%"   stop-color="#19e5e7" stop-opacity="0.93"/>
    <stop offset="41%"  stop-color="#7ef3ec" stop-opacity="0.13"/>
    <stop offset="100%" stop-color="#19e5e7" stop-opacity="0.93"/>
  `;
  defs.appendChild(lg);
}

// ------------- INIT ALL ANIMATIONS ----------------
window.addEventListener('DOMContentLoaded', ()=>{
  insertScanLineGradient();
  animateHeartPulse();
  animateScanLine();
  animateStatus();
});
