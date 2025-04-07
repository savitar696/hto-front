export const API_URL = "http://localhost:5000"

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
    Actuon = "Актуон",
    Actuon2 = "Актуон 2",
    Alija = "Алия",
    Aquarium = "Аквариум",
    Awakening = "Пробуждение",
    Castles = "Замки",
    Crimentis = "Криментис",
    Critaz = "Критаз",
    Fernigad = "Фернигад",
    FernigadXL = "Фернигад XL",
    Fortis = "Фортис",
    FortisL = "Фортис L",
    Ivakuma = "Ивакума",
    Junglius = "Джунглиос",
    KrimentisXL = "Криментис XL",
    Merbes = "Мэрбес",
    Pluntrum = "Плунтрум",
    Raskol = "Раскол",
    Troster = "Тростер",
    Unona = "Юнона",
    Zelnes = "Зелнес",
    Zimperia = "Зимперия",
    ZimperiaXL = "Зимперия XL",
  }

const BASE_URL =
    "https://higexkonuqazjsxgdfbd.supabase.co/storage/v1/object/public/Banners/maps";

export const MapImages: Record<MapName, string> = Object.fromEntries(
    Object.entries(MapName).map(([key, _]) => {
      const fileName = key === "Zamki" ? "Castles" : key;
      return [MapName[key as keyof typeof MapName], `${BASE_URL}/${fileName}.jpg`];
    })
  ) as Record<MapName, string>;

export const getMapImage = (map: MapName): string => MapImages[map]
