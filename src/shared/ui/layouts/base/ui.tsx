import { type FC, Fragment, PropsWithChildren } from "react"
import { ContentSlot, HeaderSlot, ShellSlot } from "../slots"
import { Toaster } from "react-hot-toast"
import { Container } from "../container"

export const BaseLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Fragment>
      <ShellSlot.Renderer childs={children} />
      <HeaderSlot.Renderer childs={children} />
      <div style={{ minHeight: "calc(100vh - 350px)" }}>
        <Container>
          <ContentSlot.Renderer childs={children} />
        </Container>
      </div>
      <Toaster position={"bottom-right"} reverseOrder={false} />
    </Fragment>
  )
}
