import { useRef } from "react"
import { useLoaderData } from "react-router-dom"
import { Match, Player } from "../../types"
import AddMatch from "./AddMatch"
import Modal from "../../components/Modal"
import { getMatches, getPlayers } from "../../services/api"
import AccordionPanel from "../../components/AccordionPanel"

export async function loader() {
  const data = await Promise.all([getMatches(), getPlayers()])
  return data
}

function MatchesPage() {
  const [matches, players] = useLoaderData() as [Match[], Player[]]
  const modalRef = useRef<HTMLDialogElement>(null)

  return (
    <>
      <Modal modalRef={modalRef}>
        <AddMatch players={players} modalRef={modalRef} />
      </Modal>

      <div className="flex items-center justify-between">
        <h1 className="my-4 text-3xl font-bold">All Matches</h1>
        <button
          type="button"
          className="rounded-md bg-blue-400 px-4 py-2 text-lg"
          onClick={() => modalRef.current?.showModal()}
        >
          Add Match
        </button>
      </div>
      {matches.map((match) => {
        return <AccordionPanel key={match._id} match={match} />
      })}
    </>
  )
}

export default MatchesPage
