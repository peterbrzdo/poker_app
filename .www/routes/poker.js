import express from 'express'

export default (table) => {
  const router = express.Router()

  // get game details
  router.get('/', (req, res, next) => {
    const user = req.user
    res.json({
      currentPlayer: table.currentPlayer(),
      players: table.players(),
      communityCards: table.communityCards(),
      playerCards: table.playerCards(user.name)
    })
  })

  // start game
  router.post('/startGame', (req, res, next) => {
    res
      .status(501)
      .send('Not yet implemented') // TODO error handling
  })

  // join game
  router.post('/players', ({ user: { name } }, res, next) => { // REVISE: rename to join
    table.join(name)
    res
      .status(204)
      .end()
  })

  // actions
  router.post('/actions', express.json(), ({ user: { name }, body: { type, args = [] } }, res, next) => {
    table.performAction(name, type, ...args)
    res
      .status(204)
      .end()
  })

  return router
}
