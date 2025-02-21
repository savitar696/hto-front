export const getRandomMap = (maps: string[]): string => {
  if (maps.length === 1) return ""
  return maps[Math.floor(Math.random() * maps.length)]
}
