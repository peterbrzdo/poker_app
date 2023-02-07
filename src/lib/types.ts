import { Action } from './action.js'

export enum State {
  OPEN = 0,
  PRE_FLOP = 1,
  FLOP = 2,
  TURN = 3,
  RIVER = 4,
  ENDED = 5
}

export enum Suit {
  Spades = 'spades',
  Hearts = 'hearts',
  Diamonds = 'diamonds',
  Clubs = 'clubs'
}

export enum Rank {
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  Six = '6',
  Seven = '7',
  Eight = '8',
  Nine = '9',
  Ten = '10',
  Jack = 'jack',
  Queen = 'queen',
  King = 'king',
  Ace = 'ace'
}

export type CardPropertyType = 'suit' | 'rank'

export interface Card {
  suit: Suit
  rank: Rank
  compareTo: (card: Card) => number
}

export enum PlayerState {
  Active = 'active',
  Inactive = 'inactive'
}

export interface Player {
  id: string
  name: string
  cash: number
  state: PlayerState
  cards: Card[]
}

export interface TableService {
  state: State
  players: Player[]
  communityCards: Card[]
  currentPlayer: Player
  bets: { [key: string]: number }
  pot: number
  winner: Player
  winnerHand: Card[]
  start: () => void
  addPlayer: ({ id, name }: { id: string, name: string }) => void
  performAction: (action: Action, ...args: any[]) => void
  getPlayerCards: (playerId: string) => Card[]
}

export type BestHandType = {
  type: string
  hand: Card[]
}
