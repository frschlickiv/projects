//requires readlinesync
//using VS code doesn't seem to work with readline. This file was made on a AWS environment
// npm i readline-sync

let rlsync = require("readline-sync");
let HUMAN_MARKER = "X";
let COMPUTER_MARKER = "O";
let INITIAL_MARKER = " ";
let WINNING_LINES = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9], //rows
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9], //columns
  [1, 5, 9],
  [3, 5, 7], //diagonals
];

function displayBoard(board) {
  console.clear();

  console.log(`You are ${HUMAN_MARKER} the computer is ${COMPUTER_MARKER}`);

  console.log("");
  console.log("     |     |");
  console.log(`  ${board["1"]}  |  ${board["2"]}  |  ${board["3"]}`);
  console.log("     |     |");
  console.log("-----+-----+-----");
  console.log("     |     |     ");
  console.log(`  ${board["4"]}  |  ${board["5"]}  |  ${board["6"]}`);
  console.log("     |     |     ");
  console.log("-----+-----+-----");
  console.log("     |     |     ");
  console.log(`  ${board["7"]}  |  ${board["8"]}  |  ${board["9"]}`);
  console.log("     |     |     ");
  console.log("");
}
// all hail the almighty board object
function initializeBoard() {
  let board = {};

  for (let square = 1; square < 10; square++) {
    board[String(square)] = INITIAL_MARKER;
  }

  return board;
}

function prompt(str) {
  console.log(`=> ${str}`);
}

//joinor is a better version of .join() :)
function joinOr(arr, delimiter = ", ", word = "or") {
  switch (arr.length) {
    case 0:
      return "";
    case 1:
      return `${arr[0]}`;
    case 2:
      return `${arr[0]} or ${arr[1]}`;
    default:
      return (
        arr.slice(0, arr.length - 1).join(delimiter) +
        `${delimiter}${word} ${arr[arr.length - 1]}`
      );
  }
}

//returns an array of the unused squares
function emptySquares(board) {
  return Object.keys(board).filter((key) => board[key] === INITIAL_MARKER);
}

//checks if the board is full
function boardFull(board) {
  return emptySquares(board).length === 0;
}

//player picks a square from the available options
function playerChoosesSquare(board) {
  let square;
  let choices = emptySquares(board);

  while (true) {
    prompt(`Please choose a tile: ${choices}`);

    square = rlsync.question().trim();

    if (choices.includes(square)) {
      break;
    } else {
      prompt(
        `Please select an empty square from the following: ${joinOr(choices)}`
      );
    }
  }
  board[square] = HUMAN_MARKER;
}

// Chooses a square defensively, otherwise it chooses randomly
function computerChoosesSquare(board) {
  let square;

  //defense
  for (let index = 0; index < WINNING_LINES.length; index++) {
    let line = WINNING_LINES[index];
    square = squareAtRisk(line, board, HUMAN_MARKER);
    if (square) break;
  }

  //offense
  if (!square) {
    for (let index = 0; index < WINNING_LINES.length; index++) {
      let line = WINNING_LINES[index];
      square = squareAtRisk(line, board, COMPUTER_MARKER);
      if (square) break;
    }
  }

  //random
  if (!square) {
    let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
    square = emptySquares(board)[randomIndex];
  }

  board[square] = COMPUTER_MARKER;
}

function squareAtRisk(line, board, marker) {
  let markersInLine = line.map((square) => board[square]);

  if (markersInLine.filter((ind) => ind === marker).length === 2) {
    let unusedSquare = line.find((square) => board[square] === INITIAL_MARKER);
    if (unusedSquare !== undefined) {
      return unusedSquare;
    }
  }
  return null;
}

function detectWinner(board) {
  for (let line = 0; line < WINNING_LINES.length; line++) {
    let [sq1, sq2, sq3] = WINNING_LINES[line];

    if (
      board[sq1] === HUMAN_MARKER &&
      board[sq2] === HUMAN_MARKER &&
      board[sq3] === HUMAN_MARKER
    ) {
      return "Human";
    } else if (
      board[sq1] === COMPUTER_MARKER &&
      board[sq2] === COMPUTER_MARKER &&
      board[sq3] === COMPUTER_MARKER
    ) {
      return "Computer";
    }
  }
  return null;
}

function someoneWon(board) {
  return !!detectWinner(board);
}

while (true) {
  let board = initializeBoard();

  while (true) {
    displayBoard(board);

    playerChoosesSquare(board);
    if (someoneWon(board) || boardFull(board)) break;

    computerChoosesSquare(board);
    if (someoneWon(board) || boardFull(board)) break;
  }

  displayBoard(board);

  if (someoneWon(board)) {
    prompt(`${detectWinner(board)} won!`);
  } else {
    prompt("It's a tie!");
  }

  prompt("Play again?");
  let answer = rlsync.question().toLowerCase()[0];
  if (answer !== "y") {
    console.clear();
    break;
  }
}

prompt("Thanks for playing Tic Tac Toe!");
