export default class AbstractHand {
  constructor() {
    if (this.constructor === AbstractHand) {
      throw new Error('Abstract class cannot be instantiated directly');
    }
  }

  getValue() {
    // 1. High card: Simple value of the card.Lowest: 2 – Highest: Ace
    // 2. Pair: Two cards with the same value
    // 3. Two pairs: Two sets of two cards with the same value
    // 4. Three of a kind: Three cards with the same value
    // 5. Straight: Sequence of 5 cards in increasing value(Ace can precede 2 and follow up King)
    // 6. Flush: 5 cards of the same suit
    // 7. Full house: Combination of three of a kind and a pair
    // 8. Four of a kind: Four cards of the same value
    // 9. Straight flush: Straight of the same suit
    // 10. Royal flush Straight: flush from Ten to Ace
    throw new Error('Abstract method needs to be implemented in subclass')
  }

  check(cards) {
    // check if the cards match the hand
    throw new Error('Abstract method needs to be implemented in subclass')
  }
}
