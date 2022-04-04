import Game from './game.js'
import Player from './player.js'
import Card from './card.js'

export default class Table {
  constructor({ deck }) {
    // TODO: implement
  }

  game() {
    // TODO: implement
    return Game.COMPLETED
  }

  players() {
    // TODO: implement
    return [
      new Player({ id: 'al-capone', name: 'Al Capone', cash: 95 }),
      new Player({ id: 'pat-garret', name: 'Pat Garret', cash: 95 }),
      new Player({ id: 'wyatt-earp', name: 'Wyatt Earp', cash: 95 })
    ]
  }

  playerCards(playerId) {
    // TODO: implement
    return [
      new Card({ suit: 'spades', rank: 'ace' }),
      new Card({ suit: 'hearts', rank: 'ace' })
    ]
  }

  communityCards() {
    // TODO: implement
    return [
      new Card({ suit: 'diamonds', rank: 'ace' }),
      new Card({ suit: 'clubs', rank: 'ace' }),
      new Card({ suit: 'spades', rank: 'king' }),
      new Card({ suit: 'hearts', rank: 'king' }),
      new Card({ suit: 'clubs', rank: 'king' })
    ]
  }

  currentPlayer() {
    // TODO: implement
    return new Player({ id: 'al-capone', name: 'Al Capone', cash: 95 })
  }

  bets() {
    // TODO: implement
    return {
      'al-capone': 5,
      'pat-garret': 5,
      'wyatt-earp': 5
    }
  }

  pot() {
    // TODO: implement
    return 15
  }

  winner() {
    // TODO: implement
    // no winner yet
    // return null
    // winner
    return new Player({ id: 'al-capone', name: 'Al Capone', cash: 95 })
  }

  winnerHand() {
    // TODO: implement
    // no winner yet
    // return null
    // winner
    return [
      new Card({ suit: 'spades', rank: 'ace' }),
      new Card({ suit: 'hearts', rank: 'ace' }),
      new Card({ suit: 'diamonds', rank: 'ace' }),
      new Card({ suit: 'clubs', rank: 'ace' }),
      new Card({ suit: 'spades', rank: 'king' })
    ]
  }

  addPlayer({ id, name }) {
    // TODO: implement
    console.log('addPlayer', { id, name })
  }

  performAction(playerId, action, ...args) {
    // TODO: implement
    console.log('performAction', { playerId, action, args })
  }
}


