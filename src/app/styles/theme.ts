import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        body: { value: `'Inter', sans-serif` },
      },
      sizes: {
        "3xl": { value: "48rem" },
      },
    },
  },
  globalCss: {
    "html, body": {
      transition: "background-color 0.4s ease, color 0.4s ease",
      fontFamily: "'Inter', sans-serif",
    },
    "*": {
      transition: "background-color 0.4s ease, color 0.4s ease",
      fontFamily: "'Inter', sans-serif",
    },
  },
});
