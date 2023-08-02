import { useLoaderData } from "react-router-dom"
import { Game } from "../../types"
import { formatDate, formatPlayers } from "../../utils/formatter"
import Table from "../../components/Table"

export async function loader() {
  const data = await fetch("http://localhost:8080/games")
    .then((response) => response.json())
    .then((data: Game[]) => data)
    .catch((err) => console.log(err))

  return data
}

function Games() {
  const games = useLoaderData() as Game[]
  const headers = ["#", "Date", "Game", "Players", "Winners"]

  return (
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
  )
}

export default Games
