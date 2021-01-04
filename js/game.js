let rng;
let guesses = 0;
let totalGuesses = 1;
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
const maxValButton = document.getElementById("maxValueButton");
const guessAmountButton = document.getElementById("guessAmountButton");
const numOfGuesses = document.getElementById("numOfGuesses");

// const gameDisplay = document.getElementById("gameBox");
// const endGameDisplay = document.getElementById("endGame");
// const setupDisplay = document.getElementById("setupBox");

function rnGen(max) {
  rng = Math.trunc(Math.random() * Math.floor(max) + 1);
  console.log(`Winning number is: ${rng}`);
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
    document.getElementById("gameBox").style.display = "none";
    // document.getElementById("prevGuessesText").style.display = "none";
    // document.getElementById("remaining").style.display = "none";
    // document.getElementById("prevGuesses").style.display = "none";
    document.getElementById("endGame").style.display = "block";
    // document.getElementById("endgameSubtext").style.display = "block";
  }

  document.getElementById(
    "endgameText"
  ).textContent = `You've ${gameState} the game! Would you like to play again?`;
  if (gameState === "won") {
    if (guesses + 1 === 1) {
      document.getElementById(
        "endgameSubtext"
      ).textContent = `Wow, you managed to get it in one guess! What vile sorcery is this?!`;
    } else {
      document.getElementById("endgameSubtext").textContent = `It took you ${
        guesses + 1
      } guesses to get the answer.`;
    }
  } else if (gameState === "lost") {
    document.getElementById(
      "endgameSubtext"
    ).textContent = `The correct answer was ${rng}.`;
  }
}

function winGame() {
  //   console.log(`You've won the game!`);
  gameState = "won";
  totalWins++;
  updateWL();
}

function loseGame() {
  //   console.log(`You've lost the game :(`);
  gameState = "lost";
  totalLosses++;
  updateWL();
}

function updatePrevGuesses() {
  if (prevGuesses.length >= 4) {
    document.getElementById("guess4").textContent = `${
      prevGuesses[prevGuesses.length - 4]
    }`;
    document.getElementById("guess3").textContent = `${
      prevGuesses[prevGuesses.length - 3]
    }`;
    document.getElementById("guess2").textContent = `${
      prevGuesses[prevGuesses.length - 2]
    }`;
    document.getElementById("guess1").textContent = `${
      prevGuesses[prevGuesses.length - 1]
    }`;
  } else if (prevGuesses.length === 3) {
    document.getElementById("guess3").textContent = `${
      prevGuesses[prevGuesses.length - 3]
    }`;
    document.getElementById("guess2").textContent = `${
      prevGuesses[prevGuesses.length - 2]
    }`;
    document.getElementById("guess1").textContent = `${
      prevGuesses[prevGuesses.length - 1]
    }`;
  } else if (prevGuesses.length === 2) {
    document.getElementById("guess2").textContent = `${
      prevGuesses[prevGuesses.length - 2]
    }`;
    document.getElementById("guess1").textContent = `${
      prevGuesses[prevGuesses.length - 1]
    }`;
  } else if (prevGuesses.length === 1) {
    document.getElementById("guess1").textContent = `${
      prevGuesses[prevGuesses.length - 1]
    }`;
  }

  // document.getElementById("guess5").textContent = `${prevGuesses[prevGuesses.length-5]}`
}

function submitGuess(input) {
  if (input === rng) {
    winGame();
  } else if (prevGuesses.includes(input)) {
    alert(`You've already guessed this number. Please enter another number`);
  } else {
    prevGuesses.push(input);
    guesses++;
    if (totalGuesses - guesses === 1) {
      document.getElementById("remaining").textContent = `You have ${
        totalGuesses - guesses
      } guess remaining! Guess ${input > rng ? `lower` : `higher`}`;
    } else {
      document.getElementById("remaining").textContent = `You have ${
        totalGuesses - guesses
      } guesses remaining! Guess ${input > rng ? `lower` : `higher`}`;
    }
    if (guesses === totalGuesses) {
      loseGame();
    }
    console.log(prevGuesses);
    updatePrevGuesses();
  }
}

function getHint() {}

