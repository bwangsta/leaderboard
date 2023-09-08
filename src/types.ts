export type Match = {
  _id: string
  date: string
  game: string
  players: PlayerStats[]
  winners: { player_id: string; username: string }[]
}

export type MatchFormData = Omit<Match, "_id">

export type Player = {
  _id: string
  username: string
  first_name: string
  last_name: string
}

export type PlayerFormData = Omit<Player, "_id">

export type PlayerStats = {
  player_id: string
  username: string
  role?: string
  score?: number
}

export type Rank = {
  _id: string
  username: string
  wins: number
  played: number
}

export type Rankings = {
  game: string
  rankings: Rank[]
}
