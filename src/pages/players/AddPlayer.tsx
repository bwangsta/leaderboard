import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import FormInput from "../../components/FormInput"
import { postPlayer } from "../../services/api"
import { Player, PlayerFormData } from "../../types"

type AddPlayerProps = {
  closeModal: () => void
}

function AddPlayer({ closeModal }: AddPlayerProps) {
  const [formData, setFormData] = useState<PlayerFormData>({
    username: "",
    first_name: "",
    last_name: "",
  })
  const queryClient = useQueryClient()
  const { mutate, error, isSuccess } = useMutation({
    mutationFn: postPlayer,
    onSuccess: (data) => handleMutationSuccess(data),
  })

  async function handleMutationSuccess(data: Player | undefined) {
    queryClient.setQueryData<Player[] | undefined>(["players"], (oldData) => {
      return oldData ? ([...oldData, data] as Player[]) : oldData
    })
    await queryClient.invalidateQueries({
      queryKey: ["players"],
      exact: true,
    })
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value }
    })
  }

  function handleReset() {
    setFormData({
      username: "",
      first_name: "",
      last_name: "",
    })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    mutate(formData)
    handleReset()
    closeModal()
  }

  if (error instanceof Error) {
    console.log(error)
  }

  if (isSuccess) {
    console.log("Successfully added")
  }

  return (
    <form className="space-y-2" onSubmit={handleSubmit}>
      <FormInput
        name="username"
        type="text"
        value={formData.username}
        handleChange={handleInputChange}
      />
      <FormInput
        name="first_name"
        type="text"
        value={formData.first_name}
        handleChange={handleInputChange}
      />
      <FormInput
        name="last_name"
        type="text"
        value={formData.last_name}
        handleChange={handleInputChange}
      />
      <div className="mt-2 grid grid-cols-2 gap-2">
        <button
          type="button"
          className="rounded-lg bg-blue-400 px-2 py-1 focus-visible:outline-transparent"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          type="submit"
          className="rounded-lg bg-blue-400 px-2 py-1 focus-visible:outline-transparent"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default AddPlayer
