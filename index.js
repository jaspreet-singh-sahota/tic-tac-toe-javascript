const GameBoard = (() => {
  let origBoard = '';
  const cells = document.querySelectorAll('.cell');
  const restart = document.querySelectorAll('.restart');
  const player = (playerName, token) => ({ playerName, token });
  const player1Name = player('player', 'token');
  const player2Name = player('player', 'token');
  const alert = document.querySelector('.invalid');
  const selections = document.querySelectorAll('.selection');
  let playerTurn;
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

  cells.forEach(cell => cell.addEventListener('click', () => {
    if (player1Name.player === undefined) {
      alert.style.display = 'block';
    }
  }));

  const arr = new Array(selections.length).fill(false)
   
  selections.forEach((selected, index) => selected.addEventListener('click', () => {
    arr.forEach((elem, index) => {
      if (elem) {
        selections[index].style.border = '2px solid white'
        selections[index].style.removeProperty('background-image')
        selections[index].style.removeProperty('transform')
        arr.forEach((_,idx) => arr[idx] = false)
      }
    }) 

    arr[index] = true;
    selected.style.border = '2px solid #59065f'
    selected.style.backgroundImage = 'linear-gradient(to left, #bdbbbe 0%, #9d9ea3 100%), radial-gradient(88% 271%, rgba(255, 255, 255, 0.25) 0%, rgba(254, 254, 254, 0.25) 1%, rgba(0, 0, 0, 0.25) 100%), radial-gradient(50% 100%, rgba(255, 255, 255, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%)'
    selected.style.transform = 'scale(1.1)'
    
  }))

  function displayPlayer(player) {
    const playerName = document.querySelector('.player-text');
    playerName.textContent = `${player.player}'s turn`;
  }

  const turn = (squareId, player) => {
    origBoard[squareId] = player;
    const input = document.createElement('img');
    input.setAttribute('src', player);
    const cell = document.getElementById(squareId);
    cell.appendChild(input);
  };

  function checkWin(board, player, currentPlayer) {
    const turnPlayed = board.reduce((acc, sym, idx) => ((sym === player)
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
  }

  function endGameStatus(status) {
    document.querySelector('.endgame').style.display = 'block';
    /* eslint-disable */
    const result = document.querySelector(('.text')).textContent = `${status}`;
    /* eslint-enable */
    return result;
  }

  function checkTie() {
    const availableMoves = origBoard.filter(elem => typeof elem === 'number');
    if (availableMoves.length === 0) {
      const result = document.querySelectorAll('.cell');
      result.forEach(cell => {
        cell.style.background = 'linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.32) 100%)';
        cell.style.border = '2px solid #59065f';
      });
      document.querySelector('.player-text').textContent = '';
      endGameStatus("It's a Tie");
    }
  }

  function swapTurn() {
    playerTurn = !playerTurn;
    playerName = !playerName;
  }

  function gameOver(gameWon) {
    /* eslint-disable */
    for (const index of winningCombs[gameWon.index]) {
      /* eslint-enable */
      const result = document.getElementById(index);
      document.querySelector('.player-text').textContent = '';
      /* eslint-disable */
      cells.forEach(cell => cell.removeEventListener('click', turnClick, false));
      result.style.backgroundColor = gameWon.player = player1Name.token ? '#4afa05' : '#57DDF3';
      /* eslint-enable */
      const winner = `${gameWon.currentPlayer} won!`;
      endGameStatus(winner);
    }
  }

  const turnClick = (e) => {
    const currentPlayer = playerName ? player2Name : player1Name;
    /* eslint-disable */
    const switchPlayer = playerTurn ? (player2Name.token === 'token' ? 'https://img.icons8.com/color/160/000000/deadpool.png'
      : player2Name.token) : (player1Name.token === 'token' ? 'https://img.icons8.com/color/160/000000/spiderman-head.png' : player1Name.token);
    /* eslint-enable */
    displayPlayer(currentPlayer);
    turn(e.target.id, switchPlayer, currentPlayer);
    swapTurn();
    const gameWon = checkWin(origBoard, switchPlayer, currentPlayer);
    if (gameWon) {
      return gameOver(gameWon);
    }
    return checkTie();
  };

  const startGame = () => {
    document.querySelector('.endgame').style.display = 'none';
    alert.style.display = 'none';
    origBoard = Array.from(Array(9).keys());
    cells.forEach(cell => {
      cell.style.removeProperty('background-color');
      cell.style.removeProperty('background');
      cell.style.removeProperty('border');
      cell.innerHTML = '';
      cell.addEventListener('click', turnClick, { once: true });
    });
  };

  restart.forEach(btn => btn.addEventListener('click', startGame));
  return {
    player1Name,
    player2Name,
    startGame,
  };
})();

const form = document.querySelector('#form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  GameBoard.player1Name.player = e.target.player1.value;
  GameBoard.player2Name.player = e.target.player2.value;
  if (e.target.player1.value === '') {
    GameBoard.player1Name.player = 'Player1';
  }
  if (e.target.player2.value === '') {
    GameBoard.player2Name.player = 'Player2';
  }
  const playerName = document.querySelector('.player-text');
  playerName.textContent = `${e.target.player1.value === '' ? 'Player1' : e.target.player1.value}'s turn`;
  form.style.display = 'none';
  GameBoard.startGame();
});

const tokens = document.querySelectorAll('.selection');
tokens.forEach(token => {
  token.addEventListener('click', () => {
    token.querySelector('img');
    const img1 = token.querySelector('img');
    GameBoard.player1Name.token = img1.getAttribute('src');
    const img2 = token.querySelector(':nth-child(3)');
    GameBoard.player2Name.token = img2.getAttribute('src');
  });
});
