const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Markup Language",
      "Hyper Text Marketing Language",
      "Hyper Tool Markup Language"
    ],
    answer: 1
  },
  {
    question: "Which of the following is a JavaScript framework?",
    options: ["Laravel", "Django", "React", "Flask"],
    answer: 2
  },
  {
    question: "What is the output of: console.log(typeof null)?",
    options: ["object", "null", "undefined", "number"],
    answer: 0
  },
  {
    question: "Which symbol is used for single-line comments in Python?",
    options: ["//", "<!-- -->", "#", "/* */"],
    answer: 2
  },
  {
    question: "Which method is used to add an element at the end of an array in JavaScript?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: 0
  },
  {
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style System", "Colorful Style Sheets"],
    answer: 0
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<a>", "<link>", "<href>", "<hyper>"],
    answer: 0
  }
];

let currentQuestion = 0;
let score = 0;

const quizContainer = document.getElementById('quiz-container');
const nextBtn = document.getElementById('nextBtn');
const quizResult = document.getElementById('quiz-result');

let retakeBtn = document.getElementById('retakeBtn');
if (!retakeBtn) {
  retakeBtn = document.createElement('button');
  retakeBtn.id = 'retakeBtn';
  retakeBtn.textContent = 'Retake Test';
  retakeBtn.style.display = 'none';
  retakeBtn.style.marginLeft = '1rem';
  nextBtn.parentNode.insertBefore(retakeBtn, quizResult);
}

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function showQuestion() {
  quizResult.textContent = '';
  const q = quizData[currentQuestion];
  quizContainer.innerHTML = `<div><strong>${q.question}</strong></div>` +
    q.options.map((opt, idx) =>
      `<div><label><input type="radio" name="option" value="${idx}"> <span>${escapeHTML(opt)}</span></label></div>`
    ).join('');
  nextBtn.style.display = '';
  retakeBtn.style.display = 'none';
}

nextBtn.onclick = function() {
  const selected = quizContainer.querySelector('input[name="option"]:checked');
  if (!selected) {
    quizResult.textContent = 'Please select an answer!';
    return;
  }
  if (parseInt(selected.value) === quizData[currentQuestion].answer) {
    score++;
  }
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    quizContainer.innerHTML = '';
    nextBtn.style.display = 'none';
    quizResult.textContent = `Quiz finished! Your score: ${score}/${quizData.length}`;
    retakeBtn.style.display = '';
  }
};

retakeBtn.onclick = function() {
  currentQuestion = 0;
  score = 0;
  showQuestion();
};

showQuestion();

const fetchJokeBtn = document.getElementById('fetchJokeBtn');
const jokeDisplay = document.getElementById('jokeDisplay');

fetchJokeBtn.onclick = async function() {
  jokeDisplay.textContent = 'Loading...';
  try {
    const res = await fetch('https://official-joke-api.appspot.com/random_joke');
    const data = await res.json();
    jokeDisplay.textContent = `${data.setup} — ${data.punchline}`;
  } catch (err) {
    jokeDisplay.textContent = 'Failed to fetch joke.';
  }
};
