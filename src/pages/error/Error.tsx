import { useRouteError, isRouteErrorResponse } from "react-router-dom"

function Error() {
  const error = useRouteError()
  return (
    <div>
      <h1 className="text-4xl font-bold">Oops!</h1>
      <p>Sorry, an unexpected error has occured.</p>
      <p>
        {isRouteErrorResponse(error)
          ? error.error?.message || error.statusText
          : "Unknown error"}
      </p>
    </div>
  )
}

export default Error
