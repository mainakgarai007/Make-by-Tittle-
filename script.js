const s1 = document.getElementById("screen1");
const s2 = document.getElementById("screen2");
const s3 = document.getElementById("screen3");
const status = document.getElementById("statusText");

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
