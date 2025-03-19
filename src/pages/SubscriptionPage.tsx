import { Subscription } from "@components/namespaces/subscription/Subscription";
import { Container } from "@components/ui/container/Container";
import { useLayout } from "@shared/lib/hooks/useLayout";
import React, { FC, Fragment, useLayoutEffect } from "react";

export const SubscriptionPage: FC = () => {
  const { state: layout } = useLayout();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    layout.footer.topPeace.set(true);
    layout.footer.state.set(false);
    layout.container.set(false);
  }, [layout.container, layout.footer.state, layout.footer.topPeace]);

  return (
    <Fragment>
      <Subscription.Intro />
      <Container>
        <Subscription.Slides>
          <Subscription.ExclusiveIcon />
          <Subscription.PremiumMatchmaking />
          <Subscription.PriorityCaptain />
          <Subscription.AnimatedWallpaper />
        </Subscription.Slides>
      </Container>
    </Fragment>
  );
};
