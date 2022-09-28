import { expect } from 'chai'
import { Card, Player, Winners } from '../index.js'

describe.only('Winners', () => {
  const buildCards = (cardTuples) => {
    return cardTuples.map(([suit, rank]) => new Card({ suit, rank }))
  }

  const buildPlayerAndPlayerCards = (handCardTuples, id = 'al-capone') => {
    const player = new Player({ id, name: 'Al Capone', cash: 95 })
    const cards = handCardTuples.map(([suit, rank]) => new Card({ suit, rank }))
    return [player, cards]
  }

  it('returns a list of players with their winning hands', () => {
      const [player1, cards1] = buildPlayerAndPlayerCards([['spades', '2'], ['diamonds', '10']])
      const communityCards = buildCards([
        ['diamonds', 'ace'], ['clubs', 'ace'], ['spades', 'king'], ['hearts', 'king'], ['clubs', 'king']
      ])
      const winners = new Winners([player1], [cards1], communityCards).determine()
      expect(winners).to.deep.equal([{
        winner: player1,
        winningHand: communityCards
      }])
  })

  it.only('returns a winner with his winning hand', () => {
    const [player1, cards1] = buildPlayerAndPlayerCards([['spades', '2'], ['diamonds', '5']])
    const [player2, cards2] = buildPlayerAndPlayerCards([['spades', 'ace'], ['diamonds', '4']], 'pat-garret')
    const communityCards = buildCards([
      ['diamonds', '3'], ['clubs', '6'], ['spades', '7'], ['hearts', 'queen'], ['diamonds', '10']
    ])
    const winners = new Winners([player1, player2], [cards1, cards2], communityCards).determine()

    expect(winners.winner.id).to.be.equal('pat-garret')
    expect(winners.winningHand).to.include.deep.members(buildCards([
      ['spades', 'ace'], ['hearts', 'queen'], ['diamonds', '10'], ['spades', '7'], ['clubs', '6']
    ]))
  })
})
