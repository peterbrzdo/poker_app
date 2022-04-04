import express from 'express'

const playerToObject = ({ id, name, cash }) => ({ id, name, cash })
const cardToObject = ({ suit, rank }) => ({ suit, rank })

export default (table) => {
  const router = express.Router()

  // get game details
  router.get('/', ({ user: { id: playerId } }, res, next) => {
    const data = {
      game: table.game(),
      players: table.players().map(playerToObject),
      currentPlayer: playerToObject(table.currentPlayer()),
      communityCards: table.communityCards().map(cardToObject),
      playerCards: table.playerCards(playerId).map(cardToObject),
      bets: table.bets(),
      pot: table.pot(),
      winner: playerToObject(table.winner()),
      winnerHand: table.winnerHand().map(cardToObject)
    }
    res.json(data)
  })

  // join game
  router.post('/players', ({ user: { id: playerId, name } }, res, next) => {
    table.addPlayer({ id: playerId, name })
    res
      .status(204)
      .end()
  })

  // actions
  router.post('/actions', express.json(), ({ user: { id: playerId }, body: { type: action, args = [] } }, res, next) => {
    table.performAction(playerId, action, ...args)
    res
      .status(204)
      .end()
  })

  return router
}
