import { Game } from "../../types"

type GameItemProps = {
  name: string
  games: Game[]
}

function GameItem({ name, games }: GameItemProps) {
  const playerStats: { [key: string]: number } = {}
  for (let game of games) {
    for (let { player } of game.players)
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
