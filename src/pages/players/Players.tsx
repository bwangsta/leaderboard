import { useRef } from "react"
import { useLoaderData, redirect } from "react-router-dom"
import Modal from "../../components/Modal"
import AddPlayer from "./AddPlayer"
import Table from "../../components/Table"
import { Player } from "../../types"

export function loader() {
  const data = fetch("http://localhost:8080/players")
    .then((response) => response.json())
    .then((data: Player[]) => data)
    .catch((err) => console.log(err))

  return data
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData()
  const form = Object.fromEntries(formData)
  try {
    await fetch("http://localhost:8080/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
  } catch (err) {
    console.log(err)
  }
  return redirect("/players")
}

function Players() {
  const players = useLoaderData() as Player[]
  const modalRef = useRef<HTMLDialogElement>(null)
  const playerHeaders = [
    "#",
    "Username",
    "Wins",
    "Losses",
    "Played",
    "Win Rate",
  ]

  return (
    <>
      <button
        className="mt-4 rounded-md bg-blue-400 px-4 py-2 text-lg"
        onClick={() => modalRef.current?.showModal()}
      >
        Add Player
      </button>
      <Modal modalRef={modalRef}>
        <AddPlayer />
      </Modal>
      <Table title="All Players" headers={playerHeaders}>
        {players.map((player, index) => {
          return (
            <tr key={player._id} className="odd:bg-slate-700 even:bg-slate-900">
              <td>{index + 1}</td>
              <td>{player.username}</td>
              <td>{player.wins}</td>
              <td>{player.played - player.wins}</td>
              <td>{player.played}</td>
              <td>
                {player.played === 0
                  ? "0.00"
                  : ((player.wins / player.played) * 100).toFixed(2)}
                %
              </td>
            </tr>
          )
        })}
      </Table>
    </>
  )
}

export default Players
