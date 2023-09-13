import { Link } from "react-router-dom"
import Dropdown from "./Dropdown"

function Navbar() {
  return (
    <nav className="bg-slate-900 p-4">
      <ul className="flex items-center gap-4 font-semibold">
        <li className="mr-auto">
          <Link to={"/"}>Leaderboard</Link>
        </li>
        <li>
          <Link to={"/matches"}>Matches</Link>
        </li>
        <li>
          <Link to={"/players"}>Players</Link>
        </li>
        <li>
          <Dropdown />
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
