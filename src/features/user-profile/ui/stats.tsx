import { Box, Flex, Grid, Text } from "@chakra-ui/react"
import { useColorModeValue } from "@components/ui/color-mode"
import { statsModel } from "@features/user-profile/model"

export const StatsContent = ({ payload }: { payload: any }) => {
  const stats = statsModel(payload)

  const bgColor = useColorModeValue("white", "#0d0d0d")
  const cardBgColor = useColorModeValue("white", "#141414")
  const textColor = useColorModeValue("blackAlpha.900", "#ffffff")
  const borderColor = useColorModeValue("gray.100", "#1a1a1a")
  const secondaryTextColor = useColorModeValue("gray.900", "#808080")

  return (
    <Flex justifyContent="center" paddingY={4}>
      <Flex
        direction="column"
        border="1px solid"
        borderColor={borderColor}
        minWidth={1200}
        gap="2"
        bg={bgColor}
        p={6}
        borderRadius="md"
      >
        <Text fontWeight={600} color={textColor}>
          Сезонная статистика
        </Text>
        <Grid
          templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(5, 1fr)" }}
          gap={4}
        >
          {stats.map((stat, index) => (
            <BoxCard
              key={index}
              title={stat.title}
              value={stat.value}
              bgColor={cardBgColor}
              borderColor={borderColor}
              textColor={textColor}
              secondaryTextColor={secondaryTextColor}
            />
          ))}
        </Grid>
      </Flex>
    </Flex>
  )
}

export const BoxCard = ({
  title,
  value,
  bgColor,
  borderColor,
  textColor,
  secondaryTextColor,
}: {
  title: string
  value: string | number
  bgColor: string
  borderColor: string
  textColor: string
  secondaryTextColor: string
}) => {
  return (
    <Box
      borderRadius="md"
      p={4}
      px={2}
      display="flex"
      border="1px solid"
      borderColor={borderColor}
      flexDirection="column"
      alignItems="center"
      bg={bgColor}
      _hover={{
        cursor: "pointer",
        filter: useColorModeValue("brightness(0.95)", "brightness(1.1)"),
        transition: "filter 0.3s ease",
      }}
    >
      <Text fontSize="md" fontWeight="bold" color={textColor}>
        {value}
      </Text>
      <Text fontSize="sm" color={secondaryTextColor}>
        {title}
      </Text>
    </Box>
  )
}
