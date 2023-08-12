export type Match = {
  _id: string
  date: string
  game: string
  last_name: string
  players: PlayerInfo[]
  winners: Player[]
}

export type Player = {
  _id: string
  username: string
  first_name: string
  last_name: string
  wins: number
  played: number
}

export type PlayerInfo = {
  _id: string
  player: Player
  role?: string
  score?: number
}
