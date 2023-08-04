import type { ICard } from '../src/lib/types'
import { expect } from 'chai'
import { Card, Player, Winners } from '../src/index'
import { Suit, Rank } from '../src/lib/types'

describe('Winners', () => {
  const buildCards = (cardTuples: [Suit, Rank][]) => {
    return cardTuples.map(([suit, rank]) => new Card(suit, rank))
  }

  const json = (cardTuples: ICard[]) => {
    return JSON.stringify(cardTuples)
  }

  const jsonCards = (cardTuples: [Suit, Rank][]) => {
    return JSON.stringify(buildCards(cardTuples))
  }

  const buildPlayerAndPlayerCards = (handCardTuples: [Suit, Rank][], id = 'al-capone'): [Player, ICard[]] => {
    const player = new Player(id, 'Al Capone', 95)
    const cards = handCardTuples.map(([suit, rank]) => new Card(suit, rank))
    return [player, cards]
  }

  it('returns a list of players with their winning hands', () => {
    const [player1, cards1] = buildPlayerAndPlayerCards([[Suit.Spades, Rank.Two], [Suit.Diamonds, Rank.Ten]])
    const communityCards = buildCards([
      [Suit.Spades, Rank.King], [Suit.Hearts, Rank.King], [Suit.Clubs, Rank.King], [Suit.Diamonds, Rank.Ace], [Suit.Clubs, Rank.Ace]
    ])
    const winners = new Winners([player1], [cards1], communityCards).determine()
    expect(winners).to.deep.equal([{
      winner: player1,
      winningHand: communityCards
    }])
  })

  it('returns a winner with the winning hand', () => {
    const [player1, cards1] = buildPlayerAndPlayerCards([[Suit.Spades, Rank.Two], [Suit.Diamonds, Rank.Five]])
    const [player2, cards2] = buildPlayerAndPlayerCards([[Suit.Spades, Rank.Ace], [Suit.Diamonds, Rank.Four]], 'pat-garret')
    const communityCards = buildCards([
      [Suit.Diamonds, Rank.Three], [Suit.Clubs, Rank.Six], [Suit.Spades, Rank.Seven], [Suit.Hearts, Rank.Queen], [Suit.Diamonds, Rank.Ten]
    ])
    const winners = new Winners([player1, player2], [cards1, cards2], communityCards).determine()

    expect(winners.length).to.equal(1)
    const [{ winner, winningHand }] = winners
    expect(winner.id).to.be.equal('pat-garret')
    expect(winningHand).to.include.deep.members(buildCards([
      [Suit.Spades, Rank.Ace], [Suit.Hearts, Rank.Queen], [Suit.Diamonds, Rank.Ten], [Suit.Spades, Rank.Seven], [Suit.Clubs, Rank.Six]
    ]))
  })

  it('returns all winners if both have the same pair rank', () => {
    const [player1, cards1] = buildPlayerAndPlayerCards([[Suit.Spades, Rank.Jack], [Suit.Diamonds, Rank.Five]])
    const [player2, cards2] = buildPlayerAndPlayerCards([[Suit.Spades, Rank.Ace], [Suit.Diamonds, Rank.Jack]], 'pat-garret')
    const [player3, cards3] = buildPlayerAndPlayerCards([[Suit.Clubs, Rank.King], [Suit.Hearts, Rank.Jack]], 'doc-holiday')
    const communityCards = buildCards([
      [Suit.Diamonds, Rank.Three], [Suit.Clubs, Rank.Six], [Suit.Spades, Rank.Seven], [Suit.Hearts, Rank.Queen], [Suit.Clubs, Rank.Jack]
    ])
    const winners = new Winners([player1, player2, player3], [cards1, cards2, cards3], communityCards).determine()

    expect(winners.length).to.equal(3)
    expect(winners[0].winner.id).to.be.equal('al-capone')
    expect(winners[1].winner.id).to.be.equal('pat-garret')
    expect(winners[2].winner.id).to.be.equal('doc-holiday')
    expect(json(winners[0].winningHand)).to.equal(jsonCards([
      [Suit.Spades, Rank.Jack], [Suit.Clubs, Rank.Jack], [Suit.Hearts, Rank.Queen], [Suit.Spades, Rank.Seven], [Suit.Clubs, Rank.Six]
    ]))
    expect(json(winners[1].winningHand)).to.equal(jsonCards([
      [Suit.Diamonds, Rank.Jack], [Suit.Clubs, Rank.Jack], [Suit.Spades, Rank.Ace], [Suit.Hearts, Rank.Queen], [Suit.Spades, Rank.Seven]
    ]))
    expect(json(winners[2].winningHand)).to.equal(jsonCards([
      [Suit.Hearts, Rank.Jack], [Suit.Clubs, Rank.Jack], [Suit.Clubs, Rank.King], [Suit.Hearts, Rank.Queen], [Suit.Spades, Rank.Seven]
    ]))
  })

  it('returns a winner among 2 players with fullhouse and threeofkind hand', () => {
    const [player1, cards1] = buildPlayerAndPlayerCards([[Suit.Spades, Rank.Jack], [Suit.Diamonds, Rank.Jack]])
    const [player2, cards2] = buildPlayerAndPlayerCards([[Suit.Hearts, Rank.Jack], [Suit.Diamonds, Rank.Four]], 'pat-garret')

    const communityCards = buildCards([
      [Suit.Diamonds, Rank.Three], [Suit.Clubs, Rank.Six], [Suit.Clubs, Rank.Jack], [Suit.Hearts, Rank.Five], [Suit.Diamonds, Rank.Five]
    ])
    const winners = new Winners([player1, player2], [cards1, cards2], communityCards).determine()

    expect(winners.length).to.equal(1)
    const [{ winner, winningHand }] = winners
    expect(winner.id).to.be.equal('al-capone')
    expect(json(winningHand)).to.equal(jsonCards([
      [Suit.Spades, Rank.Jack], [Suit.Diamonds, Rank.Jack], [Suit.Clubs, Rank.Jack], [Suit.Hearts, Rank.Five], [Suit.Diamonds, Rank.Five]
    ]))
  })
})
