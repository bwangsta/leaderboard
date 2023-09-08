import Table from "../../components/Table"
import { getMatches, getRankings } from "../../services/api"
import GameItem from "./GameItem"
import AccordionPanel from "../../components/AccordionPanel"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import Loader from "../../components/Loader"
import ErrorMessage from "../../components/ErrorMessage"

function Home() {
  const playerHeaders = ["Rank", "Username", "Wins", "Losses", "Win Rate"]
  const games = ["Bang", "Catan", "Ticket To Ride", "Mahjong"]
  const {
    data: matches,
    isLoading: isMatchesLoading,
    error: matchesError,
  } = useQuery({
    queryKey: ["matches"],
    queryFn: getMatches,
  })
  const {
    data: rankings,
    isLoading: isRankingsLoading,
    error: rankingsError,
  } = useQuery({
    queryKey: ["rankings"],
    queryFn: getRankings,
  })

  if (isMatchesLoading || isRankingsLoading) {
    return <Loader />
  }

  if (matchesError instanceof Error) {
    return (
      <ErrorMessage name={matchesError.name} message={matchesError.message} />
    )
  }

  if (rankingsError instanceof Error) {
    return (
      <ErrorMessage name={rankingsError.name} message={rankingsError.message} />
    )
  }

  return (
    <>
      <div className="mt-4 grid grid-cols-fluid gap-4">
        {games.map((game) => (
          <GameItem key={game} name={game} />
        ))}
      </div>

      <Table title="Player Rankings" headers={playerHeaders}>
        {rankings?.map((player, index) => {
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
      {matches?.map((match) => {
        return <AccordionPanel key={match._id} match={match} />
      })}
    </>
  )
}

export default Home
