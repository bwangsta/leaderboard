import {
  Games,
  Match,
  MatchFormData,
  Player,
  PlayerFormData,
  Rank,
  Rankings,
} from "../types"
import { toKebabCase } from "../utils/formatter"

const BASE_API_URL = "http://localhost:8080"

export async function getMatches() {
  try {
    const response = await fetch(`${BASE_API_URL}/matches`)
    const data: Match[] = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export async function postMatch(formData: MatchFormData) {
  try {
    const response = await fetch(`${BASE_API_URL}/matches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    const data: Match = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export async function updateMatch(formData: Match) {
  try {
    const response = await fetch(`${BASE_API_URL}/matches/${formData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    const data: Match = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export async function deleteMatch(id: string) {
  try {
    const response = await fetch(`${BASE_API_URL}/matches/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data: Match = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export async function postPlayer(formData: PlayerFormData) {
  try {
    const response = await fetch(`${BASE_API_URL}/players`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    const data: Player = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export async function getPlayers() {
  try {
    const response = await fetch(`${BASE_API_URL}/players`)
    const data: Player[] = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export async function getPlayer(id: string) {
  try {
    const response = await fetch(`${BASE_API_URL}/players/${id}`)
    const data: Player = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export async function getRankings() {
  try {
    const response = await fetch(`${BASE_API_URL}/rankings`)
    const data: Rank[] = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export async function getPlayerMatches(playerId: string) {
  try {
    const response = await fetch(`${BASE_API_URL}/matches?player=${playerId}`)
    const data: Match[] = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export async function getGameRankings(game: string) {
  const gameName = toKebabCase(game)
  try {
    const response = await fetch(`${BASE_API_URL}/rankings/${gameName}`)
    const data: Rankings = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export async function getAllGameRankings() {
  const games = ["bang", "catan", "ticket-to-ride", "mahjong"]
  const data = []
  try {
    for (const game of games) {
      data.push({ name: game, rankings: await getGameRankings(game) })
    }
    return data
  } catch (err) {
    console.log(err)
  }
}

export async function getGameMatches(game: string) {
  try {
    const response = await fetch(`${BASE_API_URL}/matches?game=${game}`)
    const data: Match[] = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export async function getGames() {
  try {
    const response = await fetch(`${BASE_API_URL}/games`)
    const data: Games = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}
