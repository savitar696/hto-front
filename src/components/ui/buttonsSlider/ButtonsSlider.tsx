import React, { FC, useLayoutEffect, useRef, useState, useEffect } from "react";

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
  const [state, setState] = useState(0);
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const [matches, setMatches] = useState(false);

  useLayoutEffect(() => {
    const updateWidth = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${width}px)`);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);

    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, [width]);

  return (
    <div
      className={style.buttonsSlider}
      style={{
        ...styles,
        flexDirection: matches ? "column" : "row",
        gap: "var(--space-2)",
        height: matches ? "auto" : styles.height ?? "60px",
        padding: matches ? "2px" : "4px",
      }}
      ref={ref}
    >
      <div
        style={{
          transform: matches
            ? `translateY(${state * (styles.height ?? 48)}px)`
            : `translateX(${(state * width) / items.length}px)`,
          width: matches ? "100%" : `${width / items.length}px`,
          position: "absolute",
          height: matches ? "40px" : styles.height ? "84%" : "60px",
          transition: "all 0.15s ease-in-out",
          borderRadius: "14px",
          background: "rgb(255, 255, 255)",
        }}
        className={style.background}
      />
      {items.map((item) => (
        <div
          key={item.index}
          style={{ display: "flex", width: "100%" }}
          onClick={() => {
            onStateChanged?.(item.index);
            setState(item.index);
          }}
        >
          {item.item}
        </div>
      ))}
    </div>
  );
};
