import {
  FC,
  ButtonHTMLAttributes,
  CSSProperties,
  ReactNode,
  MouseEvent,
} from "react"
import style from "./Button.module.scss"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
  styles?: CSSProperties
  isFullWidth?: boolean
  isDisabled?: boolean
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  className?: string
}

export const Button: FC<ButtonProps> = ({
  children,
  styles,
  onClick,
  variant = "primary",
  size = "md",
  isFullWidth = false,
  isDisabled,
  isLoading,
  leftIcon,
  rightIcon,
  className,
  ...other
}) => {
  const buttonClasses = [
    style.button,
    style[`button-${variant}`],
    style[`button-${size}`],
    isFullWidth ? style.fullWidth : "",
    isLoading ? style.loading : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <button
      className={buttonClasses}
      style={styles}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      {...other}
    >
      {isLoading && <span className={style.spinner} />}
      {leftIcon && <span className={style.leftIcon}>{leftIcon}</span>}
      {children}
      {rightIcon && <span className={style.rightIcon}>{rightIcon}</span>}
    </button>
  )
}
