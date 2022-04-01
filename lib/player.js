export default class Player {
  #id = ''
  #name = ''
  #cash = 0

  constructor({ id, name, cash }) {
    this.#id = id
    this.#name = name
    this.#cash = cash
  }

  get id() {
    return this.#id
  }

  get name() {
    return this.#name
  }

  get cash() {
    return this.#cash
  }

  addCash(amount) {
    this.#cash += amount
  }

  removeCash(amount) {
    this.#cash -= amount
  }

  resetCash() {
    this.#cash = 0
  }
}
