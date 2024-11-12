import { useDispatch } from "react-redux" // Хук для работы с Redux
import { setAuth, setUserProfile } from "@entities/user/model"
import { toaster } from "@components/ui/toaster"

export const useLogout = () => {
  const dispatch = useDispatch()

  const logout = () => {
    console.log("Logging out...")
    dispatch(setAuth(false))
    dispatch(setUserProfile({}))

    localStorage.removeItem("DEV_TOKEN")

    toaster.create({
      description: "Вы вышли с аккаунта",
      type: "info",
      duration: 3000,
    })
  }

  return { logout }
}
