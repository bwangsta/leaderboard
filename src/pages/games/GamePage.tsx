import { useLoaderData, useLocation } from "react-router-dom"
import { Match, Rankings } from "../../types"
import Table from "../../components/Table"
import AccordionPanel from "../../components/AccordionPanel"
import { getGameMatches } from "../../services/api"

export async function loader({ params }: any) {
  const data = await getGameMatches(params.gameName)
  return data
}

function GamePage() {
  const matches = useLoaderData() as Match[]
  const { state } = useLocation()
  const { game, rankings }: Rankings = state
  const rankingHeaders = ["Rank", "Username", "Wins", "Losses", "Win Rate"]

  return (
    <>
      <h1 className="my-4 text-center text-4xl font-bold">{game}</h1>
      <Table title="Rankings" headers={rankingHeaders}>
        {rankings.map((player, index) => {
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
