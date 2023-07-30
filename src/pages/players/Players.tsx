import { useState } from "react"
import { useLoaderData } from "react-router-dom"
import axios from "axios"

type Player = {
  username: string
  first_name: string
  last_name: string
}

export async function loader() {
  const data = await fetch("http://localhost:8080/players")
    .then((response) => response.json())
    .then((data: Player[]) => data)
    .catch((err) => console.log(err))

  return data
}

function Players() {
  const players = useLoaderData() as Player[]
  const [formData, setFormData] = useState<Player>({
    username: "",
    first_name: "",
    last_name: "",
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      }
    })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      await axios.post("http://localhost:8080/players", formData)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <form method="POST" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <ul>
        {players.map((player) => {
          return <li key={player.username}>{player.username}</li>
        })}
      </ul>
    </>
  )
}

export default Players
