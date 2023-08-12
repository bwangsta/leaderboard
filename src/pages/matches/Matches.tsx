import { useRef } from "react"
import { useLoaderData } from "react-router-dom"
import { Match, Player } from "../../types"
import { formatDate, formatPlayers } from "../../utils/formatter"
import Table from "../../components/Table"
import AddMatch from "./AddMatch"
import Modal from "../../components/Modal"
import { getMatches, getPlayers } from "../../services/api"

export async function loader() {
  const data = await Promise.all([getMatches(), getPlayers()])
  return data
}

function Matches() {
  const [matches, players] = useLoaderData() as [Match[], Player[]]
  const modalRef = useRef<HTMLDialogElement>(null)
  const headers = ["#", "Date", "Game", "Players", "Winners"]

  return (
    <>
      <button
        type="button"
        className="mt-4 rounded-md bg-blue-400 px-4 py-2 text-lg"
        onClick={() => modalRef.current?.showModal()}
      >
        Add Match
      </button>
      <Modal modalRef={modalRef}>
        <AddMatch players={players} modalRef={modalRef} />
      </Modal>
      <Table title="All Matches" headers={headers}>
        {matches.map((match, index) => {
          return (
            <tr key={match._id} className="odd:bg-slate-700 even:bg-slate-900">
              <td>{index + 1}</td>
              <td>{formatDate(match.date)}</td>
              <td>{match.game}</td>
              <td>
                <p>{formatPlayers(match.players)}</p>
              </td>
              <td>
                {match.winners.map((winner) => {
                  return <p key={winner._id}>{winner.username}</p>
                })}
              </td>
            </tr>
          )
        })}
      </Table>
    </>
  )
}

export default Matches
