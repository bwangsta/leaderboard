import { Match } from "../../types"

type GameItemProps = {
  name: string
  matches: Match[]
}

function GameItem({ name, matches }: GameItemProps) {
  const playerStats: { [key: string]: number } = {}
  for (let match of matches) {
    for (let { player } of match.players)
      if (player.username in playerStats) {
        playerStats[player.username] += 1
      } else {
        playerStats[player.username] = 0
      }
  }
  let pairs = Object.entries(playerStats)
  pairs.sort((a, b) => b[1] - a[1])
  pairs = pairs.slice(0, 3)

  return (
    <div className="rounded-2xl bg-blue-700 p-4">
      <h2 className="mb-2 text-2xl font-semibold">{name}</h2>
      <ol>
        {pairs.map(([username, wins], index) => {
          return (
            <li key={username} className="flex">
              <span className="mr-1">{index + 1}.</span>
              <span>{username}</span>
              <span className="ml-auto">{wins}</span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default GameItem
