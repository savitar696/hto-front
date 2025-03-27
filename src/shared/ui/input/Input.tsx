import { motion } from "framer-motion"
import React, {
  ChangeEventHandler,
  FC,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
} from "react"

import { ComponentInterface } from "../../../shared/lib/types"
import style from "./Input.module.scss"

interface InputI extends ComponentInterface {
  onChange?: ChangeEventHandler<HTMLInputElement>
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>
  className?: string

  placeholder: string
  icon?: { position: string; item: React.CElement<any, any> }
  options: { useFocus: boolean }
  additionalComponent?: { element: React.CElement<any, any>; state: boolean }
}

export const Input: FC<InputI> = ({
  placeholder,
  onChange,
  className,
  options,
  onKeyDown,
  icon,
  styles,
  onClick,
  additionalComponent,
}) => {
  const Ref = useRef() as React.MutableRefObject<HTMLInputElement>

  const focusHandler = useCallback((event: any) => {
    if (event.key === "f") {
      Ref.current.focus()
    }
  }, [])

  useEffect(() => {
    if (options.useFocus) {
      document.addEventListener("keydown", focusHandler, false)

      return () => {
        document.removeEventListener("keydown", focusHandler, false)
      }
    }
  }, [focusHandler, options.useFocus])

  return (
    <motion.div>
      <div
        onClick={onClick}
        className={
          className ? `${style.inputWrapper} ${className}` : style.inputWrapper
        }
        style={{ ...styles }}
      >
        {icon && icon.position === "left" ? (
          <div className={style.iconLeft}>{icon.item}</div>
        ) : null}
        <input
          type="text"
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          onChange={onChange}
          className={style.input}
          ref={Ref}
        />
        {options.useFocus && <button className={style.iconRight}></button>}
      </div>
      {additionalComponent &&
        additionalComponent.state &&
        additionalComponent.element}
    </motion.div>
  )
}
