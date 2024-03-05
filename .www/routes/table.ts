import express from 'express'
import { Action } from '../../src/lib/types'
import Player from '../../src/lib/player'
import TableService from '../../src/lib/table-service'
import Card from '../../src/lib/card'

const playerToObject = (player: Player | null) => {
  if (!player) {
    return null
  }
  const { id, name, cash } = player
  return { id, name, cash }
}
const cardToObject = ({ suit, rank }: Card) => ({ suit, rank })

export default (tableService: TableService) => {
  const router = express.Router()

  // get game details
  router.get('/', (req, res, next) => {
    const { state, players, currentPlayer, communityCards, bets, pot, winner, winnerHand } = tableService
    const playerCards = tableService.getPlayerCards(req.user!.id)
    const snapshot = {
      state,
      players: players.map(playerToObject),
      currentPlayer: playerToObject(currentPlayer),
      communityCards: communityCards.map(cardToObject),
      playerCards: playerCards.map(cardToObject),
      bets: Array.from(bets),
      pot,
      winner: playerToObject(winner),
      winnerHand: winnerHand.map(cardToObject)
    }
    res
      .status(200)
      .json(snapshot)
  })

  // join game
  router.post('/players', (req, res, next) => {
    const { id, name } = req.user!
    tableService.addPlayer({ id, name })
    res
      .status(204)
      .end()
  })

  // start game
  router.post('/start', (req, res, next) => {
    tableService.start()
    res
      .status(204)
      .end()
  })

  // actions
  router.post('/actions', express.json(), (req, res, next) => {
    const result = Action.safeParse(req.body)
    if (result.success) {
      tableService.performAction(result.data)
      res
        .status(204)
        .end()
    } else {
      res.status(400).json({
        error: 'Invalid action definition'
      })
    }
  })

  return router
}
