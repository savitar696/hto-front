import { Match } from "@components/namespaces/match/Match";
import { useLayout } from "@shared/lib/hooks/useLayout";
import { FC, Fragment, useLayoutEffect } from "react";

export const MatchPage: FC = () => {
  const { state: layout } = useLayout();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    layout.footer.topPeace.set(false);
    layout.footer.state.set(true);
  }, [layout.footer.state, layout.footer.topPeace]);

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-6)",
          minHeight: "calc(100vh - 333px)",
        }}
      >
        <Match.Body />
      </div>
    </Fragment>
  );
};
