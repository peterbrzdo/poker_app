import { State, Suit, Rank, Action, Deck } from './types'
import Player from './player'
import Card from './card'
import { IllegalActionError, IllegalAmountError } from './errors'


export default class TableService {
  private _deck: Deck
  constructor(deck: Deck) {
    this._deck = deck
  }

  get state(): State {
    // TODO: implement
    return State.ENDED
  }

  get players(): Player[] {
    // TODO: implement
    // no players yet
    // return []
    return [
      new Player('al-capone', 'Al Capone', 95),
      new Player('pat-garret', 'Pat Garret', 95),
      new Player('wyatt-earp', 'Wyatt Earp', 95)
    ]
  }

  getPlayerCards(playerId: string): Card[] {
    // TODO: implement
    // no player cards yet
    // return []
    return [
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Hearts, Rank.Ace)
    ]
  }

  get communityCards(): Card[] {
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

  get currentPlayer(): Player {
    // TODO: implement
    // no current player yet
    // return null
    return new Player('al-capone', 'Al Capone', 100)
  }

  get bets(): Map<string, number> {
    // TODO: implement
    // no bets yet
    // return new Map()
    return new Map([
      ['al-capone', 10],
      ['pat-garret', 20],
      ['wyatt-earp', 5]
    ])
  }

  get pot(): number {
    // TODO: implement
    return 15
  }

  get winner(): Player | null {
    // TODO: implement
    // no winner yet
    // return null
    return new Player('al-capone', 'Al Capone', 95)
  }

  get winnerHand(): Card[] {
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

  performAction(action: Action) {
    // TODO: implement
    console.log('performAction', action)
  }
}
