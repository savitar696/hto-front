export interface RankingData {
  id: string
  profile: { name: string }
  rating: number
  premium?: boolean
}

export interface PlayerBoxProps {
  index: number
  id: string
  name: string
  rating: number
  premium?: boolean
}
