import express from 'express'

export default (table) => {
  const router = express.Router()

  // get game details
  router.get('/', ({ user: { id: playerId } }, res, next) => {
    const { id, name, cash } = table.currentPlayer()
    const data = {
      players: table.players().map(({ id, name, cash }) => ({ id, name, cash })),
      currentPlayer: { id, name, cash },
      communityCards: table.communityCards().map(({ suit, rank }) => ({ suit, rank })),
      playerCards: table.playerCards(playerId).map(({ suit, rank }) => ({ suit, rank })),
      bets: table.bets(),
      pot: table.pot()
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
