import { create } from "zustand"
import { User } from "./user.types"
import toast from "react-hot-toast"
import { errorToast, successToast } from "@shared/lib/utils"
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
  auth: async (token) => {
    try {
      const { data: newTokenResponse } = await api.post("/auth", { token })

      if (newTokenResponse.status && newTokenResponse.status !== 200) {
        toast.error(newTokenResponse.response.message, errorToast)
        return
      }
      localStorage.setItem("token", newTokenResponse)

      const { data: infoToken } = await api.get("/auth/info", {
        headers: { authorization: `Bearer ${newTokenResponse}` },
      })

      set((state) =>
        state.payload !== infoToken.data
          ? { isAuth: true, payload: infoToken.data }
          : state,
      )

      toast.success(
        `Вы успешно вошли в аккаунт ${infoToken.data.profile.name}`,
        successToast,
      )
    } catch (e: any) {
      if (e.response) {
        toast.error(`${e.response.data.message}`, errorToast)
      } else {
        toast.error("Произошла ошибка, попробуйте снова.", errorToast)
      }
    }
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
