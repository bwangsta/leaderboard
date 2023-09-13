import { ReactNode, useState } from "react"
import { FaTimes } from "react-icons/fa"

type ModalProps = {
  title: string
  renderForm: (closeModal: () => void) => ReactNode
}

function Modal({ title, renderForm }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <>
      <button className="px-4 py-2" onClick={openModal}>
        {title}
      </button>
      {isOpen && (
        <>
          <div className="fixed left-0 top-0 h-full w-full bg-black bg-opacity-80"></div>
          <div className="fixed left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-slate-800 p-6">
            <button
              type="button"
              className="float-right rounded-full p-2 hover:bg-blue-400 focus-visible:outline-transparent"
              onClick={closeModal}
            >
              <FaTimes />
            </button>
            {renderForm(closeModal)}
          </div>
        </>
      )}
    </>
  )
}

export default Modal
