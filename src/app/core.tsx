import { BrowserRouter } from "react-router-dom"
import { withProviders } from "./providers"
import { AppRouter } from "./routing"
import { AuthProvider } from "./providers/with-auth"
import "./styles/global.css"
import { MatchStatusWidget } from "@widgets/show-match-status"

export const Core = withProviders(() => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
        <MatchStatusWidget />
      </AuthProvider>
    </BrowserRouter>
  )
})
