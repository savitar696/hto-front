import { Match } from "@features/match"
import { useTitle } from "@shared/lib/hooks/use-title"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

export const MatchPage = () => {
  const { id } = useParams<{ id?: string }>()
  const { set } = useTitle()

  useEffect(() => {
    set({ text: `Матч ${id}` })
  }, [id, set])

  if (!id) return

  return <Match id={id} />
}
