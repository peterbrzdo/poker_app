import type { BestHandType } from './types.js'
import { BestHand, Handscore } from '../index.js'
import { Card, Player } from './types.js'

type SortedPlayersWithScores = {
  player: Player,
  bestHand: BestHandType,
  score: number
}[]

export default class Winners {
  private players: Player[] = []
  private playerCards: Card[][] = []
  private communityCards: Card[] = []

  constructor(players: Player[], playerCards: Card[][], communityCards: Card[]) {
    this.players = players
    this.playerCards = playerCards
    this.communityCards = communityCards
  }

  determine() {
    const sortedPlayersWithScores = this.sortedPlayersWithScores()

    return this.winnersWithSameScores(sortedPlayersWithScores)
  }

  private sortedPlayersWithScores() {
    return this.playerCards
      .map((playerCards, idx) => {
        return {
          player: this.players[idx],
          bestHand: new BestHand(playerCards, this.communityCards).determine()
        }
      })
      .map(({ player, bestHand }) => {
        const score = new Handscore().calculate(bestHand)
        return {
          player,
          bestHand,
          score
        }
      })
      .sort(({ score: score1 }, { score: score2 }) => {
        return score2 - score1
      })
  }

  private winnersWithSameScores(sortedPlayersWithScores: SortedPlayersWithScores) {
    const highestScore = sortedPlayersWithScores[0].score
    return sortedPlayersWithScores
      .filter((winner) => winner.score === highestScore)
      .map(({ player, bestHand }) => {
        return {
          winner: player,
          winningHand: bestHand.hand
        }
      })
  }
}