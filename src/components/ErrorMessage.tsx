type ErrorMessageProps = {
  name: string
  message: string
}

function ErrorMessage({ name, message }: ErrorMessageProps) {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl">{name}</h1>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default ErrorMessage
