import { BrowserRouter} from "react-router-dom"
import { withProviders } from "./providers"
import { AppRouter } from "./routing"

export const Core = withProviders(() => {
    return (
      <BrowserRouter>
          <AppRouter />
      </BrowserRouter>
    )
  })
