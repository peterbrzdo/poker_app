import express, { type Response } from 'express'
import type { IPlayer, ICard, ITableService } from '../../src/lib/types'
import { Action } from '../../src/lib/types'

const playerToObject = (player: IPlayer | null) => {
  if (!player) {
    return null
  }
  const { id, name, cash } = player
  return { id, name, cash }
}
const cardToObject = ({ suit, rank }: ICard) => ({ suit, rank })

export default (tableService: ITableService) => {
  const router = express.Router()

  const createSnapshot = (userId: string) => {
    const { state, players, currentPlayer, communityCards, bets, pot, winner, winnerHand } = tableService
    const playerCards = tableService.getPlayerCards(userId)
    return {
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
  }

  const sendEventToClients = () => {
    clients.forEach((client) => {
      const snapshot = createSnapshot(client.id)
      client.res.write(`event: message\ndata:${JSON.stringify(snapshot)}\n\n`)
    })
  }

  // get game details
  router.get('/', (req, res, next) => {
    res
      .status(200)
      .json(createSnapshot(req.user!.id))
  })

  // join game
  router.post('/players', (req, res, next) => {
    const { id, name } = req.user!
    tableService.addPlayer({ id, name })
    sendEventToClients()
    res
      .status(204)
      .end()
  })

  // start game
  router.post('/start', (req, res, next) => {
    tableService.start()
    sendEventToClients()

    res
      .status(204)
      .end()
  })

  // actions
  router.post('/actions', express.json(), (req, res, next) => {
    const result = Action.safeParse(req.body)
    if (result.success) {
      tableService.performAction(result.data)
      sendEventToClients()
      res
        .status(204)
        .end()
    } else {
      res.status(400).json({
        error: 'Invalid action definition'
      })
    }
  })

  type Client = {
    id: string,
    res: Response
  }

  let clients: Client[] = []
  router.get('/events', (req, res) => {
    const clientId = req.user!.id
    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    }
    res.writeHead(200, headers)

    clients.push({
      id: clientId,
      res
    })

    req.on('close', () => {
      console.log(`${clientId}: Connection closed`)
      clients = clients.filter(client => client.id !== clientId)
    })
  })

  return router
}
