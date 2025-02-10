export const statsModel = (payload: any) => [
  { title: "Убийств", value: payload.kills },
  { title: "Смертей", value: payload.deaths },
  { title: "Побед", value: payload.win },
  { title: "Поражений", value: payload.lose },
  { title: "Сломанных кроватей", value: payload.brokenBeds },
]
