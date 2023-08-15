import { useState } from "react"
import { Match } from "../types"
import { formatDate, toTitleCase } from "../utils/formatter"
import { FaCrown, FaChevronDown, FaChevronUp, FaRegUser } from "react-icons/fa"
import Table from "./Table"

type AccordionPanelProps = {
  match: Match
}

function AccordionPanel({ match }: AccordionPanelProps) {
  const [isActive, setIsActive] = useState(false)
  let headers: string[] = []
  for (let key of Object.keys(match.players[0])) {
    if (key !== "_id") {
      headers.push(toTitleCase(key))
    }
  }

  return (
    <div className="my-1 overflow-hidden rounded-lg">
      <div className="grid items-center gap-2 bg-slate-950 p-4 sm:grid-cols-[10ch_1fr_1fr_1fr_1rem]">
        <p>{formatDate(match.date)}</p>
        <p className="text-2xl font-semibold sm:text-base">{match.game}</p>
        <div className="flex flex-col">
          {match.winners.map((winner) => {
            return (
              <div key={winner._id} className="flex items-center gap-1">
                <FaCrown className="text-yellow-300" />
                <p>{winner.username}</p>
              </div>
            )
          })}
        </div>
        <div className="grid grid-cols-2 gap-1">
          {match.players.map(({ player }) => {
            return (
              <div key={player._id} className="flex items-center gap-1">
                <FaRegUser />
                <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {player.username}
                </p>
              </div>
            )
          })}
        </div>
        <button
          type="button"
          onClick={() => setIsActive((prevIsActive) => !prevIsActive)}
        >
          {isActive ? (
            <FaChevronUp className="mx-auto" />
          ) : (
            <FaChevronDown className="mx-auto" />
          )}
        </button>
      </div>
      <div>
        {isActive && (
          <Table headers={headers}>
            {match.players.map(({ player, role, score }) => {
              return (
                <tr key={player._id}>
                  <td>{player.username}</td>
                  {role && <td>{role}</td>}
                  {score && <td>{score}</td>}
                </tr>
              )
            })}
          </Table>
        )}
      </div>
    </div>
  )
}

export default AccordionPanel
