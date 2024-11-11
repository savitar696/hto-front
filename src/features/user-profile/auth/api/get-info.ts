import { setAuth, setLoading, setUserProfile, useUserStore } from "@entities/user/model"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export const useGetInfo = () => {
    const dispatch = useDispatch()
    const { isAuth } = useUserStore()

    const profile = {
        username: "sakominov",
        rating: 1200,
        warnings: [],
        matchStats: {
          matchesPlayed: 150,
          matchesWon: 80,
          matchesLost: 70,
          killCount: 230,
          deathCount: 90,
          bedDestroyed: 25,
          winRate: 53.33,
        },
      };
      useEffect(() => {
        dispatch(setUserProfile(profile));
        dispatch(setAuth(true));
        dispatch(setLoading(false));
      }, [isAuth])
}
