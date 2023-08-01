import { Form } from "react-router-dom"
import FormInput from "../../components/FormInput"

function AddPlayer() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Add Player</h1>
      <Form method="POST" className="space-y-2">
        <FormInput name="username" />
        <FormInput name="first_name" />
        <FormInput name="last_name" />
        <button type="submit" className="bg-blue-400 px-2 py-1 rounded-lg">
          Submit
        </button>
      </Form>
    </div>
  )
}

export default AddPlayer
