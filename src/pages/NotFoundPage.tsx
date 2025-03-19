import { NotFound } from "@components/namespaces/notFound/NotFound";
import { useLayout } from "@shared/lib/hooks/useLayout";
import React, { FC, useLayoutEffect } from "react";

export const NotFoundPage: FC = () => {
  const { state: layout } = useLayout();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    layout.footer.topPeace.set(false);
    layout.footer.state.set(true);
  }, [layout.footer.state, layout.footer.topPeace]);

  return (
    <div style={{ minHeight: "calc(100vh - 321px)" }}>
      <NotFound.Body
        title={"Ошибка"}
        description={"Мы не можем найти страницу, которую вы ищете"}
      />
    </div>
  );
};
