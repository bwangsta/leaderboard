import { ReactNode, RefObject } from "react"

type ModalProps = {
  children: ReactNode
  modalRef: RefObject<HTMLDialogElement>
}
function Modal({ children, modalRef }: ModalProps) {
  function handleCloseModal(
    event: React.MouseEvent<HTMLDialogElement, MouseEvent>
  ) {
    const modalDimensions = modalRef.current?.getBoundingClientRect()

    // Closes modal if user clicks outside of the modal
    if (modalDimensions) {
      if (
        event.clientX < modalDimensions.left ||
        event.clientX > modalDimensions.right ||
        event.clientY < modalDimensions.top ||
        event.clientY > modalDimensions.bottom
      ) {
        modalRef.current?.close()
      }
    }
  }

  return (
    <dialog
      ref={modalRef}
      onClick={handleCloseModal}
      className="rounded-3xl w-full max-w-sm bg-slate-800 text-inherit caret-black backdrop:bg-black backdrop:bg-opacity-60 backdrop:backdrop-blur"
    >
      {children}
    </dialog>
  )
}

export default Modal
