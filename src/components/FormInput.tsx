type FormInputProps = {
  name: string
  type: string
  value?: string
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

function FormInput({
  name,
  type,
  value,
  handleChange,
  handleKeyDown,
}: FormInputProps) {
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
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="block w-full rounded-lg px-2 py-1 text-black focus:outline-none"
      />
    </div>
  )
}

export default FormInput
