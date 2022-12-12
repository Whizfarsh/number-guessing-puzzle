'use strict';

let value = Math.floor(Math.random() * 80);
const numberGen = function () {
  let rangeOne;
  let rangeTwo;
  if (value <= 20) {
    rangeOne = 1;
    rangeTwo = 20;
  } else if (value >= 21 && value <= 40) {
    rangeOne = 21;
    rangeTwo = 40;
  } else if (value >= 41 && value <= 60) {
    rangeOne = 41;
    rangeTwo = 60;
  } else if (value >= 61 && value <= 80) {
    rangeOne = 61;
    rangeTwo = 80;
  } else if (value >= 81 && value <= 100) {
    rangeOne = 81;
    rangeTwo = 100;
  }
  const rangeA = (document.querySelector('.rangeA').textContent = rangeOne);
  const rangeB = (document.querySelector('.rangeB').textContent = rangeTwo);
};
numberGen();

const theGuessedNumber = document.querySelector('.game-guess-number');
const attemptNumber = document.querySelector('.total-attempt');
const correctNumber = document.querySelector('.correct-point');
const missedNumber = document.querySelector('.missed-point');
const scorePercent = document.querySelector('.score-percentage');
const infoResult = document.querySelector('.game-info-result');
let gameCounts = document.querySelector('.game-count').textContent;

// game restart function
const gameRestartBtn = function () {
  attemptNumber.textContent = 10;
  correctNumber.textContent = 0;
  missedNumber.textContent = 0;
  scorePercent.textContent = 0;
  infoResult.textContent = '';
  document.querySelector('.game-number-input').value = '';
  theGuessedNumber.style.cssText =
    'background-Color:#593f01; color: #fcfcfc; width: auto';
  theGuessedNumber.textContent = '?';
  value = Math.floor(Math.random() * 80);
  numberGen();
};
gameRestartBtn();

const theGuessNumberBtn = document
  .querySelector('.game-number-btn')
  .addEventListener('click', function () {
    let inputNum = document.querySelector('.game-number-input').value;
    if (inputNum == '') {
      document.querySelector('.limit').textContent = 'Please enter a number';
    } else {
      let missedPoint = Number(missedNumber.textContent);
      let totalAttempt = attemptNumber.textContent;
      if (totalAttempt < 0) {
        totalAttempt = 0;
      }
      let correctPoint = Number(correctNumber.textContent);
      if (totalAttempt > 0) {
        let gamePlayCount = document.querySelector('.game-count');
        let gameCounts = document.querySelector('.game-count').textContent;
        let gameCount = Number(gameCounts - 1);
        if (gameCount <= 0) {
          gameCount = 0;
        }
        document.querySelector('.game-count').textContent = gameCount;

        if (inputNum != value) {
          if (inputNum > value) {
            infoResult.textContent = 'Number is too high 👎';
          } else if (inputNum < value) {
            infoResult.textContent = 'Number is too low 👎';
          }
          if (gameCount === 0) {
            totalAttempt -= 1;
            missedPoint += 1;

            missedNumber.textContent = missedPoint;
            attemptNumber.textContent = totalAttempt;
            infoResult.textContent = 'Missed a point!';
            value = Math.floor(Math.random() * 80);
            numberGen();
            gamePlayCount.textContent = 5;
          }
        } else {
          totalAttempt -= 1;
          correctPoint += 1;

          infoResult.textContent = 'Guessed right😉!';
          theGuessedNumber.style.cssText =
            'background-Color:#f1ede6; color: #333; width: 15rem; text-align: center';
          theGuessedNumber.textContent = value;
          correctNumber.textContent = correctPoint;
          attemptNumber.textContent = totalAttempt;
          value = Math.floor(Math.random() * 80);
          numberGen();
          gamePlayCount.textContent = 5;
        }
        if (totalAttempt == 0 && correctPoint > 0 && missedPoint > 0) {
          let winperc;
          if (correctPoint > missedPoint) {
            winperc = (correctPoint / 10) * 100;
            infoResult.textContent = 'HURRAY! YOU WON.';
          } else if (correctPoint < missedPoint) {
            winperc = (missedPoint / 10) * 100;
            infoResult.textContent = 'OOPS! YOU LOOSE.';
          } else if (correctPoint === missedPoint) {
            winperc = 50;
            infoResult.textContent = 'AVERAGE GAME! 😕';
          }
          scorePercent.textContent = winperc;
        }
      }
    }
  });
document
  .querySelector('.game-restart-btn')
  .addEventListener('click', gameRestartBtn);
