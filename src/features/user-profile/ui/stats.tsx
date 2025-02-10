import { Box, Flex, Grid, Text } from "@chakra-ui/react"
import { statsModel } from "@features/user-profile/model"

export const StatsContent = ({ payload }: { payload: any }) => {
  const stats = statsModel(payload)
  return (
    <Flex justifyContent="center" paddingY={4}>
      <Flex direction="column" minWidth={1200} gap="2">
        <Text fontWeight={600}>Сезонная статистика</Text>
        <Grid templateColumns="repeat(auto-fit, minmax(150px, 1fr))" gap={4}>
          {stats.map((stat, index) => (
            <BoxCard key={index} title={stat.title} value={stat.value} />
          ))}
        </Grid>
      </Flex>
    </Flex>
  )
}

export const BoxCard = ({
  title,
  value,
}: {
  title: string
  value: string | number
}) => {
  return (
    <Box
      borderRadius="md"
      p={4}
      px={8}
      display="flex"
      border="1px solid"
      borderColor={"gray.100"}
      flexDirection="column"
      alignItems="center"
    >
      <Text fontSize="md" fontWeight="bold">
        {value}
      </Text>
      <Text fontSize="sm" color="gray.900">
        {title}
      </Text>
    </Box>
  )
}
