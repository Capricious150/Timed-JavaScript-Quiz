// Global Variables

const startDivEl = document.getElementById("start");
const startButtonEl = document.getElementById("startButton");
const submitButtonEl = document.getElementById("submit");
const scoreEl = document.getElementById("currentScore");
const timerEl = document.getElementById("timeSpan");
const questionIdArray = ["q1","q2","q3","q4","q5","q6","q7","q8","q9","q10"];
const scoreScreenEl = document.getElementById("scoreScreen");
const finalScoreEl = document.getElementById("finalScore");
const highScoreScreenEl = document.getElementById("highScoreScreen");
const scoresListEl = document.getElementById("scoresList");
const viewHighScoreButtonEl = document.getElementById("viewHighScores");

let score = 0;
let scoreIncrement = 1;
let timeLeft = 60;

var initialsInput = document.querySelector("#initials");

var questionDivEl;
var previousQuestionDivEl;

var savedScores = localStorage.getItem("highScore");
var printScore = document.createElement("li");

// This is ugly, but works, so let's briefly discuss the next 40 variables.
// Because of the way I approached this, my buttons all live in HTML. There were a few ways to complete
// some event handling for them. Ultimately, my approach is just to "brute force" it, as my containers were not
// built with event delegation in mind. As such, what follows are 40 variables, one for each answer button.
// The syntax is "wAEl#" a shortening of "wrongAnswerEl#" and "cAEl#", for "correctAnswerEl#"

var wAEl1 = document.getElementById("w1");
var wAEl2 = document.getElementById("w2");
var wAEl3 = document.getElementById("w3");
var wAEl4 = document.getElementById("w4");
var wAEl5 = document.getElementById("w5");
var wAEl6 = document.getElementById("w6");
var wAEl7 = document.getElementById("w7");
var wAEl8 = document.getElementById("w8");
var wAEl9 = document.getElementById("w9");
var wAEl10 = document.getElementById("w10");
var wAEl11 = document.getElementById("w11");
var wAEl12 = document.getElementById("w12");
var wAEl13 = document.getElementById("w13");
var wAEl14 = document.getElementById("w14");
var wAEl15 = document.getElementById("w15");
var wAEl16 = document.getElementById("w16");
var wAEl17 = document.getElementById("w17");
var wAEl18 = document.getElementById("w18");
var wAEl19 = document.getElementById("w19");
var wAEl20 = document.getElementById("w20");
var wAEl21 = document.getElementById("w21");
var wAEl22 = document.getElementById("w22");
var wAEl23 = document.getElementById("w23");
var wAEl24 = document.getElementById("w24");
var wAEl25 = document.getElementById("w25");
var wAEl26 = document.getElementById("w26");
var wAEl27 = document.getElementById("w27");
var wAEl28 = document.getElementById("w28");
var wAEl29 = document.getElementById("w29");
var wAEl30 = document.getElementById("w30");

var cAEl1 = document.getElementById("c1");
var cAEl2 = document.getElementById("c2");
var cAEl3 = document.getElementById("c3");
var cAEl4 = document.getElementById("c4");
var cAEl5 = document.getElementById("c5");
var cAEl6 = document.getElementById("c6");
var cAEl7 = document.getElementById("c7");
var cAEl8 = document.getElementById("c8");
var cAEl9 = document.getElementById("c9");
var cAEl10 = document.getElementById("c10");

// Lastly I'm declaring an index for the progress game function

var i = 0;

// Functions Start


// Start Game function. 
// It does several things. It makes sure "Time Left" is 60, in case the user hit "View Most Recent Score" before playing (see below)
// It hides the Most Recent Score screen for the same reason, and hides the actual "Start Game" div
// Then it fires off two functions: The countdown timer, and the first use of the "Progress Game" function (see below)

function startGame(){
    timeLeft = 60;

    highScoreScreenEl.style.display = "none";
    startDivEl.style.display = "none";

    countdown();
    progressGame();
    scoreEl.textContent = score;
}

// The "Progress Game" function.
// Behaves similarly to a for loop which displays and hides cards, using variables questionDivEl and questionIdArray.
// It uses the later-defined functions "wrongAnswer" and "correctAnswer" to increment the index.

function progressGame(){

        if (i > 0) {
            previousQuestionDivEl = document.getElementById(questionIdArray[i-1]);
            previousQuestionDivEl.style.display = "none";    
        } 

        questionDivEl = document.getElementById(questionIdArray[i]);
        questionDivEl.style.display = "flex";
}


// If the user gets a wrong answer, reset the score multiplier, reduced remaining time by 10 seconds
// If there are any remaining questions, proceed to the next one. Otherwise, set the timer to 0 seconds to end the game.

function wrongAnswer(){
    scoreIncrement = 1;
    console.log("Current Score is " + score);
    console.log("Current Score increment is " + scoreIncrement);
    timeLeft = (timeLeft - 10);
    
    i = i + 1;

    if (i < 10){
    progressGame();
    } else {
        timeLeft = 0;
    }
}

// If the user gets a correct answer, increase their score, then increase the score multiplier.
// If there are any remaining questions, proceed to the next one. Otherwise, set the timer to 0 seconds to end the game.

function correctAnswer(){
    score = score + scoreIncrement;
    console.log("Current Score is " + score);
    scoreIncrement = scoreIncrement + 1;
    console.log("Current Score increment is " + scoreIncrement);
    scoreEl.textContent = score;
    i = i + 1;

    if (i < 10){
        progressGame();
        } else {
            timeLeft = 0;
        }
}


