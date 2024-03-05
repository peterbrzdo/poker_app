import { Suit, Rank } from './types'

export default class Card {
  static SUITS = [Suit.Spades, Suit.Hearts, Suit.Diamonds, Suit.Clubs]
  static RANKS = [Rank.Two, Rank.Three, Rank.Four, Rank.Five, Rank.Six, Rank.Seven, Rank.Eight, Rank.Nine, Rank.Ten, Rank.Jack, Rank.Queen, Rank.King, Rank.Ace]

  private _rank: Rank
  private _suit: Suit

  constructor(suit: Suit, rank: Rank) {
    this._suit = suit
    this._rank = rank
  }

  get rank() {
    return this._rank
  }

  get suit() {
    return this._suit
  }

  compareTo(card: Card) {
    return Card.RANKS.indexOf(this._rank) - Card.RANKS.indexOf(card.rank)
  }

  toJSON() {
    return {
      rank: this._rank,
      suit: this._suit
    }
  }
}
