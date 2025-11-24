// Questions
// just a filler to make sure this works, gonna have to find actual trivia to put in
let questions = [
  { question: "Which year came after 1998?", options: ["1999","1997","2000","1995"], answer: "1999" }
];

// Quiz
let currentIndex = 0;

const questionText = document.getElementById("question-text");
const optionsDiv = document.querySelector(".options");

// very ugly looking right now, but it works
function renderQuestion() {

  console.log("Rendering Question:", questionText)
  const q = questions[currentIndex];
  questionText.textContent = q.question;
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, index) => {
    optionsDiv.innerHTML += `
      <div class="field-row">
        <input id="option-${index}" type="radio" name="answer" value="${opt}">
        <label for="option-${index}">${opt}</label>
      </div>
    `;
  });
}

renderQuestion();
