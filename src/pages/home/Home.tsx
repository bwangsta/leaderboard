import { useLoaderData } from "react-router-dom"
import { Match, Player } from "../../types"
import Table from "../../components/Table"
import { getMatches, getPlayers } from "../../services/api"
import GameItem from "./GameItem"
import sortRankings from "../../utils/sortRankings"
import AccordionPanel from "../../components/AccordionPanel"

export async function loader() {
  const data = await Promise.all([getMatches(), getPlayers()])
  return data
}

function Home() {
  const [matches, players] = useLoaderData() as [Match[], Player[]]
  const playerHeaders = ["Rank", "Username", "Wins", "Losses", "Win Rate"]
  const catan = matches.filter((match) => match.game === "Catan")
  const ticket = matches.filter((match) => match.game === "Ticket To Ride")
  const bang = matches.filter((match) => match.game === "Bang")
  const mahjong = matches.filter((match) => match.game === "Mahjong")
  const games = [
    {
      name: "bang",
      game: bang,
    },
    {
      name: "catan",
      game: catan,
    },
    {
      name: "ticket-to-ride",
      game: ticket,
    },
    {
      name: "mahjong",
      game: mahjong,
    },
  ]

  sortRankings(players)

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

      <h1 className="my-4 text-left text-3xl font-bold">Recent Matches</h1>
      {matches.map((match) => {
        return <AccordionPanel key={match._id} match={match} />
      })}
    </>
  )
}

export default Home
