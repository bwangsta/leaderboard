import { useState } from "react"
import { Link } from "react-router-dom"
import {
  FaCrown,
  FaChevronDown,
  FaChevronUp,
  FaRegUser,
  FaEllipsisV,
} from "react-icons/fa"
import Table from "./Table"
import Modal from "./Modal"
import EditMatch from "../pages/matches/EditMatch"
import DeleteMatch from "../pages/matches/DeleteMatch"
import Dropdown from "./Dropdown"
import { Match } from "../types"
import { formatDate, toTitleCase } from "../utils/formatter"

type AccordionPanelProps = {
  match: Match
  backgroundColor?: string
}

function AccordionPanel({
  match,
  backgroundColor = "bg-slate-950",
}: AccordionPanelProps) {
  const [isActive, setIsActive] = useState(false)
  const headers: string[] = []
  for (const key of Object.keys(match.players[0])) {
    if (key !== "player_id") {
      headers.push(toTitleCase(key))
    }
  }

  return (
    <div className="my-1 overflow-hidden rounded-lg">
      <div
        className={`grid items-center gap-2 ${backgroundColor} p-4 sm:grid-cols-[10ch_1fr_1fr_1fr_2rem_1rem]`}
      >
        <p>{formatDate(match.date)}</p>
        <p className="text-2xl font-semibold sm:text-base">{match.game}</p>
        <div className="flex flex-col">
          {match.winners.map((winner) => {
            return (
              <div key={winner.player_id} className="flex items-center gap-1">
                <FaCrown className="text-yellow-300" />
                <Link to={`/players/${winner.player_id}`}>
                  {winner.username}
                </Link>
              </div>
            )
          })}
        </div>
        <div className="grid grid-cols-2 gap-1">
          {match.players.map((player) => {
            return (
              <div key={player.player_id} className="flex items-center gap-1">
                <FaRegUser />
                <Link
                  to={`/players/${player.player_id}`}
                  className="overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {player.username}
                </Link>
              </div>
            )
          })}
        </div>
        <Dropdown buttonIcon={<FaEllipsisV />}>
          <Modal
            title="Edit Match"
            render={(closeModal) => (
              <EditMatch closeModal={closeModal} match={match} />
            )}
          />
          <Modal
            title="Delete Match"
            render={(closeModal) => (
              <DeleteMatch match={match} closeModal={closeModal} />
            )}
          />
        </Dropdown>
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
            {match.players.map((player) => {
              return (
                <tr key={player.player_id}>
                  <td>
                    <Link to={`/players/${player.player_id}`}>
                      {player.username}
                    </Link>
                  </td>
                  {player.role && <td>{player.role}</td>}
                  {player.score && <td>{player.score}</td>}
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
