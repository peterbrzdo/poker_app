import { expect } from 'chai' // CHOICE: use assert or expect
import { TableService, Player, Standard52CardsDeck } from '../src/index'
import { State } from '../src/lib/types'

// TODO: implement proper unit tests
describe('TableService', function () {
  let tableService: TableService

  this.beforeEach(function () {
    tableService = new TableService(new Standard52CardsDeck())
    tableService.addPlayer({1,'Player1'});
    tableService.start();
  })

  describe('players', function () {
    it('should return a static list of players', function () {
      const expectedPlayers = [
        new Player('al-capone', 'Al Capone', 95),
        new Player('pat-garret', 'Pat Garret', 95),
        new Player('wyatt-earp', 'Wyatt Earp', 95)
      ]
      const actualPlayers = tableService.players
      for (let i = 0; i < actualPlayers.length; i++) {
        const { id: actualId, name: actualName, cash: actualCash } = actualPlayers[i]
        const { id: expectedId, name: expectedName, cash: expectedCash } = expectedPlayers[i]
        expect(actualId).to.eql(expectedId)
        expect(actualName).to.eql(expectedName)
        expect(actualCash).to.eql(expectedCash)
      }
    })
  })
  describe('state', function() {
    it('should return a state of the game', function () { 
      const expectedState = State.OPEN;
      const actualState = tableService.state;
      expect(actualState).to.eql(expectedState);
    })
  })
  describe('start', function () {
    it('Can only be called if at least two players have joined the table', function () {
      expect(tableService.players.length >= 2);
    })
    it('should switch state to PRE_FLOP', function () {
      const expectedState = State.PRE_FLOP;
      const actualState = tableService.state;
      expect(actualState).to.eql(expectedState);
    })
    it('should deal 2 cards to every player', function () {
      expect(tableService.players.every( player => {
        player.cards.length == 2
      }));
    })
  })
})
