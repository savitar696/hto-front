import { create } from "zustand"
import { User } from "./user.types"
import toast from "react-hot-toast"
import { errorToast, promiseToast, successToast } from "@shared/lib/utils"
import { api } from "@shared/api"

export const useUser = create<User>((set) => ({
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
  auth: (token) => {
    const authPromise = (async () => {
      const response = await api.post("/auth", { token })
      localStorage.setItem("token", response.data)

      const infoResponse = await api.get("/auth/info", {
        headers: {
          authorization: `Bearer ${response.data}`,
        },
      })

      set({
        isAuth: true,
        isLoading: false,
        payload: infoResponse.data.data,
      })

      return infoResponse.data
    })()

    return promiseToast(
      authPromise,
      {
        title: "Успех",
        subTitle: "Вы успешно вошли в аккаунт",
      },
      {
        title: "Ошибка",
        subTitle: "Токен является не валидным, попробуйте другой",
      },
      {
        title: "Выполняется вход...",
        subTitle: "Пожалуйста, подождите",
      },
    )
  },
  logout: () => {
    localStorage.setItem("token", "")
    set({
      isAuth: false,
      payload: null,
    })
    toast.success(
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-1)",
        }}
      >
        <span
          style={{
            color: "var(--white100)",
            fontWeight: "var(--fontWeights-semibold)",
          }}
        >
          Успех
        </span>
        <span
          style={{
            color: "var(--white60)",
            fontWeight: "var(--fontWeights-medium)",
            fontSize: "var(--fontSizes-0)",
          }}
        >
          Вы успешно вышли из аккаунта!
        </span>
      </div>,
      successToast,
    )
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
        set({
          isAuth: true,
          isLoading: false,
          payload: response.data.data,
        })
      } catch (error: any) {
        toast.error(
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-1)",
            }}
          >
            <span
              style={{
                color: "var(--white100)",
                fontWeight: "var(--fontWeights-semibold)",
              }}
            >
              Ошибка
            </span>
            <span
              style={{
                color: "var(--white60)",
                fontWeight: "var(--fontWeights-medium)",
                fontSize: "var(--fontSizes-0)",
              }}
            >
              Ваша сессия устарела, попробуйте войти снова
            </span>
          </div>,
          errorToast,
        )
        set({
          isLoading: false,
          isAuth: false,
          payload: null,
        })
      }
    } else {
      set({
        isAuth: false,
        isLoading: false,
      })
    }
  },
}))
