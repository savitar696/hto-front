import React, { FC } from "react"

import style from "./Avatar.module.scss"
import { PremiumBackgroundGradient } from "../icons/Icons"
import { ComponentInterface } from "@shared/lib/types"

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
        src={`https://skin.vimeworld.com/helm/${username}.png`}
        alt={username}
      />
      {permanentPremium ? (
        <div className={style.icon}>
          <PremiumBackgroundGradient
            width={widthPremium}
            height={heightPremium}
          />
        </div>
      ) : null}
    </div>
  )
}
