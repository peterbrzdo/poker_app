import Card from './card'
import { Deck } from './types'

export default class Standard52CardsDeck implements Deck {
  private _cards: Card[] = []

  constructor() {
    this.init()
    this.shuffle()
  }

  get cards() {
    return this._cards
  }

  draw(count = 1) {
    if (this._cards.length < count) {
      throw new Error('Not enough remaining cards')
    }
    const drawnCards = this._cards.splice(0, count)
    return drawnCards
  }

  private init() {
    this._cards = []
    for (const suit of Card.SUITS) {
      for (const rank of Card.RANKS) {
        this._cards.push(new Card(suit, rank))
      }
    }
  }

  private shuffle() {
    for (let i = this._cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this._cards[i], this._cards[j]] = [this._cards[j], this._cards[i]]
    }
  }
}
