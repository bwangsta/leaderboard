import { Match, Player, Rankings } from "../types"
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
    const data: Player[] = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export async function getPlayerRankings() {
  try {
    const response = await fetch(`${BASE_API_URL}/rankings`)
    const data: Rankings = await response.json()
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

export async function getGameMatches(game: string) {
  try {
    const response = await fetch(`http://localhost:8080/matches?game=${game}`)
    const data: Match[] = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}
