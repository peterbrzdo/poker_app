import { z } from 'zod'
import Card from './card'

export enum ActionType {
  CHECK = 'CHECK',
  CALL = 'CALL',
  RAISE = 'RAISE',
  FOLD = 'FOLD',
}

export const Action = z.union([
  z.object({ type: z.literal(ActionType.CHECK) }),
  z.object({ type: z.literal(ActionType.CALL) }),
  z.object({ type: z.literal(ActionType.FOLD) }),
  z.object({ type: z.literal(ActionType.RAISE), amount: z.number().gt(0) })
])

export type Action = z.infer<typeof Action>

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

export enum PlayerState {
  Active = 'active',
  Inactive = 'inactive'
}

export type BestHandType = {
  type: string
  hand: Card[]
}
