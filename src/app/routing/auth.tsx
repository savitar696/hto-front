import { FC, PropsWithChildren } from "react"
import { paths } from "@shared/router"
import { Loader } from "@shared/ui/loader"
import { Navigate } from "react-router-dom"
import { useUser } from "@entities/user/model"
import { useShallow } from "zustand/react/shallow"

export interface AuthGuardProps extends PropsWithChildren {
  guest?: boolean
  replace?: boolean
  redirect?: string
}

export const AuthGuard: FC<AuthGuardProps> = ({
  children,
  guest = false,
  redirect = paths.index,
  replace = false,
}) => {
  const { isAuth, isLoading } = useUser(useShallow((state) => state))
  if (isLoading) return <Loader />

  if ((!isAuth && !guest) || (isAuth && guest))
    return <Navigate replace={replace} to={redirect} />

  return children
}
