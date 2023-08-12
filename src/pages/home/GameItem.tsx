import { Link } from "react-router-dom"
import { Match } from "../../types"
import { toTitleCase } from "../../utils/formatter"
import calculatePlayerWins from "../../utils/calculatePlayerWins"

type GameItemProps = {
  name: string
  matches: Match[]
}

function GameItem({ name, matches }: GameItemProps) {
  const players = calculatePlayerWins(matches, 3)

  return (
    <div className="rounded-2xl bg-blue-700 p-4">
      <Link to={`/games/${name}`} className="mb-2 text-2xl font-semibold">
        {toTitleCase(name, "-")}
      </Link>

      <ol>
        {players.map((player, index) => {
          return (
            <li key={player._id} className="flex">
              <span className="mr-1">{index + 1}.</span>
              <span>{player.username}</span>
              <span className="ml-auto">{player.wins}</span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default GameItem
