export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US").format(new Date(date))
}

export function toTitleCase(name: string, delimiter: string = " ") {
  const words = name.split(delimiter)
  const newName = words
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(" ")
  return newName
}

export function toKebabCase(name: string, delimiter: string = " ") {
  const words = name.toLowerCase().split(delimiter)
  const newName = words.join("-")
  return newName
}
