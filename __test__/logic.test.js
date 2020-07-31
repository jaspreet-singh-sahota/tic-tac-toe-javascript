const logic = require('../js/logic');
// const swapTurn = require('../js/logic');
// const checkWin = require('../js/logic');
// const checkAvailableMoves = require('../js/logic');
// const origBoard = require('../js/logic');

const player1Name = { player: 'frank', token: 'X', imgLink: '#'}
const player2Name = { player: 'jaspreet', token: 'X', imgLink: '#'}
let playerName;

it ('should check swapTurn', () => {  
  const currentPlayer = playerName ? player1Name : player2Name;
  logic.swapTurn()
  expect(currentPlayer.player).toBe(player2Name.player);
})

it ('should check swapTurn to switch back to player 1', () => {  
  const currentPlayer = playerName ? player2Name : player1Name;
  logic.swapTurn()
  expect(currentPlayer.player).toBe(player1Name.player);
})

it ('should check checkWin', () => {
  let board = ['X','X','X','O','O', 6, 7, 8, 9]
  expect(logic.checkWin(board,player1Name)).toEqual({ index: 0, player:'X', currentPlayer: player1Name.player })
})
 
it('should checkAvailableMoves', () => {
  let board = ['X','X','O','O','O', 'X', 'O', 'X', 'O']
  expect(logic.checkAvailableMoves()).toEqual([]) 
})

it('should minMaxAlgorithm', () => {
  expect(logic.checkAvailableMoves()).toBe[Number]
})

it('should minMaxAlgorithm', () => {
  let origBoard = ['X', 'X', 'X', 'O', 'O', 6, 7, 8, 9]
  expect(logic.minMaxAlgorithm(origBoard)).toBe[Number]
})

it('should minMaxAlgorithm', () => {
  let origBoard = ['X', 'X', 'X', 'O', 'O', 6, 7, 8, 9]
  let player2 = player2Name.player
  expect(logic.minMaxAlgorithm(origBoard, player2)).toEqual({ "score": 0 })
})

it('should minMaxAlgorithm', () => {
  let origBoard = ['X', 'X', 'O', 'O', 'O', 'X', 'O', 'X', 'O']
  let player2 = player2Name.player
  expect(logic.minMaxAlgorithm(origBoard, player2)).toEqual({ "score": 10 })
})
