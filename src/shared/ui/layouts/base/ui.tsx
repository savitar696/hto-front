import { type FC, Fragment, PropsWithChildren } from "react";
import { ContentSlot, HeaderSlot, ShellSlot } from "../slots";
import { Container } from "@chakra-ui/react";
import { Toaster } from "@components/ui/toaster";

export const BaseLayout: FC<PropsWithChildren> = ({ children }) => (
  <Fragment>
    <ShellSlot.Renderer childs={children} />
    <HeaderSlot.Renderer childs={children} />
    <Container>
      <ContentSlot.Renderer childs={children} />
    </Container>
    <Toaster />
  </Fragment>
);
