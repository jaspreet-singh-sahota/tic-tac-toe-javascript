const logic = require('../js/logic');

const player1Name = { player: 'frank', token: 'X', imgLink: '#'}
const player2Name = { player: 'jaspreet', token: 'O', imgLink: '#'}
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

it ('checkWin should return the winning Index', () => {
  let board = ['X','X','X','O','O', 6, 7, 8, 9]
  expect(logic.checkWin(board,player1Name)).toEqual({ index: 0, player:'X', currentPlayer: player1Name.player })
})

test('checkWin should return the winning Index at horizontal win player 2', () => {
  let board = ['O', 'X', 'X',
  'O', 'O', 'O',
  'X', 'O', 'X'];
  expect(logic.checkWin(board, player2Name)).toEqual({ index: 1, player: 'O', currentPlayer: player2Name.player })
});

test('checkWin should return the winning Index at horizontal win for player 1', () => {
  let board = ['X', 'X', 'X',
  'O', 'O', 'O',
  'X', 'O', 'X'];
  expect(logic.checkWin(board, player1Name)).toEqual({ index: 0, player: 'X', currentPlayer: player1Name.player })
});

test('checkWin should return the winning Index at diagonal win for player 1', () => {
  let board = ['X', 'O', 'X', 'X', 'X', 'O', 'X', 'O', 'X'];
  expect(logic.checkWin(board, player1Name)).toEqual({ index: 7, player: 'X', currentPlayer: player1Name.player })
});

test('checkWin should return the winning Index at diagonal win for player 2', () => {
  let board = ['O', 'O', 'X',
   'X', 'O', 'X',
    'X', 'X', 'O'];
  expect(logic.checkWin(board, player2Name)).toEqual({ index: 6, player: 'O', currentPlayer: player2Name.player })
});

test('checkWin should return the winning Index at vertical win for player 2', () => {
  let board = ['O', 'O', 'X',
   'X', 'O', 'X',
    'X', 'O', 'X'];
  expect(logic.checkWin(board, player2Name)).toEqual({ index: 4, player: 'O', currentPlayer: player2Name.player })
});

test('checkWin should return the winning Index at vertical win for player 1', () => {
  let board = ['X', 'O', 'O',
  'X', 'O', 'X',
   'X', 'X', 'O'];
  expect(logic.checkWin(board, player1Name)).toEqual({ index: 3, player: 'X', currentPlayer: player1Name.player })
});

test('checkWin should return null if player 1 is not winning', () => {
  let board = ['X', 'O', 'O',
  'X', 'O', 'X',
   'X', 'X', 'O'];
  expect(logic.checkWin(board, player2Name)).toEqual(null)
});

test('checkWin should return null if player 2 is not winning', () => {
  let board = ['O', 'O', 'O',
  'X', 'O', 'X',
   'X', 'X', 'O'];
  expect(logic.checkWin(board, player1Name)).toEqual(null)
});

it('should check checkAvailableMoves, if no more moves are left then it should return []', () => {
  let board = ['X','X','O','O','O', 'X', 'O', 'X', 'O']
  expect(logic.checkAvailableMoves()).toEqual([]) 
})

it('should check checkAvailableMoves, it should returns a number', () => {
  expect(logic.checkAvailableMoves()).toBe[Number]
})

it('should check minMaxAlgorithm, it should returns a number', () => {
  let origBoard = ['X', 'X', 'X', 'O', 'O', 6, 7, 8, 9]
  expect(logic.minMaxAlgorithm(origBoard)).toBe[Number]
})

it('should check minMaxAlgorithm if player 1 wins', () => {
  let origBoard = ['X', 'X', 'X', 'O', 'O', 6, 7, 8, 9]
  let player2 = player2Name.player
  expect(logic.minMaxAlgorithm(origBoard, player2)).toEqual({ "score": 0 })
})

it('should check minMaxAlgorithm if player 2 wins', () => {
  let origBoard = ['X', 'X', 'O', 'O', 'O', 'X', 'O', 'X', 'O']
  let player2 = player2Name.player
  expect(logic.minMaxAlgorithm(origBoard, player2)).toEqual({ "score": 10 })
})




