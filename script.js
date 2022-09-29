//ACTIVATING STRICT MODE
'use strict';

////////////////////////////////////
//VARIABLE DECLARATION
////////////////////////////////////
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRollDice = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const scores = [0, 0];
let diceRoll = 0;
let currentScore = 0;
let activePlayer = 0;

////////////////////////////////////
//FUNCTION DECLARATION
////////////////////////////////////

////////////////////////////////////////
//GENERATE RANDOM-NUMBER FUNCTION
const rollDice = () => {
  diceRoll = Math.trunc(Math.random() * 6) + 1;
};

////////////////////////////////////////
//SHOW DICE IMAGE FUNCTION
const showDiceImg = number => {
  if (diceEl.classList.contains('hidden')) {
    diceEl.classList.remove('hidden');
  }
  diceEl.src = `./Assets/dice-${number}.png`;
};

////////////////////////////////////////
// DECLARE-WINNER FUNCTION
const declareWinner = () => {
  console.log('score reached 100. the game ends here');
  console.log(`winner is Player ${activePlayer + 1}`);
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
};

////////////////////////////////////////
//SWITCH-PLAYER FUNCTION
const switchPlayer = () => {
  //resetting the DOM currentScore to 0.
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //resetting the current score to 0, after switching player
  currentScore = 0;
  //condition to toggle current active player
  activePlayer = activePlayer === 0 ? 1 : 0;
  //setting the background of active player.
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

////////////////////////////////////////
//HOLD-SCORE FUNCTION
const holdScore = player => {
  //store the current score in scores array
  scores[player] += currentScore;
  //display scores in DOM window
  document.querySelector(`#score--${player}`).textContent = scores[player];
};

////////////////////////////////////
//INITIAL VALUES OF THE GAME
////////////////////////////////////
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

////////////////////////////////////
//GAME-LOGIC
////////////////////////////////////

////////////////////////////////////////
//ADD EVENT LISTENER TO ROLL DICE BUTTON
btnRollDice.addEventListener('click', () => {
  rollDice();
  showDiceImg(diceRoll);
  if (diceRoll !== 1) {
    currentScore += diceRoll;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
    console.log(`Dice rolled 1 switch to player ${activePlayer + 1}`);
  }
});

////////////////////////////////////////
//ADD EVENT-LISTENER  TO HOLD BUTTON
btnHold.addEventListener('click', () => {
  holdScore(activePlayer);
  if (scores[activePlayer] >= 20) {
    declareWinner();
  } else {
    switchPlayer();
  }
});
