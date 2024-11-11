import { Box, Spinner } from "@chakra-ui/react";

export const Loader = () => (
  <Box
    position={"fixed"}
    height={"100dvh"}
    width={"100%"}
    display={"flex"}
    justifyContent={"center"}
    alignItems={"center"}
    zIndex={9999}
  >
    <Spinner size="xl" borderWidth="4px" animationDuration="0.8s" />
  </Box>
);
