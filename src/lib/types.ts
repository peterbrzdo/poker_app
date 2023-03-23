export enum Action {
  RAISE = 'raise',
  CALL = 'call',
  CHECK = 'check',
  FOLD = 'fold'
}

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

export interface ICard {
  suit: Suit
  rank: Rank
  compareTo: (card: ICard) => number
  toJSON: () => { rank: Rank, suit: Suit }
}

export enum PlayerState {
  Active = 'active',
  Inactive = 'inactive'
}

export interface IPlayer {
  id: string
  name: string
  cash: number
  state: PlayerState
  cards: ICard[]
  addCard: (card: ICard) => void
  addCash: (amount: number) => void
  deductCash: (amount: number) => void
}

export interface ITableService {
  state: State
  players: IPlayer[]
  communityCards: ICard[]
  currentPlayer: IPlayer | null
  bets: Map<string, number>
  pot: number
  winner: IPlayer | null
  winnerHand: ICard[]
  start: () => void
  addPlayer: ({ id, name }: { id: string, name: string }) => void
  performAction: (action: Action, ...args: unknown[]) => void
  getPlayerCards: (playerId: string) => ICard[]
}

export type BestHandType = {
  type: string
  hand: ICard[]
}
