export interface MatchPick {
  gameType: any
  maps: string[]
  players: GamePlayer[]
  ended_when: number
  vote_right: number
  vote_right_end: number
  mapsSource: string[]
  teams: Team[]
  state: GameState
  logs: string[]
  config: any
}

export interface Team {
  name: string
  players: GamePlayer[]
}

export interface GamePlayer {
  client_id: string
  name: string
  premium: boolean
  rating: number
  stats: any
  captain: boolean
  discordId: string | null
}

export enum GameState {
  PICK_MAPS = "Идет пик карт",
  IN_GAME = "Идет игра",
  FINISHED = "Игра окончена",
  CANCELED = "Игра отменена"
}

export const GameStateText = {
  PICK_MAPS: "Идет пик карт",
  IN_GAME: "Идет игра",
  FINISHED: "Игра окончена",
  CANCELED: "Игра отменена",
}
