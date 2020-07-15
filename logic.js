const selectedMode = { multiplayer: true, aiEasyMode: false, aiHardMode: false };
const player = (player, token, imgLink) => ({ player, token, imgLink });
const player1Name = player('', 'X', 'https://img.icons8.com/ios-filled/160/000000/x.png');
const player2Name = player('player', 'O', 'https://img.icons8.com/ios-filled/100/000000/o.png');
const aiPlayer = player('AI', 'O', 'https://img.icons8.com/ios-filled/100/000000/o.png');
let isAiTurnOver = true;
let indexOfExistingMove;
let playerName;

const winningCombs = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

let origBoard = [''];

const existingImageIndex = () => {
  const indexOfX = [];
  const indexOfO = [];
  for (let i = 0; i < origBoard.length; i += 1) {
    if (origBoard[i] === 'X') { indexOfX.push(i); }
    if (origBoard[i] === 'O') { indexOfO.push(i); }
  }
  indexOfExistingMove = [indexOfX, indexOfO];
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  player1Name.player = e.target.player1.value;
  player2Name.player = e.target.player2.value;
  const displayPlayerName = document.querySelector('.player-text');
  displayPlayerName.textContent = `${e.target.player1.value}'s turn`;
  form.style.display = 'none';
  GameBoard.startGame();
});
