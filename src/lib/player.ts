import type { Card, Player as IPlayer } from './types.js'

export default class Player implements IPlayer {
  private _id = ''
  private _name = ''
  private _cash = 0
  private _cards: Card[] = []

  constructor(id: string, name: string, cash: number) {
    this._id = id
    this._name = name
    this._cash = cash
  }

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  get cash() {
    return this._cash
  }

  get cards() {
    return this._cards
  }

  addCard(card: Card) {
    this._cards = [...this._cards, card]
  }

  addCash(amount: number) {
    this._cash += amount
  }

  deductCash(amount: number) {
    this._cash -= amount
  }
}
