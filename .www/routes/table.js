import express from 'express'

const playerToObject = player => {
  if (!player) {
    return null
  }
  const { id, name, cash } = player
  return { id, name, cash }
}
const cardToObject = ({ suit, rank }) => ({ suit, rank })

export default (tableService) => {
  const router = express.Router()

  // get game details
  router.get('/', ({ user: { id: playerId } }, res, next) => {
    const data = {
      game: tableService.game(),
      players: tableService.players().map(playerToObject),
      currentPlayer: playerToObject(tableService.currentPlayer()),
      communityCards: tableService.communityCards().map(cardToObject),
      playerCards: tableService.playerCards(playerId).map(cardToObject),
      bets: tableService.bets(),
      pot: tableService.pot(),
      winner: playerToObject(tableService.winner()),
      winnerHand: tableService.winnerHand().map(cardToObject)
    }
    res.json(data)
  })

  // join game
  router.post('/players', ({ user: { id: playerId, name } }, res, next) => {
    tableService.addPlayer({ id: playerId, name })
    res
      .status(204)
      .end()
  })

  // start game
  router.post('/start', (req, res, next) => {
    table.start()
    res
      .status(204)
      .end()
  })

  // actions
  router.post('/actions', express.json(), ({ user: { id: playerId }, body: { type: action, args = [] } }, res, next) => {
    tableService.performAction(playerId, action, ...args)
    res
      .status(204)
      .end()
  })

  return router
}
