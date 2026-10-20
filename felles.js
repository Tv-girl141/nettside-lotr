/* FELLES – lastes på ALLE sider */

// ---- TEMA ----
function toggleTheme() {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  const btn = document.getElementById("themeBtn");
  if (btn) btn.textContent = isLight ? "☀️" : "🌙";
  localStorage.setItem("theme", isLight ? "light" : "dark");
}

function loadTheme() {
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    const btn = document.getElementById("themeBtn");
    if (btn) btn.textContent = "☀️";
  }
}

// ---- MUSIKK (Web Audio API) ----
let audioCtx = null;
let musicPlaying = false;
let musicInterval = null;

function toggleMusic() {
  const btn = document.getElementById("musicBtn");
  if (!btn) return;

  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (musicPlaying) {
    clearInterval(musicInterval);
    musicPlaying = false;
    btn.textContent = "🎵";
    btn.classList.remove("playing");
    return;
  }

  musicPlaying = true;
  btn.textContent = "⏸️";
  btn.classList.add("playing");

  const notes = [220, 261.63, 293.66, 329.63, 293.66, 261.63, 246.94, 220];
  let i = 0;

  const playNote = () => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.value = notes[i % notes.length];
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.8);
    i++;
  };

  playNote();
  musicInterval = setInterval(playNote, 900);
}

// ---- BRUKER-BADGE I HEADER ----
function loadUserBadge() {
  const name = localStorage.getItem("username");
  const realmRaw = localStorage.getItem("realm");
  if (!name || !realmRaw) return;

  const realm = JSON.parse(realmRaw);
  const badgeContainer = document.getElementById("userBadge");
  if (badgeContainer) {
    badgeContainer.innerHTML = `
      <span style="color:var(--text-dim);font-size:0.85rem;">
        ${realm.icon} ${name} – ${realm.name}
      </span>
    `;
  }
}

// ---- AKTIV NAV ----
function markActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a").forEach(a => {
    const href = a.getAttribute("href").split("/").pop();
    if (href === path) a.classList.add("active");
  });
}

// ---- SITAT-ROTASJON ----
const quotes = [
  "«Not all those who wander are lost.»",
  "«One does not simply walk into Mordor.»",
  "«You shall not pass!»",
  "«Even the smallest person can change the course of the future.»",
  "«There is some good in this world, and it's worth fighting for.»",
  "«A wizard is never late, Frodo Baggins.»"
];

let quoteIndex = 0;
function rotateQuote() {
  const box = document.getElementById("quoteBox");
  if (!box) return;
  box.style.opacity = 0;
  setTimeout(() => {
    box.textContent = quotes[quoteIndex];
    box.style.opacity = 1;
    quoteIndex = (quoteIndex + 1) % quotes.length;
  }, 400);
}

// ---- INIT ----
window.addEventListener("DOMContentLoaded", () => {
  loadTheme();
  loadUserBadge();
  markActiveNav();

  if (document.getElementById("quoteBox")) {
    rotateQuote();
    setInterval(rotateQuote, 5000);
  }
});