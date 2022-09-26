import { expect } from 'chai'
import { Card, BestHand } from '../index.js'

describe('BestHand', () => {
  const buildCards = (cardTuples) => {
    return cardTuples.map(([suit, rank]) => new Card({ suit, rank }))
  }

  it('returns highest card if highest card is in community cards', () => {
    const playerCards = buildCards([['spades', '2'], ['hearts', '3']])
    const communityCards = buildCards([
      ['spades', 'ace'], ['hearts', 'king'], ['diamonds', '9'], ['clubs', 'jack'], ['spades', '10']
    ])

    const { type , hand } = new BestHand(playerCards, communityCards).determine()
    expect(type).to.equal(BestHand.HIGHEST_CARD)
    expect(hand).to.deep.equal(communityCards)
  })

  it('returns highest card if highest card is in players hand', () => {
    const playerCards = buildCards([['spades', 'ace'], ['hearts', 'king']])
    const communityCards = buildCards([
      ['spades', '2'], ['hearts', '3'], ['diamonds', '9'], ['clubs', 'jack'], ['spades', '10']
    ])

    const { type , hand } = new BestHand(playerCards, communityCards).determine()
    expect(type).to.equal(BestHand.HIGHEST_CARD)
    expect(hand).to.include.deep.members(playerCards)
  })

  it('returns pair if pair is in players hand', () => {
    const playerCards = buildCards([['spades', 'ace'], ['hearts', 'ace']])
    const communityCards = buildCards([
      ['spades', '2'], ['hearts', '3'], ['diamonds', '10'], ['clubs', '5'], ['spades', '6']
    ])

    const { type , hand } = new BestHand(playerCards, communityCards).determine()
    expect(type).to.equal(BestHand.PAIR)
    expect(hand).to.include.deep.members(playerCards)
  })

  it('returns pair if pair is in players hand', () => {
    const playerCards = buildCards([['spades', '3'], ['hearts', 'king']])
    const communityCards = buildCards([
      ['spades', '2'], ['hearts', '10'], ['diamonds', '10'], ['clubs', '5'], ['spades', '6']
    ])

    const { type , hand } = new BestHand(playerCards, communityCards).determine()
    expect(type).to.equal(BestHand.PAIR)
    expect(hand).to.include.deep.members([
      new Card({ suit: 'hearts', rank: '10' }),
      new Card({ suit: 'diamonds', rank: '10' })
    ])
  })

  it('returns two pairs', () => {
    const playerCards = buildCards([['spades', 'king'], ['hearts', 'king']])
    const communityCards = buildCards([
      ['spades', '2'], ['hearts', '10'], ['diamonds', '10'], ['clubs', '5'], ['spades', '6']
    ])

    const { type , hand } = new BestHand(playerCards, communityCards).determine()
    expect(type).to.equal(BestHand.TWO_PAIRS)
    expect(hand).to.include.deep.members([
      ...buildCards([['hearts', '10']], ['diamonds', '10']),
      ...buildCards([['spades', 'king']], ['hearts', 'king'])
    ])
  })

  it('returns three of a kind', () => {
    const playerCards = buildCards([['spades', 'king'], ['hearts', 'king']])
    const communityCards = buildCards([
      ['spades', '2'], ['hearts', '10'], ['diamonds', 'king'], ['clubs', '5'], ['spades', '6']
    ])

    const { type , hand } = new BestHand(playerCards, communityCards).determine()
    expect(type).to.equal(BestHand.THREE_OF_A_KIND)
    expect(hand).to.include.deep.members([
      ...buildCards([['spades', 'king'], ['hearts', 'king'], ['diamonds', 'king']])
    ])
  })

  it('returns full house', () => {
    const playerCards = buildCards([['spades', 'king'], ['hearts', 'king']])
    const communityCards = buildCards([
      ['spades', '10'], ['clubs', '10'], ['diamonds', 'king'], ['clubs', '5'], ['spades', '6']
    ])

    const { type , hand } = new BestHand(playerCards, communityCards).determine()
    expect(type).to.equal(BestHand.FULL_HOUSE)
    expect(hand).to.include.deep.members([
      ...buildCards([
        ['spades', 'king'], ['hearts', 'king'], ['diamonds', 'king'], ['spades', '10'], ['clubs', '10']
      ])
    ])
  })

  it('returns four of a kind', () => {
    const playerCards = buildCards([['spades', 'king'], ['hearts', 'king']])
    const communityCards = buildCards([
      ['spades', '2'], ['clubs', 'king'], ['diamonds', 'king'], ['clubs', '5'], ['spades', '6']
    ])

    const { type , hand } = new BestHand(playerCards, communityCards).determine()
    expect(type).to.equal(BestHand.FOUR_OF_A_KIND)
    expect(hand).to.include.deep.members([
      ...buildCards([
        ['spades', 'king'], ['hearts', 'king'], ['diamonds', 'king'], ['clubs', 'king']
      ])
    ])
  })

  it('returns flush', () => {
    const playerCards = buildCards([['hearts', 'queen'], ['hearts', 'king']])
    const communityCards = buildCards([
      ['hearts', '2'], ['clubs', 'king'], ['diamonds', 'king'], ['hearts', '5'], ['hearts', '6']
    ])

    const { type , hand } = new BestHand(playerCards, communityCards).determine()
    expect(type).to.equal(BestHand.FLUSH)
    expect(hand).to.include.deep.members([
      ...buildCards([
        ['hearts', 'queen'], ['hearts', 'king'], ['hearts', '5'], ['hearts', '6'], ['hearts', '2']
      ])
    ])
  })

  it('returns (highest) straight', () => {
    const playerCards = buildCards([['hearts', 'queen'], ['hearts', 'king']])
    const communityCards = buildCards([
      ['clubs', '2'], ['clubs', '10'], ['diamonds', 'jack'], ['hearts', '9'], ['spades', '8']
    ])

    const { type , hand } = new BestHand(playerCards, communityCards).determine()
    expect(type).to.equal(BestHand.STRAIGHT)
    expect(hand).to.include.deep.members([
      ...buildCards([
        ['hearts', 'king'], ['hearts', 'queen'], ['diamonds', 'jack'], ['clubs', '10'], ['hearts', '9']
      ])
    ])
  })

  it('returns (highest) straight flush', () => {
    const playerCards = buildCards([['hearts', 'queen'], ['hearts', 'king']])
    const communityCards = buildCards([
      ['clubs', 'queen'], ['hearts', '10'], ['hearts', 'jack'], ['hearts', '9'], ['hearts', '8']
    ])

    const { type , hand } = new BestHand(playerCards, communityCards).determine()
    expect(type).to.equal(BestHand.STRAIGHT_FLUSH)
    expect(hand).to.include.deep.members([
      ...buildCards([
        ['hearts', 'king'], ['hearts', 'queen'], ['hearts', 'jack'], ['hearts', '10'], ['hearts', '9']
      ])
    ])
  })

  it('returns royal flush', () => {
    const playerCards = buildCards([['diamonds', 'queen'], ['diamonds', 'king']])
    const communityCards = buildCards([
      ['clubs', 'ace'], ['diamonds', '10'], ['diamonds', 'jack'], ['diamonds', 'ace'], ['clubs', 'jack']
    ])

    const { type , hand } = new BestHand(playerCards, communityCards).determine()
    expect(type).to.equal(BestHand.ROYAL_FLUSH)
    expect(hand).to.include.deep.members([
      ...buildCards([
        ['hearts', 'ace'], ['diamonds', 'king'], ['diamonds', 'queen'], ['diamonds', 'jack'], ['diamonds', '10']
      ])
    ])
  })
})
