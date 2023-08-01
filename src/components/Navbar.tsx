import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="bg-slate-900 p-4">
      <ul className="flex justify-between font-semibold">
        <li>
          <Link to={"/"}>Leaderboard</Link>
        </li>
        <li>
          <Link to={"/players"}>Catan</Link>
        </li>
        <li>
          <Link to={"/players"}>Ticket To Ride</Link>
        </li>
        <li>
          <Link to={"/players"}>Mahjong</Link>
        </li>
        <li>
          <Link to={"/players"}>Bang!</Link>
        </li>
        <li>
          <Link to={"/players"}>Players</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
