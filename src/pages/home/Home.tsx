import { useLoaderData } from "react-router-dom"

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

function Home() {
  const games = useLoaderData() as Game[]

  return (
    <div className="p-4">
      <table className="mx-auto w-full max-w-7xl table-auto border-collapse">
        <thead className="text-left">
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Game</th>
            <th>Players</th>
            <th>Winners</th>
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </table>
    </div>
  )
}

export default Home
