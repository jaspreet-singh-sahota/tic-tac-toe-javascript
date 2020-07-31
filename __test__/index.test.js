import { GameBoard } from '../js/index'
import { player1Name, player2Name, checkWin, winningCombs } from '../js/logic'

player1Name.player = 'frank'
player2Name.player = 'jaspreet'
let board = ['X','X','X','O','O', 6, 7, 8, 9]
const gameWon = checkWin(board, player1Name)

test ('should check gamewon', () => {
  expect(gameWon).toEqual( {"currentPlayer": "frank", "index": 0, "player": "X"} )
})

test ('should check gameover', () => {
  const gameWon = checkWin(board, player1Name)
  const winner = `${gameWon.currentPlayer} won!`
  expect(winner).toBe(`frank won!`)
})

const turn = (squareId, currentPlayer) => {
  let board = ['X', 'X', 'X', 'O', 'O', 6, 7, 8, 9]
  board[squareId] = currentPlayer.token;
  return board
};

test('should check turn', () => {
  expect(turn(7, player1Name)).toEqual(["X", "X", "X", "O", "O", 6, 7, "X", 9]);
})

test('should check turn for player 2', () => {
  expect(turn(7, player2Name)).toEqual(["X", "X", "X", "O", "O", 6, 7, "O", 9]);
})

const endGameStatus = (status) => {
  const result = `${status}`;
  return result;
};

test('Should endgame status for tie', () => {
  expect(endGameStatus("It's a Tie")).toBe("It's a Tie")
})   

test('Should endgame status for player1 win', () => {
  const status = `${player1Name.player} won!` 
  expect(endGameStatus(status)).toBe("frank won!")
}) 

test('Should endgame status for playe2 win', () => {
  const status = `${player2Name.player} won!` 
  expect(endGameStatus(status)).toBe("jaspreet won!")
}) 
    
    