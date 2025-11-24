// Questions
// just more of the same question really need to find actual trivia to put in
let questions = [
  { question: "Which year came after 1998?", options: ["1999","1997","2000","1995"], answer: "1999" },
  { question: "Which year came after 1999?", options: ["2000","1998","2001","1997"], answer: "2000" },
  { question: "Which year came after 2000?", options: ["2001","1999","2002","1998"], answer: "2001" },
  { question: "Which year came after 2001?", options: ["2002","2000","2003","1999"], answer: "2002" },
  { question: "Which year came after 2002?", options: ["2003","2001","2004","2000"], answer: "2003" },
  { question: "Which year came after 2003?", options: ["2004","2002","2005","2001"], answer: "2004" },
  { question: "Which year came after 2004?", options: ["2005","2003","2006","2002"], answer: "2005" },
  { question: "Which year came after 2005?", options: ["2006","2004","2007","2003"], answer: "2006" },
  { question: "Which year came after 2006?", options: ["2007","2005","2008","2004"], answer: "2007" },
  { question: "Which year came after 2007?", options: ["2008","2006","2009","2005"], answer: "2008" },
  { question: "Which year came after 2008?", options: ["2009","2007","2010","2006"], answer: "2009" }
];

// Quiz
let currentIndex = 0;
let totalScore = 0;

const questionText = document.getElementById("question-text");
const optionsDiv = document.querySelector(".options");
const answerForm = document.getElementById("answer-form");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const scoreSpan = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

function renderQuestion() {

  const q = questions[currentIndex];
  questionText.textContent = q.question;
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, index) => {
    const fieldRow = document.createElement("div");
    fieldRow.className = "field-row";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.id = `option-${index}`;
    input.value = opt;

    const label = document.createElement("label");
    label.htmlFor = input.id
    label.textContent = opt;

    fieldRow.appendChild(input);
    fieldRow.appendChild(label);

    optionsDiv.appendChild(fieldRow);
  });
}

//Results
answerForm.addEventListener("submit", e => {
  e.preventDefault();
  let selected = document.querySelector("input[name='answer']:checked");
  if (!selected) return;

  if (selected.value === questions[currentIndex].answer) {
    totalScore++;
  }

  currentIndex++;
  if (currentIndex >= questions.length) {
    renderResult();
  }
  else {
    renderQuestion();
  }
});

function renderResult() {
  quizContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  scoreSpan.textContent = totalScore;
}

renderQuestion();
