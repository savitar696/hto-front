import { FC } from "react"

import style from "./container.module.scss"

interface ContainerI {
  children: React.ReactNode
}

export const Container: FC<ContainerI> = ({ children }) => {
  return <div className={style.container}>{children}</div>
}
