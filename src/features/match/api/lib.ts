import { Event, Player } from "@entities/game"

interface RawMatchData {
  winners: string
  losers: string
  events: string
}

interface ParsedMatchData {
  winners: Player[]
  losers: Player[]
  events: Event[]
}

export const parseMatchData = (rawData: RawMatchData): ParsedMatchData => {
  try {
    const winners = rawData.winners
      ? JSON.parse(rawData.winners).winners || []
      : []
    const losers = rawData.losers ? JSON.parse(rawData.losers).losers || [] : []
    const events = rawData.events ? JSON.parse(rawData.events).events || [] : []

    return { winners, losers, events }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { winners: [], losers: [], events: [] }
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
