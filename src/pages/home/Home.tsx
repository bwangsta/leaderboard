import { useLoaderData } from "react-router-dom"
import { Match, Player } from "../../types"
import Table from "../../components/Table"
import { formatDate, formatPlayers } from "../../utils/formatter"
import { getMatches, getPlayers } from "../../services/api"
import GameItem from "./GameItem"

export async function loader() {
  const data = await Promise.all([getMatches(), getPlayers()])
  return data
}

function Home() {
  const [matches, players] = useLoaderData() as [Match[], Player[]]
  players.sort((a, b) => b.wins - a.wins)
  const playerHeaders = ["Rank", "Username", "Wins", "Losses", "Win Rate"]
  const matchHeaders = ["#", "Date", "Game", "Players", "Winners"]
  const catan = matches.filter((match) => match.game === "Catan")
  const ticket = matches.filter((match) => match.game === "Ticket To Ride")
  const bang = matches.filter((match) => match.game === "Bang")
  const mahjong = matches.filter((match) => match.game === "Mahjong")
  const games = [
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
        {games.map(({ name, game }) => {
          return <GameItem key={name} name={name} matches={game} />
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
      <Table title="Recent Matches" headers={matchHeaders}>
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

export default Home
