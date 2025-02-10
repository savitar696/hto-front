export interface Item {
  label: string
  url: string
}

export const TreeItems: Item[] = [
  { label: "Главная", url: "/" },
  { label: "Лидерборд", url: "/leaderboard" },
  { label: "Правила", url: "/rules" },
]
