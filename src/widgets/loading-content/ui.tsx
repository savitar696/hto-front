import { Spinner, Flex, Text } from "@chakra-ui/react"

export const LoadingContent = ({ text }: { text: string }) => {
  return (
    <Flex
        py={36}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Spinner size="xl" animationDelay="0.5s" borderWidth="3px" />
        <Text fontSize="xl" fontWeight={500} mt={4}>
          {text}
        </Text>
      </Flex>
  )
}