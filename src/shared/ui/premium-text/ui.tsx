import { Text, useToken, TextProps } from "@chakra-ui/react"
import React, { useMemo } from "react"

const gradientShift = `@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

interface GradientTextProps extends TextProps {
  colors?: string[]
  duration?: string
  direction?: string
  children: React.ReactNode
}

export const GradientText: React.FC<GradientTextProps> = ({
  colors = ["purple.500", "teal.300", "blue.500"],
  duration = "3s",
  direction = "90deg",
  children,
  ...rest
}) => {
  const color1 = useToken("colors", colors[0])
  const color2 = useToken("colors", colors[1])
  const color3 = useToken("colors", colors[2])

  const resolvedColors = useMemo(() => {
    return colors.map((color) => {
      switch (color) {
        case colors[0]:
          return color1
        case colors[1]:
          return color2
        case colors[2]:
          return color3
        default:
          return color
      }
    })
  }, [colors, color1, color2, color3])

  return (
    <Text
      {...rest}
      style={{
        background: `linear-gradient(${direction}, ${resolvedColors.join(", ")})`,
        backgroundSize: "200% 200%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        animation: `${gradientShift} ${duration} ease infinite`,
      }}
    >
      {children}
    </Text>
  )
}
