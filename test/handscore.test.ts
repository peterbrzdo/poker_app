import { expect } from 'chai'
import { BestHand, Card, Handscore } from '../src/index'
import { Suit, Rank } from '../src/lib/types'

describe('Handscore', () => {
  const hex = (number: string) => {
    return parseInt(number, 16)
  }

  const buildCards = (cardTuples: [Suit, Rank][]) => {
    return cardTuples.map(([suit, rank]) => new Card(suit, rank))
  }

  it('returns the correct score for HIGHEST_CARD', () => {
    expect(new Handscore().calculate({
      type: BestHand.HIGHEST_CARD,
      hand: buildCards([
        [Suit.Diamonds, Rank.Ace], [Suit.Clubs, Rank.Jack], [Suit.Spades, Rank.Ten], [Suit.Hearts, Rank.Eight], [Suit.Diamonds, Rank.Four]
      ])
    })).to.be.equal(hex('10000C'))

    expect(new Handscore().calculate({
      type: BestHand.HIGHEST_CARD,
      hand: buildCards([
        [Suit.Hearts, Rank.Nine], [Suit.Clubs, Rank.Seven], [Suit.Spades, Rank.Five], [Suit.Hearts, Rank.Three], [Suit.Diamonds, Rank.Two]
      ])
    })).to.be.equal(hex('100007'))
  })

  it('returns the correct score for PAIR', () => {
    expect(new Handscore().calculate({
      type: BestHand.PAIR,
      hand: buildCards([
        [Suit.Diamonds, Rank.King], [Suit.Clubs, Rank.King], [Suit.Spades, Rank.Ten], [Suit.Hearts, Rank.Eight], [Suit.Diamonds, Rank.Four]
      ])
    })).to.be.equal(hex('2000BB'))

    expect(new Handscore().calculate({
      type: BestHand.PAIR,
      hand: buildCards([
        [Suit.Hearts, Rank.Three], [Suit.Spades, Rank.Three], [Suit.Spades, Rank.Ten], [Suit.Hearts, Rank.Seven], [Suit.Diamonds, Rank.Four]
      ])
    })).to.be.equal(hex('200011'))
  })

  it('returns the correct score for TWO_PAIRS', () => {
    expect(new Handscore().calculate({
      type: BestHand.TWO_PAIRS,
      hand: buildCards([
        [Suit.Hearts, Rank.Ten], [Suit.Diamonds, Rank.Ten], [Suit.Spades, Rank.Eight], [Suit.Clubs, Rank.Eight], [Suit.Hearts, Rank.Seven],
      ])
    })).to.be.equal(hex('388665'))

    expect(new Handscore().calculate({
      type: BestHand.TWO_PAIRS,
      hand: buildCards([
        [Suit.Hearts, Rank.Jack], [Suit.Diamonds, Rank.Jack], [Suit.Diamonds, Rank.Six], [Suit.Clubs, Rank.Six], [Suit.Hearts, Rank.Seven],
      ])
    })).to.be.equal(hex('399445'))
  })

  it('returns the correct score for THREE_OF_A_KIND', () => {
    expect(new Handscore().calculate({
      type: BestHand.THREE_OF_A_KIND,
      hand: buildCards([
        [Suit.Hearts, Rank.Seven], [Suit.Diamonds, Rank.Seven], [Suit.Spades, Rank.Seven], [Suit.Clubs, Rank.Queen], [Suit.Hearts, Rank.Two],
      ])
    })).to.be.equal(hex('4555A0'))
  })

  it('returns the correct score for STRAIGHT', () => {
    expect(new Handscore().calculate({
      type: BestHand.STRAIGHT,
      hand: buildCards([
        [Suit.Hearts, Rank.Seven], [Suit.Diamonds, Rank.Six], [Suit.Spades, Rank.Five], [Suit.Clubs, Rank.Four], [Suit.Hearts, Rank.Three],
      ])
    })).to.be.equal(hex('554321'))
  })

  it('returns the correct score for FLUSH', () => {
    expect(new Handscore().calculate({
      type: BestHand.FLUSH,
      hand: buildCards([
        [Suit.Clubs, Rank.Ace], [Suit.Clubs, Rank.King], [Suit.Clubs, Rank.Ten], [Suit.Clubs, Rank.Eight], [Suit.Clubs, Rank.Seven],
      ])
    })).to.be.equal(hex('6CB865'))
  })

  it('returns the correct score for FULL_HOUSE', () => {
    expect(new Handscore().calculate({
      type: BestHand.FULL_HOUSE,
      hand: buildCards([
        [Suit.Clubs, Rank.Ace], [Suit.Clubs, Rank.Ace], [Suit.Diamonds, Rank.Ace], [Suit.Spades, Rank.Three], [Suit.Clubs, Rank.Three],
      ])
    })).to.be.equal(hex('7CCC11'))
  })

  it('returns the correct score for FOUR_OF_A_KIND', () => {
    expect(new Handscore().calculate({
      type: BestHand.FOUR_OF_A_KIND,
      hand: buildCards([
        [Suit.Hearts, Rank.Queen], [Suit.Diamonds, Rank.Queen], [Suit.Spades, Rank.Queen], [Suit.Clubs, Rank.Queen], [Suit.Hearts, Rank.Seven],
      ])
    })).to.be.equal(hex('8AAAA5'))
  })

  it('returns the correct score for STRAIGHT_FLUSH', () => {
    expect(new Handscore().calculate({
      type: BestHand.STRAIGHT_FLUSH,
      hand: buildCards([
        [Suit.Hearts, Rank.Jack], [Suit.Hearts, Rank.Ten], [Suit.Hearts, Rank.Nine], [Suit.Hearts, Rank.Eight], [Suit.Hearts, Rank.Seven]
      ])
    })).to.be.equal(hex('998765'))
  })

  it('returns the correct score for ROYAL_FLUSH', () => {
    expect(new Handscore().calculate({
      type: BestHand.ROYAL_FLUSH,
      hand: buildCards([
        [Suit.Spades, Rank.Ace], [Suit.Spades, Rank.King], [Suit.Spades, Rank.Queen], [Suit.Spades, Rank.Jack], [Suit.Spades, Rank.Ten]
      ])
    })).to.be.equal(hex('ACBA98'))
  })
})
