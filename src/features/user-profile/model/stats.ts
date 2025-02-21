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
}

export const statsModel = (payload: StatsPayload): Stat[] => {
  const kd =
    payload.deaths === 0
      ? payload.kills === 0
        ? "0.00"
        : payload.kills
      : (payload.kills / payload.deaths).toFixed(2)

  return [
    { title: "Убийств", value: payload.kills },
    { title: "Смертей", value: payload.deaths },
    { title: "Побед", value: payload.win },
    { title: "Поражений", value: payload.lose },
    { title: "Сломанных кроватей", value: payload.brokenBeds },
    { title: "К/Д", value: kd },
  ]
}
