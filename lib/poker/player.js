export default class Player {
  #id = ''
  #name = ''
  #cards = []
  #credit = 0

  constructor({ id, name, credit }) {
    this.#id = id
    this.#name = name
    this.#credit = credit
  }

  getId() {
    return this.#id
  }

  getName() {
    return this.#name
  }

  getCredit() {
    return this.#credit
  }

  getCards() {
    return this.#cards
  }

  addCard(card) {
    this.#cards.push(card)
  }

  resetCards() {
    this.#cards = []
  }

  addCredit(amount) {
    this.#credit += amount
  }

  removeCredit(amount) {
    this.#credit -= amount
  }
}
