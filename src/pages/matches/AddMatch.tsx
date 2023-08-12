import { useState } from "react"
import Select, { ActionMeta, SingleValue, MultiValue } from "react-select"
import FormInput from "../../components/FormInput"
import { Player } from "../../types"

type AddMatchProps = {
  players: Player[]
  modalRef: React.RefObject<HTMLDialogElement>
}

type FormData = {
  date: Date
  game: Option
  players: Option[]
  winners: Option[]
}

type Option = {
  value: string
  label: string
}

function AddMatch({ players, modalRef }: AddMatchProps) {
  const games = ["Bang", "Catan", "Ticket to Ride", "Mahjong"]
  const [formData, setFormData] = useState<FormData>({
    date: new Date(),
    game: {} as Option,
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

  async function handleSubmit() {
    const selectedPlayers = formData.players.map(({ value }) => {
      return { player: value }
    })
    const winners = formData.winners.map(({ value }) => value)
    const formattedFormData = {
      date: formData.date,
      game: formData.game.value,
      players: selectedPlayers,
      winners: winners,
    }

    async function postMatch() {
      try {
        await fetch("http://localhost:8080/matches", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedFormData),
        })
      } catch (err) {
        console.log(err)
      }
    }

    async function updatePlayers() {
      selectedPlayers.map(async ({ player: playerId }) => {
        const player = players.find((player) => player._id === playerId)!
        const body = {
          wins: winners.includes(player._id) ? player.wins + 1 : player.wins,
          played: player.played + 1,
        }
        try {
          await fetch(`http://localhost:8080/players/${playerId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          })
        } catch (err) {
          console.log(err)
        }
      })
    }

    setFormData({
      date: new Date(),
      game: {} as Option,
      players: [],
      winners: [],
    })

    await Promise.all([postMatch(), updatePlayers()])
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { type, name, value } = event.target
    const newValue = type === "date" ? new Date(value) : value
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: newValue }
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

  return (
    <>
      <h1 className="text-3xl font-bold">Add Match</h1>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <FormInput
          type="date"
          name="date"
          value={formData.date.toLocaleDateString("en-CA")}
          handleChange={handleInputChange}
          handleKeyDown={(e) => e.preventDefault()}
        />
        <label htmlFor="game">Game</label>
        <Select
          id="game"
          name="game"
          options={gameOptions}
          isSearchable={true}
          menuPosition="fixed"
          className="text-black"
          onChange={(option, action) => handleSelectChange(option, action)}
        />
        <label htmlFor="players">Players</label>
        <Select
          id="players"
          name="players"
          options={playerOptions}
          isMulti={true}
          isSearchable={true}
          menuPosition="fixed"
          className="text-black"
          onChange={(option, action) => handleSelectChange(option, action)}
        />
        <label htmlFor="winners">Winners</label>
        <Select
          id="winners"
          name="winners"
          options={winnerOptions}
          isMulti={true}
          isSearchable={true}
          isDisabled={formData.players.length === 0 ? true : false}
          menuPosition="fixed"
          className="text-black"
          onChange={(option, action) => handleSelectChange(option, action)}
        />
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            type="button"
            className="rounded-lg bg-blue-400 px-2 py-1 focus-visible:outline-transparent"
            formMethod="dialog"
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
    </>
  )
}

export default AddMatch
