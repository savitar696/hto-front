import { modalAnimation, opacityAnimation } from "@shared/lib/utils/Animations";
import disableScroll from "disable-scroll";
import { AnimatePresence, motion } from "framer-motion";
import React, {
  FC,
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";

import { CloseIcon } from "../icons/Icons";
import { Button } from "../ui/button/Button";
import style from "./Modal.module.scss";

interface Modal {
  width?: number;
  height?: number;
  scroll?: string;
  children?: React.ReactNode;
  state?: boolean;
  setState?: any;
}

export namespace Modal {
  export const BackDrop: FC<Modal> = ({ children, state, setState }) => {
    const escFunction = useCallback(
      (event: any) => {
        if (event.key === "Escape") {
          setState(false);
        }
      },
      [setState]
    );

    useLayoutEffect(() => {
      if (state) {
        disableScroll.on();
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";
      } else {
        disableScroll.off();
        document.body.style.overflow = "visible";
      }
    }, [state]);

    useEffect(() => {
      document.addEventListener("keydown", escFunction, false);

      return () => {
        document.removeEventListener("keydown", escFunction, false);
      };
    }, [escFunction]);

    return (
      <AnimatePresence>
        {state && (
          <motion.div
            variants={opacityAnimation}
            initial={"initial"}
            animate={"animate"}
            exit={"exit"}
            className={style.backdrop}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  export const Wrapper: FC<Modal> = ({ children, setState }) => {
    return (
      <div className={style.wrapper}>
        <div className={style.buttonWrapper}>
          <Button
            onClick={() => setState(false)}
            styles={{
              color: "var(--white100)",
              borderColor: "var(--white08)",
              height: "40px",
              width: "40px",
              padding: "0",
            }}
          >
            <CloseIcon width={22} height={22} />
          </Button>
        </div>
        {children}
      </div>
    );
  };

  export const Content: FC<Modal> = ({ width, height, setState, children }) => {
    return (
      <Fragment>
        <div className={style.spaceArea} onClick={() => setState(false)}></div>

        <motion.div
          variants={modalAnimation}
          initial={"initial"}
          animate={"animate"}
          exit={"exit"}
          className={style.modal}
          style={{ height: height, width: width }}
        >
          {children}
        </motion.div>
      </Fragment>
    );
  };
}
