import { MouseEventHandler } from "react"

export interface ComponentInterface {
  children?: React.ReactNode
  styles?: any
  className?: string
  onClick?: MouseEventHandler<any>
}
