import { DialogDescription } from "@radix-ui/react-dialog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteMatch } from "../../services/api"
import { Match } from "../../types"
import { toKebabCase } from "../../utils/formatter"

type DeleteMatchProps = {
  match: Match
  closeModal: () => void
}

function DeleteMatch({ match, closeModal }: DeleteMatchProps) {
  const queryClient = useQueryClient()
  const { mutate, error, isSuccess } = useMutation({
    mutationFn: deleteMatch,
    onSuccess: (data) => handleMutationSuccess(data),
  })

  async function handleMutationSuccess(data: Match | undefined) {
    queryClient.setQueryData<Match[] | undefined>(["matches"], (oldData) => {
      if (oldData) {
        return oldData.filter((match) => match._id !== data?._id)
      }
      return oldData
    })
    await queryClient.invalidateQueries({
      queryKey: ["matches"],
      exact: true,
    })
    await queryClient.invalidateQueries({
      queryKey: ["matches", toKebabCase(match.game)],
      exact: true,
    })
    await queryClient.invalidateQueries({
      queryKey: ["rankings"],
      exact: true,
    })
    await queryClient.invalidateQueries({
      queryKey: ["rankings", toKebabCase(match.game)],
      exact: true,
    })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    mutate(match._id)
  }

  if (error instanceof Error) {
    console.log(error)
  }

  if (isSuccess) {
    console.log("Successfully deleted the match")
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogDescription>
        Are you sure you want to delete this?
      </DialogDescription>
      <div className="flex justify-end gap-4">
        <button
          className="rounded-lg bg-slate-600 px-4 py-2 focus-visible:outline-transparent"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className="rounded-lg bg-red-400 px-4 py-2 focus-visible:outline-transparent"
          type="submit"
        >
          Confirm
        </button>
      </div>
    </form>
  )
}

export default DeleteMatch
