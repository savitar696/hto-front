import { FC } from "react";

import rainbowBackground from "../../../static/images/rainbowBackground.svg";
import style from "./RainbowBackground.module.scss";

interface RainbowBackground {
  width?: number;
  height?: number;
  opacity?: number;
}

export const RainbowBackground: FC<RainbowBackground> = ({
  width,
  height,
  opacity,
}) => {
  return (
    <img
      style={{
        width: width ? width : "100%",
        height: height ? height : "100%",
        opacity: opacity ? opacity : "100%",
      }}
      src={rainbowBackground}
      alt=""
    />
  );
};
