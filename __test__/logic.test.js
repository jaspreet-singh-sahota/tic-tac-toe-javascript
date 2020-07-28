import { swapTurn } from '../js/logic'

const player1Name = { player: 'frank', token: 'X', imgLink: '#' }
const player2Name = { player: 'jaspreet', token: 'O', imgLink: '#' }
let playerName 

let origBoard = [''];


it ('should swapturn', () => {
  const currentPlayer = playerName ? player2Name : player1Name;
  const NextTurn = playerName ? player1Name : player2Name;
  swapTurn()
  expect(NextTurn.player).toBe(player2Name.player);
})
