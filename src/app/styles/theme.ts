import { createSystem, defaultConfig} from "@chakra-ui/react"

export const system = createSystem(defaultConfig, {
    theme: {
        tokens: {
            fonts: {
                body: { value: `'Inter', sans-serif`}
            }
        },
    },
    globalCss: {
        "html, body": {
            transition: "background-color 0.4s ease, color 0.4s ease",
          },
          "*": {
            transition: "background-color 0.4s ease, color 0.4s ease",
          },
    }
})
