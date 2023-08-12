import { Match, Player } from "../types"
import sortRankings from "./sortRankings"

function calculatePlayerWins(matches: Match[], limit?: number) {
  const players: Player[] = []
  for (let match of matches) {
    for (let { player } of match.players) {
      // Check if player already exists in array. If so, retrieve its index
      const index = players.findIndex((obj) => obj._id === player._id)
      if (index !== -1) {
        // Check if player is a winner
        const isWinner = match.winners.some(
          (winner) => players[index]._id === winner._id
        )
        if (isWinner) {
          players[index] = {
            ...players[index],
            wins: players[index].wins + 1,
            played: players[index].played + 1,
          }
        } else {
          players[index] = {
            ...players[index],
            played: players[index].played + 1,
          }
        }
      } else {
        players.push({
          ...player,
          wins: 0,
          played: 0,
        })
      }
    }
  }

  sortRankings(players)

  if (limit) {
    return players.slice(0, limit)
  }

  return players
}

export default calculatePlayerWins
