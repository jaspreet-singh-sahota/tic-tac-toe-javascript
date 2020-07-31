import { swapTurn, checkWin, player1Name, 
  player2Name, playerName, checkAvailableMoves, minMaxAlgorithm, origBoard } from '../js/logic'

it ('should swapturn', () => {
  const currentPlayer = playerName ? player2Name : player1Name;
  const NextTurn = playerName ? player1Name : player2Name;
  swapTurn()
  expect(NextTurn.player).toBe(player2Name.player);
})

it ('should checkwin', () => {
  let board = ['X','X','X','O','O', 6, 7, 8, 9]
  expect(checkWin(board,player1Name)).toEqual({ index: 0, player:'X', currentPlayer: player1Name.player })
})

it('should checkAvailableMoves', () => {
  let board = ['X','X','O','O','O', 'X', 'O', 'X', 'O']
  expect(checkAvailableMoves()).toEqual([])
})

it('should minMaxAlgorithm', () => {
  expect(checkAvailableMoves()).toBe[Number]
})

it('should minMaxAlgorithm', () => {
  expect(minMaxAlgorithm(origBoard)).toBe[Number]
})

it('should minMaxAlgorithm', () => {
  let origBoard = ['X', 'X', 'X', 'O', 'O', 6, 7, 8, 9]
  let player2 = player2Name.player
  expect(minMaxAlgorithm(origBoard, player2)).toEqual({ "score": 0 })
})

it('should minMaxAlgorithm', () => {
  let origBoard = ['X', 'X', 'O', 'O', 'O', 'X', 'O', 'X', 'O']
  let player2 = player2Name.player
  expect(minMaxAlgorithm(origBoard, player2)).toEqual({ "score": 10 })
})
