const BASE_API_URL = "http://localhost:8080"

export async function getMatches() {
  try {
    const response = await fetch(`${BASE_API_URL}/matches`)
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export async function getPlayers() {
  try {
    const response = await fetch(`${BASE_API_URL}/players`)
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}
