import React, { FC, Fragment, useRef } from "react";

import style from "./Popover.module.scss";

interface Popover {
  state: {
    value: Array<{ index: string; value: boolean }>;
    setState: React.Dispatch<React.SetStateAction<any>>;
  };

  anchor: React.CElement<any, any>;
  children: React.ReactNode;
  ref?: any;
}

export const Popover: FC<Popover> = ({ state, ref, anchor, children }) => {
  const contentRef: any = useRef(0);
  const wrapperRef: any = useRef(0);
  const [indexState, setIndexState]: any = React.useState(0);
  const candidate = state.value.find(
    (obj) => obj.index === wrapperRef.current?.textContent
  );

  const openPopover = () => {
    if (!candidate) return;

    const updatedState = state.value.map((item) => ({
      ...item,
      value: item.index === candidate.index ? !item.value : false,
    }));
    setIndexState(indexState);
    state.setState(updatedState);
  };

  return (
    <Fragment>
      <div className={style.popoverWrapper} ref={wrapperRef}>
        <div onClick={openPopover} ref={ref}>
          {anchor}
        </div>

        <div
          ref={contentRef}
          style={{
            transform: `translateY(60px)`,
            position: "absolute",
            zIndex: 100,
            display:
              indexState !== null
                ? state.value[indexState].value
                  ? "flex"
                  : "none"
                : "none",
          }}
        >
          {children}
        </div>
      </div>
    </Fragment>
  );
};

export const PopoverWrapper: FC<{
  children: React.ReactNode;
  styles?: any;
}> = ({ children, styles }) => {
  return (
    <div className={style.popoverContent} style={{ ...styles }}>
      {children}
    </div>
  );
};
