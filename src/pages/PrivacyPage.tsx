import { Privacy } from "@components/namespaces/privacy/Privacy";
import { useLayout } from "@shared/lib/hooks/useLayout";
import React, { FC, useLayoutEffect } from "react";

export const PrivacyPage: FC = () => {
  const { state: layout } = useLayout();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    layout.footer.topPeace.set(false);
    layout.footer.state.set(true);
  }, [layout.footer.state, layout.footer.topPeace]);

  return (
    <div style={{ minHeight: "calc(100vh - 333px)" }}>
      <Privacy.Head />
      <Privacy.Terminology />
      <Privacy.General />
      <Privacy.Subject />
      <Privacy.Goals />
      <Privacy.Ways />
      <Privacy.Responsibilities />
      <Privacy.Duties />
      <Privacy.Permission />
      <Privacy.Additional />
    </div>
  );
};
