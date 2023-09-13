import { useRef, useState } from "react"
import { FaChevronDown, FaPlus } from "react-icons/fa"
import Modal from "./Modal"
import AddPlayer from "../pages/players/AddPlayer"
import AddMatch from "../pages/matches/AddMatch"

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLUListElement>(null)

  function toggleDropdown(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.stopPropagation()
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  // useEffect(() => {
  //   function handleClickOutside(event: MouseEvent) {
  //     if (
  //       dropdownRef.current &&
  //       !dropdownRef.current.contains(event.target as Node)
  //     ) {
  //       setIsOpen(false)
  //     }
  //   }

  //   document.addEventListener("click", handleClickOutside)

  //   return () => {
  //     document.removeEventListener("click", handleClickOutside)
  //   }
  // }, [])

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex items-center gap-1 rounded-lg border-2 border-solid border-white p-2"
      >
        <FaPlus />
        <FaChevronDown size={12} />
      </button>
      {isOpen && (
        <ul
          ref={dropdownRef}
          className="absolute right-0 mt-2 whitespace-nowrap rounded-xl bg-slate-700 py-2 shadow-2xl"
        >
          <li className="hover:bg-slate-600">
            <Modal
              title="New Match"
              renderForm={(closeModal) => <AddMatch closeModal={closeModal} />}
            />
          </li>
          <li className="hover:bg-slate-600">
            <Modal
              title="New Player"
              renderForm={(closeModal) => <AddPlayer closeModal={closeModal} />}
            />
          </li>
        </ul>
      )}
    </div>
  )
}

export default Dropdown
