const quizData = [
    {
      question: 'What is a color that can be eaten?',
      options: ['Yellow', 'Blue', 'Red', 'Orange'],
      answer: 'Orange',
    },
    {
      question: 'What is full of holes but still hold water?',
      options: ['Sponge', 'Bucket', 'Plate', 'Galore'],
      answer: 'Sponge',
    },
    {
      question: "I have four fingers and a thumb, but I'm not living, what am I?",
      options: ['Table', 'Chair', 'Glove', 'Fan'],
      answer: 'Glove',
    },
    {
      question: 'You hold my tail while I fish for you, what am I?',
      options: ['Net', 'Monkey', 'Canoe', 'Bucket'],
      answer: 'Net',
    },
    {
      question: 'Everyone has me but no one can lose me, what am I?',
      options: ['Shadow', 'Money', 'Shoes', 'Pen',],
      answer: 'Shadow',
    },
    {
      question: 'What can you catch but not throw?',
      options: ['Ball', 'Cold', 'Bird', 'Tennis'],
      answer: 'Cold',
    },
    {
      question: 'I belong to you but others use me more than you do?',
      options: [
        'Brain',
        'Shadow',
        'Name',
        'Hand',
      ],
      answer: 'Name',
    },
    {
      question: "You're my brother but I'm not your brother. Who am I?",
      options: ['Cousin', 'Relative', 'Friend', 'Sister'],
      answer: 'Sister',
    },
    {
      question: "What word begins and ends with 'E' but only has one letter?",
      options: [
        'Envelope',
        'Elevate',
        'Entangle',
        'Eliminate',
      ],
      answer: 'Envelope',
    },
    {
      question: 'Which of these months has 28 days?',
      options: ['January', 'February', 'March', 'All'],
      answer: 'All',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();