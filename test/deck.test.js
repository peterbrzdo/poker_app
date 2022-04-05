import { expect } from 'chai'
import { Deck, Card } from '../index.js'

describe.only('deck', function () {
  let deck = null

  beforeEach(function () {
    deck = new Deck()
  })

  describe('constructor', function () {
    it('should create an instance', function () {
      expect(deck).to.be.an.instanceof(Deck)
    })
  })

  describe('cards', function () {
    it('should have the correct cards initially', function () {
      const expectedCards = []
      for (const suit of Card.SUITS) {
        for (const rank of Card.RANKS) {
          expectedCards.push(new Card({ suit, rank }))
        }
      }
      const { cards } = deck
      for (let i = 0; i < cards.length; i++) {
        const { suit: expectedSuit, rank: expectedRank } = expectedCards[i]
        const { suit, rank } = cards[i]
        expect(suit).to.equal(expectedSuit)
        expect(rank).to.equal(expectedRank)
      }
    })
  })

  describe('shuffle', function () {
    it('should shuffle cards', function () {
      const unexpectedCards = []
      for (const suit of Card.SUITS) {
        for (const rank of Card.RANKS) {
          unexpectedCards.push(new Card({ suit, rank }))
        }
      }
      deck.shuffle()
      let allEqual = true
      const { cards } = deck
      for (let i = 0; i < cards.length; i++) {
        const { suit: unexpectedSuit, rank: unexpectedRank } = unexpectedCards[i]
        const { suit, rank } = cards[i]
        allEqual = allEqual && (unexpectedSuit === suit) && (unexpectedRank === rank)
      }
      expect(allEqual).to.be.false
    })
  })

  describe('draw', function () {
    it('should draw the correct count', function () {
      const cardsBeforeDraw = [...deck.cards]
      const count = 7
      const drawnCards = deck.draw(count)
      expect(drawnCards).to.have.length(7)
      const cardsAfterDraw = [...deck.cards]
      expect(cardsAfterDraw).to.have.length(cardsBeforeDraw.length - count)
    })

    it('should throw an error when drawing invalid count', function () {
      expect(() => deck.draw(deck.cards.length + 1)).to.throw(Error, 'Not enough remaining cards')
    })
  })
})
