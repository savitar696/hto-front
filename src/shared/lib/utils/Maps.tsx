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

const BASE_URL =
  "https://higexkonuqazjsxgdfbd.supabase.co/storage/v1/object/public/Banners/maps/";

export const MapImages: Record<MapName, string> = {
  [MapName.Zelnes]: `${BASE_URL}Zelnes.jpg`,
  [MapName.Aquarium]: `${BASE_URL}Aquarium.jpg`,
  [MapName.Awakening]: `${BASE_URL}Awakening.jpg`,
  [MapName.Junglius]: `${BASE_URL}Junglius.png`,
  [MapName.Zimperia]: `${BASE_URL}Zimperia.jpg`,
  [MapName.Zamki]: `${BASE_URL}Castles.jpg`,
  [MapName.Troster]: `${BASE_URL}Troster.jpg`,
  [MapName.Actuon]: `${BASE_URL}Actuon.jpg`,
  [MapName.Unona]: `${BASE_URL}Unona.jpg`,
  [MapName.Crimnentis]: `${BASE_URL}Crimentis.jpg`,
  [MapName.Fernigad]: `${BASE_URL}Fernigad.jpg`,
};

export const getMapImage = (map: MapName): string => MapImages[map];
