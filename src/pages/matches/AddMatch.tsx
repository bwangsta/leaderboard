import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Select, { ActionMeta, SingleValue, MultiValue } from "react-select"
import FormInput from "../../components/FormInput"
import { formatDatePicker, toKebabCase } from "../../utils/formatter"
import { getPlayers, postMatch } from "../../services/api"
import { Match, MatchFormData } from "../../types"

type AddMatchProps = {
  closeModal: () => void
}

type FormData = {
  date: string
  game: Option | null
  players: Option[]
  winners: Option[]
}

type Option = {
  value: string
  label: string
}

function AddMatch({ closeModal }: AddMatchProps) {
  const games = ["Bang", "Catan", "Ticket To Ride", "Mahjong"]
  const queryClient = useQueryClient()
  const { data: players, isLoading } = useQuery({
    queryKey: ["players"],
    queryFn: getPlayers,
  })
  const { mutate, error, isSuccess } = useMutation({
    mutationFn: postMatch,
    onSuccess: (data, variables) => handleMutationSuccess(data, variables),
  })
  const [formData, setFormData] = useState<FormData>({
    date: formatDatePicker(new Date()),
    game: null,
    players: [],
    winners: [],
  })
  const gameOptions: Option[] = games.map((game) => {
    return { value: game, label: game }
  })
  const playerOptions: Option[] =
    players?.map((player) => {
      return { value: player._id, label: player.username }
    }) ?? []
  const winnerOptions: Option[] = formData.players.map((player) => {
    return { value: player.value, label: player.label }
  })

  async function handleMutationSuccess(
    data: Match | undefined,
    variables: MatchFormData
  ) {
    queryClient.setQueryData<Match[] | undefined>(["matches"], (oldData) => {
      return oldData ? ([...oldData, data] as Match[]) : oldData
    })
    await queryClient.invalidateQueries({
      queryKey: ["matches"],
      exact: true,
    })
    await queryClient.invalidateQueries({
      queryKey: ["matches", toKebabCase(variables.game)],
      exact: true,
    })
    await queryClient.invalidateQueries({
      queryKey: ["rankings"],
      exact: true,
    })
    await queryClient.invalidateQueries({
      queryKey: ["rankings", toKebabCase(variables.game)],
      exact: true,
    })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const selectedPlayers = formData.players.map(({ label, value }) => {
      return { player_id: value, username: label }
    })
    const winners = formData.winners.map(({ label, value }) => {
      return { player_id: value, username: label }
    })
    const formattedFormData = {
      date: formData.date,
      game: formData.game!.value,
      players: selectedPlayers,
      winners: winners,
    }
    mutate(formattedFormData)
    handleReset()
    closeModal()
  }

  function handleReset() {
    setFormData({
      date: formatDatePicker(new Date()),
      game: null,
      players: [],
      winners: [],
    })
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value }
    })
  }

  function handleSelectChange(
    options: MultiValue<Option> | SingleValue<Option>,
    action: ActionMeta<Option>
  ) {
    setFormData((prevFormData) => {
      return { ...prevFormData, [action.name!]: options }
    })
  }

  if (error instanceof Error) {
    console.log(error)
  }

  if (isSuccess) {
    console.log("Successfully added the match")
  }

  return (
    <form className="space-y-2" onSubmit={handleSubmit}>
      <FormInput
        type="date"
        name="date"
        value={formData.date}
        handleChange={handleInputChange}
      />
      <label htmlFor="game">Game</label>
      <Select
        inputId="game"
        name="game"
        options={gameOptions}
        value={formData.game}
        isSearchable={true}
        openMenuOnFocus={true}
        className="text-black"
        onChange={(option, action) => handleSelectChange(option, action)}
      />
      <label htmlFor="players">Players</label>
      <Select
        inputId="players"
        name="players"
        options={playerOptions}
        value={formData.players}
        isMulti={true}
        isSearchable={true}
        closeMenuOnSelect={false}
        isLoading={isLoading}
        className="text-black"
        onChange={(option, action) => handleSelectChange(option, action)}
      />
      <label htmlFor="winners">Winners</label>
      <Select
        inputId="winners"
        name="winners"
        options={winnerOptions}
        value={formData.winners}
        isMulti={true}
        isSearchable={true}
        closeMenuOnSelect={false}
        isDisabled={formData.players.length === 0}
        className="text-black"
        onChange={(option, action) => handleSelectChange(option, action)}
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

export default AddMatch
