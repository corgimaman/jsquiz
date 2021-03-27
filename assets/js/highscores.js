const restartButton = document.getElementById('restart-btn')
const clearButton = document.getElementById('clear-btn')

function printHighscores() {
    // grabs scores from local storage, or empty array if coming to page without doing quiz
    var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    
    highScores.forEach(function(score) {
        // create list item tag for each score
        var liTag = document.createElement("li")
        liTag.textContent = score.initials + " - " + score.score
        // display on the page
        var olElement = document.getElementById("highscores-list")
        olElement.appendChild(liTag)
    })
}

function clearScores() {
    window.localStorage.removeItem('highScores')
    window.location.reload();
}

// function restartGame(){
//     window.location.href = './index.html'
// }

// restartButton.addEventListener('click', restartGame)
clearButton.addEventListener('click', clearScores)

printHighscores();