let boxes = document.querySelectorAll('.box');
let msgContainer = document.querySelector('.msg-container');
let resetBtn = document.querySelector('#reset-btn');
let newGameBtn = document.querySelector('#new-btn');
let msg = document.querySelector('#msg')

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

let turnO = true;
let count = 0;

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add('hide');
}

const disableBoxes = () => {
  for (let box of boxes){
    box.disabled = true;
  }
}

const enableBoxes = () => {
  for (let box of boxes){
    box.disabled = false;
    box.innerText = "";
  }
}



const showWinner = (val1) => {
  msg.innerText = `Congratulations, winner is ${val1}!`;
  msgContainer.classList.remove('hide');
 disableBoxes();
}

boxes.forEach((box) => {
  box.addEventListener('click', () => {
    if (turnO){
      box.innerText = 'O';
      turnO = false;
    } else {
      box.innerText = 'X';
      turnO = true;
    }

    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner){
      msg.innerText = 'The game was draw!';
      msgContainer.classList.remove('hide');
      disableBoxes();
    }

  })
});

const checkWinner = () => {
  for (let pattern of winPatterns){
    let val1 = boxes[pattern[0]].innerText;
    let val2 = boxes[pattern[1]].innerText;
    let val3 = boxes[pattern[2]].innerText;

    if (val1 !== "" && val2 !== "" && val3 !== ""){
      if (val1 === val2 && val2 === val3){
        showWinner(val1);
        return true;
      }
    }
  }
  return false;
};

resetBtn.addEventListener('click', resetGame);
newGameBtn.addEventListener('click', resetGame);