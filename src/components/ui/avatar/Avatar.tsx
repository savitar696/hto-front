import React, { FC } from "react";

import { ComponentInterface } from "../../../shared/lib/types";
import { PremiumBackgroundGradient } from "../../icons/Icons";
import style from "./Avatar.module.scss";

interface Avatar extends ComponentInterface {
  username: string | undefined;
  data?: any;
  size?: number;
  heightPremium?: number;
  widthPremium?: number;
  permanentPremium?: boolean;
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
      ) : (
        "Logitech_GHUB" == username && (
          <div className={style.icon}>
            <PremiumBackgroundGradient
              width={widthPremium}
              height={heightPremium}
            />
          </div>
        )
      )}
    </div>
  );
};
