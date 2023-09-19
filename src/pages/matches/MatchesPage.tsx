import { useQuery } from "@tanstack/react-query"
import { getMatches } from "../../services/api"
import AccordionPanel from "../../components/AccordionPanel"
import Loader from "../../components/Loader"
import ErrorMessage from "../../components/ErrorMessage"
import Header from "../../components/Header"

function MatchesPage() {
  const {
    data: matches,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["matches"],
    queryFn: getMatches,
  })

  if (isLoading) {
    return <Loader />
  }

  if (error instanceof Error) {
    return <ErrorMessage name={error.name} message={error.message} />
  }

  return (
    <>
      <Header>All Matches</Header>
      {matches?.map((match) => {
        return <AccordionPanel key={match._id} match={match} />
      })}
    </>
  )
}

export default MatchesPage
