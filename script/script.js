"use strict";

const secLeft = document.querySelector(".left");
const secRight = document.querySelector(".right");
const rollButton = document.querySelector(".roll-btn");
const holdButton = document.querySelector(".hold-btn");
const newGameButton = document.querySelector(".new-game-btn");
const dices = document.querySelectorAll(".dice");
const finalScore = document.querySelectorAll(".final-score");
const finalScore1 = document.querySelector(".final-score1");
const finalScore2 = document.querySelector(".final-score2");
const currentScore = document.querySelectorAll(".sum");
const notice = document.querySelector(".notice");
let fFinalScore = finalScore[0];
let cCurrentScore = currentScore[0];
let canClick = true;
let playerWon = document.querySelector(".player-won");
const overlay = document.querySelector(".overlay");
const xButton = document.querySelector(".x-button");
const modal = document.querySelector(".modal");
const hidden = document.querySelectorAll(".hidden");
const inputsModal = document.querySelector(".inputs-modal");
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const msg1 = document.getElementById('msg1');
const subButton = document.querySelector('.sub-btn');
const player1Name = document.querySelector('.player1');
const player2Name = document.querySelector('.player2');

let currentSum = 0;
let finalSum1 = 0;
let finalSum2 = 0;

const rollNumber = function () {
  return Math.trunc(Math.random() * 6 + 1);
};

const addNumbersCurrent = function (num) {
  currentSum += num;
  cCurrentScore.innerHTML = currentSum;
};

const addNumbersFinal1 = function (num) {
  finalSum1 += num;
  fFinalScore.innerHTML = finalSum1;
};

const addNumbersFinal2 = function (num) {
  finalSum2 += num;
  fFinalScore.innerHTML = finalSum2;
};

const showDice = function (num) {
  for (let i = 1; i <= dices.length; i++) {
    if (i === num) {
      console.log(num);
      dices[num - 1].classList.remove("hidden");
    }
  }
};

const hideDices = function () {
  for (let i = 1; i <= dices.length; i++) {
    if (!dices[i - 1].classList.contains("hidden")) {
      dices[i - 1].classList.add("hidden");
    }
  }
};

const switchPlayers = function () {
  if (fFinalScore == finalScore[0]) {
    fFinalScore = finalScore[1];
    cCurrentScore = currentScore[1];
  } else {
    fFinalScore = finalScore[0];
    cCurrentScore = currentScore[0];
  }
  if (fFinalScore == finalScore[0]) {
    secRight.classList.add("shadowed");
    secLeft.classList.remove("shadowed");
  } else {
    secRight.classList.remove("shadowed");
    secLeft.classList.add("shadowed");
  }
};

const whoWon = function (player, num) {
  if (num === 1) {
    playerWon.innerHTML = player1Name.innerHTML;
  } else {
    playerWon.innerHTML = player2Name.innerHTML;
  }
  return player >= 50;
};

const openModal = function(){
  modal.style.display = "flex";
  overlay.style.display = "block";
}

const closeModal = function(){
  modal.style.display = "none";
  overlay.style.display = "none";
}

const openInputsModal = function(){
  inputsModal.style.display = "flex";
  overlay.style.display = "block";
}

const closeInputsModal = function(){
  inputsModal.style.display = "none";
  overlay.style.display = "none";
}

const roll = function () {
  if (canClick) {
    const num = rollNumber();
    hideDices();
    showDice(num);
    if (num !== 1) {
      addNumbersCurrent(num);
    } else {
      currentSum = 0;
      cCurrentScore.innerHTML = currentSum;
      switchPlayers();
    }
    cCurrentScore.innerHTML = currentSum;
    notice.style.display = "none";
  }
};

const hold = function () {
  if (canClick) {
    if (fFinalScore != finalScore[0]) {
      addNumbersFinal2(Number(cCurrentScore.textContent));
      if (whoWon(finalSum2, 2)) {
        console.log("player 2 won the game");
        canClick = false;
        openModal();
      }
    } else {
      addNumbersFinal1(Number(cCurrentScore.textContent));
      if (whoWon(finalSum1, 1)) {
        console.log("player 1 won the game");
        canClick = false;
        openModal();
      }
    }
    if (currentSum === 0) {
      notice.style.display = "block";
    } else {
      currentSum = 0;
      cCurrentScore.innerHTML = currentSum;
      switchPlayers();
    }
    hideDices();
  }
};

const newGame = function () {
  currentSum = 0;
  finalSum1 = 0;
  finalSum2 = 0;
  finalScore1.innerHTML = finalSum1;
  finalScore2.innerHTML = finalSum2;
  if (cCurrentScore == currentScore[1]) {
    switchPlayers();
  }
  currentScore[0].innerHTML = currentSum;
  currentScore[1].innerHTML = currentSum;
  canClick = true;
};

const inputs = function(in1, in2){
  if(in1.length <= 2 || in1.length > 10 || in2.length <= 2 || in2.length > 10){
    msg1.innerHTML = "Name should be from 3 to 10 letters."
  }else{
    closeInputsModal();
    player1Name.innerHTML = in1;
    player2Name.innerHTML = in2;
  }
}
closeModal();
openInputsModal();
xButton.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") hold();
});
document.addEventListener("keydown", function (e) {
  if (e.key === " ") roll();
});
if (fFinalScore == finalScore[0]) {
  secRight.classList.add("shadowed");
  secLeft.classList.remove("shadowed");
} else {
  secRight.classList.remove("shadowed");
  secLeft.classList.add("shadowed");
}
rollButton.addEventListener("click", roll);
holdButton.addEventListener("click", hold);
newGameButton.addEventListener("click", newGame);
subButton.addEventListener('click', function(){
  inputs(player1.value, player2.value);
});
