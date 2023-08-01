import { useLoaderData } from "react-router-dom"
import Table from "../../components/Table"

type Game = {
  _id: string
  date: string
  name: string
  last_name: string
  players: Player[]
  winners: string[]
}

type Player = {
  _id: string
  username: string
  role?: string
  score?: number
}

export async function loader() {
  const data = await fetch("http://localhost:8080/games")
    .then((response) => response.json())
    .then((data: Game[]) => data)
    .catch((err) => console.log(err))

  return data
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US").format(new Date(date))
}

function Games() {
  const games = useLoaderData() as Game[]
  const headers = ["#", "Date", "Game", "Players", "Winners"]

  return (
    <>
      <h1 className="my-4 text-3xl font-bold">All Games</h1>
      <Table headers={headers}>
        {games.map((game, index) => {
          return (
            <tr key={game._id}>
              <td>{index + 1}</td>
              <td>{formatDate(game.date)}</td>
              <td>{game.name}</td>
              <td>
                {game.players.map((player) => {
                  return <p key={player._id}>{player.username}</p>
                })}
              </td>
              <td>
                {game.winners.map((winner) => {
                  return <p key={winner}>{winner}</p>
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
