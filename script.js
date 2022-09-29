//ACTIVATING STRICT MODE
'use strict';

////////////////////////////////////
//VARIABLE DECLARATION
////////////////////////////////////

///////////////////////////////////
////////CONST-VARIABLE
const btnRollDice = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const scores = [0, 0];

/////////////////////////////////////
//////LET-VARIABLE
let diceRoll;
let currentScore;
let activePlayer;
let playing;
let gameLimit;

////////////////////////////////////
//FUNCTION DECLARATION
////////////////////////////////////

/////////////////////////////////////
//////INITIALIZE-GAME
const init = () => {
  diceRoll = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  gameLimit = 100;
};

// calling the init function on loading
init();

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
//HIDE DICE IMAGE FUNCTION
const hideDiceImg = () => {
  if (!diceEl.classList.contains('hidden')) {
    diceEl.classList.add('hidden');
  }
};

////////////////////////////////////////
// DECLARE-WINNER FUNCTION
const declareWinner = () => {
  console.log(`score reached ${gameLimit}. the game ends here`);
  console.log(`winner is Player ${activePlayer + 1}`);
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');

  diceEl.classList.add('hidden');
  playing = false;
  console.log(playing);
  document.getElementById(`current--${activePlayer}`).textContent = 0;
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

////////////////////////////////////////
//START NEW-GAME FUNCTION
const startNewGame = () => {
  console.log(`new game started`);
  //setting the game state to true
  playing = true;
  //removing the winner style if exist
  if (
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.contains('player--winner')
  ) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--winner');
  }

  //resetting the DOM Score values to 0
  score0El.textContent = 0;
  score1El.textContent = 0;
  //resetting the Score array to 0
  for (let i = 0; i < scores.length; i++) {
    scores[i] = 0;
  }
  //resetting the current score value to 0
  currentScore = 0;
  //resetting the currentScore to 0
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  //setting the activePlayer to 1st player
  activePlayer = 0;
  // console.log(`active player changed to ${activePlayer}`);
  //setting the background of active player.
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  //hide dice.
  hideDiceImg();
};
console.log(`activePlayer value in global scope ${activePlayer}`);
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
  if (playing) {
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
  }
});

////////////////////////////////////////
//ADD EVENT-LISTENER  TO HOLD BUTTON
btnHold.addEventListener('click', () => {
  if (playing) {
    holdScore(activePlayer);
    if (scores[activePlayer] >= gameLimit) {
      declareWinner();
    } else {
      switchPlayer();
      hideDiceImg();
    }
  }
});

////////////////////////////////////////
//ADD EVENT LISTENER TO NEW-GAME BUTTON
btnNew.addEventListener('click', () => {
  startNewGame();
});
