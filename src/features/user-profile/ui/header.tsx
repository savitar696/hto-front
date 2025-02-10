import { Box, Flex, Status, Text } from "@chakra-ui/react"
import { Avatar } from "@components/ui/avatar"

export const ProfileHeader = ({ payload }: { payload: any }) => {
  return (
    <Flex justifyContent="center" paddingY={4}>
      <Box
        border="1px solid"
        borderColor={"gray.100"}
        style={{
          borderRadius: "12px",
        }}
        minWidth={1200}
        padding={6}
      >
        <Flex justifyContent="space-between" alignItems="center">
          {/* avatar, name, rank */}
          <Flex alignItems="center" gap={4} flexDirection={"row"}>
            <Avatar
              size="2xl"
              name={payload.profile.name}
              src={`https://skin.vimeworld.com/helm/${payload.profile.name}.png`}
            />
            <Flex flexDirection={"column"} lineHeight={1.15}>
              <Text
                color="blackAlpha.700"
                style={{ fontSize: "16px", fontWeight: 500 }}
              >
                Пользователь
              </Text>
              <Text style={{ fontWeight: 600, fontSize: "22px" }}>
                {payload.profile.name}
              </Text>
            </Flex>
          </Flex>
          {/* raiting, playing time, status */}
          <Flex flexDirection={"row"} gap={12}>
            <Flex flexDirection={"column"}>
              <Text style={{ fontSize: "14px" }} color={"gray.800"}>
                Рейтинг
              </Text>
              <Text fontWeight={500}>{payload.rating}</Text>
            </Flex>
            <Flex flexDirection={"column"}>
              <Text style={{ fontSize: "14px" }} color={"gray.800"}>
                Наиграно времени
              </Text>
              <Text fontWeight={500}>
                {(payload.time_played / 60).toFixed(0)} мин.
              </Text>
            </Flex>
            <Flex flexDirection={"column"}>
              <Text style={{ fontSize: "14px" }} color={"gray.800"}>
                Статус
              </Text>
              <Status.Root colorPalette={payload.online ? "green" : "red"}>
                <Status.Indicator />
                <Text fontWeight={500} fontSize={"16px"}>
                  {payload.online ? "Онлайн" : "Оффлайн"}
                </Text>
              </Status.Root>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  )
}
