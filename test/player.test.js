import { expect } from 'chai'
import { Card, Player } from '../index.js'

describe('Player', () =>  {
  describe('constructor()', () => {
    it('should create an instance', () => {
      const player = new Player({ id: 'al-capone', name: 'Al-Capone', cash: 100})
      expect(player).to.be.an.instanceof(Player)
    })
  })

  describe('instance', () => {
    it('should have the properties', () => {
      const player = new Player({ id: 'al-capone', name: 'Al-Capone', cash: 100})
      expect(player.id).to.be.equal('al-capone')
      expect(player.name).to.be.equal('Al-Capone')
      expect(player.cash).to.be.equal(100)
    })
  })

  describe('player cards', () =>  {
    it('should have no cards first', () => {
      const player = new Player({ id: 'al-capone', name: 'Al-Capone', cash: 100})
      expect(player.cards).to.deep.equal([])
    })

    it('should add cards', () => {
      const player = new Player({ id: 'al-capone', name: 'Al-Capone', cash: 100})
      player.addCard(new Card({ suit: Card.SUITS[0], rank: Card.RANKS[0]}))
      player.addCard(new Card({ suit: Card.SUITS[1], rank: Card.RANKS[1]}))
      expect(player.cards.length).to.be.equal(2)
      expect(player.cards.every((card) => card instanceof Card)).to.be.equal(true)
    })
  })
})
