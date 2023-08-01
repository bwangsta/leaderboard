import { Form } from "react-router-dom"

function AddPlayer() {
  return (
    <div className="p-4">
      <h1 className="text-2xl">Add Player</h1>
      <Form method="POST" className="space-y-2">
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            className="rounded-md inline-block w-full"
          />
        </div>
        <div>
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            name="first_name"
            className="rounded-md inline-block w-full"
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            name="last_name"
            className="rounded-md inline-block w-full"
          />
        </div>
        <button type="submit" className="bg-blue-400 px-2 py-1 rounded-lg">
          Submit
        </button>
      </Form>
    </div>
  )
}

export default AddPlayer
