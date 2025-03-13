import disableScroll from "disable-scroll"
import { AnimatePresence, motion } from "framer-motion"
import React, { FC, useCallback, useEffect, useLayoutEffect } from "react"

import { CloseIcon } from "../icons/Icons"
import style from "./Modal.module.scss"
import { modalAnimation, opacityAnimation } from "@shared/lib/utils"
import { Button } from "../button"

interface ModalProps {
  width?: number
  height?: number
  scroll?: string
  children?: React.ReactNode | null
  state?: boolean
  setState?: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalBackDrop: FC<ModalProps> = ({
  children,
  state,
  setState,
}) => {
  const escFunction = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && setState) {
        setState(false)
      }
    },
    [setState],
  )

  useLayoutEffect(() => {
    if (state) {
      disableScroll.on()
      document.body.style.overflow = "hidden"
      document.body.style.height = "100vh"
    } else {
      disableScroll.off()
      document.body.style.overflow = "visible"
    }
  }, [state])

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false)

    return () => {
      document.removeEventListener("keydown", escFunction, false)
    }
  }, [escFunction])

  return (
    <AnimatePresence>
      {state && (
        <motion.div
          variants={opacityAnimation}
          initial={"initial"}
          animate={"animate"}
          exit={"exit"}
          className={style.backdrop}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const ModalWrapper: FC<ModalProps> = ({ children, setState }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.buttonWrapper}>
        <Button
          onClick={() => setState && setState(false)}
          styles={{
            color: "var(--white100)",
            borderColor: "var(--white08)",
            height: "40px",
            width: "40px",
            padding: "0",
          }}
        >
          <CloseIcon width={22} height={22} />
        </Button>
      </div>
      {children}
    </div>
  )
}

export const ModalContent: FC<ModalProps> = ({
  width,
  height,
  setState,
  children,
}) => {
  return (
    <>
      <div
        className={style.spaceArea}
        onClick={() => setState && setState(false)}
      ></div>

      <motion.div
        variants={modalAnimation}
        initial={"initial"}
        animate={"animate"}
        exit={"exit"}
        className={style.modal}
        style={{ height: height, width: width }}
      >
        {children}
      </motion.div>
    </>
  )
}
