const quizData = [
    {
      question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "None of the above"],
      answer: "Hyper Text Markup Language"
    },
    {
      question: "What is the correct syntax for referring to an external script called 'app.js'?",
      options: ["<script src='app.js'>", "<script href='app.js'>", "<script ref='app.js'>", "<script name='app.js'>"],
      answer: "<script src='app.js'>"
    },
    {
      question: "Which CSS property controls text size?",
      options: ["font-style", "text-size", "font-size", "text-style"],
      answer: "font-size"
    },
    {
      question: "Which company developed JavaScript?",
      options: ["Mozilla", "Netscape", "Google", "Microsoft"],
      answer: "Netscape"
    },
    {
      question: "Which tag is used to link a CSS file?",
      options: ["<script>", "<style>", "<link>", "<css>"],
      answer: "<link>"
    },
    {
      question: "How do you write a comment in JavaScript?",
      options: ["// comment", "# comment", "<!-- comment -->", "/* comment */"],
      answer: "// comment"
    },
    {
      question: "Which symbol is used for 'strictly equal' in JavaScript?",
      options: ["=", "==", "===", "!="],
      answer: "==="
    },
    {
      question: "Which method adds an element to the end of an array?",
      options: [".push()", ".pop()", ".shift()", ".unshift()"],
      answer: ".push()"
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let timeLeft = 30;
  let timer;
  
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const feedbackEl = document.getElementById("feedback");
  const timeEl = document.getElementById("time");
  const scoreEl = document.getElementById("score");
  const startBtn = document.getElementById("start-btn");
  const resetBtn = document.getElementById("reset-btn");
  const leaderboardEl = document.getElementById("leaderboard");
  
  startBtn.addEventListener("click", startQuiz);
  resetBtn.addEventListener("click", resetQuiz);
  
  function startQuiz() {
    score = 0;
    currentQuestion = 0;
    timeLeft = 30;
    startBtn.style.display = "none";
    resetBtn.style.display = "none";
    loadQuestion();
    timer = setInterval(updateTimer, 1000);
  }
  
  function loadQuestion() {
    const q = quizData[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";
    feedbackEl.textContent = "";
    q.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.onclick = () => checkAnswer(opt);
      optionsEl.appendChild(btn);
    });
  }
  
  function checkAnswer(selected) {
    const correct = quizData[currentQuestion].answer;
    if (selected === correct) {
      feedbackEl.textContent = "✅ Correct!";
      score++;
    } else {
      feedbackEl.textContent = "❌ Wrong!";
    }
    scoreEl.textContent = score;
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      setTimeout(loadQuestion, 800);
    } else {
      endQuiz();
    }
  }
  
  function updateTimer() {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      endQuiz();
    }
  }
  
  function endQuiz() {
    clearInterval(timer);
    questionEl.textContent = `🎉 Quiz Over! Your Score: ${score}`;
    optionsEl.innerHTML = "";
    feedbackEl.textContent = "";
    startBtn.style.display = "inline-block";
    resetBtn.style.display = "inline-block";
    saveScore();
    showLeaderboard();
  }
  
  function saveScore() {
    const name = prompt("Enter your name:");
    if (!name) return;
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ name, score });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard.slice(0, 5)));
  }
  
  function showLeaderboard() {
    leaderboardEl.innerHTML = "";
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.forEach(entry => {
      const li = document.createElement("li");
      li.textContent = `${entry.name} - ${entry.score}`;
      leaderboardEl.appendChild(li);
    });
  }
  
  function resetQuiz() {
    clearInterval(timer);
    score = 0;
    currentQuestion = 0;
    timeLeft = 30;
    timeEl.textContent = timeLeft;
    scoreEl.textContent = score;
    feedbackEl.textContent = "";
    startBtn.style.display = "inline-block";
    resetBtn.style.display = "none";
    questionEl.textContent = "Click Start to Begin!";
    optionsEl.innerHTML = "";
  }
  