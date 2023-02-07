import type { Card as ICard } from '../src/lib/types.js'
import { expect } from 'chai'
import { Card } from '../src/index.js'

describe('Card', function () {
  let card: ICard

  beforeEach(function () {
    const suit = Card.SUITS[1]
    const rank = Card.RANKS[1]
    card = new Card(suit, rank)
  })

  describe('constructor()', function () {
    it('should create an instance', function () {
      expect(card).to.be.an.instanceof(Card)
    })
  })

  describe('suit', function () {
    it('should have the correct suit', function () {
      const { suit } = card
      expect(suit).to.be.equal(Card.SUITS[1])
    })
  })

  describe('rank', function () {
    it('should have the correct rank', function () {
      const { rank } = card
      expect(rank).to.be.equal(Card.RANKS[1])
    })
  })

  describe('compareTo()', function () {
    it('should be less compared to another card', function () {
      const other = new Card(Card.SUITS[2], Card.RANKS[2])
      const compared = card.compareTo(other)
      expect(compared).to.be.lessThan(0)
    })

    it('should be equal compared to another card', function () {
      const other = new Card(Card.SUITS[1], Card.RANKS[1])
      const compared = card.compareTo(other)
      expect(compared).to.be.equal(0)
    })

    it('should be greater compared to another card', function () {
      const other = new Card(Card.SUITS[0], Card.RANKS[0])
      const compared = card.compareTo(other)
      expect(compared).to.be.greaterThan(0)
    })
  })
})
