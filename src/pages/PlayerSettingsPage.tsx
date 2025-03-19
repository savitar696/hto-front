import { PlayerSettings } from "@components/namespaces/playerSettings/PlayerSettings";
import { useLayout } from "@shared/lib/hooks/useLayout";
import React, { FC, useLayoutEffect } from "react";

export const PlayerSettingsPage: FC = () => {
  const { state: layout } = useLayout();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    layout.footer.topPeace.set(false);
    layout.footer.state.set(true);
  }, [layout.footer.state, layout.footer.topPeace]);

  return (
    <div style={{ minHeight: "calc(100vh - 321px)" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-10)",
        }}
      >
        <PlayerSettings.Head />
        <PlayerSettings.Body />
      </div>
    </div>
  );
};
