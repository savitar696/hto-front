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
  Fernigad = "Фернигад",
}

export const MapImages: Record<MapName, string> = {
  [MapName.Zelnes]:
    "https://higexkonuqazjsxgdfbd.supabase.co/storage/v1/object/public/Banners/maps/Zelnes.jpg",
  [MapName.Aquarium]:
    "https://higexkonuqazjsxgdfbd.supabase.co/storage/v1/object/public/Banners/maps/Aquarium.jpg",
  [MapName.Awakening]:
    "https://higexkonuqazjsxgdfbd.supabase.co/storage/v1/object/public/Banners/maps/Awakening.jpg",
  [MapName.Junglius]:
    "https://higexkonuqazjsxgdfbd.supabase.co/storage/v1/object/public/Banners/maps/Junglius.png",
  [MapName.Zimperia]:
    "https://higexkonuqazjsxgdfbd.supabase.co/storage/v1/object/public/Banners/maps/Zimperia.jpg",
  [MapName.Zamki]:
    "https://higexkonuqazjsxgdfbd.supabase.co/storage/v1/object/public/Banners/maps/Castles.jpg",
  [MapName.Troster]:
    "https://higexkonuqazjsxgdfbd.supabase.co/storage/v1/object/public/Banners/maps/Troster.jpg",
  [MapName.Actuon]:
    "https://higexkonuqazjsxgdfbd.supabase.co/storage/v1/object/public/Banners/maps/Actuon.jpg",
  [MapName.Unona]:
    "https://higexkonuqazjsxgdfbd.supabase.co/storage/v1/object/public/Banners/maps/Unona.jpg",
  [MapName.Crimnentis]:
    "https://higexkonuqazjsxgdfbd.supabase.co/storage/v1/object/public/Banners/maps/Crimentis.jpg",
  [MapName.Fernigad]:
    "https://higexkonuqazjsxgdfbd.supabase.co/storage/v1/object/public/Banners/maps/Fernigad.jpg",
}

export const getMapImage = (map: MapName): string => MapImages[map]
