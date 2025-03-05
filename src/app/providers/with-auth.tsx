import { useUser } from "@entities/user"
import { FC, PropsWithChildren, useEffect } from "react"

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const getInfo = useUser((state) => state.getInfo)

  useEffect(() => {
    getInfo()
  }, [])

  return children
}
