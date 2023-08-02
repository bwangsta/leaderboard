import { useLoaderData } from "react-router-dom"
import { Game, Player } from "../../types"
import Table from "../../components/Table"
import { formatDate, formatPlayers } from "../../utils/formatter"
import GameItem from "./GameItem"

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

function Home() {
  const [games, players] = useLoaderData() as [Game[], Player[]]
  players.sort((a, b) => b.wins - a.wins)
  const playerHeaders = ["Rank", "Username", "Wins", "Losses", "Win Rate"]
  const gameHeaders = ["#", "Date", "Game", "Players", "Winners"]
  const catan = games.filter((game) => game.name === "Catan")
  const ticket = games.filter((game) => game.name === "Ticket To Ride")
  const bang = games.filter((game) => game.name === "Bang")
  const mahjong = games.filter((game) => game.name === "Mahjong")
  const gameNames = [
    {
      name: "Bang!",
      game: bang,
    },
    {
      name: "Catan",
      game: catan,
    },
    {
      name: "Ticket To Ride",
      game: ticket,
    },
    {
      name: "Mahjong",
      game: mahjong,
    },
  ]

  return (
    <>
      <div className="mt-4 grid grid-cols-fluid gap-4">
        {gameNames.map(({ name, game }) => {
          return <GameItem key={name} name={name} games={game} />
        })}
      </div>
      <Table title="Player Rankings" headers={playerHeaders}>
        {players.map((player, index) => {
          return (
            <tr key={player._id} className="odd:bg-slate-700 even:bg-slate-900">
              <td>{index + 1}</td>
              <td>{player.username}</td>
              <td>{player.wins}</td>
              <td>{player.played - player.wins}</td>
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
      <Table title="Recent Games" headers={gameHeaders}>
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

export default Home
