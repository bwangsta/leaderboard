import { useState } from "react"
import Select, { ActionMeta, SingleValue, MultiValue } from "react-select"
import FormInput from "../../components/FormInput"
import { Player } from "../../types"
import { formatDatePicker } from "../../utils/formatter"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postMatch } from "../../services/api"

type AddMatchProps = {
  players: Player[]
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

function AddMatch({ players, closeModal }: AddMatchProps) {
  const games = ["Bang", "Catan", "Ticket To Ride", "Mahjong"]
  const queryClient = useQueryClient()
  const { mutate, error, isSuccess } = useMutation({
    mutationFn: postMatch,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["matches"] }),
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
  const playerOptions: Option[] = players.map((player) => {
    return { value: player._id, label: player.username }
  })
  const winnerOptions: Option[] = formData.players.map((player) => {
    return { value: player.value, label: player.label }
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
    <>
      <h1 className="text-3xl font-bold">Add Match</h1>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <FormInput
          type="date"
          name="date"
          value={formData.date}
          handleChange={handleInputChange}
          handleKeyDown={(e) => e.preventDefault()}
        />
        <label htmlFor="game">Game</label>
        <Select
          id="game"
          name="game"
          options={gameOptions}
          value={formData.game}
          isSearchable={true}
          className="text-black"
          onChange={(option, action) => handleSelectChange(option, action)}
        />
        <label htmlFor="players">Players</label>
        <Select
          id="players"
          name="players"
          options={playerOptions}
          value={formData.players}
          isMulti={true}
          isSearchable={true}
          className="text-black"
          onChange={(option, action) => handleSelectChange(option, action)}
        />
        <label htmlFor="winners">Winners</label>
        <Select
          id="winners"
          name="winners"
          options={winnerOptions}
          value={formData.winners}
          isMulti={true}
          isSearchable={true}
          isDisabled={formData.players.length === 0 ? true : false}
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
    </>
  )
}

export default AddMatch
