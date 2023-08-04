import { assert, expect } from 'chai' // CHOICE: use assert or expect
import { TableService, Player } from '../src/index'

// TODO: implement proper unit tests
describe('TableService', function () {
  let tableService: TableService

  this.beforeEach(function () {
    tableService = new TableService(/* options */)
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
})
