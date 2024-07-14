let turn = "X";
let boxes = document.querySelectorAll('.box');
let gameOver = false;
let moveCount = 0;
const resetBtn = document.querySelector('#js-reset-btn');

// Function to change the turn 
const changeTurn = () => {
  return turn === "X" ? "O" : "X";
}

//Function to check win patterns
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Function to check win
const checkWin = () => {
  winPatterns.forEach(element => {
    let pos1Val = boxes[element[0]].innerText;
    let pos2Val = boxes[element[1]].innerText;
    let pos3Val = boxes[element[2]].innerText;
    if (pos1Val != '' && pos2Val != '' && pos3Val != '') {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        document.querySelector('.info').innerText = `${pos1Val} Won`;
        document.querySelector('.info').style.color = 'green';
        gameOver = true;
        disable();
      }
      else {
        checkDraw();
      }
    }
  })
}

// Function to check draw
const checkDraw = () => {
  if (!gameOver && moveCount === 9) {
    document.querySelector('.info').innerText = 'Game Tied';
    document.querySelector('.info').style.color = 'red';
    gameOver = true;
    disable();
  }
}

// Function to disable the boxes
const disable = () => {
  boxes.forEach(element => {
    element.classList.add('disabled');
  })
}

// Function to reset the game
resetBtn.addEventListener('click', () => {
  boxes.forEach(element => {
    element.innerText = '';
    element.classList.remove('disabled');
    gameOver = false;
    turn = 'X';
    moveCount = 0;
    document.querySelector('.info').innerText = `Turn for ${turn}`;
    document.querySelector('.info').style.color = '#210491';
  })
});


//Game Logic
boxes.forEach(element => {
  element.addEventListener('click', () => {
    if (element.innerText === '') {
      element.innerText = turn;
      turn = changeTurn();
      moveCount++;
      checkWin();
      if (!gameOver) {
        document.querySelector('.info').innerText = `Turn for ${turn}`;
      }
    }
  });
});

