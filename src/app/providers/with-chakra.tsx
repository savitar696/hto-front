import { config } from "@app/styles/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactElement } from "react";

export const withChakra = (component: () => ReactElement) => () => (
    <ChakraProvider value={config}>{component()}</ChakraProvider>
)
