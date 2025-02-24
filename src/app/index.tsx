import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { Core } from "@app/core"

const root = document.querySelector("#app")

if (!root) {
  throw new Error("Root Element not found!")
}


createRoot(root).render(
  <StrictMode>
    <Core />
  </StrictMode>,
)
