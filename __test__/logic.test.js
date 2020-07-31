import { swapTurn, checkWin, player1Name, player2Name, playerName   } from '../js/logic'

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
