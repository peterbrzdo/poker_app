export default class Winners {
  #players = []
  #communityCards = []

  constructor(players, communityCards) {
    this.#players = players
    this.#communityCards = communityCards
  }

  determine() {
    return [{
      winner: this.#players[0],
      winningHand: this.#communityCards
    }]
  }
}