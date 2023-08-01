type FormInputProps = {
  name: string
}

function FormInput({ name }: FormInputProps) {
  const words = name.split("_")
  const formattedName = words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1)
    })
    .join(" ")

  return (
    <div>
      <label htmlFor={name}>{formattedName}</label>
      <input
        id={name}
        type="text"
        name={name}
        className="rounded-lg inline-block w-full focus:outline-none px-2 py-1"
      />
    </div>
  )
}

export default FormInput
