'use strict';

const players = [
  { name: 1, currentscore: 0, highscore: 0, totalscore: 0, },
  { name: 2, currentscore: 0, highscore: 0, totalscore: 0, }
];
const diceImage = document.querySelector(".dice");
const rollButton = document.querySelector(".btn--roll");
const holdButton = document.querySelector(".btn--hold");
const resetButton = document.querySelector(".btn--new");
const playersFields = document.querySelectorAll(".player");
const playersNames = document.querySelectorAll(".name");
const playersTotalScores = document.querySelectorAll(".score");
const playersCurrentScores = document.querySelectorAll(".current-score");

let diceNumber = Math.trunc(Math.random() * 6) + 1;
let currentPlayer = 0;
let winnerPlayer = "";

const changePlayer = function () {
  players[currentPlayer].totalscore = players[currentPlayer].highscore;
  playersTotalScores[currentPlayer].textContent = players[currentPlayer].totalscore;
  playersCurrentScores[currentPlayer].textContent = 0;
  playersFields[currentPlayer].classList.toggle("player--active");
  players[currentPlayer].currentscore = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  playersFields[currentPlayer].classList.add("player--active");
};

const holdScore = function () {
  if (players[currentPlayer].currentscore != 0) {
    players[currentPlayer].highscore += players[currentPlayer].currentscore;
    if (players[currentPlayer].highscore >= 100) {
      winnerPlayer = currentPlayer;
      playersNames[winnerPlayer].textContent = `Игрок ${players[winnerPlayer].name} выиграл!`;
      playersFields[winnerPlayer].classList.add("player--winner");
      diceImage.classList.add("hidden");
      rollButton.removeEventListener("click", rollDice);
    }
    changePlayer();
  }
};

const rollDice = function () {
  diceNumber = Math.trunc(Math.random() * 6) + 1;
  diceImage.src = `dice${diceNumber}.png`;
  diceImage.classList.remove("hidden");
  players[currentPlayer].currentscore += diceNumber;
  playersCurrentScores[currentPlayer].textContent = players[currentPlayer].currentscore;

  if (diceNumber === 1) {
    playersTotalScores[currentPlayer].textContent = players[currentPlayer].totalscore;
    changePlayer();
  }

  holdButton.addEventListener("click", holdScore);
  resetButton.addEventListener("click", resetGame);
};

const resetGame = function () {
  players.forEach((player) => {
    player.currentscore = 0;
    player.highscore = 0;
    player.totalscore = 0;
  });
  playersNames.forEach((name, index) => {
    name.textContent = `Игрок ${index + 1}`;
  });
  playersFields.forEach((field) => {
    if (field.classList.contains("player--winner")) {
      field.classList.remove("player--winner");
    }
  });
  playersFields[0].classList.add("player--active");
  playersFields[1].classList.remove("player--active");
  playersCurrentScores.forEach((score) => (score.textContent = 0));
  playersTotalScores.forEach((totalscore) => (totalscore.textContent = 0));
  currentPlayer = 0;
  winnerPlayer = "";
  diceImage.classList.add("hidden");
  rollButton.addEventListener("click", rollDice);
  holdButton.removeEventListener("click", holdScore);
  resetButton.removeEventListener("click", resetGame);
};

rollButton.addEventListener("click", rollDice);
