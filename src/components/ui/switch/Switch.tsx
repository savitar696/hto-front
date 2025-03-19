import { motion } from "framer-motion";
import React from "react";

import style from "./Switch.module.scss";

interface SwitchInterface {
  disabled?: boolean;
  state: { value: boolean; setHandler: React.Dispatch<any> };
}

export const Switch: React.FunctionComponent<SwitchInterface> = ({ state }) => {
  return (
    <div
      className={style.buttons}
      data-enabled={state.value}
      onClick={() => state.setHandler(!state.value)}
    >
      <div className={style.buttonSlider}>
        <motion.div className={style.circle} layout></motion.div>
      </div>
    </div>
  );
};
