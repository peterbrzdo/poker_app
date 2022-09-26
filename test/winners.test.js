import { expect } from 'chai'
import { Card, Player, Winners } from '../index.js'



describe.only('Winners', () => {
  const buildCards = (cardTuples) => {
    return cardTuples.map(([suit, rank]) => new Card({ suit, rank }))
  }

  const buildPlayerWithHand = (handCardTuples, id = 'al-capone') => {
    const player = new Player({ id, name: 'Al Capone', cash: 95 })
    handCardTuples.forEach(([suit, rank]) => {
      player.addCard(new Card({ suit, rank }))
    })
    return player
  }

  it('returns a list of players with their winning hands', () => {
      const player1 = buildPlayerWithHand([['spades', '2'], ['diamonds', '10']])
      const communityCards = buildCards([
        ['diamonds', 'ace'], ['clubs', 'ace'], ['spades', 'king'], ['hearts', 'king'], ['clubs', 'king']
      ])
      const winners = new Winners([player1], communityCards).determine()
      expect(winners).to.deep.equal([{
        winner: player1,
        winningHand: communityCards
      }])
  })

  it.only('returns a winner with his winning hand', () => {
    const player1 = buildPlayerWithHand([['spades', '2'], ['diamonds', '5']])
    const player2 = buildPlayerWithHand([['spades', 'ace'], ['diamonds', '4']], 'player2')
    const communityCards = buildCards([
      ['diamonds', '3'], ['clubs', '6'], ['spades', '7'], ['hearts', 'queen'], ['diamonds', '10']
    ])
    const winners = new Winners([player1, player2], communityCards).determine()

    console.log(winners)
    expect(winners[0].winner.id).to.be.equal('player2')
    expect(winners[0].winningHand).to.include.deep.members([
      ['spades', 'ace'], ['hearts', 'queen'], ['diamonds', '10'], ['spades', '7'], ['clubs', '6']
    ])
  })
})
