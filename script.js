//ACTIVATING STRICT MODE
'use strict';

//DECLARING VARIABLES
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnRollDice = document.querySelector('.btn--roll');
let diceRoll = Math.trunc(Math.random() * 6) + 1;

//FUNCTION DECLARATION

//function to generate random-number
const rollDice = () => {
  diceRoll = Math.trunc(Math.random() * 6) + 1;
};

//function to display rolled dice image on browser
const showDiceImg = number => {
  if (diceEl.classList.contains('hidden')) {
    diceEl.classList.remove('hidden');
  }
  diceEl.src = `./Assets/dice-${number}.png`;
};

//CONSOLE LOG TEST
// console.log('Logged00: ' +  );

//INITIAL VALUES OF THE GAME
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

//ADD EVENT LISTENER TO ROLL DICE BUTTON
btnRollDice.addEventListener('click', () => {
  rollDice();
  showDiceImg(diceRoll);
});
