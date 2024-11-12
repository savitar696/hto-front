import i18n from "@shared/lib/config/i18n"
import { ReactElement } from "react"
import { I18nextProvider } from "react-i18next"

export const withI18n = (component: () => ReactElement) => () => (
  <I18nextProvider i18n={i18n}>{component()}</I18nextProvider>
)
