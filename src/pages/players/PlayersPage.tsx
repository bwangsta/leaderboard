import Modal from "../../components/Modal"
import AddPlayer from "./AddPlayer"
import { Link } from "react-router-dom"
import { getPlayers } from "../../services/api"
import { useQuery } from "@tanstack/react-query"
import Loader from "../../components/Loader"
import ErrorMessage from "../../components/ErrorMessage"

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
      <Modal
        title="Add Player"
        renderForm={(closeModal) => <AddPlayer closeModal={closeModal} />}
      />
      <h1 className="my-4 text-left text-3xl font-bold">All Players</h1>
      {players?.map((player) => {
        return (
          <div key={player._id}>
            <Link to={`/players/${player._id}`}>{player.username}</Link>
          </div>
        )
      })}
    </>
  )
}

export default PlayersPage
