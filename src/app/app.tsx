import "@shared/static/styles/global.scss";

import { Router } from "@app/router/router";
import { Layout } from "@components/layout/Layout";
import { useUser } from "@entities/user";
import { useLayout } from "@shared/lib/hooks/useLayout";
import React, { FC, useEffect } from "react";
import { shallow } from "zustand/shallow";

export const App: FC = () => {
  const { state } = useLayout();

  const getInfo = useUser((state) => state.getInfo, shallow);
  const stableGetInfo = React.useCallback(() => getInfo(), [getInfo]);

  useEffect(() => {
    stableGetInfo();
  }, [stableGetInfo]);

  return (
    <Layout
      useNavbar={state.header.get()}
      useFooter={state.footer.get()}
      useContainer={state.container.get()}
    >
      <Router />
    </Layout>
  );
};
