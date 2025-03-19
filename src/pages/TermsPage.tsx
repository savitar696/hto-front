import { Terms } from "@components/namespaces/terms/Terms";
import { useLayout } from "@shared/lib/hooks/useLayout";
import React, { FC, useLayoutEffect } from "react";

export const TermsPage: FC = () => {
  const { state: layout } = useLayout();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    layout.footer.topPeace.set(false);
    layout.footer.state.set(true);
  }, [layout.footer.state, layout.footer.topPeace]);

  return (
    <div style={{ minHeight: "calc(100vh - 333px)" }}>
      <Terms.Head />
      <Terms.Terminology />
      <Terms.General />
      <Terms.Rules />
      <Terms.Permission />
      <Terms.OrderOfEntry />
      <Terms.Responsibilities />
      <Terms.ForceMajeure />
      <Terms.Copyright />
      <Terms.DisclaimerOfWarranties />
      <Terms.Donate />
      <Terms.Provisions />
    </div>
  );
};
