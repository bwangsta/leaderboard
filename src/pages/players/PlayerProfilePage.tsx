import { useLoaderData } from "react-router-dom"
import { Match, Player } from "../../types"
import AccordionPanel from "../../components/AccordionPanel"
import { getPlayers } from "../../services/api"

export async function loader({ params }: any) {
  async function getOnePlayer() {
    try {
      const response = await fetch(
        `http://localhost:8080/players/${params.playerId}`
      )
      const data: Player[] = await response.json()
      return data
    } catch (err) {
      console.log(err)
    }
  }

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
    getOnePlayer(),
    getPlayerMatches(),
    getPlayers(),
  ])
  return data
}

function PlayerProfilePage() {
  const [playerData, matches, players] = useLoaderData() as [
    Player,
    Match[],
    Player[]
  ]
  const rank = players.findIndex((player) => player._id === playerData._id) + 1

  return (
    <>
      <div className="my-4">
        <h1 className="text-4xl font-black">{playerData.username}</h1>
        <p className="text-3xl font-bold">Rank {rank}</p>
        <p className="text-2xl">
          {playerData.wins}W - {playerData.played - playerData.wins}L
        </p>
      </div>

      <h2 className="text-3xl">Match History</h2>
      {matches.map((match) => {
        return (
          <AccordionPanel
            key={match._id}
            match={match}
            backgroundColor={
              match.winners.some((winner) => winner._id === playerData._id)
                ? "bg-blue-500"
                : "bg-red-500"
            }
          />
        )
      })}
    </>
  )
}

export default PlayerProfilePage
