import type { Card, CardPropertyType, Suit, Rank } from './types.js'

export type BestHandType = {
  type: string
  hand: Card[]
}

export default class BestHand {
  static HIGHEST_CARD = 'HIGHEST_CARD'
  static PAIR = 'PAIR'
  static TWO_PAIRS = 'TWO_PAIRS'
  static THREE_OF_A_KIND = 'THREE_OF_A_KIND'
  static STRAIGHT = 'STRAIGHT'
  static FLUSH = 'FLUSH'
  static FULL_HOUSE = 'FULL_HOUSE'
  static FOUR_OF_A_KIND = 'FOUR_OF_A_KIND'
  static STRAIGHT_FLUSH = 'STRAIGHT_FLUSH'
  static ROYAL_FLUSH = 'ROYAL_FLUSH'
  private cards: Card[]
  private cardsByRanks: Map<Rank, Card[]> | null = null
  private cardsBySuits: Map<Suit, Card[]> | null = null

  constructor(playerCards: Card[], communityCards: Card[]) {
    this.cards = [...playerCards, ...communityCards].sort((card1, card2) => {
      return card2.compareTo(card1)
    })
    this.groupCardsByRanks()
    this.groupCardsBySuits()
  }

  determine() {
    return this.royalFlush()
      || this.straightFlush()
      || this.fourOfAKind()
      || this.fullHouse()
      || this.flush()
      || this.straight()
      || this.threeOfAKind()
      || this.twoPairs()
      || this.pair()
      || this.highestCard()
  }

  private royalFlush(): BestHandType | null {
    const flushCards = this.atLeastXOfASuit(5)
    if (!(flushCards.length > 0)) return null
    const suit = flushCards[0][0]
    const royalFlushCards = this.possibleStraights()[0].reduce((cards, rank) => {
      const foundCards = this.cards.filter((c) => c.rank === rank)
      return [...cards, ...foundCards]
    }, [] as Card[]).filter((c) => c.suit === suit)
    return royalFlushCards.length === 5 ? {
      type: BestHand.ROYAL_FLUSH,
      hand: royalFlushCards
    } : null
  }


  private straightFlush(): BestHandType | null {
    const flushCards = this.atLeastXOfASuit(5)
    if (!(flushCards.length > 0)) return null
    const suit = flushCards[0][0]
    const straightFlushCards = this.possibleStraights().map((straightVariant) => {
      return straightVariant.reduce((cards, rank) => {
        const foundCards = this.cards.filter((c) => c.rank === rank)
        return [...cards, ...foundCards]
      }, [] as Card[])
    })
      .map((cardList) => {
        const cardListWithSuit = cardList.filter((c) => c.suit === suit)
        return [cardListWithSuit.length, cardListWithSuit] as [number, Card[]]
      })
      .filter(([length]) => length >= 5)

    return straightFlushCards.length ? {
      type: BestHand.STRAIGHT_FLUSH,
      hand: straightFlushCards[0][1]
    } : null
  }

  private fourOfAKind(): BestHandType | null {
    const fourOfAKind = this.xOfAKind(4)
    return fourOfAKind.length ? {
      type: BestHand.FOUR_OF_A_KIND,
      hand: this.fillUpWithHighestCards(fourOfAKind[0][1])
    } : null
  }

  private fullHouse(): BestHandType | null {
    const pairs = this.xOfAKind(2)
    const threeOfAKind = this.xOfAKind(3)
    return threeOfAKind.length && pairs.length ? {
      type: BestHand.FULL_HOUSE,
      hand: [...threeOfAKind[0][1], ...pairs[0][1]]
    } : null
  }

  private flush(): BestHandType | null {
    const cardsOfASuit = this.atLeastXOfASuit(5)

    return cardsOfASuit.length ? {
      type: BestHand.FLUSH,
      hand: cardsOfASuit.slice(0, 5)[0][1]
    } : null
  }

  private straight(): BestHandType | null {
    const straightCards = this.possibleStraights().map((straightVariant) => {
      return straightVariant.reduce((cards, rank) => {
        const card = this.cards.find((c) => c.rank === rank)
        if (card) return [...cards, card]
        return cards
      }, [] as Card[])
    }).filter((cards) => cards.length === 5)

    return straightCards.length ? {
      type: BestHand.STRAIGHT,
      hand: straightCards[0]
    } : null
  }

  private threeOfAKind(): BestHandType | null {
    const threeOfAKind = this.xOfAKind(3)
    return threeOfAKind.length ? {
      type: BestHand.THREE_OF_A_KIND,
      hand: this.fillUpWithHighestCards(threeOfAKind[0][1])
    } : null
  }

  private twoPairs(): BestHandType | null {
    const pairs = this.xOfAKind(2)
    return pairs.length >= 2 ? {
      type: BestHand.TWO_PAIRS,
      hand: this.fillUpWithHighestCards([...pairs[0][1], ...pairs[1][1]])
    } : null
  }

  private pair(): BestHandType | null {
    const pairs = this.xOfAKind(2)
    return pairs.length ? {
      type: BestHand.PAIR,
      hand: this.fillUpWithHighestCards(pairs[0][1])
    } : null
  }

  private xOfAKind(amount: number) {
    return [...this.cardsByRanks!.entries()].filter(([, cards]) => {
      return cards.length == amount
    })
  }

  private atLeastXOfASuit(amount: number) {
    return [...this.cardsBySuits!.entries()].filter(([, cards]) => {
      return cards.length >= amount
    })
  }

  private highestCard(): BestHandType {
    return {
      type: BestHand.HIGHEST_CARD,
      hand: this.cards.slice(0, 5)
    }
  }

  private groupCardsBySuits() {
    this.cardsBySuits = this.groupCardsByType('suit')
  }

  private groupCardsByRanks() {
    this.cardsByRanks = this.groupCardsByType('rank')
  }

  private groupCardsByType(type: CardPropertyType) {
    return this.cards.reduce((map, card) => {
      if (map.has(card[type])) {
        const cards = map.get(card[type])
        map.set(card[type], [...cards, card])
      } else {
        map.set(card[type], [card])
      }
      return map
    }, new Map())
  }

  private possibleStraights() {
    return [
      ['ace', 'king', 'queen', 'jack', '10'],
      ['king', 'queen', 'jack', '10', '9'],
      ['queen', 'jack', '10', '9', '8'],
      ['jack', '10', '9', '8', '7'],
      ['10', '9', '8', '7', '6'],
      ['9', '8', '7', '6', '5'],
      ['8', '7', '6', '5', '4'],
      ['7', '6', '5', '4', '3'],
      ['6', '5', '4', '3', '2'],
    ]
  }

  private fillUpWithHighestCards = (relevantCards: Card[]) => {
    const remainingCards = this.cards.filter((card) => {
      return !relevantCards.find((relevantCard) => {
        return relevantCard.suit === card.suit && relevantCard.rank === card.rank
      })
    })
    return [...relevantCards, ...remainingCards.slice(0, 5 - relevantCards.length)]
  }
}
