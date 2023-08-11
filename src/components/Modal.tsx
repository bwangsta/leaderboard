import { ReactNode, RefObject } from "react"

type ModalProps = {
  children: ReactNode
  modalRef: RefObject<HTMLDialogElement>
}

function Modal({ children, modalRef }: ModalProps) {
  // function handleCloseModal(
  //   event: React.MouseEvent<HTMLDialogElement, MouseEvent>
  // ) {
  //   const modalDimensions = modalRef.current?.getBoundingClientRect()

  //   // Closes modal if user clicks outside of the modal
  //   if (modalDimensions) {
  //     if (
  //       event.clientX < modalDimensions.left ||
  //       event.clientX > modalDimensions.right ||
  //       event.clientY < modalDimensions.top ||
  //       event.clientY > modalDimensions.bottom
  //     ) {
  //       modalRef.current?.close()
  //     }
  //   }
  // }

  return (
    <dialog
      ref={modalRef}
      className="w-full max-w-lg rounded-3xl bg-slate-800 p-6 text-inherit caret-black backdrop:bg-black backdrop:bg-opacity-60 backdrop:backdrop-blur"
    >
      {children}
    </dialog>
  )
}

export default Modal
