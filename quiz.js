/* QUIZ – kun quiz.html */

const quizQuestions = [
  { q: "Hvem smidde Den ene ringen?",
    options: ["Gandalf", "Sauron", "Saruman", "Elrond"], correct: 1 },
  { q: "Hva heter hjemlandet til hobbittene?",
    options: ["Rohan", "Gondor", "Shire", "Mordor"], correct: 2 },
  { q: "Hvem sier «You shall not pass!»?",
    options: ["Aragorn", "Gandalf", "Legolas", "Boromir"], correct: 1 },
  { q: "Hva er Samwise Gamgee sitt yrke?",
    options: ["Gartner", "Smed", "Bueskytter", "Konge"], correct: 0 },
  { q: "Hva heter kongen i Rohan?",
    options: ["Théoden", "Denethor", "Elrond", "Bard"], correct: 0 },
  { q: "Hvilken alv er med i Fellesskapet?",
    options: ["Elrond", "Galadriel", "Legolas", "Thranduil"], correct: 2 },
  { q: "Hva heter dvergen i Fellesskapet?",
    options: ["Thorin", "Gimli", "Balin", "Dáin"], correct: 1 }
];

let currentQ = 0;
let score = 0;
let locked = false;

function renderQuiz() {
  const box = document.getElementById("quizBox");
  const result = document.getElementById("quizResult");
  const progressFill = document.getElementById("quizProgressFill");
  if (!box) return;

  if (currentQ >= quizQuestions.length) {
    box.innerHTML = "";
    if (result) {
      const percent = Math.round((score / quizQuestions.length) * 100);
      let msg = "";
      if (percent === 100) msg = "🏆 Perfekt! Du er en sann Midgard-vismann!";
      else if (percent >= 70) msg = "⚔️ Flott! Du kjenner Midgard godt.";
      else if (percent >= 40) msg = "🌿 Ikke verst, reisende!";
      else msg = "📖 På tide å lese bøkene på nytt!";

      result.innerHTML =
        `Du fikk <strong>${score}</strong> av ${quizQuestions.length} riktige (${percent}%).<br>${msg}`;
    }

    const best = parseInt(localStorage.getItem("quizHighScore") || "0");
    if (score > best) localStorage.setItem("quizHighScore", score);

    const hs = document.getElementById("highScore");
    if (hs) {
      hs.textContent = `🏅 Din beste: ${Math.max(score, best)} / ${quizQuestions.length}`;
    }
    return;
  }

  if (progressFill) {
    progressFill.style.width = ((currentQ / quizQuestions.length) * 100) + "%";
  }

  const q = quizQuestions[currentQ];
  box.innerHTML = `
    <p style="margin-bottom:0.8rem;"><strong>${currentQ + 1}. ${q.q}</strong></p>
    ${q.options.map((opt, i) =>
      `<button class="quizBtn" onclick="answerQuiz(${i}, this)">${opt}</button>`
    ).join("")}
  `;
  locked = false;

  if (result) result.innerHTML = "";
}

function answerQuiz(index, btn) {
  if (locked) return;
  locked = true;

  const q = quizQuestions[currentQ];
  const buttons = document.querySelectorAll(".quizBtn");

  if (index === q.correct) {
    score++;
    btn.classList.add("correct");
  } else {
    btn.classList.add("wrong");
    buttons[q.correct].classList.add("correct");
  }

  setTimeout(() => {
    currentQ++;
    renderQuiz();
  }, 900);
}

window.addEventListener("DOMContentLoaded", renderQuiz);