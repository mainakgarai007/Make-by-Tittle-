const s1 = document.getElementById("screen1");
const s2 = document.getElementById("screen2");
const s3 = document.getElementById("screen3");
const s4 = document.getElementById("screen4");
const status = document.getElementById("statusText");
const music = document.getElementById("bgMusic");

/* 🎵 play soft music on first interaction */
document.addEventListener("click", () => {
  if (music.paused) {
    music.volume = 0.25;
    music.play().catch(() => {});
  }
}, { once: true });

/* Screen 1 → 2 */
document.getElementById("openBtn").onclick = () => {
  s1.classList.remove("active");
  s2.classList.add("active");

  const texts = [
    "Checking smile…",
    "Measuring cuteness…",
    "Almost done…"
  ];

  let i = 0;
  const interval = setInterval(() => {
    status.textContent = texts[i];
    i++;
    if (i === texts.length) {
      clearInterval(interval);
      setTimeout(() => {
        s2.classList.remove("active");
        s3.classList.add("active");
      }, 1000);
    }
  }, 1500);
};

/* Screen 3 → 4 */
document.querySelector(".continue").onclick = () => {
  s3.classList.remove("active");
  s4.classList.add("active");
};

/* Restart */
document.getElementById("again").onclick = () => {
  location.reload();
};

/* Share */
document.getElementById("share").onclick = () => {
  if (navigator.share) {
    navigator.share({
      text: "I just got my lovely report 💖"
    });
  } else {
    alert("Sharing not supported on this device");
  }
};
