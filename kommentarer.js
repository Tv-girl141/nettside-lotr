/* KOMMENTARER – kun kommentarer.html */

function addComment() {
  const input = document.getElementById("commentInput");
  if (!input) return;

  const text = input.value.trim();
  if (!text) { alert("Skriv noe før du publiserer!"); return; }

  const name = localStorage.getItem("username") || "Ukjent reisende";
  const realmRaw = localStorage.getItem("realm");
  const realm = realmRaw ? JSON.parse(realmRaw) : null;
  const realmText = realm ? `${realm.icon} ${realm.name}` : "Midgard";

  const comment = {
    id: Date.now(),
    name: name,
    realm: realmText,
    text: text,
    time: new Date().toLocaleString("no-NO")
  };

  const comments = JSON.parse(localStorage.getItem("comments") || "[]");
  comments.push(comment);
  localStorage.setItem("comments", JSON.stringify(comments));

  input.value = "";
  loadComments();
}

function deleteComment(id) {
  if (!confirm("Slette denne kommentaren?")) return;
  let comments = JSON.parse(localStorage.getItem("comments") || "[]");
  comments = comments.filter(c => c.id !== id);
  localStorage.setItem("comments", JSON.stringify(comments));
  loadComments();
}

function loadComments() {
  const list = document.getElementById("commentList");
  if (!list) return;

  const comments = JSON.parse(localStorage.getItem("comments") || "[]");
  list.innerHTML = "";

  if (comments.length === 0) {
    list.innerHTML = "<li><em>Ingen kommentarer ennå. Bli den første!</em></li>";
    return;
  }

  comments.slice().reverse().forEach(c => {
    const li = document.createElement("li");
    li.innerHTML = `
      <button class="deleteBtn" onclick="deleteComment(${c.id})" title="Slett">✖</button>
      <strong>${c.name}</strong> <em>(${c.realm})</em><br>
      ${c.text}
      <small>${c.time}</small>
    `;
    list.appendChild(li);
  });
}

window.addEventListener("DOMContentLoaded", loadComments);