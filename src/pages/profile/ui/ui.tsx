import { UserProfile } from "@features/user-profile"
import { useTitle } from "@shared/lib/hooks/use-title"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

export const ProfilePage = () => {
  const { username } = useParams<{ username?: string }>()
  const { set } = useTitle()

  useEffect(() => {
    set({ text: `Профиль ${username}` })
  }, [])

  return <UserProfile username={username!} />
}
