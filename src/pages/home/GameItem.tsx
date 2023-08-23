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
    <div className="flex flex-col rounded-2xl bg-blue-700 p-4">
      <Link
        to={`/games/${name}`}
        className="mb-2 flex-1 text-2xl font-semibold"
      >
        {toTitleCase(name, "-")}
      </Link>

      <ol>
        {players.map((player, index) => {
          return (
            <li key={player._id} className="flex gap-1">
              <span>{index + 1}.</span>
              <Link
                to={`/players/${player._id}`}
                className="overflow-hidden text-ellipsis"
              >
                {player.username}
              </Link>
              <span className="ml-auto">{player.wins}</span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default GameItem
