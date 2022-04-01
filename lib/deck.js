import shuffle from 'lodash.shuffle'
import Card from './card.js'

export default class Deck {
  #cards = []

  constructor() {
    this.init()
    this.shuffle()
  }

  init() {
    this.#cards = []
    for (const suit of Card.SUITS) {
      for (const rank of Card.RANKS) {
        this.#cards.push(new Card({ suit, rank }))
      }
    }
  }

  shuffle() {
    this.#cards = shuffle(this.#cards)
  }

  remaining() {
    return this.#cards.length
  }

  empty() {
    return this.#cards.length === 0
  }

  draw(count = 1) {
    return this.#cards.splice(0, count)
  }
}
