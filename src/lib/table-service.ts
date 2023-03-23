import { State, ITableService, Suit, Rank, Action } from './types.js'
import Player from './player.js'
import Card from './card.js'
import { IllegalActionError, IllegalAmountError } from './errors.js'

export default class TableService implements ITableService {
  private static instance: ITableService | null = null

  static getInstance() {
    if (!TableService.instance) {
      TableService.instance = new TableService(/* options */)
    }
    return TableService.instance
  }

  constructor(/* options */) {
    // TODO: implement
  }

  get state() {
    // TODO: implement
    return State.ENDED
  }

  get players() {
    // TODO: implement
    // no players yet
    // return []
    return [
      new Player('al-capone', 'Al Capone', 95),
      new Player('pat-garret', 'Pat Garret', 95),
      new Player('wyatt-earp', 'Wyatt Earp', 95)
    ]
  }

  getPlayerCards(playerId: string) {
    // TODO: implement
    // no player cards yet
    // return []
    return [
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Hearts, Rank.Ace)
    ]
  }

  get communityCards() {
    // TODO: implement
    // no community cards yet
    // return []
    return [
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Clubs, Rank.King)
    ]
  }

  get currentPlayer() {
    // TODO: implement
    // no current player yet
    // return null
    return new Player('al-capone', 'Al Capone', 100)
  }

  get bets() {
    // TODO: implement
    // no bets yet
    // return new Map()
    return new Map([
      ['al-capone', 10],
      ['pat-garret', 20],
      ['wyatt-earp', 5]
    ])
  }

  get pot() {
    // TODO: implement
    return 15
  }

  get winner() {
    // TODO: implement
    // no winner yet
    // return null
    return new Player('al-capone', 'Al Capone', 95)
  }

  get winnerHand() {
    // TODO: implement
    // no winner hand yet
    // return []
    return [
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Spades, Rank.King)
    ]
  }

  start() {
    // TODO: implement
  }

  addPlayer({ id, name }: { id: string, name: string }) {
    // TODO: implement
    console.log('addPlayer', { id, name })
  }

  performAction(action: Action, ...args: unknown[]) {
    // TODO: implement
    console.log('performAction', { action, args })
  }
}
