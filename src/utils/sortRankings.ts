import { Player } from "../types"

function sortRankings(players: Player[]) {
  players.sort((a, b) => {
    if (b.wins - a.wins === 0) {
      return a.played - b.played
    }
    return b.wins - a.wins
  })
}

export default sortRankings
