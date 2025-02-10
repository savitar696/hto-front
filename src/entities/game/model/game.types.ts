export type GamePayload = {
  id: string
  map_id: string
  map_name: string
  winners: GameUserPayload[] | string
  losers: GameUserPayload[] | string
  events: any
}

export type GameUserPayload = {
  id: number
  spentGold: number
  spentBronze: number
  spentIron: number
  aliveTime: number
  kills: number
  deaths: number
  brokenBeds: number
  dead: boolean
  _id: string
  rating: number
  name: string
}

export type Game = {
  payload: GamePayload | null

  setPayload: (payload: GamePayload) => void
  getInfo: () => void
}

// export type GamePayload = {
//     id: string
//     map_id: string
//     map_name: string
//     winners: GameUserPayload[]
//     losers: GameUserPayload[]
//     events: any
//   }

//   export type GameUserPayload = {
//     id: number
//     spentGold: number
//     spentBronze: number
//     spentIron: number
//     aliveTime: number
//     kills: number
//     deaths: number
//     brokenBeds: number
//     dead: boolean
//     _id: string
//     rating: number
//     name: string
//   }

//   type GameState = {
//     payload: GamePayload | null
//     loading: boolean
//     error: string | null
//   }

//   type GameActions = {
//     setPayload: (payload: GamePayload) => void
//     getInfo: (gameId: string) => Promise<void>
//     reset: () => void
//   }
