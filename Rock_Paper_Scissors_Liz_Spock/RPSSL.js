const rlSync = require("readline-sync");
const VALID_CHOICES = ["rock", "paper", "scissors", "spock", "lizard"];

function prompt(message) {
  console.log(`=> ${message}`);
}

let compPlay = "";
let youPlay = "";
let playerScore = 0;
let compScore = 0;

function computerPlay() {
  let playNum = Math.floor(Math.random() * 5 + 1);
  switch (playNum) {
    case 1:
      compPlay = "rock";
      break;
    case 2:
      compPlay = "paper";
      break;
    case 3:
      compPlay = "scissors";
      break;
    case 4:
      compPlay = "spock";
      break;
    case 5:
      compPlay = "lizard";
      break;
  }
  console.log(`The computer played ${compPlay}.`);
}

function playerChoice(input) {
  //I tried assigning the parameter to a readline question. I did this before and it saved me the trouble of constantly using the prompt function.
  input = rlSync.question(
    "Enter a number that cooresponds with your choice: 1) rock, 2) paper, 3) scissors, 4) spock, 5) lizard.\n"
  );
  while (!["1", "2", "3", "4", "5"].includes(input)) {
    prompt("That's not a valid choice");
    input = rlSync.question(
      "Enter a number that cooresponds with your choice: 1) rock, 2) paper, 3) scissors, 4) spock, 5) lizard.\n"
    );
  }
  switch (input) {
    case "1":
      youPlay = VALID_CHOICES[0];
      break;
    case "2":
      youPlay = VALID_CHOICES[1];
      break;
    case "3":
      youPlay = VALID_CHOICES[2];
      break;
    case "4":
      youPlay = VALID_CHOICES[3];
      break;
    case "5":
      youPlay = VALID_CHOICES[4];
      break;
  }
  console.log(`You played ${youPlay}`);
}

//the key is the user's play and the values are the possible computer plays that will be defeated by the user's play
const WINNING_COMBOS = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["paper", "spock"],
  spock: ["rock", "scissors"],
};

function playerWins() {
  if (WINNING_COMBOS[youPlay].includes(compPlay)) {
    return true;
  } else {
    return false;
  }
}

function displayWinner() {
  if (playerWins() === true) {
    prompt("You win!");
    playerScore++;
  } else if (youPlay === compPlay) {
    prompt("It's a tie!");
  } else {
    prompt("Computer wins!");
    compScore++;
  }
}

function displayScore() {
  prompt(`Player score: ${playerScore} Computer score: ${compScore}`);
}

//The game

while (true) {
  playerChoice();
  computerPlay();
  playerWins();
  displayWinner();
  displayScore();

  if (playerScore === 5) {
    prompt("You have won the best of 5 games.");
    break;
  } else if (compScore === 5) {
    prompt("The computer has won the best of 5 games.");
    break;
  }
}
