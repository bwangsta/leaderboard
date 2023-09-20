import { Link } from "react-router-dom"
import { FaChevronDown, FaPlus } from "react-icons/fa"
import Dropdown from "./Dropdown"
import Modal from "./Modal"
import AddMatch from "../pages/matches/AddMatch"
import AddPlayer from "../pages/players/AddPlayer"

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
          <Dropdown
            buttonIcon={
              <>
                <FaPlus />
                <FaChevronDown size={12} />
              </>
            }
          >
            <Modal
              title="Add Match"
              render={(closeModal) => <AddMatch closeModal={closeModal} />}
            />
            <Modal
              title="Add Player"
              render={(closeModal) => <AddPlayer closeModal={closeModal} />}
            />
          </Dropdown>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
