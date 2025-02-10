import { createSystem, defaultConfig } from "@chakra-ui/react"

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        body: { value: `'Inter', sans-serif` },
      },
      colors: {
        background: {
          light: { value: "#E6E6E6" },
          dark: { value: "#0F0F0F" },
        },
        text: {
          light: { value: "#000" },
          dark: { value: "#FFF" },
        },
        white: { value: "#FFFFFF" },
        black: { value: "#000000" },
        whiteShades: {
          50: { value: "#808080" },
          55: { value: "#8C8C8C" },
          60: { value: "#999999" },
          65: { value: "#A6A6A6" },
          70: { value: "#B3B3B3" },
          75: { value: "#BFBFBF" },
          80: { value: "#CCCCCC" },
          90: { value: "#E6E6E6" },
        },
        greyShades: {
          6: { value: "#0F0F0F" },
          10: { value: "#1A1A1A" },
          12: { value: "#1F1F1F" },
          15: { value: "#262626" },
          20: { value: "#333333" },
          25: { value: "#404040" },
          30: { value: "#4C4C4C" },
          40: { value: "#666666" },
        },
      },
      sizes: {
        "3xl": { value: "48rem" },
        "2xl": { value: "42rem" },
        "lg": { value: "32rem" },
      },
    },
  },
})
