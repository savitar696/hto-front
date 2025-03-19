import { useLayout } from "@shared/lib/hooks/useLayout";
import { Logo } from "@shared/ui";
import React, { FC, Fragment, useEffect, useLayoutEffect } from "react";

import { NotFound } from "../namespaces/notFound/NotFound";
import style from "./Preloader.module.scss";

interface PreloaderI {
  query: Promise<any>;
  state: { value: any; setState: any };

  children: React.ReactNode;
}

export const Preloader: FC<PreloaderI> = ({ query, children, state }) => {
  const { state: layout } = useLayout();

  useLayoutEffect(() => {
    query
      .then((response) => {
        state.setState(response.data);
      })
      .catch((e) => {
        state.setState(e);
      });
  }, []);

  useEffect(() => {
    if (state.value.success) {
    } else {
      if (state.value.code == "ECONNABORTED") {
        setTimeout(() => {
          window.location.reload();
        }, 1);
      }
    }
  }, [state.value]);

  return state.value.error ? (
    <NotFound.Body
      title={`${state.value.error.code}xx`}
      description={state.value.error.message}
    />
  ) : state.value?.user ? (
    <Fragment>{children}</Fragment>
  ) : (
    <div className={style.preloader} style={{ background: "white" }}>
      <Logo type={"mark"} color={"black"} height={140} />
    </div>
  );
};
