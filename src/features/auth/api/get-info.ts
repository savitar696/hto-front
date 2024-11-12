import { setAuth, setLoading, setUserProfile, useUserStore } from "@entities/user/model"
import { FC, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useLogout } from "./logout"
import { useGetUsersMe } from "@shared/api"

type RefetchInterval = () => number | false

export interface GetInfoParameters {
  refetchInterval?: number | RefetchInterval
  enabled?: boolean
}

export const useGetInfo = (params?: GetInfoParameters) => {
    const dispatch = useDispatch()
    const { isAuth } = useUserStore()
    const {logout} = useLogout()

    const { data, loading, error, refetch } = useGetUsersMe();

      useEffect(() => {
        if (data && !data.error) {
            // const roles = data.roles?.map((role) => role.name) ?? [];
            dispatch(setUserProfile(data));
            dispatch(setAuth(true));
        }
      }, [data])

      useEffect(() => {
        if (isAuth) {
            refetch();
        }

        dispatch(setLoading(loading));
      }, [isAuth, loading])

      useEffect(() => {
        if (error) {
            console.error('new error ')
            logout();
        }
      }, [])

      return refetch
}
