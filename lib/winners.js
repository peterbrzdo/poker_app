import BestHand from './best-hand.js'

export default class Winners {
  #players = []
  #communityCards = []

  constructor(players, communityCards) {
    this.#players = players
    this.#communityCards = communityCards
  }

  determine() {
    const bestHands = this.#bestHandsForPlayers()
    const [bestHand1, bestHand2] = bestHands
    // TODO: Check which hand is better
    return [{
      winner: this.#players[0],
      winningHand: this.#communityCards
    }]
  }

  #bestHandsForPlayers() {
    return this.#players
      .map((player) => new BestHand(player.cards, this.#communityCards).determine())
  }
}