// The Timer
// Every second, reduce remaining time by 1 second. If remaining time ever falls below 0, end the game

function countdown(){

    var timeInterval = setInterval(function () {
        
    timerEl.textContent = timeLeft;
        // Incremement Down
        timeLeft--;
    
          if (timeLeft < 0){
            clearInterval(timeInterval);
            endGame();
            timerEl.textContent = "0";
          }
          
      }, 1000);

}

// The End Game function
// Hides any questions that may still be on the screen, and displays the final score screen.
// Print the final score.

function endGame(){
    console.log("Game Over!")
    previousQuestionDivEl.style.display = "none"; 
    questionDivEl.style.display = "none";
    scoreScreenEl.style.display = "flex";
    finalScoreEl.textContent = score;
}

// When a user submits their initials (either by clicking Submit, or hitting "Enter" on the input field)
// Save the score and the user's initials to local storage. 
// Update a variable which can read that object from local storage, and move on to the "Most Recent Score" screen

function submitInits(event){
    event.preventDefault();

    var highScore = {
        finalScore: score,
        initials: initialsInput.value.trim()
    }

    localStorage.setItem("highScore", JSON.stringify(highScore));
    savedScores = localStorage.getItem("highScore");
    viewHighScores();

}


// The "View Most Recent Score" function (retains its name "viewHighScores" from a previous build)
// This function does a lot of heavy lifting, so I'll use comments to break it down: 

function viewHighScores(){

    // Check to see if any questions are currently displayed. If they are, hide them.
if (previousQuestionDivEl != undefined){
    previousQuestionDivEl.style.display = "none";
}
if (questionDivEl != undefined){
    questionDivEl.style.display = "none";
}
    // Similarly, hide the Game Over screen
    scoreScreenEl.style.display = "none";
    // Make the Most Recent Score screen appear (retains its ID and name elements from an earlier build)
    highScoreScreenEl.style.display = "flex";
    // Print the score, and empty the "Remaining Time" field if possible. Does not interupt an ongoing timer.
    scoresListEl.appendChild(printScore);

    // If a user fires off this function before a score has been saved to local storage, alert them.
if (savedScores === null){
    savedScores = "There are no saved scores to display!"
}
    // Otherwise, print the most recent score from local storage
    printScore.textContent = savedScores;
    timerEl.textContent = "";

    // I don't know how to stop an ongoing interval, so if a user decides to click "View Most Recent Score"
    // in the middle of a game, I'll just set the remaining time to an arbitrarily high number
    timeLeft = 1000000;    

}

// Event Listeners Start

// First, three Event Listeners for "Start Game", "Submit Initials", and "View Most Recent Score"
startButtonEl.addEventListener("click", startGame);
submitButtonEl.addEventListener("click", submitInits);
viewHighScoreButtonEl.addEventListener("click", viewHighScores);



// Similar to the above, I'm just brute-forcing the event listeners for the right and wrong answers.
// 30 possible wrong answers and 10 possible correct answers means 40 listeners.
// This is the final code, nothing more appears past these. 

wAEl1.addEventListener("click", wrongAnswer);
wAEl2.addEventListener("click", wrongAnswer);
wAEl3.addEventListener("click", wrongAnswer);
wAEl4.addEventListener("click", wrongAnswer);
wAEl5.addEventListener("click", wrongAnswer);
wAEl6.addEventListener("click", wrongAnswer);
wAEl7.addEventListener("click", wrongAnswer);
wAEl8.addEventListener("click", wrongAnswer);
wAEl9.addEventListener("click", wrongAnswer);
wAEl10.addEventListener("click", wrongAnswer);
wAEl11.addEventListener("click", wrongAnswer);
wAEl12.addEventListener("click", wrongAnswer);
wAEl13.addEventListener("click", wrongAnswer);
wAEl14.addEventListener("click", wrongAnswer);
wAEl15.addEventListener("click", wrongAnswer);
wAEl16.addEventListener("click", wrongAnswer);
wAEl17.addEventListener("click", wrongAnswer);
wAEl18.addEventListener("click", wrongAnswer);
wAEl19.addEventListener("click", wrongAnswer);
wAEl20.addEventListener("click", wrongAnswer);
wAEl21.addEventListener("click", wrongAnswer);
wAEl22.addEventListener("click", wrongAnswer);
wAEl23.addEventListener("click", wrongAnswer);
wAEl24.addEventListener("click", wrongAnswer);
wAEl25.addEventListener("click", wrongAnswer);
wAEl26.addEventListener("click", wrongAnswer);
wAEl27.addEventListener("click", wrongAnswer);
wAEl28.addEventListener("click", wrongAnswer);
wAEl29.addEventListener("click", wrongAnswer);
wAEl30.addEventListener("click", wrongAnswer);

cAEl1.addEventListener("click", correctAnswer);
cAEl2.addEventListener("click", correctAnswer);
cAEl3.addEventListener("click", correctAnswer);
cAEl4.addEventListener("click", correctAnswer);
cAEl5.addEventListener("click", correctAnswer);
cAEl6.addEventListener("click", correctAnswer);
cAEl7.addEventListener("click", correctAnswer);
cAEl8.addEventListener("click", correctAnswer);
cAEl9.addEventListener("click", correctAnswer);
cAEl10.addEventListener("click", correctAnswer);
