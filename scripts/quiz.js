const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");

const myQuestions = [
  {
    question: "What is a Web cookie?",
    answers: {
      a: "A sweet treat for coders",
      b: "A file used to collect information about an Internet user",
      c: "A setting in your Internet browser",
      d: "An ad-blocking software"
    },
    correctAnswer: "b"
  },
  {
    question: "Which of the following is NOT a use of cookies?",
    answers: {
      a: "Online shopping carts",
      b: "Persisting login sessions",
      c: "Saving website preferences",
      d: "Applying themes to browsers"
    },
    correctAnswer: "d"
  },
  {
    question: "Which type of cookie is used to track users?",
    answers: {
      a: "First-party cookies",
      b: "Third-party cookies",
      c: "Flash cookies",
      d: "Session cookies"
    },
    correctAnswer: "d"
  },
  {
    question: "Which of the following is NOT a common concern about cookie privacy?",
    answers: {
      a: "Storage space",
      b: "Anonymity",
      c: "Data sharing",
      d: "Surreptitious data collection"
    },
    correctAnswer: "a"
  },
  {
    question: "True or false: Cookies are stored on your computer forever.",
    answers: {
      a: "True",
      b: "False"
    },
    correctAnswer: "b"
  },
  {
    question: "Which of the following is an effective way to minimize tracking cookies?",
    answers: {
      a: "Set up 'do not track' requests",
      b: "Turn off your Wi-Fi",
      c: "Regularly close your browser",
      d: "Always accept terms and conditions"
    },
    correctAnswer: "a"
  },
  {
    question: "Which of the following is NOT a type of cookie?",
    answers: {
      a: "First-party cookies",
      b: "Data cookies",
      c: "Flash cookies",
      d: "Session cookies"
    },
    correctAnswer: "b"
  },
  {
    question: "True or false: Cookies are essential in showing Web ads.",
    answers: {
      a: "True",
      b: "False"
    },
    correctAnswer: "b"
  },
  {
    question: "Why were cookies originally created?",
    answers: {
      a: "To track users and sell products to them",
      b: "To maintain interactions between Website visits",
      c: "To keep track of users' various usernames and passwords",
      d: "To allow users to communicate with Web servers"
    },
    correctAnswer: "b"
  },
  {
    question: "True or false: Cookies are used to create personalized ads on the Web",
    answers: {
      a: "True",
      b: "False"
    },
    correctAnswer: "a"
  }
];

function buildQuiz() {
  //place to store the HTML output
  const output = [];

  //for each question
  myQuestions.forEach((currentQuestion, questionNumber) => {
    //place to store the list of answer choices
    const answers = [];

    //for each available answer...
    for (letter in currentQuestion.answers) {
      //...add an HTML radio button
      answers.push(
        `<label>
          <input type="radio" name="question${questionNumber}" value="${letter}">
          ${letter} :
          ${currentQuestion.answers[letter]}
        </label>`
      );
    }

    //add question and its answers to output
    output.push(
      `<div class="slide">
        <div class="question">
          ${currentQuestion.question}
        </div>
        <div class="answers">
          ${answers.join("")}
        </div>
      </div>`
    );
  });

  //combine output list into one string and add to page
  quizContainer.innerHTML = output.join("");
}

function showResults() {
  //gather answer containers
  const answerContainers = quizContainer.querySelectorAll(".answers");

  //keep track of users' score
  let numCorrect = 0;

  //for each question...
  myQuestions.forEach((currentQuestion, questionNumber) => {
    //get selected answer
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    //if answer is correct...
    if (userAnswer == currentQuestion.correctAnswer) {
      //add to score
      numCorrect++;

      //color the answers green
      answerContainers[questionNumber].style.color = "green";
    } else {
      //if answer is wrong or blank
      //color the answers red
      answerContainer[questionNumber].style.color = "red";
    }
  });

  //show number of correct answers out of total
  resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

function showSlide(n) {
  //hide the current slide
  slides[currentSlide].classList.remove('activeSlide');
  //show the new slide
  slides[n].classList.add('activeSlide');
  //update the current slide number
  currentSlide = n;

  //hide previous button if on first question
  if (currentSlide == 0) {
    prevButton.style.display = 'none';
  } else {
    prevButton.style.display = 'inline-block';
  }

  //hide next button if on last question
  if (currentSlide == slides.length - 1) {
    nextButton.style.display = 'none';
    submitButton.style.display = 'inline-block';
  } else {
    nextButton.style.display = 'inline-block';
    submitButton.style.display = 'none';
  }
}

function showNextSlide() {
  showSlide(currentSlide + 1);
}

function showPreviousSlide() {
  showSlide(currentSlide - 1);
}



//display quiz immediately
buildQuiz();

//get elements for showing slides
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("previous");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

//show the first slide
showSlide(0);

//on previous, go to previous slide
prevButton.addEventListener("click", showPreviousSlide);

//on next, go to next slide
nextButton.addEventListener("click", showNextSlide);

//on submit, show results
submitButton.addEventListener("click", showResults);