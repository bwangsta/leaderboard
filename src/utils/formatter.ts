export function formatDate(date: string) {
  const isoString = new Date(date).toISOString().slice(0, -1)
  return new Intl.DateTimeFormat(undefined).format(new Date(isoString))
}

export function formatDatePicker(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }
  const dateParts = new Intl.DateTimeFormat(undefined, options).formatToParts(
    date
  )

  const year = dateParts.find((part) => part.type === "year")
  const month = dateParts.find((part) => part.type === "month")
  const day = dateParts.find((part) => part.type === "day")

  return `${year?.value}-${month?.value}-${day?.value}`
}

export function toTitleCase(name: string, delimiter = " ") {
  const words = name.split(delimiter)
  const newName = words
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(" ")
  return newName
}

export function toKebabCase(name: string, delimiter = " ") {
  const words = name.toLowerCase().split(delimiter)
  const newName = words.join("-")
  return newName
}
