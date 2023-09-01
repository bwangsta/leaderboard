import { Link } from "react-router-dom"
import { Rankings } from "../../types"
import { toTitleCase, toKebabCase } from "../../utils/formatter"

type GameItemProps = {
  data: Rankings
}

function GameItem({ data }: GameItemProps) {
  return (
    <div className="flex flex-col rounded-2xl bg-blue-700 p-4">
      <Link
        to={`/games/${toKebabCase(data.game)}`}
        state={data}
        className="mb-2 flex-1 text-2xl font-semibold"
      >
        {toTitleCase(data.game, "-")}
      </Link>

      <ol>
        {data.rankings.slice(0, 3).map(({ _id, username, wins }, index) => {
          return (
            <li key={_id} className="flex gap-1">
              <span>{index + 1}.</span>
              <Link
                to={`/players/${_id}`}
                className="overflow-hidden text-ellipsis"
              >
                {username}
              </Link>
              <span className="ml-auto">{wins}</span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default GameItem
