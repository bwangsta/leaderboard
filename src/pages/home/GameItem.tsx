import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { toTitleCase, toKebabCase } from "../../utils/formatter"
import { getGameRankings } from "../../services/api"
import Loader from "../../components/Loader"

type GameItemProps = {
  name: string
}

function GameItem({ name }: GameItemProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["rankings", toKebabCase(name)],
    queryFn: () => getGameRankings(name),
  })

  if (isLoading) {
    return <Loader />
  }

  if (error instanceof Error) {
    return <p>Error</p>
  }

  return (
    <div className="flex flex-col rounded-2xl bg-blue-700 p-4">
      <Link
        to={`/games/${toKebabCase(name)}`}
        className="mb-2 flex-1 text-2xl font-semibold"
      >
        {toTitleCase(name, "-")}
      </Link>

      <ol>
        {data?.rankings.slice(0, 3).map(({ _id, username, wins }, index) => {
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
