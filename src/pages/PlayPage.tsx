import { Play } from "@components/namespaces/play/Play";
import { useUser } from "@entities/user";
import { useLayout } from "@shared/lib/hooks/useLayout";
import React, { FC, Fragment, useEffect, useLayoutEffect } from "react";
import { shallow } from "zustand/shallow";

export const PlayPage: FC = () => {
  const { state: layout } = useLayout();
  const payload = useUser((state) => state.payload, shallow);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    layout.footer.topPeace.set(false);
    layout.footer.state.set(true);
  }, [layout.footer.state, layout.footer.topPeace]);

  return (
    <Fragment>
      <Play.Head />
      <Play.Body payload={payload} />
    </Fragment>
  );
};
