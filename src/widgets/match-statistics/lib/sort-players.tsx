import { Player } from "@entities/game"

export const sortPlayersByKills = (
  players: Player[],
  kills: Record<number, number>,
): Player[] => {
  return players.sort((a, b) => {
    const killsA = kills[a.id] || 0
    const killsB = kills[b.id] || 0
    return killsB - killsA
  })
}
