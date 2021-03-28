const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const finishButton = document.getElementById('finish-btn')
const submitButton = document.getElementById('submit-btn')
const answerBtnElement = document.getElementById('answer-buttons')
const questionContainerElement = document.getElementById('question-container')
const endContainerElement = document.getElementById('end-container')
const questionElement = document.getElementById('question')
const highScores = document.getElementById('high-scores')
const scoreElement = document.getElementById('score')
const timerElement = document.getElementById('timer')

let timerCount = 60

let currentScore = 0
let score

let shuffledQuestions, currentQuestionIndex

// sound effects
var soundRight = new Audio("./assets/sounds/correct.wav");
var soundWrong = new Audio("./assets/sounds/incorrect.wav");

// startGame hides the start button and intro text and shuffles the questions
function startGame() {
    startButton.classList.add('hide')
    document.getElementById('start-container').classList.add('hide')
    questionContainerElement.classList.remove('hide')
    highScores.classList.add('hide')
    scoreElement.classList.remove('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    nextQuestion()
    startTimer()
    // to instant start:
    // timerCount--
    // timerElement.textContent = timerCount;
}

function startTimer() {
    timer = setInterval(function () {
       
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount === 0) {
            
            clearInterval(timer)
            endGame()
        }
    }, 1000)
}

function nextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

// the following function resets the page to neutral
function resetState(){
    nextButton.classList.add('hide')
    clearStatusClass(document.body)
    while (answerBtnElement.firstChild) {
        answerBtnElement.removeChild(answerBtnElement.firstChild)
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question
    //following lines shuffles the answer choices and puts them onto the buttons
    var shuffledAnswers = question.answers.sort(() => Math.random() - .5)
    shuffledAnswers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        // following if statement looks for the correct answer
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        // assigns that when a button is pressed, an answer was chosen
        button.addEventListener('click', selectAnswer)
        answerBtnElement.appendChild(button)
    })
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerBtnElement.children).forEach(button => {
         setStatusClass(button, button.dataset.correct)
     })
    if (correct) {
        currentScore += 10
        scoreElement.textContent = "Current Score: " + currentScore
        soundRight.play()
    } else {
        timerCount -= 10
        soundWrong.play()
    }
    // checks to see if we are on the last question
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        finishButton.classList.remove('hide')
    }
}

// function to add correct/wrong class colors
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

// function to clear correct/wrong
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function endGame(){
    questionContainerElement.classList.add('hide')
    finishButton.classList.add('hide')
    endContainerElement.classList.remove('hide')
    submitButton.classList.remove('hide')
    clearInterval(timer)
}

function saveScore(){
    let initialsValue = document.getElementById('initials').value
    // gets the high scores from storage, or if doesn't exist, initializes an empty array
    let highScoresList = JSON.parse(localStorage.getItem('highScores')) || [];
    // pushes the initals and scores to the array
    highScoresList.push({initials: initialsValue, score: currentScore});
    // sorts high scores, with highest score first
    highScoresList = highScoresList.sort((curr, next) => {
        if (curr.score < next.score) {
            return 1
        } else if (curr.score > next.score) {
            return -1
        } else {
            return 0
        }
    })    

    // sets the high scores array to local storage
    localStorage.setItem('highScores', JSON.stringify(highScoresList))
    
    // changes to high scores page
    window.location.href = './highscores.html'
}

// event listeners
startButton.addEventListener('click', startGame)

nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    nextQuestion()
})

finishButton.addEventListener('click', endGame)

submitButton.addEventListener('click', saveScore)