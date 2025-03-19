import { Container } from "@components/ui/container/Container";
import { FooterComponents } from "@widgets/footer/footer.components";
import React, { FC, HTMLAttributes } from "react";

export const Footer: FC<
  HTMLAttributes<HTMLDivElement> & { topPeace?: boolean }
> = ({ topPeace }) => {
  return (
    <Container>
      <footer>
        <FooterComponents.Header topPeace={topPeace}>
          <FooterComponents.Wallpaper />
          <FooterComponents.Links />
          <FooterComponents.Other />
          <FooterComponents.Community />
        </FooterComponents.Header>
        <FooterComponents.Footer />
      </footer>
    </Container>
  );
};
