let rng;
let guesses = 0;
let prevGuesses = [];
let maxVal = 100;
let gameState = "playing";
let totalWins = 0;
let totalLosses = 0;
const submitButton = document.getElementById("submit");
const hintButton = document.getElementById("hint");
const myGuess = document.getElementById("guess");
const newGameButton = document.getElementById("newGame");
const quitGameButton = document.getElementById("quit");

function rnGen(max) {
  rng = Math.trunc(Math.random() * Math.floor(max) + 1);
  console.log(rng);
}

function updateWL() {
  document.getElementById("win").textContent = `W: ${totalWins}`;
  document.getElementById("lose").textContent = `L: ${totalLosses}`;

  if (newGameButton.style.display === "none") {
    newGameButton.style.display = "inline";
    quitGameButton.style.display = "inline";
    submitButton.style.display = "none";
    hintButton.style.display = "none";
    myGuess.style.display = "none";
    document.getElementById("prevGuessesText").style.display = "none";
    document.getElementById("remaining").style.display = "none";
    document.getElementById("prevGuesses").style.display = "none";
    document.getElementById("endgameText").style.display = "block";
    document.getElementById("endgameSubtext").style.display = "block";
  }

  document.getElementById(
    "endgameText"
  ).textContent = `You've ${gameState} the game! Would you like to play again?`;
  if (gameState === "won") {
    document.getElementById("endgameSubtext").textContent = `It took you ${
      guesses + 1
    } guesses to get the answer.`;
  } else if (gameState === "lost") {
    document.getElementById(
      "endgameSubtext"
    ).textContent = `The correct answer was ${rng}`;
  }
}

function winGame() {
  console.log(`You've won the game!`);
  gameState = "won";
  totalWins++;
  updateWL();
}

function loseGame() {
  console.log(`You've lost the game :(`);
  gameState = "lost";
  totalLosses++;
  updateWL();
}

function submitGuess(input) {
  if (input === rng) {
    winGame();
  } else if (prevGuesses.includes(input)) {
    alert(`You've already guessed this number. Please enter another number`);
  } else {
    prevGuesses.push(input);
    guesses++;
    document.getElementById("remaining").textContent = `You have ${
      5 - guesses
    } guesses remaining!`;
    if (guesses > 4) {
      loseGame();
    }
    console.log(prevGuesses);
  }
}

function getHint() {}

function startGame() {
  //Initiate or reset everything
  gameState = "playing";
  guesses = 0;
  prevGuesses = [];
  if (newGameButton.style.display !== "none") {
    newGameButton.style.display = "none";
    quitGameButton.style.display = "none";
    submitButton.style.display = "inline";
    hintButton.style.display = "inline";
    myGuess.style.display = "inline";
    document.getElementById("prevGuessesText").style.display = "block";
    document.getElementById("remaining").style.display = "block";
    document.getElementById("prevGuesses").style.display = "block";
    document.getElementById("endgameSubtext").style.display = "none";
    document.getElementById("endgameText").style.display = "none";
  }
  document.getElementById("remaining").textContent = `You have ${
    5 - guesses
  } guesses remaining!`;

  // Get the RNG
  rnGen(maxVal);
}

submitButton.addEventListener("click", () => {
  guessVal = Number(myGuess.value);
  myGuess.value = "";
  console.log(guessVal);
  if (guessVal > 0 && guessVal <= maxVal && gameState === "playing") {
    submitGuess(guessVal);
  } else if (guessVal > maxVal || guessVal < 0) {
    alert(`Please enter a number greater than 0 and less than ${maxVal + 1}`);
  } else if (gameState === "won") {
    alert(`You've already won the game.`);
  } else if (gameState === "lost") {
    alert(`You've already lost the game.`);
  } else {
    alert(`Please enter a valid number`);
  }
});

newGameButton.addEventListener("click", startGame);

hintButton.addEventListener("click", getHint());

startGame();
