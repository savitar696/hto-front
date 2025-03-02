import { Box, Flex, Text } from "@chakra-ui/react"
import { Avatar } from "@shared/ui/avatar"
import { Status } from "@chakra-ui/react"
import { useColorModeValue } from "@components/ui/color-mode"
import { GradientText } from "@shared/ui/premium-text/ui"
import { useRoleConfig } from "@shared/lib/hooks/use-role"
import { useMemo } from "react"
import { RoleName } from "@shared/lib/hooks/use-role/roles"

interface ProfileHeaderProps {
  payload: {
    roles: { name: string }[]
    properties: { value: string }[]
    profile: { name: string }
    premium: boolean
    rating: number
    time_played: number
    online: boolean
  }
}

export const ProfileHeader = ({ payload }: ProfileHeaderProps) => {
  const colors = {
    bgColor: useColorModeValue("white", "#0d0d0d"),
    textColor: useColorModeValue("blackAlpha.700", "#ffffff"),
    secondaryTextColor: useColorModeValue("gray.600", "#808080"),
    borderColor: useColorModeValue("gray.100", "#1a1a1a"),
  }

  const userRole = useRoleConfig(payload.roles[0].name as RoleName)
  const theme = localStorage.getItem("theme")
  const urlBanner = useMemo(() => payload.properties[0]?.value || null, [payload.properties])

  return (
    <Flex justifyContent="center" paddingY={4}>
      <Box
        border="2px solid"
        borderColor={colors.borderColor}
        style={{
          borderRadius: "16px",
          backgroundImage: `linear-gradient(rgba(${theme === "dark" ? "0, 0, 0" : "255, 255, 255"}, 0.7), rgba(${theme === "dark" ? "0, 0, 0" : "255, 255, 255"}, 0.9)), url(${urlBanner})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: colors.bgColor,
        }}
        minWidth={1200}
        padding={6}
        paddingY={16}
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
                color={userRole.color || colors.secondaryTextColor}
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
              <Text style={{ fontSize: "14px" }} color={colors.secondaryTextColor}>
                Рейтинг
              </Text>
              <Text fontWeight={500} color={colors.textColor}>
                {payload.rating}
              </Text>
            </Flex>
            <Flex flexDirection={"column"}>
              <Text style={{ fontSize: "14px" }} color={colors.secondaryTextColor}>
                Наиграно времени
              </Text>
              <Text fontWeight={500} color={colors.textColor}>
                {(payload.time_played / 60).toFixed(0)} мин.
              </Text>
            </Flex>
            <Flex flexDirection={"column"}>
              <Text style={{ fontSize: "14px" }} color={colors.secondaryTextColor}>
                Статус
              </Text>
              <Status.Root colorPalette={payload.online ? "green" : "red"}>
                <Status.Indicator />
                <Text fontWeight={500} fontSize={"16px"} color={colors.textColor}>
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