function setUp() {
  newGameButton.style.display = "none";
  quitGameButton.style.display = "none";
  submitButton.style.display = "none";
  hintButton.style.display = "none";
  myGuess.style.display = "none";
  // document.getElementById("prevGuessesText").style.display = "none";
  document.getElementById("gameBox").style.display = "none";
  // document.getElementById("prevGuesses").style.display = "none";
  document.getElementById("endGame").style.display = "none";
  // document.getElementById("endgameText").style.display = "none";
  document.getElementById("maxValBox").style.display = "block";
  maxValButton.style.display = "inline";
  document.getElementById("max").style.display = "inline";
  document.getElementById("guessBox").style.display = "none";
  document.getElementById("numOfGuesses").style.display = "none";
  guessAmountButton.style.display = "none";
}

function startGame() {
  //Initiate or reset everything
  gameState = "playing";
  guesses = 0;
  prevGuesses = [];
  if (submitButton.style.display === "none") {
    newGameButton.style.display = "none";
    quitGameButton.style.display = "none";
    submitButton.style.display = "inline";
    hintButton.style.display = "inline";
    myGuess.style.display = "inline";
    document.getElementById("guessBox").style.display = "none";
    document.getElementById("numOfGuesses").style.display = "none";
    document.getElementById("guessAmountButton").style.display = "none";
    // document.getElementById("prevGuessesText").style.display = "block";
    document.getElementById("gameBox").style.display = "block";
    // document.getElementById("prevGuesses").style.display = "block";
    document.getElementById("endGame").style.display = "none";
    // document.getElementById("endgameText").style.display = "none";
    document.getElementById("maxValueButton").style.display = "none";
    document.getElementById("max").style.display = "none";
    document.getElementById("guess4").textContent = `-`;
    document.getElementById("guess3").textContent = `-`;
    document.getElementById("guess2").textContent = `-`;
    document.getElementById("guess1").textContent = `-`;
  }

  document.getElementById("remaining").textContent = `You have ${
    totalGuesses - guesses
  } guesses remaining!`;
  document.getElementById(
    "number"
  ).textContent = `Guess a number between 1 and ${maxVal}.`;
  // Get the RNG
  rnGen(maxVal);
}

submitButton.addEventListener("click", () => {
  guessVal = Number(myGuess.value);
  myGuess.value = "";

  if (guessVal > 0 && guessVal <= maxVal && gameState === "playing") {
    submitGuess(guessVal);
  } else if (guessVal > maxVal || guessVal < 0 || guessVal === 0) {
    alert(
      `Please enter a number greater than 0 and less than ${
        maxVal + 1
      } (1-${maxVal})`
    );
  } else if (gameState === "won") {
    alert(`You've already won the game.`);
  } else if (gameState === "lost") {
    alert(`You've already lost the game.`);
  } else {
    alert(`Please enter a valid number`);
  }
});

newGameButton.addEventListener("click", setUp);

hintButton.addEventListener("click", getHint());

guessAmountButton.addEventListener("click", () => {
  const submittedVal = document.getElementById("numOfGuesses").value;
  if (submittedVal >= 1 && submittedVal <= Math.ceil(Math.log2(maxVal))) {
    totalGuesses = Number(submittedVal);
    startGame();
  } else if (submittedVal === "") {
    totalGuesses = Math.trunc(Math.random() * Math.ceil(Math.log2(maxVal)) + 1);
    console.log(`You get ${totalGuesses} guesses.`);
    startGame();
  } else {
    alert(`Please enter a valid number.`);
  }
});

maxValButton.addEventListener("click", () => {
  document.getElementById("max").style.display = "none";
  maxValButton.style.display = "none";
  document.getElementById("maxValBox").style.display = "none";

  if (document.getElementById("max").value < 6) {
    maxVal = 100;
  } else {
    maxVal = Number(document.getElementById("max").value);
  }

  document.getElementById(
    "guessAmount"
  ).textContent = `Please choose a value between 1 and 10. Lower values add more challenge, but it's entirely up to you. If done properly, it is impossible to lose with ${Math.ceil(
    Math.log2(maxVal)
  )} guesses.`;
  document.getElementById(
    "guessAmount2"
  ).textContent = `Leaving the field empty will result in a random guess value given to you between 1 and ${Math.ceil(
    Math.log2(maxVal)
  )}`;
  document.getElementById("guessBox").style.display = "block";
  document.getElementById("numOfGuesses").style.display = "inline";
  guessAmountButton.style.display = "inline";
});

// startGame();
setUp();
