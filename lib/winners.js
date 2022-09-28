import { BestHand, Handscore } from '../index.js'

export default class Winners {
  #players = []
  #playerCards = []
  #communityCards = []

  constructor(players, playerCards, communityCards) {
    this.#players = players
    this.#playerCards = playerCards
    this.#communityCards = communityCards
  }

  determine() {
    const bestHands = this.#bestHandsForPlayers()
    const winners =  bestHands.map(({ player, bestHand }) => {
      const score = new Handscore().calculate(bestHand)
      return {
        player,
        bestHand,
        score
      }
    }).sort(({ score: score1 }, { score: score2 }) => {
      return score2 - score1
    }).map(({ player, bestHand }) => {
      return {
        winner: player,
        winningHand: bestHand.hand
      }
    })[0]
    // console.log(winners)
    return winners
    // console.log(bestHand1, bestHand2)
    // TODO: Check which hand is better
    // return [{
    //   winner: this.#players[0],
    //   winningHand: this.#communityCards
    // }]
  }
// [[card1, card2], [card1, card2]]
  #bestHandsForPlayers() {
    return this.#playerCards
      .map((playerCards, idx) => {
        return {
          player: this.#players[idx],
          bestHand: new BestHand(playerCards, this.#communityCards).determine()
        }
      })
  }
}
