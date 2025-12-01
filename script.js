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
  { question: "Which year came after 2008?", options: ["2009","2007","2010","2006"], answer: "2009" },
  { question: "Which year came after 2009?", options: ["2010","2008","2011","2007"], answer: "2010" },
  { question: "Which year came after 2010?", options: ["2011","2009","2012","2008"], answer: "2011" },
  { question: "Which year came after 2011?", options: ["2012","2010","2013","2009"], answer: "2012" },
  { question: "Which year came after 2012?", options: ["2013","2011","2014","2010"], answer: "2013" }
];

// Shuffle
function shuffle(arr){
  for(let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
// Quiz
let shuffledIndex = [];
let currentIndex = 0;
let totalScore = 0;

const questionText = document.getElementById("question-text");
const optionsDiv = document.querySelector(".options");
const answerForm = document.getElementById("answer-form");
const addQuestionForm = document.getElementById("add-question-form");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const scoreSpan = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

function startQuiz(){
  shuffledIndex = [...questions]
  shuffle(shuffledIndex)
  shuffledIndex = shuffledIndex.splice(0, 10);
  renderQuestion();
}

function renderQuestion() {

  const q = shuffledIndex[currentIndex];
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

//Add Question
//might work? need to add shuffle in to see
addQuestionForm.addEventListener("submit", e => {
  e.preventDefault();

  const newQ = document.getElementById("new-question").value;
  const options = Array.from(document.querySelectorAll(".option-inpu")).map(i => i.value);
  const newA = document.getElementById("new-answer").value;

  questions.push({ question: newQ, options: options, answer: newA });

  addQuestionForm.reset();
})

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

restartBtn.addEventListener("click", () => {
  currentIndex = 0;
  totalScore = 0;
  quizContainer.classList.remove("hidden");
  resultContainer.classList.add("hidden");
  renderQuestion();
});

startQuiz();
