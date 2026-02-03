const music = document.getElementById("bgMusic");

/* try autoplay continuously */
music.volume = 0.25;
setInterval(() => {
  if (music.paused) {
    music.play().catch(() => {});
  }
}, 2000);

/* petals */
const petals = document.getElementById("petals");
for (let i = 0; i < 25; i++) {
  const p = document.createElement("div");
  p.className = "petal";
  p.style.left = Math.random() * 100 + "vw";
  p.style.animationDuration = 6 + Math.random() * 6 + "s";
  petals.appendChild(p);
}

/* screen flow */
const screens = n => document.getElementById("screen" + n);

openBtn.onclick = () => {
  screens(1).classList.remove("active");
  screens(2).classList.add("active");

  const texts = ["Checking smile…", "Measuring cuteness…", "Almost done…"];
  let i = 0;

  const interval = setInterval(() => {
    statusText.textContent = texts[i++];
    if (i === texts.length) {
      clearInterval(interval);
      setTimeout(() => {
        screens(2).classList.remove("active");
        screens(3).classList.add("active");
      }, 800);
    }
  }, 1200);
};

document.querySelector(".continue").onclick = () => {
  screens(3).classList.remove("active");
  screens(4).classList.add("active");
};

more.onclick = () => {
  screens(4).classList.remove("active");
  screens(5).classList.add("active");
};

envelope.onclick = () => {
  screens(5).classList.remove("active");
  screens(6).classList.add("active");
};

last.onclick = () => {
  screens(6).classList.remove("active");
  screens(7).classList.add("active");
};
