import { useLoaderData } from "react-router-dom"
import { Match, Rank, Rankings } from "../../types"
import Table from "../../components/Table"
import {
  getGameRankings,
  getMatches,
  getPlayerRankings,
} from "../../services/api"
import GameItem from "./GameItem"
import AccordionPanel from "../../components/AccordionPanel"
import { Link } from "react-router-dom"

export async function loader() {
  const data = await Promise.all([
    getMatches(),
    getPlayerRankings(),
    getGameRankings("Bang"),
    getGameRankings("Catan"),
    getGameRankings("Ticket To Ride"),
    getGameRankings("Mahjong"),
  ])
  return data
}

function Home() {
  const [
    matches,
    rankings,
    bangRankings,
    catanRankings,
    ticketRankings,
    mahjongRankings,
  ] = useLoaderData() as [
    Match[],
    Rank[],
    Rankings,
    Rankings,
    Rankings,
    Rankings
  ]
  const playerHeaders = ["Rank", "Username", "Wins", "Losses", "Win Rate"]
  const gameRankings = [
    {
      name: "bang",
      rankings: bangRankings,
    },
    {
      name: "catan",
      rankings: catanRankings,
    },
    {
      name: "ticket-to-ride",
      rankings: ticketRankings,
    },
    {
      name: "mahjong",
      rankings: mahjongRankings,
    },
  ]

  return (
    <>
      <div className="mt-4 grid grid-cols-fluid gap-4">
        {gameRankings.map((game) => (
          <GameItem key={game.name} data={game.rankings} />
        ))}
      </div>
      <Table title="Player Rankings" headers={playerHeaders}>
        {rankings.map((player, index) => {
          return (
            <tr key={player._id} className="odd:bg-slate-700 even:bg-slate-900">
              <td>{index + 1}</td>
              <td>
                <Link to={`/players/${player._id}`}>{player.username}</Link>
              </td>
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

      <h1 className="my-4 text-left text-3xl font-bold">Recent Matches</h1>
      {matches.map((match) => {
        return <AccordionPanel key={match._id} match={match} />
      })}
    </>
  )
}

export default Home
