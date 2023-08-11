import { useRef } from "react"
import { useLoaderData } from "react-router-dom"
import { Game, Player } from "../../types"
import { formatDate, formatPlayers } from "../../utils/formatter"
import Table from "../../components/Table"
import AddGame from "./AddGame"
import Modal from "../../components/Modal"

export async function loader() {
  async function getGames() {
    try {
      const response = await fetch("http://localhost:8080/games")
      const data = await response.json()
      return data
    } catch (err) {
      console.log(err)
    }
  }

  async function getPlayers() {
    try {
      const response = await fetch("http://localhost:8080/players")
      const data = await response.json()
      return data
    } catch (err) {
      console.log(err)
    }
  }
  const data = await Promise.all([getGames(), getPlayers()])
  return data
}

function Games() {
  const [games, players] = useLoaderData() as [Game[], Player[]]
  const modalRef = useRef<HTMLDialogElement>(null)
  const headers = ["#", "Date", "Game", "Players", "Winners"]

  return (
    <>
      <button
        type="button"
        className="mt-4 rounded-md bg-blue-400 px-4 py-2 text-lg"
        onClick={() => modalRef.current?.showModal()}
      >
        Add Game
      </button>
      <Modal modalRef={modalRef}>
        <AddGame players={players} modalRef={modalRef} />
      </Modal>
      <Table title="All Games" headers={headers}>
        {games.map((game, index) => {
          return (
            <tr key={game._id} className="odd:bg-slate-700 even:bg-slate-900">
              <td>{index + 1}</td>
              <td>{formatDate(game.date)}</td>
              <td>{game.name}</td>
              <td>
                <p>{formatPlayers(game.players)}</p>
              </td>
              <td>
                {game.winners.map((winner) => {
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

export default Games
