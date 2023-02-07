import { expect } from 'chai'
import { TableService } from '../src/index.js'
import { Action } from '../src/lib/action.js'
import { IllegalActionError } from '../src/lib/errors.js'

describe('TableService smoketest', () => {
  it('should set newly joined players to inactive and distribute 100 cash', () => {
    const tableService = new TableService()
    tableService.addPlayer({ id: 'al-capone', name: 'Al Capone' })
    const players = tableService.players

    expect(players[0].cash).to.eql(100)
    expect(players[0].state).to.eql('inactive')
  })

  it('should have the right interface', () => {
    const tableService = new TableService()
    expect(tableService.state).to.equal(0)
    expect(tableService.players).to.eql([])
    expect(tableService.getPlayerCards('')).to.eql([])
    expect(tableService.communityCards).to.eql([])
    expect(tableService.currentPlayer).to.eql(null)
    expect(tableService.pot).to.equal(0)
    expect(tableService.winner).to.eql(null)
    expect(tableService.winnerHand).to.eql([])
  })

  it('should end the game if all but 1 player fold', () => {
    const tableService = new TableService()
    tableService.addPlayer({ id: 'al-capone', name: 'Al Capone' })
    tableService.addPlayer({ id: 'pat-garret', name: 'Pat Garret' })
    tableService.start()
    tableService.performAction(Action.FOLD)
    expect(tableService.state).to.equal(5)
    expect(tableService.winner.id).to.equal('pat-garret')
    expect(tableService.winnerHand).to.eql([])
  })

  it('should play an entire round with 2 players', () => {
    // Setup
    const tableService = new TableService()
    tableService.addPlayer({ id: 'al-capone', name: 'Al Capone' })
    expect(tableService.getPlayerCards('al-capone').length).to.equal(0)
    expect(tableService.state).to.equal(0)
    expect(tableService.communityCards.length).to.equal(0)

    tableService.addPlayer({ id: 'pat-garret', name: 'Pat Garret' })
    tableService.start()
    expect(tableService.currentPlayer.id).to.equal('al-capone')
    expect(tableService.state).to.equal(1)
    expect(tableService.pot).to.equal(0)
    expect(tableService.bets).to.eql({})
    expect(tableService.winner).to.eql(null)
    expect(tableService.winnerHand).to.eql([])

    // First betting round
    tableService.performAction(Action.CHECK)
    expect(tableService.currentPlayer.id).to.equal('pat-garret')

    tableService.performAction(Action.CHECK)
    expect(tableService.currentPlayer.id).to.equal('al-capone')
    expect(tableService.getPlayerCards('al-capone').length).to.equal(2)
    expect(tableService.getPlayerCards('pat-garret').length).to.equal(2)
    expect(tableService.communityCards.length).to.equal(3)
    expect(tableService.state).to.equal(2)
    expect(tableService.pot).to.equal(0)
    expect(tableService.bets).to.eql({})
    expect(tableService.winner).to.eql(null)
    expect(tableService.winnerHand).to.eql([])

    // Second betting round
    tableService.performAction(Action.RAISE, 10)
    tableService.performAction(Action.RAISE, 20)
    expect(tableService.bets).to.eql({
      'al-capone': 10,
      'pat-garret': 20
    })
    expect(tableService.currentPlayer.id).to.equal('al-capone')
    expect(() => tableService.performAction(Action.CHECK)).to.throw(IllegalActionError)
    tableService.performAction(Action.CALL)
    expect(tableService.communityCards.length).to.equal(4)
    expect(tableService.state).to.equal(3)
    expect(tableService.pot).to.equal(40)
    expect(tableService.bets).to.eql({})
    expect(tableService.winner).to.eql(null)
    expect(tableService.winnerHand).to.eql([])

    // Third betting round
    tableService.performAction(Action.RAISE, 10)
    tableService.performAction(Action.CALL)
    expect(tableService.communityCards.length).to.equal(5)
    expect(tableService.state).to.equal(4)
    expect(tableService.pot).to.equal(60)
    expect(tableService.bets).to.eql({})
    expect(tableService.winner).to.eql(null)
    expect(tableService.winnerHand).to.eql([])

    // Final round
    tableService.performAction(Action.CHECK)
    tableService.performAction(Action.CHECK)
    expect(tableService.communityCards.length).to.equal(5)
    expect(tableService.state).to.equal(5)
    expect(tableService.pot).to.equal(0)
    expect(tableService.winner).not.to.be.null
    expect(tableService.winnerHand.length).to.be.greaterThan(0)
  })
})
