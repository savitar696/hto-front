import { create } from "zustand"
import { User } from "./user.types"
import { toaster } from "@components/ui/toaster"
import { api } from "@shared/lib/api"

export const useUser = create<User>()((set) => ({
  isAuth: false,
  payload: {},
  profile: {},
  games: [],
  isLoading: true,

  setAuth: (value) =>
    set({
      isAuth: value,
    }),
  setPayload: (payload) =>
    set({
      payload: payload,
    }),
  setProfile: (payload) =>
    set({
      profile: payload,
    }),
  auth: async (token) => {
    try {
      const response = await api.post("/auth", { token: token })
      localStorage.setItem("token", response.data)

      const infoResponse = await api.get(`/auth/info`, {
        headers: {
          authorization: `Bearer ${response.data}`,
        },
      })
      set({
        isAuth: true,
        payload: infoResponse.data.data,
      })
      toaster.create({
        title: "Успех",
        description: "Вы успешно вошли в аккаунт",
        type: "success",
      })
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    } catch (e) {
      toaster.create({
        title: "Ошибка",
        description: "Токен невалид, попробуйте другой",
        type: "error",
      })
    }
  },
  logout: () => {
    localStorage.setItem("token", "")
    set({
      isAuth: false,
      payload: null,
    })
    toaster.create({
      title: "Успех",
      description: "Вы вышли с аккаунта",
      type: "success",
    })
    setTimeout(() => {
      window.location.reload()
    }, 3000)
  },
  getInfo: async () => {
    const localToken = localStorage.getItem("token")
    if (localToken) {
      try {
        const response = await api.get("/auth/info", {
          headers: {
            authorization: `Bearer ${localToken}`,
          },
        })
        if (response.data && response.data.data) {
          set({
            isAuth: true,
            payload: response.data.data,
            isLoading: false,
          })
        } else {
          localStorage.setItem("token", "")
          toaster.create({
            title: "Ошибка",
            description: "Ваша сессия истекла, попробуйте войти заново",
            type: "error",
          })
        }
      } catch (error: any) {
        set({
          isLoading: false,
        })
        toaster.create({
          title: "Ошибка",
          description:
            error.response?.data?.message || "Что-то пошло не так...",
          type: "error",
        })
      }
    }
  },
  getGames: async (username: string) => {
    try {
      const response = await api.get(`/game/user/${username}`)
      set({
        games: response.data.data,
      })
    } catch (error) {
      toaster.create({
        title: "Ошибка",
        description: "Произошла ошибка при загрузке матчей.",
        type: "error",
      })
    }
  },
  getInfoByUsername: async (username: string) => {
    try {
      const response = await api.get(`/user/stats/${username}`)
      set({
        profile: response.data.data,
        isLoading: false,
      })
    } catch (error: any) {
      toaster.create({
        title: "Ошибка",
        description: error.response?.data?.message || "Что-то пошло не так...",
        type: "error",
      })
    }
  },
}))
