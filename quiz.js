const questions = [
  {
    question: "Which of these is the capital of France?",
    options: ["London", "Berlin", "Paris", "Rome"],
    correct: 2
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correct: 1
  },
  {
    question: "What is 5 + 7?",
    options: ["10", "12", "11", "13"],
    correct: 1
  },
  {
    question: "Which language is primarily used for web development?",
    options: ["Python", "JavaScript", "C++", "Java"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.querySelector('.quiz-options');
const feedback = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const nextBtn = document.getElementById('next-btn');

function showQuestion() {
  // Clear previous options
  optionsEl.innerHTML = "";
  feedback.classList.add('hidden');
  nextBtn.classList.add('hidden');

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;

  q.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.classList.add('option');
    btn.textContent = option;
    btn.addEventListener('click', () => selectAnswer(index));
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(index) {
  const q = questions[currentQuestion];
  const optionButtons = document.querySelectorAll('.option');

  // Check correct
  if (index === q.correct) {
    feedback.textContent = "✅ Correct!";
    score++;
    optionButtons[index].classList.add('correct');
  } else {
    feedback.textContent = `❌ Incorrect! The correct answer is: ${q.options[q.correct]}`;
    optionButtons[index].classList.add('incorrect');
    optionButtons[q.correct].classList.add('correct');
  }

  feedback.classList.remove('hidden');
  scoreEl.textContent = `Score: ${score}/${currentQuestion + 1}`;
  scoreEl.classList.remove('hidden');

  // Disable buttons
  optionButtons.forEach(btn => btn.disabled = true);

  // Show next button
  if (currentQuestion < questions.length - 1) {
    nextBtn.textContent = "Next Question ➡️";
    nextBtn.classList.remove('hidden');
  } else {
    nextBtn.textContent = "Finish ✅";
    nextBtn.classList.remove('hidden');
  }
}

nextBtn.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    // Quiz finished
    questionEl.textContent = "🎉 Quiz Finished!";
    optionsEl.innerHTML = "";
    feedback.textContent = `Your final score is ${score}/${questions.length}`;
    nextBtn.style.display = "none";
  }
});

// Initialize first question
showQuestion();
