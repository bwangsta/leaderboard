import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getGames, getMatches } from "../../services/api"
import AccordionPanel from "../../components/AccordionPanel"
import Loader from "../../components/Loader"
import ErrorMessage from "../../components/ErrorMessage"
import Header from "../../components/Header"

function MatchesPage() {
  const {
    data: matches,
    isLoading: isMatchesLoading,
    error: matchesError,
  } = useQuery({
    queryKey: ["matches"],
    queryFn: getMatches,
  })
  const {
    data: games,
    isLoading: isGamesLoading,
    error: gamesError,
  } = useQuery({ queryKey: ["games"], queryFn: getGames })
  const [filterBy, setFilterBy] = useState("All")

  function handleGameClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const button = e.target as HTMLElement
    setFilterBy(button.textContent!)
  }

  function handleResetFilter() {
    setFilterBy("All")
  }

  const filteredMatches =
    filterBy === "All"
      ? matches
      : matches?.filter((match) => match.game === filterBy)

  if (isGamesLoading) {
    return <Loader />
  }

  if (gamesError instanceof Error) {
    return <ErrorMessage name={gamesError.name} message={gamesError.message} />
  }

  return (
    <>
      <Header>{filterBy} Matches</Header>
      <div className="flex flex-wrap gap-2 py-2">
        {games?.results.map((game) => (
          <button
            key={game}
            className="rounded-md bg-slate-500 px-2 py-1"
            onClick={handleGameClick}
          >
            {game}
          </button>
        ))}
      </div>
      <button onClick={handleResetFilter}>Reset</button>
      <div>
        {isMatchesLoading && <Loader />}
        {matchesError instanceof Error ? (
          <ErrorMessage
            name={matchesError.name}
            message={matchesError.message}
          />
        ) : (
          filteredMatches?.map((match) => {
            return <AccordionPanel key={match._id} match={match} />
          })
        )}
      </div>
    </>
  )
}

export default MatchesPage
