import { useRef } from "react"
import { useLoaderData } from "react-router-dom"
import Modal from "../../components/Modal"
import AddPlayer from "./AddPlayer"
import { Player } from "../../types"
import { Link } from "react-router-dom"
import { getPlayers } from "../../services/api"

export async function loader() {
  const data = await getPlayers()
  return data
}

function PlayersPage() {
  const players = useLoaderData() as Player[]
  const modalRef = useRef<HTMLDialogElement>(null)

  return (
    <>
      <button
        className="mt-4 rounded-md bg-blue-400 px-4 py-2 text-lg"
        onClick={() => modalRef.current?.showModal()}
      >
        Add Player
      </button>
      <Modal modalRef={modalRef}>
        <AddPlayer modalRef={modalRef} />
      </Modal>
      {players.map((player) => {
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
