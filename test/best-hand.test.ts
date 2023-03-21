import type { ICard } from '../src/lib/types.js'
import { Suit, Rank } from '../src/lib/types.js'
import { expect } from 'chai'
import { Card, BestHand } from '../src/index.js'

describe('BestHand', () => {
  const buildCards = (cardTuples: [Suit, Rank][]) => {
    return cardTuples.map(([suit, rank]) => new Card(suit, rank))
  }

  const json = (cardTuples: ICard[]) => {
    return JSON.stringify(cardTuples)
  }

  const jsonCards = (cardTuples: [Suit, Rank][]) => {
    return JSON.stringify(buildCards(cardTuples))
  }

  it('returns highest card if highest card is in community cards', () => {
    const playerCards = buildCards([[Suit.Spades, Rank.Two], [Suit.Hearts, Rank.Three]])
    const communityCards = buildCards([
      [Suit.Clubs, Rank.Jack], [Suit.Spades, Rank.Ace], [Suit.Hearts, Rank.King], [Suit.Diamonds, Rank.Nine], [Suit.Spades, Rank.Ten]
    ])

    const { type, hand } = new BestHand(playerCards, communityCards).determine()
    expect(type).to.equal(BestHand.HIGHEST_CARD)
    expect(json(hand)).to.equal(jsonCards([
      [Suit.Spades, Rank.Ace], [Suit.Hearts, Rank.King], [Suit.Clubs, Rank.Jack], [Suit.Spades, Rank.Ten], [Suit.Diamonds, Rank.Nine]
    ]))
  })

  it('returns highest card if highest card is in players hand', () => {
    const playerCards = buildCards([[Suit.Hearts, Rank.King], [Suit.Spades, Rank.Ace]])
    const communityCards = buildCards([
      [Suit.Spades, Rank.Two], [Suit.Hearts, Rank.Three], [Suit.Diamonds, Rank.Nine], [Suit.Clubs, Rank.Jack], [Suit.Spades, Rank.Ten]
    ])

    const { type, hand } = new BestHand(playerCards, communityCards).determine()
    expect(type).to.equal(BestHand.HIGHEST_CARD)
    expect(json(hand)).to.equal(jsonCards([
      [Suit.Spades, Rank.Ace], [Suit.Hearts, Rank.King], [Suit.Clubs, Rank.Jack], [Suit.Spades, Rank.Ten], [Suit.Diamonds, Rank.Nine]
    ]))
  })

  it('returns pair if pair is in players hand', () => {
    const playerCards = buildCards([[Suit.Spades, Rank.Ace], [Suit.Hearts, Rank.Ace]])
    const communityCards = buildCards([
      [Suit.Spades, Rank.Two], [Suit.Hearts, Rank.Three], [Suit.Diamonds, Rank.Ten], [Suit.Clubs, Rank.Five], [Suit.Spades, Rank.Six]
    ])

    const { type, hand } = new BestHand(playerCards, communityCards).determine()
    expect(type).to.equal(BestHand.PAIR)
    expect(json(hand)).to.equal(jsonCards([
      [Suit.Spades, Rank.Ace], [Suit.Hearts, Rank.Ace], [Suit.Diamonds, Rank.Ten], [Suit.Spades, Rank.Six], [Suit.Clubs, Rank.Five]
    ]))
  })

  it('returns pair if pair is in community cards', () => {
    const playerCards = buildCards([[Suit.Spades, Rank.Three], [Suit.Hearts, Rank.King]])
    const communityCards = buildCards([
      [Suit.Spades, Rank.Two], [Suit.Hearts, Rank.Ten], [Suit.Diamonds, Rank.Ten], [Suit.Clubs, Rank.Five], [Suit.Spades, Rank.Six]
    ])

    const { type, hand } = new BestHand(playerCards, communityCards).determine()
    expect(type).to.equal(BestHand.PAIR)

    expect(json(hand)).to.equal(jsonCards([
      [Suit.Hearts, Rank.Ten], [Suit.Diamonds, Rank.Ten], [Suit.Hearts, Rank.King], [Suit.Spades, Rank.Six], [Suit.Clubs, Rank.Five]
    ]))
  })

  it('returns two pairs', () => {
    const playerCards = buildCards([[Suit.Spades, Rank.Ten], [Suit.Hearts, Rank.Ten]])
    const communityCards = buildCards([
      [Suit.Spades, Rank.Two], [Suit.Hearts, Rank.King], [Suit.Diamonds, Rank.King], [Suit.Clubs, Rank.Five], [Suit.Spades, Rank.Six]
    ])

    const { type, hand } = new BestHand(playerCards, communityCards).determine()
    expect(type).to.equal(BestHand.TWO_PAIRS)

    expect(json(hand)).to.equal(jsonCards([
      [Suit.Hearts, Rank.King], [Suit.Diamonds, Rank.King], [Suit.Spades, Rank.Ten], [Suit.Hearts, Rank.Ten], [Suit.Spades, Rank.Six]
    ]))
  })

  it('returns three of a kind', () => {
    const playerCards = buildCards([[Suit.Spades, Rank.King], [Suit.Hearts, Rank.King]])
    const communityCards = buildCards([
      [Suit.Spades, Rank.Two], [Suit.Hearts, Rank.Ten], [Suit.Diamonds, Rank.King], [Suit.Clubs, Rank.Five], [Suit.Clubs, Rank.Seven]
    ])

    const { type, hand } = new BestHand(playerCards, communityCards).determine()
    expect(type).to.equal(BestHand.THREE_OF_A_KIND)

    expect(json(hand)).to.equal(jsonCards([
      [Suit.Spades, Rank.King], [Suit.Hearts, Rank.King], [Suit.Diamonds, Rank.King], [Suit.Hearts, Rank.Ten], [Suit.Clubs, Rank.Seven]
    ]))
  })

  it('returns full house', () => {
    const playerCards = buildCards([[Suit.Spades, Rank.King], [Suit.Hearts, Rank.King]])
    const communityCards = buildCards([
      [Suit.Spades, Rank.Ten], [Suit.Clubs, Rank.Ten], [Suit.Diamonds, Rank.King], [Suit.Clubs, Rank.Five], [Suit.Spades, Rank.Six]
    ])

    const { type, hand } = new BestHand(playerCards, communityCards).determine()
    expect(type).to.equal(BestHand.FULL_HOUSE)
    expect(json(hand)).to.equal(jsonCards([
      [Suit.Spades, Rank.King], [Suit.Hearts, Rank.King], [Suit.Diamonds, Rank.King], [Suit.Spades, Rank.Ten], [Suit.Clubs, Rank.Ten]
    ]))
  })

  it('returns four of a kind', () => {
    const playerCards = buildCards([[Suit.Spades, Rank.King], [Suit.Hearts, Rank.King]])
    const communityCards = buildCards([
      [Suit.Clubs, Rank.Ace], [Suit.Clubs, Rank.King], [Suit.Diamonds, Rank.King], [Suit.Clubs, Rank.Five], [Suit.Spades, Rank.Six]
    ])

    const { type, hand } = new BestHand(playerCards, communityCards).determine()
    expect(type).to.equal(BestHand.FOUR_OF_A_KIND)
    expect(json(hand)).to.equal(jsonCards([
      [Suit.Spades, Rank.King], [Suit.Hearts, Rank.King], [Suit.Clubs, Rank.King], [Suit.Diamonds, Rank.King], [Suit.Clubs, Rank.Ace]
    ]))
  })

  it('returns flush', () => {
    const playerCards = buildCards([[Suit.Hearts, Rank.Queen], [Suit.Hearts, Rank.King]])
    const communityCards = buildCards([
      [Suit.Hearts, Rank.Two], [Suit.Clubs, Rank.King], [Suit.Diamonds, Rank.King], [Suit.Hearts, Rank.Five], [Suit.Hearts, Rank.Six]
    ])

    const { type, hand } = new BestHand(playerCards, communityCards).determine()
    expect(type).to.equal(BestHand.FLUSH)
    expect(json(hand)).to.equal(jsonCards([
      [Suit.Hearts, Rank.King], [Suit.Hearts, Rank.Queen], [Suit.Hearts, Rank.Six], [Suit.Hearts, Rank.Five], [Suit.Hearts, Rank.Two]
    ]))
  })

  it('returns (highest) straight', () => {
    const playerCards = buildCards([[Suit.Hearts, Rank.Queen], [Suit.Hearts, Rank.King]])
    const communityCards = buildCards([
      [Suit.Clubs, Rank.Two], [Suit.Clubs, Rank.Ten], [Suit.Diamonds, Rank.Jack], [Suit.Hearts, Rank.Nine], [Suit.Spades, Rank.Eight]
    ])

    const { type, hand } = new BestHand(playerCards, communityCards).determine()
    expect(type).to.equal(BestHand.STRAIGHT)
    expect(json(hand)).to.equal(jsonCards([
      [Suit.Hearts, Rank.King], [Suit.Hearts, Rank.Queen], [Suit.Diamonds, Rank.Jack], [Suit.Clubs, Rank.Ten], [Suit.Hearts, Rank.Nine]
    ]))
  })

  it('returns (highest) straight flush', () => {
    const playerCards = buildCards([[Suit.Hearts, Rank.Queen], [Suit.Hearts, Rank.King]])
    const communityCards = buildCards([
      [Suit.Clubs, Rank.Queen], [Suit.Hearts, Rank.Ten], [Suit.Hearts, Rank.Jack], [Suit.Hearts, Rank.Nine], [Suit.Hearts, Rank.Eight]
    ])

    const { type, hand } = new BestHand(playerCards, communityCards).determine()
    expect(type).to.equal(BestHand.STRAIGHT_FLUSH)
    expect(json(hand)).to.equal(jsonCards([
      [Suit.Hearts, Rank.King], [Suit.Hearts, Rank.Queen], [Suit.Hearts, Rank.Jack], [Suit.Hearts, Rank.Ten], [Suit.Hearts, Rank.Nine]
    ]))
  })

  it('returns royal flush', () => {
    const playerCards = buildCards([[Suit.Diamonds, Rank.Queen], [Suit.Diamonds, Rank.King]])
    const communityCards = buildCards([
      [Suit.Clubs, Rank.Ace], [Suit.Diamonds, Rank.Ten], [Suit.Diamonds, Rank.Jack], [Suit.Diamonds, Rank.Ace], [Suit.Clubs, Rank.Jack]
    ])

    const { type, hand } = new BestHand(playerCards, communityCards).determine()
    expect(type).to.equal(BestHand.ROYAL_FLUSH)
    expect(json(hand)).to.equal(jsonCards([
      [Suit.Diamonds, Rank.Ace], [Suit.Diamonds, Rank.King], [Suit.Diamonds, Rank.Queen], [Suit.Diamonds, Rank.Jack], [Suit.Diamonds, Rank.Ten]
    ]))
  })
})
