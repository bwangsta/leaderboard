import { useLoaderData, useParams } from "react-router-dom"
import { Match, Player, Rank } from "../../types"
import AccordionPanel from "../../components/AccordionPanel"
import { getPlayer, getPlayerRankings } from "../../services/api"

export async function loader({ params }: any) {
  async function getPlayerMatches() {
    try {
      const response = await fetch(
        `http://localhost:8080/matches?player=${params.playerId}`
      )
      const data: Match[] = await response.json()
      return data
    } catch (err) {
      console.log(err)
    }
  }

  const data = await Promise.all([
    getPlayer(params.playerId),
    getPlayerMatches(),
    getPlayerRankings(),
  ])
  return data
}

function PlayerProfilePage() {
  const { playerId } = useParams()
  const [playerInfo, matches, rankings] = useLoaderData() as [
    Player,
    Match[],
    Rank[]
  ]

  const index = rankings.findIndex((player) => player._id === playerId)
  const playerData = rankings[index]

  return (
    <>
      <div className="py-4">
        <h1 className="text-4xl font-black">{playerInfo.username}</h1>
        <p className="text-3xl font-bold">
          Rank {index > -1 ? index + 1 : "--"}
        </p>
        <p className="text-2xl">
          {playerData
            ? `${playerData.wins}W - ${playerData.played - playerData.wins}L`
            : "0W - 0L"}
        </p>
      </div>

      {matches.length > 0 ? (
        <>
          <h2 className="text-3xl">Match History</h2>
          {matches.map((match) => {
            return (
              <AccordionPanel
                key={match._id}
                match={match}
                backgroundColor={
                  match.winners.some(
                    (winner) => winner.player_id === playerInfo._id
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
