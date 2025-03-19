import { Rules } from "@components/namespaces/rules/Rules";
import { useLayout } from "@shared/lib/hooks/useLayout";
import React, { FC, useLayoutEffect } from "react";

export const RulesPage: FC = () => {
  const { state: layout } = useLayout();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    layout.footer.topPeace.set(false);
    layout.footer.state.set(true);
  }, [layout.footer.state, layout.footer.topPeace]);

  return (
    <div style={{ minHeight: "calc(100vh - 333px)" }}>
      {/* <Rules.Head />
      <Rules.BasicProvisions />
      <Rules.GameProcess />
      <Rules.Communication />
      <Rules.NicknamePrefix />
      <Rules.InteractionAdministration />
      <Rules.YouTube />
      <Rules.CategoryDurationOfViolations />
      <Rules.AppealsProcess /> */}
      <h2>правила проекта хардлиги</h2>
    </div>
  );
};
