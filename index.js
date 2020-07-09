let origBoard = '';
const cells = document.querySelectorAll('.cell');
let player1Name = document.querySelector('.name1').value
let player2Name = document.querySelector('.name2').value
player1Name = 'jaspreet'
player2Name = 'frank'
const huPlayer = 'O';
const aiPlayer = 'X';
const huPlayer2 = 'X'

let playerTurn
let playerName

const winningCombs = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
];

const turnClick = (e) => {
  const switchPlayer = playerTurn ? huPlayer : huPlayer2;
  const currentPlayer = playerName ? player1Name : player2Name;
  turn(e.target.id, switchPlayer, currentPlayer);
  swapTurn();
  let gameWon = checkWin(origBoard, switchPlayer, currentPlayer);
  if (gameWon) {
    gameOver(gameWon)
  }
}

function checkWin(board, player, currentPlayer) {
  let turnPlayed = board.reduce((acc, sym, idx) =>
    (sym === player) ? acc.concat(idx) : acc, []
  );
  let gameWon = null;
  for (let [index, win] of winningCombs.entries()) {
    if (win.every(elem => turnPlayed.indexOf(elem) !== -1)) {
      gameWon = {index: index, player: player, currentPlayer: currentPlayer}
    }
  }
  return gameWon
}

function gameOver(gameWon) {
  for (let index of winningCombs[gameWon.index]) {
    const result = document.getElementById(index);
    result.style.backgroundColor = gameWon.player = huPlayer ? 'blue' : 'red';
    endGameStatus(gameWon);
  }
}

function endGameStatus(gameWon) {
  const result = document.querySelector('.endgame');
  result.style.display = 'block';
  result.textContent = `${gameWon.currentPlayer} won!`;
  return result
}

const turn = (squareId, player) => {
  origBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
}

const startGame = () => {
  document.querySelector('.endgame').style.display = 'none';
  origBoard = Array.from(Array(9).keys());
  cells.forEach(cell => {
    cell.style.removeProperty('background-color');
    cell.innerHTML = '';
    cell.addEventListener('click', turnClick, {once : true });
  })
}

function swapTurn() {
  playerTurn = !playerTurn
  playerName = !playerName
}



startGame(); 