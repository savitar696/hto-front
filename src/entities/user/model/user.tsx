import { errorToast, successToast } from "@shared/lib/utils/Theme";
import toast from "react-hot-toast";
import { create } from "zustand";
import { api } from "@shared/api/api.instance";
import { User } from "./user.types";

export const useUser = create<User>()((set, get) => ({
  isAuth: false,
  payload: null,
  profile: {},
  games: [],
  isLoading: true,

  setAuth: (value) => set({ isAuth: value }),
  setPayload: (payload) => set({ payload }),
  setProfile: (profile) => set({ profile }),

  auth: async (token) => {
    try {
      const { data: newTokenResponse } = await api.post("/auth", { token });

      if (newTokenResponse.status && newTokenResponse.status !== 200) {
        toast.error(newTokenResponse.response.message, errorToast);
        return;
      }
      localStorage.setItem("token", newTokenResponse);

      const { data: infoToken } = await api.get("/auth/info", {
        headers: { authorization: `Bearer ${newTokenResponse}` },
      });

      set((state) =>
        state.payload !== infoToken.data
          ? { isAuth: true, payload: infoToken.data }
          : state
      );

      toast.success(
        `Вы успешно вошли в аккаунт ${infoToken.data.profile.name}`,
        successToast
      );
    } catch (e: any) {
      if (e.response) {
        toast.error(`${e.response.data.message}`, errorToast);
      } else {
        toast.error("Произошла ошибка, попробуйте снова.", errorToast);
      }
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ isAuth: false, payload: null });
    toast.success("Вы успешно вышли из аккаунта!", successToast);
  },

  getInfo: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const { data } = await api.get("/auth/info", {
        headers: { authorization: `Bearer ${token}` },
      });
      set((state) =>
        state.payload !== data.data
          ? { isAuth: true, payload: data.data }
          : state
      );
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Что-то пошло не так...",
        errorToast
      );
      localStorage.removeItem("token");
    }
  },

  getGames: async (username) => {
    try {
      const { data } = await api.get(`/game/user/${username}`);
      set({ games: data.data });
    } catch {}
  },

  getInfoByUsername: async (username) => {
    try {
      const { data } = await api.get(`/user/stats/${username}`);
      set({ profile: data.data, isLoading: false });
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Что-то пошло не так...",
        errorToast
      );
    }
  },
}));
