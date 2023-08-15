import { useLoaderData, useParams } from "react-router-dom"
import { Match } from "../../types"
import Table from "../../components/Table"
import calculatePlayerWins from "../../utils/calculatePlayerWins"
import AccordionPanel from "../../components/AccordionPanel"
import { toTitleCase } from "../../utils/formatter"

export async function loader({ params }: any) {
  try {
    const response = await fetch(
      `http://localhost:8080/matches?game=${params.gameName}`
    )
    const data: Match[] = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

function GamePage() {
  const matches = useLoaderData() as Match[]
  const { gameName } = useParams()
  const players = calculatePlayerWins(matches)
  const rankingHeaders = ["Rank", "Username", "Wins", "Losses", "Win Rate"]
  return (
    <>
      <h1 className="my-4 text-center text-4xl font-bold">
        {toTitleCase(gameName ?? "", "-")}
      </h1>
      <Table title="Rankings" headers={rankingHeaders}>
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

      <h1 className="my-4 text-3xl font-bold">Matches</h1>
      {matches.map((match) => {
        return <AccordionPanel key={match._id} match={match} />
      })}
    </>
  )
}

export default GamePage
