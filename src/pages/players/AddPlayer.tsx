import { Form } from "react-router-dom"
import FormInput from "../../components/FormInput"

type AddPlayerProps = {
  modalRef: React.RefObject<HTMLDialogElement>
}

function AddPlayer({ modalRef }: AddPlayerProps) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Add Player</h1>
      <Form method="POST" className="space-y-2">
        <FormInput name="username" type="text" />
        <FormInput name="first_name" type="text" />
        <FormInput name="last_name" type="text" />
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            type="button"
            className="rounded-lg bg-blue-400 px-2 py-1 focus-visible:outline-transparent"
            onClick={() => modalRef.current?.close()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-blue-400 px-2 py-1 focus-visible:outline-transparent"
          >
            Submit
          </button>
        </div>
      </Form>
    </div>
  )
}

export default AddPlayer
