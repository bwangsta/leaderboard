import { useParams } from "react-router-dom"
import AccordionPanel from "../../components/AccordionPanel"
import { getPlayer, getPlayerMatches, getRankings } from "../../services/api"
import { useQuery } from "@tanstack/react-query"
import Loader from "../../components/Loader"
import ErrorMessage from "../../components/ErrorMessage"

function PlayerProfilePage() {
  const { playerId } = useParams()
  const {
    data: player,
    isLoading: isPlayerLoading,
    error: playerError,
  } = useQuery({
    queryKey: ["players", playerId],
    queryFn: () => getPlayer(playerId!),
  })
  const {
    data: matches,
    isLoading: isMatchesLoading,
    error: matchesError,
  } = useQuery({
    queryKey: ["matches", playerId],
    queryFn: () => getPlayerMatches(playerId!),
  })
  const {
    data: rankings,
    isLoading: isRankingsLoading,
    error: rankingsError,
  } = useQuery({
    queryKey: ["rankings"],
    queryFn: () => getRankings(),
  })

  if (isPlayerLoading || isMatchesLoading || isRankingsLoading) {
    return <Loader />
  }

  if (playerError instanceof Error) {
    return (
      <ErrorMessage name={playerError.name} message={playerError.message} />
    )
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

  const index = rankings?.findIndex((player) => player._id === playerId) ?? -1
  const playerStats = rankings?.[index]

  return (
    <>
      <div className="py-4">
        <h1 className="text-4xl font-black">{player?.username}</h1>
        <p className="text-3xl font-bold">
          Rank {index > -1 ? index + 1 : "--"}
        </p>
        <p className="text-2xl">
          {playerStats
            ? `${playerStats.wins}W - ${playerStats.played - playerStats.wins}L`
            : "0W - 0L"}
        </p>
      </div>

      {matches && matches.length > 0 ? (
        <>
          <h2 className="text-3xl">Match History</h2>
          {matches?.map((match) => {
            return (
              <AccordionPanel
                key={match._id}
                match={match}
                backgroundColor={
                  match.winners.some(
                    (winner) => winner.player_id === player?._id
                  )
                    ? "bg-blue-500"
                    : "bg-red-500"
                }
              />
            )
          })}
        </>
      ) : (
        <>
          <p>No Matches Found</p>
          <p>Play a match to earn a rank on the leaderboard.</p>
        </>
      )}
    </>
  )
}

export default PlayerProfilePage
