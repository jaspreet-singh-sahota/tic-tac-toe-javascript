/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */

const selectedMode = { multiplayer: true, aiEasyMode: false, aiHardMode: false };
const player = (player, token, imgLink) => ({ player, token, imgLink });
const player1Name = player('', 'X', 'https://img.icons8.com/ios-filled/160/000000/x.png');
const player2Name = player('player', 'O', 'https://img.icons8.com/ios-filled/100/000000/o.png');
const aiPlayer = player('AI', 'O', 'https://img.icons8.com/ios-filled/100/000000/o.png');
let indexOfExistingMove;
let playerName;
/* eslint-disable */
let isAiTurnOver = true;
let origBoard = [''];
/* eslint-enable */

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

/* eslint-disable */
const existingImageIndex = () => {
/* eslint-enable */
  const indexOfX = [];
  const indexOfO = [];
  for (let i = 0; i < origBoard.length; i += 1) {
    if (origBoard[i] === 'X') { indexOfX.push(i); }
    if (origBoard[i] === 'O') { indexOfO.push(i); }
  }

  /* eslint-disable */
  indexOfExistingMove = [indexOfX, indexOfO];
  /* eslint-enable */
};

const checkWin = (board, currentPlayer) => {
  const player = currentPlayer.token;
  const turnPlayed = board.reduce((acc, token, idx) => ((token === currentPlayer.token)
    ? acc.concat(idx) : acc), []);
  let gameWon = null;
  /* eslint-disable */
  for (const [index, win] of winningCombs.entries()) {
    /* eslint-enable */
    if (win.every(elem => turnPlayed.indexOf(elem) !== -1)) {
      gameWon = { index, player, currentPlayer: currentPlayer.player };
    }
  }
  return gameWon;
};

const checkAvailableMoves = () => origBoard.filter(elem => typeof elem === 'number');

/* eslint-disable */
const swapTurn = () => { playerName = !playerName; };
const randomAIMove = () => {
/* eslint-enable */
  const availableMoves = checkAvailableMoves();
  const randomNumber = Math.floor(Math.random() * (availableMoves.length));
  return availableMoves[randomNumber];
};

const minMaxAlgorithm = (border, player) => {
  const availableSpots = checkAvailableMoves();

  if (checkWin(origBoard, player1Name)) {
    return { score: -10 };
  } if (checkWin(border, aiPlayer)) {
    return { score: 10 };
  } if (availableSpots.length === 0) {
    return { score: 0 };
  }
  const moves = [];

  for (let i = 0; i < availableSpots.length; i += 1) {
    const move = {};

    move.index = border[availableSpots[i]];

    border[availableSpots[i]] = player.token;

    if (player === aiPlayer) {
      const result = minMaxAlgorithm(border, player1Name);
      move.score = result.score;
    } else {
      /* eslint-disable */
      const result = minMaxAlgorithm(border, aiPlayer);
      /* eslint-enable */
      move.score = result.score;
    }
    border[availableSpots[i]] = move.index;
    moves.push(move);
  }
  let bestMove;

  if (player.token === aiPlayer.token) {
    let bestScore = -10000;
    for (let i = 0; i < moves.length; i += 1) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = 10000;
    for (let i = 0; i < moves.length; i += 1) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
};

export { swapTurn, checkWin  }