export type MatchPick = {
  maps: string[]
  players: Player[]
  vote_right: number
  vote_right_end: number
  ended_when: number
  mapsSource: string[]
  teams: Player[][]
}

export type Player = {
  client_id: string
  name: string
  premium: boolean
  rating: number
  captain: boolean
  stats: {
    matches: number
    kd: string
    winrate: string
    kills: number
    killsPerMatch: string
  }
}
