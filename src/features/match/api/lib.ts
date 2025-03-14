import { Event, Player } from "@entities/game"

interface RawMatchData {
  winners: []
  losers: []
  events: []
  started_at: string
  ended_at: string
}

interface ParsedMatchData {
  winners: Player[]
  losers: Player[]
  events: Event[]
  started_at: number | null
  ended_at: number | null
}

export const parseMatchData = (rawData: RawMatchData): ParsedMatchData => {
  try {
    const winners = rawData.winners ? rawData.winners || [] : []
    const losers = rawData.losers ? rawData.losers || [] : []
    const events = rawData.events ? rawData.events || [] : []
    const started_at = rawData.started_at
      ? new Date(rawData.started_at).getTime()
      : null
    const ended_at = rawData.ended_at
      ? new Date(rawData.ended_at).getTime()
      : null

    return { winners, losers, events, started_at, ended_at }
  } catch (error) {
    return {
      winners: [],
      losers: [],
      events: [],
      started_at: null,
      ended_at: null,
    }
  }
}

export const findPlayerById = (
  id: number,
  players: Player[],
): Player | undefined => {
  return players.find((player) => player.id === id)
}

export const countStatsPlayer = (
  events: Event[],
): { kills: Record<number, number>; deaths: Record<number, number> } => {
  const kills: Record<number, number> = {}
  const deaths: Record<number, number> = {}

  events.forEach((event) => {
    if (event.type === "kill") {
      const killerId = event.killer
      kills[killerId] = (kills[killerId] || 0) + 1

      const targetId = event.target
      deaths[targetId] = (deaths[targetId] || 0) + 1
    }
  })

  return { kills, deaths }
}
