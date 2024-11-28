import { useUser } from "@entities/user"
import { FC, PropsWithChildren, useEffect } from "react"
import { useShallow } from "zustand/react/shallow"

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const getInfo = useUser(useShallow((state) => state.getInfo))

  useEffect(() => {
    getInfo()
  }, [getInfo])

  return children
}
