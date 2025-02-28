import { MatchPick } from "@features/map-selector/hooks"

export type GamePayload = {
  id: string
  map_id: string
  map_name: string
  winners: GameUserPayload[] | string
  losers: GameUserPayload[] | string
  events: Event[]
  lobby: MatchPick
}

export interface Player {
  id: number
  username: string
  _id: string
  rating: number
}

export interface BaseEvent {
  type: string
  time: number
}

export interface KillEvent extends BaseEvent {
  type: "kill"
  killer: Player["id"]
  target: Player["id"]
  killerHealth: string
}

export interface BedBreakEvent extends BaseEvent {
  type: "bedBreak"
  team: string
  player: Player["id"]
}

export interface ReconnectEvent extends BaseEvent {
  type: "reconnect"
  player: Player["id"]
}

export interface LeaveEvent extends BaseEvent {
  type: "leave" 
  player: Player["id"]
}

export type Event = KillEvent | BedBreakEvent | ReconnectEvent | LeaveEvent

export type GameUserPayload = {
  username: string
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
