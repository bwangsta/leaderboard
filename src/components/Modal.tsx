import { ReactNode, useState } from "react"
import { FaTimes, FaUserPlus, FaDice } from "react-icons/fa"
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@radix-ui/react-dialog"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"

type ModalProps = {
  title: string
  render: (closeModal: () => void) => ReactNode
}

function Modal({ title, render }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-2 p-4 focus-visible:bg-blue-400"
          onSelect={(e) => e.preventDefault()}
        >
          {title === "Add Player" ? (
            <FaUserPlus size={18} />
          ) : (
            <FaDice size={18} />
          )}
          <span>{title}</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="fixed left-0 top-0 h-full w-full bg-black bg-opacity-80" />
        <DialogContent
          onInteractOutside={(e) => e.preventDefault()}
          className="fixed left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-slate-800 p-6"
        >
          <DialogClose asChild>
            <button
              type="button"
              className="float-right rounded-full p-2 hover:bg-blue-400 focus-visible:outline-transparent"
              onClick={closeModal}
            >
              <FaTimes />
            </button>
          </DialogClose>
          <DialogTitle className="text-3xl font-bold">{title}</DialogTitle>
          {render(closeModal)}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default Modal
