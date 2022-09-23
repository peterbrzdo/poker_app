export default class BestHand {
  static HIGHEST_CARD = 'HIGHEST_CARD'
  static PAIR = 'PAIR'
  static TWO_PAIRS = 'TWO_PAIRS'
  static THREE_OF_A_KIND = 'THREE_OF_A_KIND'
  static FLUSH = 'FLUSH'
  static FULL_HOUSE = 'FULL_HOUSE'
  static FOUR_OF_A_KIND = 'FOUR_OF_A_KIND'
  #cards
  #cardsByRanks = null
  #cardsBySuits = null

  constructor(playerCards, communityCards) {
    this.#cards = [...playerCards, ...communityCards].sort((card1, card2) => {
      return card1.compareTo(card2)
    })
    this.#buildCardByRanks()
    this.#buildCardBySuits()
  }

  determine() {
    return this.#fourOfAKind()
      || this.#fullHouse()
      || this.#flush()
      || this.#threeOfAKind()
      || this.#twoPairs()
      || this.#pair()
      || this.#highestCard()
  }

  #fourOfAKind() {
    const fourOfAKind = this.#xOfAKind(4)
    return fourOfAKind.length ? {
      type: BestHand.FOUR_OF_A_KIND,
      hand: fourOfAKind[0][1]
    }  : null
  }

  #fullHouse() {
    const pairs = this.#xOfAKind(2)
    const threeOfAKind = this.#xOfAKind(3)
    return threeOfAKind.length && pairs.length ? {
      type: BestHand.FULL_HOUSE,
      hand: [...threeOfAKind[0][1], ...pairs[0][1]]
    } : null
  }

  #flush() {
    const cardsOfASuit = this.#xOfASuit(5)

    return cardsOfASuit.length ? {
      type: BestHand.FLUSH,
      hand: cardsOfASuit.slice(0, 5)[0][1]
    } : null
  }

  #threeOfAKind() {
    const threeOfAKind = this.#xOfAKind(3)
    return threeOfAKind.length ? {
      type: BestHand.THREE_OF_A_KIND,
      hand: threeOfAKind[0][1]
    } : null
  }

  #twoPairs() {
    const pairs = this.#xOfAKind(2)
    return pairs.length >= 2 ? {
      type: BestHand.TWO_PAIRS,
      hand: [...pairs[0][1], ...pairs[1][1]]
    } : null
  }

  #pair() {
    const pairs = this.#xOfAKind(2)
    return pairs.length ? {
      type: BestHand.PAIR,
      hand: pairs[0][1]
    } : null
  }

  #xOfAKind(number) {
    return [...this.#cardsByRanks.entries()].filter(([, cards]) => {
      return cards.length == number
    })
  }

  #xOfASuit(number) {
    return [...this.#cardsBySuits.entries()].filter(([, cards]) => {
      return cards.length >= number
    })
  }

  #highestCard() {
    return {
      type: BestHand.HIGHEST_CARD,
      hand: this.#cards.slice(0, 5)
    }
  }

  #buildCardBySuits() {
    this.#cardsBySuits = this.#buildCardByType('suit')
  }

  #buildCardByRanks() {
    this.#cardsByRanks = this.#buildCardByType('rank')
  }

  #buildCardByType(type) {
   return this.#cards.reduce((map, card) => {
      if (map.has(card[type])) {
        const cards = map.get(card[type])
        map.set(card[type], [...cards, card])
      } else {
        map.set(card[type], [card])
      }
      return map
    }, new Map())
  }
}
