import React, { FC, useLayoutEffect, useRef } from "react";

import { ComponentInterface } from "../../../shared/lib/types";
import style from "./ButtonsSlider.module.scss";

export interface ButtonsSliderI extends ComponentInterface {
  items: Array<{ item: React.ReactNode; index: number }>;
  onStateChanged?: (newState: number) => void;
}

export const ButtonsSlider: FC<ButtonsSliderI> = ({
  styles,
  items,
  onStateChanged,
}) => {
  const [state, setState] = React.useState(0);
  const [width, setWidth] = React.useState(0);
  const ref: any = useRef(null);
  const [matches, setMatches]: any = React.useState(0);

  useLayoutEffect(() => {
    if (ref.current !== null) {
      setWidth(ref.current.offsetWidth);
      const handler = (e: any) => setMatches(e.matches);
      const mediaMatch = window.matchMedia(
        `(max-width: ${ref.current.offsetWidth}px)`
      );
      setMatches(mediaMatch.matches);
      mediaMatch.addListener(handler);
      return () => mediaMatch.removeListener(handler);
    }
  }, []);

  return (
    <div
      className={style.buttonsSlider}
      style={{
        ...styles,
        flexDirection: matches ? "column" : "row",
        gap: matches ? "var(--space-2)" : "var(--space-2)",
        height: matches ? "auto" : styles.height ? styles.height : "60px",
        padding: matches ? "2px" : "4px",
      }}
      ref={ref}
    >
      <div
        style={{
          transform: matches
            ? `translateY(${
                state === 0
                  ? 2
                  : state + 1 === items.length
                  ? state * styles.height
                    ? styles.height
                    : 48 - 2
                  : state * styles.height
                  ? styles.height
                  : 48
              }px)`
            : `translateX(${
                state === 0
                  ? 4
                  : state + 1 === items.length
                  ? (state * width) / items.length - 4
                  : state * 170
              }px)`,
          width: matches ? "100%" : width / items.length,
          position: "absolute",
          height: matches ? "40px" : styles.height ? "84%" : "60px",
          transition: "all 0.15s ease-in-out 0s",
          borderRadius: "14px",
          background: "rgb(255, 255, 255) none repeat scroll 0 0",
        }}
        className={style.background}
      ></div>
      {items.map((item, key: number) => (
        <div
          key={key}
          style={{ display: "flex", width: "100%" }}
          onClick={() => {
            if (onStateChanged != null) {
              onStateChanged(item.index);
            }
            setState(item.index);
          }}
        >
          {item.item}
        </div>
      ))}
    </div>
  );
};
