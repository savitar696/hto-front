import {
  Actuon,
  Aquarium,
  Awakening,
  Crimentis,
  Junglius,
  Troster,
  Unona,
  Zamki,
  Zelnes,
  Zimperia,
} from "@shared/static/images"

export const API_URL = "https://api.hardtournaments.space"

export interface Item {
  label: string
  url: string
}

export const TreeItems: Item[] = [
  { label: "Главная", url: "/" },
  { label: "Лидерборд", url: "/leaderboard" },
  { label: "Правила", url: "/rules" },
]

export enum MapName {
  Zelnes = "Зелнес",
  Aquarium = "Аквариум",
  Awakening = "Пробуждение",
  Junglius = "Джунглиос",
  Zimperia = "Зимперия",
  Zamki = "Замки",
  Troster = "Тростер",
  Actuon = "Актуон",
  Unona = "Юнона",
  Crimnentis = "Криментис",
}

export const MapImages: Record<MapName, string> = {
  [MapName.Zelnes]: Zelnes,
  [MapName.Aquarium]: Aquarium,
  [MapName.Awakening]: Awakening,
  [MapName.Junglius]: Junglius,
  [MapName.Zimperia]: Zimperia,
  [MapName.Zamki]: Zamki,
  [MapName.Troster]: Troster,
  [MapName.Actuon]: Actuon,
  [MapName.Unona]: Unona,
  [MapName.Crimnentis]: Crimentis,
}
