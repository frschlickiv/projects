const p1 = {
  score: 0,
  button: document.getElementById("p1Button"),
  display: document.getElementById("p1Score"),
};

const p2 = {
  score: 0,
  button: document.getElementById("p2Button"),
  display: document.getElementById("p2Score"),
};

//point to reset button
const resetButton = document.getElementById("reset");

//point to the select element
const playTo = document.getElementById("rounds");

//scores variable to be set to the innerHTML

let winningScore = 3;
let isGameOver = false;

function updateScores(player, opponent) {
  if (!isGameOver) {
    player.score++;
    if (player.score === winningScore) {
      isGameOver = true;
      player.display.classList.add("has-text-success");
      opponent.display.classList.add("has-text-danger");
      player.button.disabled = true;
      opponent.button.disabled = true;
    }
    player.display.innerHTML = player.score;
  }
}

//event listener for the buttons
p1.button.addEventListener("click", function () {
  updateScores(p1, p2);
});

p2.button.addEventListener("click", function () {
  updateScores(p2, p1);
});

playTo.addEventListener("change", function () {
  winningScore = parseInt(this.value);
  reset();
});

//resetButton function
resetButton.addEventListener("click", reset);

function reset() {
  isGameOver = false;
  for (let p of [p1, p2]) {
    p.score = 0;
    p.display.innerHTML = 0;
    p.display.classList.remove("has-text-success", "has-text-danger");
    p.button.disabled = false;
  }
}
