/* global selectedMode, player2Name, player1Name, aiPlayer, indexOfExistingMove,
 checkAvailableMoves, existingImageIndex, checkWin,
  randomAIMove, swapTurn, minMaxAlgorithm, playerName */
/* global isAiTurnOver:writable, origBoard:writable  */

const GameBoard = (() => {
  const form = document.querySelector('#form');
  const player2InputField = document.querySelector('.user-input2');
  const player1InputField = document.querySelector('.user-input1');
  const displayPlayerName = document.querySelector('.player-text');
  const cells = document.querySelectorAll('.cell');
  const restart = document.querySelectorAll('.restart');
  const alert = document.querySelector('.invalid');
  const categories = document.querySelectorAll('.selection');
  const arr = new Array(categories.length).fill(false);

  const modes = document.querySelectorAll('.mode-text');

  cells.forEach(cell => cell.addEventListener('click', () => {
    if (player1Name.player === '') { alert.style.display = 'block'; }
  }));

  const switchGameMode = (e) => {
    modes.forEach(mode => mode.classList.remove('h'));
    e.target.classList.toggle('h');
  };

  const formStyle = (e) => {
    switchGameMode(e);
    player1InputField.style.width = '42.5%';
    player2InputField.removeAttribute('required');
    player2InputField.style.display = 'none';
    form.style.paddingLeft = '5%';
    displayPlayerName.style.display = 'none';
    form.style.display = 'block';
    player1Name.player = '';
  };

  const originalForm = (e) => {
    switchGameMode(e);
    const att = document.createAttribute('required');
    player2InputField.setAttributeNode(att);
    player2InputField.style.display = 'inline-block';
    player1InputField.style.width = '25.5%';
    form.style.paddingLeft = '0';
    displayPlayerName.style.display = 'none';
    form.style.display = 'block';
    player1Name.player = '';
  };

  const removeImageProperty = () => {
    arr.forEach((elem, index) => {
      if (elem) {
        categories[index].style.border = '2px solid white';
        categories[index].style.removeProperty('background-image');
        categories[index].style.removeProperty('transform');
        arr.forEach((_, idx) => { arr[idx] = false; });
      }
    });
  };

  const addImageProperty = (category, index) => {
    arr[index] = true;
    category.style.border = '2px solid #59065f';
    category.style.backgroundImage = 'linear-gradient(to left, #bdbbbe 0%, #9d9ea3 100%), radial-gradient(88% 271%, rgba(255, 255, 255, 0.25) 0%, rgba(254, 254, 254, 0.25) 1%, rgba(0, 0, 0, 0.25) 100%), radial-gradient(50% 100%, rgba(255, 255, 255, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%)';
    category.style.transform = 'scale(1.1)';
  };

  const changeImageLink = (arr, link) => {
    arr.forEach(idx => {
      const selectedCategory = document.getElementById(idx);
      const img = selectedCategory.querySelector('img');
      img.setAttribute('src', link);
    });
  };

  categories.forEach((category, index) => category.addEventListener('click', () => {
    category.querySelector('img');
    const img1 = category.querySelector('img');
    const img2 = category.querySelector('.second-img');
    player1Name.imgLink = img1.getAttribute('src');
    const link1 = player1Name.imgLink;
    player2Name.imgLink = img2.getAttribute('src');
    const link2 = player2Name.imgLink;
    aiPlayer.imgLink = img2.getAttribute('src');

    removeImageProperty();

    if (origBoard.includes('X') || origBoard.includes('O')) {
      existingImageIndex();
      cells.forEach(cell => {
        if (cell.querySelector('img')) {
          changeImageLink(indexOfExistingMove[0], link1);
          changeImageLink(indexOfExistingMove[1], link2);
        }
      });
    }
    addImageProperty(category, index);
  }));

  const displayPlayer = (currentPlayer) => {
    const displayPlayerName = document.querySelector('.player-text');
    displayPlayerName.textContent = `${currentPlayer.player}'s turn`;
  };

  const turn = (squareId, currentPlayer) => {
    origBoard[squareId] = currentPlayer.token;
    const input = document.createElement('img');
    input.setAttribute('src', currentPlayer.imgLink);
    const cell = document.getElementById(squareId);
    cell.appendChild(input);
    /* eslint-disable */
    cell.removeEventListener('click', turnClick, false);
    /* eslint-enable */
    cell.style.cursor = 'not-allowed';
  };

  const endGameStatus = (status) => {
    document.querySelector('.endgame').style.display = 'block';
    /* eslint-disable */
    const result = document.querySelector(('.text')).textContent = `${status}`;
    /* eslint-enable */
    return result;
  };

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
  };

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
  };

  const removeEventListenerCell = (move) => {
    cells.forEach(cell => {
      if (Number(cell.id) === move) {
        /* eslint-disable */
        cell.removeEventListener('click', turnClick, false);
        /* eslint-enable */
      }
    });
  };

  const easyMode = (e) => {
    if (isAiTurnOver) {
      displayPlayer(player1Name);
      turn(e.target.id, player1Name);
      let gameWon = checkWin(origBoard, player1Name);
      isAiTurnOver = false;
      if (gameWon) { return gameOver(gameWon); }
      const aiMove = randomAIMove();
      if (aiMove !== undefined) {
        /* eslint-disable */
        setTimeout(() => {
          /* eslint-enable */
          isAiTurnOver = true;
          turn(aiMove, aiPlayer);
          removeEventListenerCell(aiMove);
          if (!gameWon) { gameWon = checkWin(origBoard, aiPlayer); }
          if (gameWon) { return gameOver(gameWon); }
          displayPlayer(player1Name);
          swapTurn();
        }, 300);
      }
    }
    return checkTie();
  };

  const hardMode = (e) => {
    if (isAiTurnOver) {
      displayPlayer(player1Name);
      turn(e.target.id, player1Name);
      const bestMove = minMaxAlgorithm(origBoard, aiPlayer).index;
      isAiTurnOver = false;
      if (bestMove !== undefined) {
      /* eslint-disable */
        setTimeout(() => {
          /* eslint-enable */
          isAiTurnOver = true;
          turn(bestMove, aiPlayer);
          removeEventListenerCell(bestMove);
          let gameWon = checkWin(origBoard, player1Name);
          if (!gameWon) { gameWon = checkWin(origBoard, aiPlayer); }
          if (gameWon) { return gameOver(gameWon); }
        }, 300);
      }
    }
    return checkTie();
  };

  const humanMode = (e) => {
    const currentPlayer = playerName ? player2Name : player1Name;
    const NextTurn = playerName ? player1Name : player2Name;
    displayPlayer(NextTurn);
    turn(e.target.id, currentPlayer);
    const gameWon = checkWin(origBoard, currentPlayer);
    if (gameWon) {
      return gameOver(gameWon);
    }
    swapTurn();
    return checkTie();
  };

  const turnClick = (e) => {
    if (player1Name.player.length > 0) {
      if (selectedMode.aiEasyMode) { easyMode(e); }
      if (selectedMode.multiplayer) { humanMode(e); }
      if (selectedMode.aiHardMode) { hardMode(e); }
    }
  };

  const startGame = () => {
    document.querySelector('.endgame').style.display = 'none';
    alert.style.display = 'none';
    isAiTurnOver = true;
    origBoard = Array.from(Array(9).keys());
    cells.forEach(cell => {
      cell.style.removeProperty('background-color');
      cell.style.removeProperty('background');
      cell.style.removeProperty('border');
      cell.innerHTML = '';
      cell.style.cursor = 'pointer';
      cell.addEventListener('click', turnClick);
    });
  };

  restart.forEach(btn => btn.addEventListener('click', startGame));

  modes.forEach(mode => {
    mode.addEventListener('click', (e) => {
      /* eslint-disable */
      Object.entries(selectedMode).map(([key]) => [selectedMode[key] = false]);
      /* eslint-enable */
      const key = e.target.id;
      if (e.target.id === 'aiEasyMode') {
        formStyle(e);
      } else if (e.target.id === 'aiHardMode') {
        formStyle(e);
      } else {
        originalForm(e);
      }
      selectedMode[key] = true;
      isAiTurnOver = true;
      startGame();
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    player1Name.player = e.target.player1.value;
    player2Name.player = e.target.player2.value;
    const displayPlayerName = document.querySelector('.player-text');
    displayPlayerName.textContent = `${e.target.player1.value}'s turn`;
    form.style.display = 'none';
    GameBoard.startGame();
  });

  return {
    startGame,
    gameOver,
    checkTie
  };
})();

// export { GameBoard }
