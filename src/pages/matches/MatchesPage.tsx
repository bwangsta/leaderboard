import AddMatch from "./AddMatch"
import Modal from "../../components/Modal"
import { getMatches, getPlayers } from "../../services/api"
import AccordionPanel from "../../components/AccordionPanel"
import { useQuery } from "@tanstack/react-query"
import Loader from "../../components/Loader"
import ErrorMessage from "../../components/ErrorMessage"

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
    data: players,
    isLoading: isPlayersLoading,
    error: playersError,
  } = useQuery({
    queryKey: ["players"],
    queryFn: getPlayers,
  })

  if (isMatchesLoading || isPlayersLoading) {
    return <Loader />
  }

  if (matchesError instanceof Error) {
    return (
      <ErrorMessage name={matchesError.name} message={matchesError.message} />
    )
  }

  if (playersError instanceof Error) {
    return (
      <ErrorMessage name={playersError.name} message={playersError.message} />
    )
  }

  return (
    <>
      {players && (
        <Modal
          title="Add Match"
          renderForm={(closeModal) => (
            <AddMatch players={players} closeModal={closeModal} />
          )}
        />
      )}
      <h1 className="my-4 text-3xl font-bold">All Matches</h1>
      {matches?.map((match) => {
        return <AccordionPanel key={match._id} match={match} />
      })}
    </>
  )
}

export default MatchesPage
