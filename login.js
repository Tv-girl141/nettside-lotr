/* LOGIN – kun index.html */

const realms = [
  { name: "Alv fra Rivendell",       icon: "🧝", color: "#4a90d9" },
  { name: "Hobbit fra Shire",        icon: "🌿", color: "#6fbf73" },
  { name: "Dverg fra Erebor",        icon: "⛏️", color: "#c98b3a" },
  { name: "Rohirrim fra Rohan",      icon: "🐎", color: "#8b5a2b" },
  { name: "Gondorianer",             icon: "🛡️", color: "#a8a8a8" },
  { name: "Trollmann fra Isengard",  icon: "🧙", color: "#9b59b6" },
  { name: "Ent fra Fangorn",         icon: "🌳", color: "#3f7a3f" },
  { name: "Hobbit fra Bree",         icon: "🍺", color: "#a8763a" },
  { name: "Rytter fra Rohan",        icon: "⚔️", color: "#b8860b" },
  { name: "Alv fra Lórien",          icon: "🍃", color: "#66cdaa" }
];

function login() {
  const name = document.getElementById("username").value.trim();
  if (!name) { alert("Du må skrive inn et navn!"); return; }

  const realm = realms[Math.floor(Math.random() * realms.length)];
  const joined = new Date().toLocaleDateString("no-NO");

  localStorage.setItem("username", name);
  localStorage.setItem("realm", JSON.stringify(realm));
  localStorage.setItem("joined", joined);

  showWelcome(name, realm);
  showProfile(name, realm, joined);
  loadUserBadge();
}

function showWelcome(name, realm) {
  const el = document.getElementById("welcomeMsg");
  if (!el) return;
  el.innerHTML = `
    Velkommen, <strong>${name}</strong>!<br>
    <span class="realm-badge" style="background:${realm.color}">
      ${realm.icon} ${realm.name}
    </span>`;
}

function showProfile(name, realm, joined) {
  const card = document.getElementById("profileCard");
  const content = document.getElementById("profileContent");
  if (!card || !content) return;

  card.style.display = "block";
  content.innerHTML = `
    <div style="font-size:2.5rem;">${realm.icon}</div>
    <h3 style="color:var(--gold-light);margin:0.5rem 0;">${name}</h3>
    <p style="color:var(--text-dim);font-size:0.9rem;">
      ${realm.name}<br>
      🗓️ Medlem siden: ${joined || "i dag"}
    </p>
  `;
}

function restoreUser() {
  const name = localStorage.getItem("username");
  const realmRaw = localStorage.getItem("realm");
  const joined = localStorage.getItem("joined");

  if (name && realmRaw) {
    const realm = JSON.parse(realmRaw);
    const input = document.getElementById("username");
    if (input) input.value = name;
    showWelcome(name, realm);
    showProfile(name, realm, joined);
  }
}

window.addEventListener("DOMContentLoaded", restoreUser);