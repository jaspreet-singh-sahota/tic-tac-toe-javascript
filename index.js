const GameBoard = (() => {
  let origBoard = [''];
  const form = document.querySelector('#form');
  const cells = document.querySelectorAll('.cell');
  const restart = document.querySelectorAll('.restart');
  const alert = document.querySelector('.invalid');
  const categories = document.querySelectorAll('.selection');
  const arr = new Array(categories.length).fill(false)
  const player = (player, token, imgLink) => ({ player, token, imgLink });
  const modes = document.querySelectorAll('.mode-text')
  const selectedMode = { multiplayer: false, aiEasyMode: false, aiHardMode: true }
  const player1Name = player('player', 'X', 'https://img.icons8.com/color/160/000000/deadpool.png');
  const player2Name = player('player', 'O', 'https://img.icons8.com/color/160/000000/spiderman-head.png');
  const aiPlayer = player('AI', 'O', 'https://img.icons8.com/color/160/000000/spiderman-head.png');
  let isAiTurnOver = true
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
    if (player1Name.player === 'player') { alert.style.display = 'block'; }
  }));

  modes.forEach(mode => mode.addEventListener('click', (e) => {
    Object.entries(selectedMode).map(([key]) => [selectedMode[key] = false])
    let key = 'multiplayer'
    if (e.target.textContent === 'Human VS CPU') { key = 'aiEasyMode' }
    if (e.target.textContent === 'Human VS AI') { key = 'aiHardMode' }
    selectedMode[key] = true;
    isAiTurnOver = true;
    startGame()
  }));

  const existingImageIndex = () => {
    indexOfX = [];
    indexOfO = [];
    for (let i = 0; i < origBoard.length; i++) {
      if (origBoard[i] === 'X') { indexOfX.push(i) }
      if (origBoard[i] === 'O') { indexOfO.push(i) }
    }
    return indexOfX, indexOfO
  }

  const removeImageProperty = () => {
    arr.forEach((elem, index) => {
      if (elem) {
        categories[index].style.border = '2px solid white'
        categories[index].style.removeProperty('background-image')
        categories[index].style.removeProperty('transform')
        arr.forEach((_, idx) => arr[idx] = false)
      }
    })
  }

  const addImageProperty = (category, index) => {
    arr[index] = true;
    category.style.border = '2px solid #59065f';
    category.style.backgroundImage = 'linear-gradient(to left, #bdbbbe 0%, #9d9ea3 100%), radial-gradient(88% 271%, rgba(255, 255, 255, 0.25) 0%, rgba(254, 254, 254, 0.25) 1%, rgba(0, 0, 0, 0.25) 100%), radial-gradient(50% 100%, rgba(255, 255, 255, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%)';
    category.style.transform = 'scale(1.1)';
  }

  const changeImageLink = (arr, link) => {
    arr.forEach(idx => {
      const selectedCategory = document.getElementById(idx)
      img = selectedCategory.querySelector('img')
      img.setAttribute("src", link)
    })
  }

  categories.forEach((category, index) => category.addEventListener('click', () => {
    category.querySelector('img');
    const img1 = category.querySelector('img');
    const img2 = category.querySelector('.second-img');
    const link1 = GameBoard.player1Name.imgLink = img1.getAttribute('src');
    const link2 = GameBoard.player2Name.imgLink = img2.getAttribute('src');
    GameBoard.aiPlayer.imgLink = img2.getAttribute('src');

    removeImageProperty()

    if (origBoard.includes('X') || origBoard.includes('O')) {
      existingImageIndex()
      cells.forEach(cell => {
        if (cell.querySelector('img')) {
          changeImageLink(indexOfX, link1);
          changeImageLink(indexOfO, link2);
        }
      })
    }
    addImageProperty(category, index);
  })
  );

  const displayPlayer = (currentPlayer) => {
    const playerName = document.querySelector('.player-text');
    playerName.textContent = `${currentPlayer.player}'s turn`;
  }

  const turn = (squareId, currentPlayer) => {
    origBoard[squareId] = currentPlayer.token;
    const input = document.createElement('img');
    input.setAttribute('src', currentPlayer.imgLink);
    const cell = document.getElementById(squareId);
    cell.appendChild(input);
  };

  const checkWin = (board, currentPlayer) => {
    const player = currentPlayer.token
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
  }

  const endGameStatus = (status) => {
    document.querySelector('.endgame').style.display = 'block';
    /* eslint-disable */
    const result = document.querySelector(('.text')).textContent = `${status}`;
    /* eslint-enable */
    return result;
  }

  const checkAvailableMoves = () => { return origBoard.filter(elem => typeof elem === 'number') }

  const checkTie = () => {
    const availableMoves = checkAvailableMoves();
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

  const swapTurn = () => { playerName = !playerName; }

  const gameOver = (gameWon) => {
    /* eslint-disable */
    for (const index of winningCombs[gameWon.index]) {
      /* eslint-enable */
      const result = document.getElementById(index);
      document.querySelector('.player-text').textContent = '';
      /* eslint-disable */
      cells.forEach(cell => cell.removeEventListener('click', turnClick, false));
      result.style.backgroundColor = gameWon.player === 'X' ? '#4afa05' : '#57DDF3';
      /* eslint-enable */
      const winner = `${gameWon.currentPlayer} won!`;
      endGameStatus(winner);
    }
  }

  const randomAIMove = () => {
    const availableMoves = checkAvailableMoves()
    const randomNumber = Math.floor(Math.random() * (availableMoves.length))
    return availableMoves[randomNumber]
  }

  const removeEventListenerCell = (move) => {
    cells.forEach(cell => {
      if (Number(cell.id) === move) {
        cell.removeEventListener('click', turnClick, false)
      }
    });
  }

  const easyMode = (e) => {
    if (isAiTurnOver) {
      const NextTurn = playerName ? player1Name : aiPlayer
      turn(e.target.id, player1Name);
      const aiMove = randomAIMove()
      isAiTurnOver = false;
      let gameWon = checkWin(origBoard, player1Name);
      if (gameWon) { return gameOver(gameWon); }
      if (aiMove) {
        setTimeout(() => {
          isAiTurnOver = true
          turn(aiMove, aiPlayer);
          removeEventListenerCell(aiMove)
          if (!gameWon) { gameWon = checkWin(origBoard, aiPlayer); }
          if (gameWon) { return gameOver(gameWon); }
          displayPlayer(NextTurn);
          swapTurn();
        }, 300);
      }
      return checkTie();
    }
  }

  const hardMode = (e) => {
    if (isAiTurnOver) {
      turn(e.target.id, player1Name)
      const bestMove = minMaxAlgorithm(origBoard, aiPlayer).index;
      isAiTurnOver = false
      if (bestMove !== undefined) {
        setTimeout(() => {
          isAiTurnOver = true;
          turn(bestMove, aiPlayer);
          removeEventListenerCell(bestMove);
          let gameWon = checkWin(origBoard, player1Name);
          if (!gameWon) { gameWon = checkWin(origBoard, aiPlayer); }
          if (gameWon) { return gameOver(gameWon); }
        }, 300);
      }
      return checkTie();
    }
  }

  const humanMode = (e) => {
    const currentPlayer = playerName ? player2Name : player1Name;
    const NextTurn = playerName ? player1Name : player2Name
    displayPlayer(NextTurn);
    turn(e.target.id, currentPlayer);
    const gameWon = checkWin(origBoard, currentPlayer);
    if (gameWon) {
      return gameOver(gameWon);
    }
    swapTurn();
    return checkTie();
  }

  const minMaxAlgorithm = (border, player) => {
    let availableSpots = checkAvailableMoves();

    if (checkWin(origBoard, player1Name)) {
      return { score: -10 };
    } else if (checkWin(border, aiPlayer)) {
      return { score: 10 };
    } else if (availableSpots.length === 0) {
      return { score: 0 };
    }
    let moves = [];

    for (let i = 0; i < availableSpots.length; i++) {
      let move = {};

      move.index = border[availableSpots[i]];

      border[availableSpots[i]] = player.token;

      if (player === aiPlayer) {
        let result = minMaxAlgorithm(border, player1Name);
        move.score = result.score;
      } else {
        let result = minMaxAlgorithm(border, aiPlayer);
        move.score = result.score;
      }
      border[availableSpots[i]] = move.index;
      moves.push(move);
    }
    let bestMove;

    if (player.token === aiPlayer.token) {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove];
  }

  const turnClick = (e) => {
    if (selectedMode.aiEasyMode) { easyMode(e) }
    if (selectedMode.multiplayer) { humanMode(e) }
    if (selectedMode.aiHardMode) { hardMode(e) }
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
      cell.addEventListener('click', turnClick);
    });
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    GameBoard.player1Name.player = e.target.player1.value;
    GameBoard.player2Name.player = e.target.player2.value;
    const playerName = document.querySelector('.player-text');
    playerName.textContent = `${e.target.player1.value}'s turn`;
    form.style.display = 'none';
    GameBoard.startGame();
  });

  restart.forEach(btn => btn.addEventListener('click', startGame));

  return {
    player1Name,
    player2Name,
    aiPlayer,
    startGame,
  };
})();
