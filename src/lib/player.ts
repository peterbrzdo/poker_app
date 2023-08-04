import { ICard, IPlayer, PlayerState } from './types'

export default class Player implements IPlayer {
  private _id = ''
  private _name = ''
  private _cash = 0
  private _state: PlayerState
  private _cards: ICard[] = []

  constructor(id: string, name: string, cash: number) {
    this._id = id
    this._name = name
    this._cash = cash
    this._state = PlayerState.Inactive
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

  get state() {
    return this._state
  }

  set state(state) {
    this._state = state
  }

  get cards() {
    return this._cards
  }

  addCard(card: ICard) {
    this._cards = [...this._cards, card]
  }

  addCash(amount: number) {
    this._cash += amount
  }

  deductCash(amount: number) {
    this._cash -= amount
  }
}
