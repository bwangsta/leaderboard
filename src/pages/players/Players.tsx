import { useLoaderData, Form, redirect } from "react-router-dom"

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

export default function Players() {
  const players = useLoaderData() as Player[]

  return (
    <>
      <h1 className="text-3xl font-bold">Players</h1>
      <Form method="POST" className="bg-slate-500">
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            className="rounded-md"
          />
        </div>
        <div>
          <label htmlFor="first_name">First Name</label>
          <input type="text" name="first_name" className="rounded-md" />
        </div>
        <div>
          <label htmlFor="last_name">Last Name</label>
          <input type="text" name="last_name" className="rounded-md" />
        </div>
        <button type="submit" className="bg-blue-400 px-2 py-1 rounded-lg">
          Submit
        </button>
      </Form>
      <ul>
        {players.map((player) => {
          return <li key={player.username}>{player.username}</li>
        })}
      </ul>
    </>
  )
}
