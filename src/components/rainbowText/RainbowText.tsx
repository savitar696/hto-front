import React, { FC } from "react";

import { ComponentInterface } from "../../shared/lib/types";
import style from "./RainbowText.module.scss";

interface RainbowText extends ComponentInterface {
  blur: boolean;
}

export const RainbowText: FC<RainbowText> = ({
  children,
  blur,
  styles,
  className,
}) => {
  return (
    <span
      className={
        className
          ? `${style.textGradientAll} ${className}`
          : style.textGradientAll
      }
      style={styles}
    >
      <span className={style.textGradient}>{children}</span>
      {blur && <span className={style.textGradientBlur}>{children}</span>}
    </span>
  );
};
