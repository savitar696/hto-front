export type Stat = {
  title: string
  value: number | string
  backgroundImage?: string
}

export type StatsPayload = {
  kills: number
  deaths: number
  win: number
  lose: number
  brokenBeds: number
  kd: string;
}

export const statsModel = (payload: StatsPayload): Stat[] => {
  return [
    { title: "Убийств", value: payload.kills },
    { title: "Смертей", value: payload.deaths },
    { title: "Побед", value: payload.win },
    { title: "Поражений", value: payload.lose },
    { title: "Сломанных кроватей", value: payload.brokenBeds },
    { title: "К/Д", value: payload.kd },
  ]
}
