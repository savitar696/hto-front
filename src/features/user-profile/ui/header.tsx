import { Box, Flex, Text } from "@chakra-ui/react"
import { Avatar } from "@components/avatar"
import { Status } from "@chakra-ui/react"
import { useColorMode, useColorModeValue } from "@components/ui/color-mode"
import { GradientText } from "@shared/ui/premium-text/ui"
import { useRoleConfig } from "@shared/lib/hooks/use-role"

export const ProfileHeader = ({ payload }: { payload: any }) => {
  const bgColor = useColorModeValue("white", "#0d0d0d")
  const textColor = useColorModeValue("blackAlpha.700", "#ffffff")
  const secondaryTextColor = useColorModeValue("gray.600", "#808080")
  const borderColor = useColorModeValue("gray.100", "#1a1a1a")
  const userRole = useRoleConfig(payload.roles[0].name)
  const theme = localStorage.getItem('theme')


  return (
    <Flex justifyContent="center" paddingY={4}>
      <Box
        border="2px solid"
        borderColor={borderColor}
        style={{
          borderRadius: "16px",
          backgroundImage:
          payload.profile.name === "Gotwet"
            ? theme === "dark"
              ? "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(https://i.imgur.com/byp8jVv.png)"
              : "linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.9)), url(https://i.imgur.com/byp8jVv.png)"
            : "none",
          backgroundRepeat: payload.profile.name === "Gotwet" ? "no-repeat" : "none",
          backgroundSize: payload.profile.name === "Gotwet" ? "cover" : "none",
          backgroundColor: bgColor,
        }}
        minWidth={1200}
        padding={6}
        paddingY={8}
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center" gap={4} flexDirection={"row"}>
            <Avatar
              username={payload.profile.name}
              permanentPremium={payload.premium}
              styles={{ width: "4rem", height: "4rem", borderRadius: "12px" }}
            />
            <Flex flexDirection={"column"} lineHeight={1.15}>
              <Text
                color={userRole.color ? userRole.color : secondaryTextColor}
                style={{ fontSize: "16px", fontWeight: 500 }}
              >
                {userRole.text}
              </Text>
              {payload.premium ? (
                <GradientText fontSize="22px" fontWeight="bold">
                  {payload.profile.name}
                </GradientText>
              ) : (
                <Text style={{ fontWeight: 600, fontSize: "22px" }}>
                  {payload.profile.name}
                </Text>
              )}
            </Flex>
          </Flex>
          {/* raiting, playing time, status */}
          <Flex flexDirection={"row"} gap={12}>
            <Flex flexDirection={"column"}>
              <Text style={{ fontSize: "14px" }} color={secondaryTextColor}>
                Рейтинг
              </Text>
              <Text fontWeight={500} color={textColor}>
                {payload.rating}
              </Text>
            </Flex>
            <Flex flexDirection={"column"}>
              <Text style={{ fontSize: "14px" }} color={secondaryTextColor}>
                Наиграно времени
              </Text>
              <Text fontWeight={500} color={textColor}>
                {(payload.time_played / 60).toFixed(0)} мин.
              </Text>
            </Flex>
            <Flex flexDirection={"column"}>
              <Text style={{ fontSize: "14px" }} color={secondaryTextColor}>
                Статус
              </Text>
              <Status.Root colorPalette={payload.online ? "green" : "red"}>
                <Status.Indicator />
                <Text fontWeight={500} fontSize={"16px"} color={textColor}>
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
