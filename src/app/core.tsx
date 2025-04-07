import { BrowserRouter } from "react-router-dom"
import { withProviders } from "./providers"
import { AppRouter } from "./routing"
import { AuthProvider } from "./providers/with-auth"
import "@shared/static/styles/global.scss"
import { useEffect } from "react"

export const Core = withProviders(() => {
  useEffect(() => {
    localStorage.setItem("theme", "light")
  }, [])

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  )
})
