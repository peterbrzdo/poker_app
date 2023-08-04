import { expect } from 'chai'
import { Player } from '../src/index'
import { PlayerState } from '../src/lib/types'

describe('Player', () => {
  describe('constructor()', () => {
    it('should create an instance', () => {
      const player = new Player('al-capone', 'Al-Capone', 100)
      expect(player).to.be.an.instanceof(Player)
    })
  })

  describe('instance', () => {
    it('should have the properties', () => {
      const player = new Player('al-capone', 'Al-Capone', 100)
      expect(player.id).to.be.equal('al-capone')
      expect(player.name).to.be.equal('Al-Capone')
      expect(player.cash).to.be.equal(100)
      expect(player.state).to.be.equal(PlayerState.Inactive)
      expect(player.cards).to.deep.equal([])
    })
  })
})
