const logic = require('../js/logic');

const player1Name = { player: 'frank', token: 'X', imgLink: '#' }
const player2Name = { player: 'jaspreet', token: 'O', imgLink: '#' }
let board = ['X','X','X','O','O', 6, 7, 8, 9]
const gameWon = logic.checkWin(board, player1Name)

test ('should check for gamewon', () => {
  expect(gameWon).toEqual( {"currentPlayer": "frank", "index": 0, "player": "X"} )
})

test ('should check for gameover', () => {
  const gameWon = logic.checkWin(board, player1Name)
  const winner = `${gameWon.currentPlayer} won!`
  expect(winner).toBe(`frank won!`)
})

const turn = (squareId, currentPlayer) => {
  let board = ['X', 'X', 'X', 'O', 'O', 6, 7, 8, 9]
  board[squareId] = currentPlayer.token;
  return board
};

test('should check the turn for player 1', () => {
  expect(turn(7, player1Name)).toEqual(["X", "X", "X", "O", "O", 6, 7, "X", 9]);
})

test('should check the turn for player 2', () => {
  expect(turn(7, player2Name)).toEqual(["X", "X", "X", "O", "O", 6, 7, "O", 9]);
})


    

    
    
