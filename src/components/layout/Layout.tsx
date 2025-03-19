import { NavbarItems } from "@shared/lib/utils";
import React, { FC, Fragment } from "react";
import { Toaster } from "react-hot-toast";

import { Footer } from "../../widgets/footer";
import { Navbar } from "../../widgets/navbar";
import { Container } from "../ui/container/Container";

interface Layout {
  useNavbar: boolean;
  useFooter: { state: boolean; topPeace: boolean };
  children: React.ReactNode;
  useContainer: boolean;
}

export const Layout: FC<Layout> = ({
  children,
  useFooter,
  useContainer,
  useNavbar,
}) => {
  return (
    <Fragment>
      {useNavbar && <Navbar items={NavbarItems} />}
      {useContainer ? (
        <div style={{ minHeight: "calc(100vh - 350px)" }}>
          <Container>{children}</Container>
        </div>
      ) : (
        <Fragment>{children}</Fragment>
      )}
      {useFooter.state && <Footer topPeace={useFooter.topPeace} />}

      <Toaster position={"bottom-right"} reverseOrder={false} />
    </Fragment>
  );
};
