let pyodide = null;
let questionsShuffled = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 120;
let timerInterval;
const winningThreshold = 3;
const questionsPerRound = 3;

let askedQuestions = [];
let gameActive = false;

// DOM Elements
const questionPromptElement = document.getElementById('question-prompt');
const codeInputElement = document.getElementById('code-input');
const submitButtonElement = document.getElementById('submit-button');
const feedbackElement = document.getElementById('feedback');
const timeRemainingElement = document.getElementById('timer');
const currentScoreElement = document.getElementById('score');
const finalResultsElement = document.getElementById('final-results');
const finalScoreElement = document.getElementById('final-score');
const finalPercentageElement = document.getElementById('final-percentage');
const finalMessageElement = document.getElementById('final-message');
const orientationWarningElement = document.getElementById('orientation-warning');
const maggiIconElement = document.getElementById('maggi-bowl');
const restartButtonElement = document.getElementById('restart-button');
const bgMusic = document.getElementById('bgMusic');
const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');
const cookedSound = document.getElementById('cookedSound');
const uncookedSound = document.getElementById('uncookedSound');

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function initializePyodide() {
  try {
    pyodide = await loadPyodide();
    console.log('Pyodide loaded!');
    resetGame();
  } catch (error) {
    console.error("Failed to load Pyodide:", error);
    feedbackElement.textContent = "Failed to load Pyodide. Please check your internet connection and try again.";
  }
}

function loadQuestion() {
  if (currentQuestionIndex < questionsPerRound && questionsShuffled.length > 0) {
    let question;
    do {
      if (questionsShuffled.length === 0) {
        questionsShuffled = shuffleArray([...questions]);
        askedQuestions = [];
      }
      question = questionsShuffled.shift();
    } while (askedQuestions.includes(question));

    askedQuestions.push(question);

    questionPromptElement.textContent = question.prompt;
    codeInputElement.value = '';
  } else {
    endGame();
  }
}

async function runPythonCode(code) {
  try {
    pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()

${code}

output = sys.stdout.getvalue()
`);
    return pyodide.globals.get("output");
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

async function submitCode() {
  if (!gameActive) return;
  const question = askedQuestions[currentQuestionIndex];
  if (!question) return;

  const userCode = codeInputElement.value;
  const combinedCode = `${userCode}\n${question.testCode}`;
  const output = await runPythonCode(combinedCode);
  if (!userCode.trim()) {
    feedbackElement.textContent = "🤔 Type some code before serving!";
    feedbackElement.style.color = "#D32F2F";
    return;
  }

  if (output.trim() === question.expectedOutput.trim()) {
    feedbackElement.style.color = "#388E3C"; // green
    feedbackElement.style.backgroundColor = "#C8E6C9";

    feedbackElement.textContent = "🎉 Hot and spicy code! 🎉";
    score++;
    currentScoreElement.textContent = `Score: ${score}`;
    feedbackElement.style.color = "";
    correctSound.currentTime = 0;
correctSound.play();
    maggiIconElement.classList.add('pop');
    setTimeout(() => maggiIconElement.classList.remove('pop'), 300);
  } else {
    feedbackElement.innerHTML = `🥲 Undercooked Maggi! 🥲<br>Correct test:<pre>${question.testCode}</pre><br>Your output:<pre>${output}</pre>`;
    feedbackElement.style.color = "#D32F2F";
    wrongSound.currentTime = 0;
wrongSound.play();

  }

  if (currentQuestionIndex + 1 < questionsPerRound) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    setTimeout(endGame, 1000); // slight delay to show feedback
  }

}

function startTimer() {
  timerInterval = setInterval(() => {
    if (!gameActive) return;

    timeLeft--;
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');
    timeRemainingElement.textContent = `${minutes}:${seconds}`;

    if (timeLeft <= 0) endGame();
  }, 1000);
}

function endGame() {
  clearInterval(timerInterval);
  gameActive = false;
bgMusic.pause();
bgMusic.currentTime = 0;

  questionPromptElement.textContent = "";
  feedbackElement.textContent = "";
  feedbackElement.style.color = "";

  maggiIconElement.classList.add('pop');
  setTimeout(() => maggiIconElement.classList.remove('pop'), 1000);

  const percentage = (score / questionsPerRound) * 100;
  finalScoreElement.textContent = `Final Score: ${score} / ${questionsPerRound}`;
  finalPercentageElement.textContent = `Percentage: ${percentage.toFixed(2)}%`;
  const message = score >= winningThreshold
    ? "🍜 Maggi Master Coder! You've achieved peak noodle proficiency!"
    : "🥚 Needs More Seasoning! Keep practicing your Maggi coding!";
  finalMessageElement.textContent = message;
if (score >= winningThreshold) {
  cookedSound.currentTime = 0;
  cookedSound.play();
} else {
  uncookedSound.currentTime = 0;
  uncookedSound.play();
}

  const finalIconPath = score >= winningThreshold ? 'deli.png' : 'raw.png';
  document.getElementById('final-maggi-icon').src = finalIconPath;

  finalResultsElement.classList.add('show');
}
const muteButton = document.getElementById('mute-toggle');

muteButton.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play();
    muteButton.textContent = "🔊";
    muteButton.title = "Mute Music";
  } else {
    bgMusic.pause();
    muteButton.textContent = "🔇";
    muteButton.title = "Unmute Music";
  }
});

function resetGame() {
  clearInterval(timerInterval);
  gameActive = true;
  score = 0;
  timeLeft = 120;
  currentQuestionIndex = 0;
  currentScoreElement.textContent = `Score: ${score}`;
  timeRemainingElement.textContent = "02:00";
  bgMusic.currentTime = 0;
bgMusic.play().catch(() => {
  console.log("User interaction required to play background music.");
});

  questionsShuffled = shuffleArray([...questions]);
  askedQuestions = [];
  finalResultsElement.classList.remove('show');
  feedbackElement.textContent = "";

  codeInputElement.style.display = "block";
  submitButtonElement.style.display = "block";

  loadQuestion();
  startTimer();
  codeInputElement.value = "";
  feedbackElement.textContent = "";
  feedbackElement.style.color = "";

}

submitButtonElement.addEventListener('click', submitCode);
restartButtonElement.addEventListener('click', resetGame);

function checkOrientation() {
  orientationWarningElement.style.display = window.innerWidth < window.innerHeight ? 'block' : 'none';
}
window.addEventListener('orientationchange', checkOrientation);
window.addEventListener('resize', checkOrientation);

codeInputElement.addEventListener('keydown', function (e) {
  if (e.key == 'Tab') {
    e.preventDefault();
    const start = this.selectionStart;
    const end = this.selectionEnd;
    this.value = this.value.substring(0, start) + "    " + this.value.substring(end);
    this.selectionStart = this.selectionEnd = start + 4;
  }
});

checkOrientation();
initializePyodide();
