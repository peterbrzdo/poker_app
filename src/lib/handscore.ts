import type { Card as ICard } from './types.js'
import { BestHand, Card } from '../index.js'

export default class Handscore {
  // The hand score is calculated by adding the value of the type and the value of the hand.
  // If you sum them up you get a 6 digits hexadecimal number
  // The prerequisite is that the cards need to be ordered in a descending order,
  // starting with the highest rank from left to right

  calculate({ type, hand }: { type: string, hand: ICard[] }) {
    return this.baseScore(type) + this.handValue(type, hand)
  }

  private baseScore(type: string) {
    const hexValue = {
      [BestHand.HIGHEST_CARD]: '100000',
      [BestHand.PAIR]: '200000',
      [BestHand.TWO_PAIRS]: '300000',
      [BestHand.THREE_OF_A_KIND]: '400000',
      [BestHand.STRAIGHT]: '500000',
      [BestHand.FLUSH]: '600000',
      [BestHand.FULL_HOUSE]: '700000',
      [BestHand.FOUR_OF_A_KIND]: '800000',
      [BestHand.STRAIGHT_FLUSH]: '900000',
      [BestHand.ROYAL_FLUSH]: 'A00000',
    }[type]
    return parseInt(hexValue, 16)
  }

  private handValue(type: string, hand: ICard[]) {
    const toHexValue = (cards: ICard[]) => cards
      .map((card) => Card.RANKS.indexOf(card.rank).toString(16))
      .join('')

    const calcFunction = {
      [BestHand.HIGHEST_CARD]: ([card]: ICard[]) => toHexValue([card]),
      [BestHand.PAIR]: ([cardA, cardB]: ICard[]) => toHexValue([cardA, cardB])
    }[type] || toHexValue

    return parseInt(calcFunction(hand), 16)
  }
}
