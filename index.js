let origBoard = '';
const cells = document.querySelectorAll('.cell');
let player1Name = document.querySelector('.name1').value
let player2Name = document.querySelector('.name2').value
const huPlayer = 'O';
const aiPlayer = 'X';

const gameBoard = [
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
  turn(e.target.id, huPlayer);
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
    cell.addEventListener('click', turnClick, false);
  })
}



startGame(); 