import { PlayerInfo } from "../types"

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US").format(new Date(date))
}

export function formatPlayers(players: PlayerInfo[]) {
  const usernames = players.map(({ player }) => {
    return player.username
  })
  usernames.sort()
  return usernames.join(", ")
}
