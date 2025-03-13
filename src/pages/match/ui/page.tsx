import { MatchContainer } from "@features/match"
import { useTitle } from "@shared/lib/hooks/use-title"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

export const MatchPage = () => {
  const { id } = useParams<{ id?: string }>()
  const { set } = useTitle()

  useEffect(() => {
    ;({ text: `Соревновательный матч` })
  }, [id, set])

  if (!id) return
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-6)",
        minHeight: "calc(100vh - 333px)",
      }}
    >
      <MatchContainer id={id} />
    </div>
  )
}
