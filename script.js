// Questions
let questions = [
    {
        question: "A major cinematic sci-fi trilogy is set to begin in 1999. What will the name of the first film be?",
        options: ["The Force Awakens", "Revenge of the Sith", "The Return of the Jedi", "The Phantom Menace"],
        answer: "The Phantom Menace"
    },
    {
        question: "What major event is feared to potentially cause global computer system failures when the calendar rolls over to 2000?",
        options: ["The Millennium Bug", "The Internet Collapse", "The Great Firewall", "The Digital Divide"],
        answer: "The Millennium Bug"
    },
    {
        question: "In 1999, the Harry Potter book series, currently three books long, will release its fourth installment. What will the title of that book be?",
        options: ["The Chamber of Secrets", "The Goblet of Fire", "The Prisoner of Azkaban", "The Order of the Phoenix"],
        answer: "The Goblet of Fire"
    },
    {
        question: "Microsoft's next major consumer operating system, set for release in 2001, is rumored to combine the NT kernel with the Windows 9x line. What is its common internal name?",
        options: ["Windows Vista", "Windows 2000", "Windows Neptune", "Windows Whistler"],
        answer: "Windows Whistler"
    },
    {
        question: "The first module of the International Space Station (ISS) was recently launched. When is the first resident crew expected to arrive and take up permanent residence?",
        options: ["2001", "2005", "2000", "1999"],
        answer: "2000"
    },
    {
        question: "What revolutionary digital music format, currently gaining popularity, is predicted to become the standard for portable audio by the early 2000s?",
        options: ["WAV", "CD-R", "MP3", "MiniDisc"],
        answer: "MP3"
    },
    {
        question: "A new Olympic sport will be added for the 2000 Sydney Summer Games which involves jumping off a springboard or platform. What is this sport?",
        options: ["Synchronized Swimming", "Trampoline", "Taekwondo", "Synchronized Diving"],
        answer: "Synchronized Diving"
    },
    {
        question: "Which iconic Finnish company, known for its durable phones, is expected to maintain its dominance in the burgeoning mobile phone market into the 2000s?",
        options: ["Motorola", "Ericsson", "Nokia", "BlackBerry"],
        answer: "Nokia"
    },
    {
        question: "By the early 2000s, what highly anticipated new video game console from Sony is expected to compete with the Nintendo 64 and Sega Dreamcast?",
        options: ["PlayStation 2", "PlayStation 3", "Xbox", "GameCube"],
        answer: "PlayStation 2"
    },
    {
        question: "The first truly massive online retailer, which started by selling books, is predicted to expand into nearly all retail categories. What is its name?",
        options: ["eBay", "Amazon.com", "Buy.com", "AOL Shopping"],
        answer: "Amazon.com"
    },
    {
        question: "The final mission of the Space Shuttle Program is tentatively scheduled for what year?",
        options: ["2005", "2011", "2008", "2002"],
        answer: "2011"
    },
    {
        question: "What famous movie studio is set to release a groundbreaking animated film called 'Toy Story 2' in 1999?",
        options: ["DreamWorks", "Pixar", "Warner Bros.", "Blue Sky Studios"],
        answer: "Pixar"
    },
    {
        question: "Which internet stock, known for its animated running dog logo, is expected to remain a top search engine into the next decade?",
        options: ["Ask Jeeves", "Lycos", "Excite", "Yahoo!"],
        answer: "Yahoo!"
    },
    {
        question: "A European consortium is planning to introduce a single currency to replace several national currencies in the next few years. What is the name of this new currency?",
        options: ["The Euro", "The Mark", "The Franc", "The Unit"],
        answer: "The Euro"
    },
    {
        question: "What major telecommunication technology is expected to replace dial-up modems for home internet connections by the mid-2000s?",
        options: ["ISDN", "Satellite Internet", "Broadband (DSL/Cable)", "Fiber Optic"],
        answer: "Broadband (DSL/Cable)"
    }
];

