// GLOBAL VARIABLES
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questions = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("start");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("buttonA");
var buttonB = document.getElementById("buttonB");
var buttonC = document.getElementById("buttonC");
var buttonD = document.getElementById("buttonD");
var currentQuestionIndex = 0;
var timeLeft = 120;
var timerInterval;
var correct;

//QUIZ QUESTIONS
var newQuestionArray = [
  {
    question: "What term do you use to declare a variable?",
    choiceA: "var",
    choiceB: "variable",
    choiceC: "param",
    choiceD: "varchar",
    correctAnswer: "a",
  },
  {
    question: "What is the jQuery target syntax?",
    choiceA: "!",
    choiceB: "$",
    choiceC: "%",
    choiceD: "Chip",
    correctAnswer: "b",
  },
  {
    question: "What is the term for triggering a function?",
    choiceA: "listen",
    choiceB: "call",
    choiceC: "alert",
    choiceD: "define",
    correctAnswer: "b",
  },
  {
    question: "Select the counter variable.",
    choiceA: "i+math",
    choiceB: "math.random",
    choiceC: "math.floor",
    choiceD: "i++",
    correctAnswer: "d",
  },
  {
    question: "What is the shortcut to note code?",
    choiceA: "CTRL+Z",
    choiceB: "CTRL+L",
    choiceC: "CTRL+/",
    choiceD: "SHIFT+CTRL+L",
    correctAnswer: "c",
  },
  {
    question: "Which cat is my favorite?",
    choiceA: "Chip",
    choiceB: "Tubby",
    choiceC: "None",
    choiceD: "BOTH",
    correctAnswer: "d",
  },
  {
    question: "What is my dog's name?",
    choiceA: "Banana",
    choiceB: "Boudreaux",
    choiceC: "Etta",
    choiceD: "Gretta",
    correctAnswer: "c",
  },
];

var finalQuestionIndex = newQuestionArray.length;

// DISPLAYS QUESTIONS
function generateQuestion() {
  gameoverDiv.style.display = "none";
  if (currentQuestionIndex === finalQuestionIndex) {
    return showScore();
  }
  var currentQuestion = newQuestionArray[currentQuestionIndex];
  questions.innerHTML = "<p>" + currentQuestion.question + "</p>";
  buttonA.innerHTML = currentQuestion.choiceA;
  buttonB.innerHTML = currentQuestion.choiceB;
  buttonC.innerHTML = currentQuestion.choiceC;
  buttonD.innerHTML = currentQuestion.choiceD;
}

// START BUTTON TRIGGER FOR TIMER AND DISPLAY QUESTION 1
function startQuiz() {
  gameoverDiv.style.display = "none";
  startQuizDiv.style.display = "none";
  generateQuestion();

  //TIMER
  timerInterval = setInterval(function () {
    timeLeft--;
    quizTimer.textContent = "Time left: " + timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      showScore();
    }
  }, 1000);
  quizBody.style.display = "block";
}
//SHOWS USER SCORE
function showScore() {
  quizBody.style.display = "none";
  gameoverDiv.style.display = "flex";
  clearInterval(timerInterval);
  highscoreInputName.value = "";
  finalScoreEl.innerHTML =
    "You got " + timeLeft + " out of " + 120 + " correct!";
  console.log(timeLeft);
}

//SAVES USER INITIALS AND SCORE
submitScoreBtn.addEventListener("click", function highscore() {
  if (highscoreInputName.value === "") {
    alert("Initials cannot be blank");
    return false;
  } else {
    var savedHighscores =
      JSON.parse(localStorage.getItem("savedHighscores")) || [];
    var currentUser = highscoreInputName.value.trim();
    var currentHighscore = {
      name: currentUser,
      score: timeLeft,
    };
    console.log(timeLeft);

    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    savedHighscores.push(currentHighscore);
    localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
    generateHighscores();
  }
});

//GENERATES HIGH SCORES SCREEN
function generateHighscores() {
  highscoreDisplayName.innerHTML = "";
  highscoreDisplayScore.innerHTML = "";
  var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
  for (i = 0; i < highscores.length; i++) {
    var newNameSpan = document.createElement("li");
    var newScoreSpan = document.createElement("li");
    newNameSpan.textContent = highscores[i].name;
    newScoreSpan.textContent = highscores[i].score;
    highscoreDisplayName.appendChild(newNameSpan);
    highscoreDisplayScore.appendChild(newScoreSpan);
    console.log(timeLeft);
  }
}

//SHOWS HIGH SCORE SCREEN AND HIDES OTHERS
function showHighscore() {
  startQuizDiv.style.display = "none";
  gameoverDiv.style.display = "none";
  highscoreContainer.style.display = "flex";
  highscoreDiv.style.display = "block";
  endGameBtns.style.display = "flex";

  generateHighscores();
}

//REPLAY QUIZ
function replayQuiz() {
  highscoreContainer.style.display = "none";
  gameoverDiv.style.display = "none";
  startQuizDiv.style.display = "flex";
  timeLeft = 120;
  currentQuestionIndex = 0;
}

//CHECK USER ANSWER
function checkAnswer(answer) {
  correct = newQuestionArray[currentQuestionIndex].correctAnswer;

  if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
    currentQuestionIndex++;
    timeLeft;
    generateQuestion();
  } else if (
    answer !== correct &&
    currentQuestionIndex !== finalQuestionIndex
  ) {
    timeLeft = timeLeft - 10;
    currentQuestionIndex++;
    generateQuestion();
  } else {
    showScore();
  }
}

//START QUIZ
startQuizButton.addEventListener("click", startQuiz);
