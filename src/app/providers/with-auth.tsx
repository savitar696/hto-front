import { useGetInfo } from "@features/auth/api/get-info" // Импортируем хук для получения информации
import { FC, PropsWithChildren, useEffect } from "react"

const getAccessToken = () => {
  return localStorage.getItem("auth") == "ADMIN"
}

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const load = useGetInfo()

  useEffect(() => {
    const token = getAccessToken()
    if (token) {
      console.log("yes")
      load()
    }
  }, [load])

  return children
}
