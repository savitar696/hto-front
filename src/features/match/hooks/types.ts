export type MatchPick = {
  maps: string[]
  players: Player[]
  vote_right: number
  vote_right_end: number
  ended_when: number
  mapsSource: string[]
  teams: Player[][]
  state: GameState
  logs?: string[]
}

export enum GameState {
  PICK_MAPS = "Идет пик карт",
  IN_GAME = "Идет игра",
  FINISHED = "Игра окончена",
}

export const GameStateText = {
  PICK_MAPS: "Идет пик карт",
  IN_GAME: "Идет игра",
  FINISHED: "Игра окончена",
}

export type Player = { client_id: string; name: string }
