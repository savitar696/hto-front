import { MatchPick } from "@features/match/hooks/types"
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
  ratingChange: number
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

export interface KickEvent extends BaseEvent {
  type: "kick"
  player: Player["id"]
  executor: Player["id"]
}

export type Event =
  | KillEvent
  | BedBreakEvent
  | ReconnectEvent
  | LeaveEvent
  | KickEvent

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
export type TeamType =
  | "red"
  | "blue"
  | "green"
  | "yellow"
  | "aqua"
  | "white"
  | "pink"
  | "gray"

export interface Team {
  id: TeamType
  players: Player[]
  bedAlive: boolean
}

export interface BedwarsMatch {
  id: string
  mode: string
  status: "waiting" | "in_progress" | "finished"
  startTime: number
  endTime?: number
  teams: Team[]
  winner?: string
}
