import { GameBoard } from '../js/index'
import { player1Name, checkWin, winningCombs } from '../js/logic'

player1Name.player = 'frank'
let board = ['X','X','X','O','O', 6, 7, 8, 9]
test ('should check gamewon', () => {
  const gameWon = checkWin(board, player1Name)
  expect(gameWon).toEqual( {"currentPlayer": "frank", "index": 0, "player": "X"} )
})

test ('should check gameover', () => {
  const gameWon = checkWin(board, player1Name)
  const winner = ""
  expect(winner).toBe(`${gameWon.currentPlayer} won!`)
})
