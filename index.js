const GameBoard = (player1Name, player2Name) => {
  let origBoard = '';
  // let playerName1 = document.querySelector('.name1').value
  // let playerName2 = document.querySelector('.name2').value
  const cells = document.querySelectorAll('.cell');
  const form = document.querySelector('#form');
  const restart = document.querySelector('#restart')
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
    checkTie()
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
      const winner = `${gameWon.currentPlayer} won!`
      endGameStatus(winner);
    }
  }
  
  function checkTie() {
    const availableMoves = origBoard.filter(elem => typeof elem === 'number')
    if (availableMoves.length == 0) {
      const result = document.querySelectorAll('.cell');
      result.forEach(cell => cell.style.backgroundColor = 'green')
      endGameStatus("It's a Tie")
    }
  }
  
  function endGameStatus(status) {
    const result = document.querySelector('.endgame');
    result.style.display = 'block';
    result.textContent = `${status}`;
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

  restart.addEventListener('click', startGame) 
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const player1Name = e.target.player1.value
  const player2Name = e.target.player2.value
  GameBoard(player1Name, player2Name)
})