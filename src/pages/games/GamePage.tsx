import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import Table from "../../components/Table"
import AccordionPanel from "../../components/AccordionPanel"
import { getGameMatches, getGameRankings } from "../../services/api"
import Loader from "../../components/Loader"
import ErrorMessage from "../../components/ErrorMessage"
import Header from "../../components/Header"

function GamePage() {
  const { gameName } = useParams()
  const rankingHeaders = ["Rank", "Username", "Wins", "Losses", "Win Rate"]
  const {
    data: matches,
    isLoading: isMatchesLoading,
    error: matchesError,
  } = useQuery({
    queryKey: ["matches", gameName],
    queryFn: () => getGameMatches(gameName!),
  })
  const {
    data: rankings,
    isLoading: isGameRankingsLoading,
    error: gameRankingsError,
  } = useQuery({
    queryKey: ["rankings", gameName],
    queryFn: () => getGameRankings(gameName!),
  })

  if (isMatchesLoading || isGameRankingsLoading) {
    return <Loader />
  }

  if (matchesError instanceof Error) {
    return (
      <ErrorMessage name={matchesError.name} message={matchesError.message} />
    )
  }

  if (gameRankingsError instanceof Error) {
    return (
      <ErrorMessage
        name={gameRankingsError.name}
        message={gameRankingsError.message}
      />
    )
  }

  return (
    <>
      <h1 className="my-4 text-center text-4xl font-bold">{rankings?.game}</h1>
      <Header>Rankings</Header>
      <Table headers={rankingHeaders}>
        {rankings?.rankings.map((player, index) => {
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

      <Header>Matches</Header>
      {matches?.map((match) => {
        return <AccordionPanel key={match._id} match={match} />
      })}
    </>
  )
}

export default GamePage
