import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@radix-ui/react-dropdown-menu"
import { FaChevronDown, FaPlus } from "react-icons/fa"
import Modal from "./Modal"
import AddPlayer from "../pages/players/AddPlayer"
import AddMatch from "../pages/matches/AddMatch"

function Dropdown() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 rounded-lg border-2 border-solid border-white p-2">
          <FaPlus />
          <FaChevronDown size={12} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="mt-2 rounded-xl bg-slate-700 shadow-2xl"
        align="end"
      >
        <Modal
          title="Add Match"
          render={(closeModal) => <AddMatch closeModal={closeModal} />}
        />
        <Modal
          title="Add Player"
          render={(closeModal) => <AddPlayer closeModal={closeModal} />}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Dropdown
