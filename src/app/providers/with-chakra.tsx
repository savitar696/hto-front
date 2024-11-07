import { system } from "@app/styles/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider } from "@components/ui/color-mode";
import { ReactElement } from "react";

export const withChakra = (component: () => ReactElement) => () => (
    <ChakraProvider value={system}>
        <ColorModeProvider>{component()}</ColorModeProvider>
    </ChakraProvider>
)
