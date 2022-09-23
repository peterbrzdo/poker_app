import { expect } from 'chai'
import { Card, Player, Winners } from '../index.js'


describe('Winners', () => {
    it('returns a list of players with their winning hands', () => {
        const player1 = new Player({ id: 'al-capone', name: 'Al Capone', cash: 95 })
        const communityCards = [
          new Card({ suit: 'diamonds', rank: 'ace' }),
          new Card({ suit: 'clubs', rank: 'ace' }),
          new Card({ suit: 'spades', rank: 'king' }),
          new Card({ suit: 'hearts', rank: 'king' }),
          new Card({ suit: 'clubs', rank: 'king' })
        ]
        const winners = new Winners([player1], communityCards).determine()
        expect(winners).to.deep.equal([{
          winner: player1,
          winningHand: communityCards
        }])
    })
})