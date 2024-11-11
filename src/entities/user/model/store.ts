import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "@shared/lib/hooks/use-redux";

export enum Roles {
  ADMIN = "Админ",
  DEV = "Разработчик",
  PLAYER = "Игрок"
}

export interface Warning {
    name: string;
    description: string;
    dateTime: string;
    whoGave: string;
    finalDate: string;
  }

export interface UserProfile {
    username: string;
    rating: number;
    warnings: Warning[];
}

export interface UserSliceState {
    profile: UserProfile
    roles: Roles[]
    isAuth: boolean
    loading: boolean
}

const initialState: UserSliceState = {
    profile: {} as UserProfile,
    roles: [],
    isAuth: false,
    loading: true,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
            state.profile = {
                ...state.profile,
                ...action.payload,
            }
          },
          setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
          },
          setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
          },
    }
})

export const { setAuth, setUserProfile, setLoading } = userSlice.actions
export const useUserStore = () => useSelector((state) => state.user)

export default userSlice.reducer
