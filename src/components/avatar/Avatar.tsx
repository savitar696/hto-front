import React, { FC, MouseEventHandler } from "react"

import style from "./Avatar.module.scss"
import { PremiumBackgroundGradient } from "@shared/ui/icons/Icons"
export interface ComponentInterface {
  children?: React.ReactNode
  styles?: any
  className?: string
  onClick?: MouseEventHandler<any>
}

interface Avatar extends ComponentInterface {
  username: string | undefined
  data?: any
  size?: number
  heightPremium?: number
  widthPremium?: number
  permanentPremium?: boolean
}

export const Avatar: FC<Avatar> = ({
  username,
  styles,
  widthPremium,
  heightPremium,
  permanentPremium,
}) => {
  return (
    <div className={style.wrapper}>
      <img
        style={{
          borderRadius: "100%",
          ...styles,
        }}
        src={`https://skin.vimeworld.com/head/${username}.png`}
        alt={username}
      />
      {permanentPremium ? (
        <div className={style.icon}>
          <PremiumBackgroundGradient
            width={widthPremium}
            height={heightPremium}
          />
        </div>
      ) : (
        "YaClary" == username && (
          <div className={style.icon}>
            <PremiumBackgroundGradient
              width={widthPremium}
              height={heightPremium}
            />
          </div>
        )
      )}
    </div>
  )
}
