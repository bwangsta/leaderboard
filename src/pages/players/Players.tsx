import { useRef } from "react"
import { useLoaderData, redirect } from "react-router-dom"
import Modal from "../../components/Modal"
import AddPlayer from "./AddPlayer"

type Player = {
  username: string
  first_name: string
  last_name: string
}

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

  return (
    <>
      <h1 className="text-3xl font-bold">Players</h1>
      <button
        className="bg-blue-400 px-2 py-1 rounded-lg"
        onClick={() => modalRef.current?.showModal()}
      >
        Add Player
      </button>
      <Modal modalRef={modalRef}>
        <AddPlayer />
      </Modal>
      <ul>
        {players.map((player) => {
          return <li key={player.username}>{player.username}</li>
        })}
      </ul>
    </>
  )
}

export default Players
