import { GameUserPayload } from "@entities/game"
import { MapName } from "@shared/config"

type WinnersInput =
  | { type: "string"; data: string }
  | { type: "array"; data: GameUserPayload[] }

export const getMapKey = (value: string): keyof typeof MapName | undefined => {
  return (Object.keys(MapName) as Array<keyof typeof MapName>).find(
    (key) => MapName[key] === value,
  )
}

const parseWinners = (input: WinnersInput): GameUserPayload[] => {
  switch (input.type) {
    case "string":
      try {
        const parsed = JSON.parse(input.data) as { winners?: GameUserPayload[] }
        return Array.isArray(parsed?.winners) ? parsed.winners : []
      } catch {
        return []
      }
    case "array":
      return input.data.filter((user) => typeof user.username === "string")
    default:
      return []
  }
}

export const isWinner = (
  winners: string | GameUserPayload[],
  username: string,
): boolean => {
  const inputType: WinnersInput =
    typeof winners === "string"
      ? { type: "string", data: winners }
      : { type: "array", data: winners }

  return parseWinners(inputType).some((user) => user.username === username)
}
