import { useState } from "react"
import { useNavigate } from "react-router-dom"
import FormInput from "../../components/FormInput"

type AddPlayerProps = {
  modalRef: React.RefObject<HTMLDialogElement>
}

type FormData = {
  username: string
  first_name: string
  last_name: string
}

function AddPlayer({ modalRef }: AddPlayerProps) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    username: "",
    first_name: "",
    last_name: "",
  })

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value }
    })
  }

  async function handleSubmit() {
    try {
      await fetch("http://localhost:8080/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
    } catch (err) {
      console.log(err)
    }
    setFormData({
      username: "",
      first_name: "",
      last_name: "",
    })

    navigate("/players")
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
