import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import FormInput from "../../components/FormInput"
import { postPlayer } from "../../services/api"
import { PlayerFormData } from "../../types"

type AddPlayerProps = {
  modalRef: React.RefObject<HTMLDialogElement>
}

function AddPlayer({ modalRef }: AddPlayerProps) {
  const [formData, setFormData] = useState<PlayerFormData>({
    username: "",
    first_name: "",
    last_name: "",
  })
  const queryClient = useQueryClient()
  const { mutate, error, isSuccess } = useMutation({
    mutationFn: postPlayer,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["players"] }),
  })

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value }
    })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    mutate(formData)
    setFormData({
      username: "",
      first_name: "",
      last_name: "",
    })
    modalRef.current?.close()
  }

  if (error instanceof Error) {
    console.log(error)
  }

  if (isSuccess) {
    console.log("Successfully added")
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Add Player</h1>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <FormInput
          name="username"
          type="text"
          handleChange={handleInputChange}
        />
        <FormInput
          name="first_name"
          type="text"
          handleChange={handleInputChange}
        />
        <FormInput
          name="last_name"
          type="text"
          handleChange={handleInputChange}
        />
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
      </form>
    </div>
  )
}

export default AddPlayer
