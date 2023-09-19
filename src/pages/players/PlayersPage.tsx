import { Link } from "react-router-dom"
import { getPlayers } from "../../services/api"
import { useQuery } from "@tanstack/react-query"
import Loader from "../../components/Loader"
import ErrorMessage from "../../components/ErrorMessage"
import Header from "../../components/Header"

function PlayersPage() {
  const {
    data: players,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["players"],
    queryFn: getPlayers,
  })

  if (isLoading) {
    return <Loader />
  }

  if (error instanceof Error) {
    return <ErrorMessage name={error.name} message={error.message} />
  }

  return (
    <>
      <Header>All Players</Header>
      <div className="grid grid-cols-fluid gap-2">
        {players?.map((player) => {
          return (
            <div
              key={player._id}
              className="flex justify-center rounded-lg bg-blue-500 p-4"
            >
              <Link to={`/players/${player._id}`}>{player.username}</Link>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default PlayersPage
