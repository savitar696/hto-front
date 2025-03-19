import { ComponentInterface } from "@shared/lib/types";
import React, { FC, HTMLAttributes } from "react";

import style from "./Button.module.scss";

export const Button: FC<
  ComponentInterface & HTMLAttributes<HTMLButtonElement>
> = ({ children, styles, onClick, ...other }) => {
  return (
    <button
      className={style.button}
      style={styles}
      onClick={onClick}
      {...other}
    >
      {children}
    </button>
  );
};
