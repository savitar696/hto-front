export interface RankingData {
  id: string
  profile: { name: string }
  rating: number
  premium?: boolean
}

export interface PlayerBoxProps {
  profile?: {
    created_at: string
    id: string
    name: string
    user_id: string
    vime_id: string
  }
  index: number
  id: string
  name: string
  rating: number
  premium?: boolean
}