// Shuffle
function shuffle(arr){
  for(let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// Quiz state
let shuffledQuestions = [];
let currentIndex = 0;
let totalScore = 0;

// DOM elements
const systemClock = document.getElementById('system-clock'); 

const quizContainer = document.getElementById("quiz-container");
const questionText = document.getElementById("question-text");
const optionsDiv = document.querySelector(".options");
const answerForm = document.getElementById("answer-form");
const resultContainer = document.getElementById("result-container");
const scoreSpan = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

const addQuestionForm = document.getElementById("add-question-form");
const errorDiv = document.getElementById("add-question-error");


// Start quiz
function startQuiz(){
  shuffledQuestions = [...questions]
  shuffle(shuffledQuestions)
  shuffledQuestions = shuffledQuestions.slice(0, 10);
  currentIndex = 0;
  totalScore = 0;

  quizContainer.classList.remove("hidden");
  resultContainer.classList.add("hidden");

  renderQuestion();
}

function createOptionElement(opt, index) {
  const fieldRow = document.createElement("div");
    fieldRow.className = "field-row";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.id = `option-${index}`;
    input.value = opt;

    const label = document.createElement("label");
    label.htmlFor = input.id;
    label.textContent = opt;

    fieldRow.appendChild(input);
    fieldRow.appendChild(label);

    return fieldRow;
}

function renderQuestion() {
  const q = shuffledQuestions[currentIndex];
  questionText.textContent = q.question;
  optionsDiv.innerHTML = "";

  const fieldset = document.createElement('fieldset');
  const legend = document.createElement('legend');
  legend.textContent = 'Choose an Answer';
  fieldset.appendChild(legend);

  q.options.forEach((option, index) => {
      const optionElement = createOptionElement(option, index);
      fieldset.appendChild(optionElement);
  });

  optionsDiv.appendChild(fieldset);
}

//Add Question
addQuestionForm.addEventListener("submit", e => {
  e.preventDefault();

  const newQ = document.getElementById("new-question").value.trim();
  const options = Array.from(document.querySelectorAll(".option-input")).map(i => i.value.trim());
  const newA = document.getElementById("new-answer").value.trim();

  errorDiv.textContent = "";

   if (!newQ || options.some(opt => !opt) || !newA) {
    errorDiv.textContent = "You have to have all fields filled!";
    return;
  }

  if (!options.includes(newA)) {
    errorDiv.textContent = "Your Answer must match one of the Options!";
    return;
  }

  questions.push({ question: newQ, options: options, answer: newA });
  addQuestionForm.reset();
  
})

//Results
answerForm.addEventListener("submit", e => {
  e.preventDefault();

  let selected = document.querySelector("input[name='answer']:checked");
  if (!selected) return;

  if (selected.value === shuffledQuestions[currentIndex].answer) {
    totalScore++;
  }

  currentIndex++;
  if (currentIndex >= shuffledQuestions.length) {
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
  startQuiz();
});

//Just for added Flair
//Draggable Windows
function makeDraggable(windowEl, titleBarEl) {
  let isDragging = false, offsetX = 0, offsetY = 0;

  titleBarEl.addEventListener('mousedown', e => {
    isDragging = true;
    offsetX = e.clientX - windowEl.offsetLeft;
    offsetY = e.clientY - windowEl.offsetTop;
    titleBarEl.style.cursor = 'grabbing';
    windowEl.style.zIndex = 1000;
  });

  document.addEventListener('mousemove', e => {
    if (isDragging) {
      windowEl.style.left = `${e.clientX - offsetX}px`;
      windowEl.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    titleBarEl.style.cursor = 'move';
  });

  windowEl.addEventListener('mousedown', () => { windowEl.style.zIndex = 1000; });
}

makeDraggable(document.getElementById('quiz-window'), document.getElementById('quiz-title-bar'));
makeDraggable(document.getElementById('add-window'), document.getElementById('add-title-bar'));

//Clock
function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  systemClock.textContent = timeString;
}

//Titlebar Buttons
// ==========================
// WINDOW CONTROL HANDLING
// ==========================

const taskbarIcons = document.getElementById("taskbar-icons");

function setupWindowControls(windowEl) {
    const minimizeBtn = windowEl.querySelector(".min-btn");
    const closeBtn = windowEl.querySelector(".close-btn");
    const title = windowEl.querySelector(".title-bar-text").textContent;

    let taskbarButton = null;

    minimizeBtn.addEventListener("click", () => {
        windowEl.style.display = "none";

        if (!taskbarButton) {
            taskbarButton = document.createElement("button");
            taskbarButton.className = "taskbar-button";
            taskbarButton.textContent = title;
            taskbarIcons.appendChild(taskbarButton);

            taskbarButton.addEventListener("click", () => {
                if (windowEl.style.display === "none") {
                    windowEl.style.display = "block";
                } else {
                    windowEl.style.display = "none";
                }
            });
        }
    });

    closeBtn.addEventListener("click", () => {

        if (windowEl.id === "quiz-window") {
            startQuiz();
            quizContainer.classList.remove("hidden");
            resultContainer.classList.add("hidden");
        }

        if (windowEl.id === "add-window") {
            addQuestionForm.reset();
            errorDiv.textContent = "";
        }

        if (taskbarButton) {
            taskbarButton.remove();
            taskbarButton = null;
        }
    });
}

setupWindowControls(document.getElementById("quiz-window"));
setupWindowControls(document.getElementById("add-window"));



document.addEventListener('DOMContentLoaded', () => {
  startQuiz();
    
  updateClock();
  setInterval(updateClock, 1000);
});
