import {
  Box,
  Image,
  Heading,
  Flex,
  VStack,
  Badge,
  Button,
  useBreakpointValue,
  Text,
  Tabs,
} from "@chakra-ui/react"
import { Avatar } from "@components/ui/avatar"
import { useColorModeValue } from "@components/ui/color-mode"
import { PlayerStats, ProfileContent } from "./content"
import { useTranslation } from "react-i18next"

export const ProfileHeader = ({ username }: { username: string }) => {
  const { t } = useTranslation()

  return (
    <Flex
      justifyContent="center"
      py={{ base: "4", md: "6" }}
      gap="4"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        w="100%"
        maxW="1200px"
        bg={useColorModeValue("blackAlpha.50", "blackAlpha.500")}
        borderRadius="xl"
        overflow="hidden"
        boxShadow="2xl"
        textAlign="center"
        position="relative"
        transition="box-shadow 0.3s ease-in-out"
        _hover={{ boxShadow: "0 4px 30px rgba(0,0,0,0.3)" }}
      >
        <Box
          position="relative"
          height={useBreakpointValue({ base: "180px", md: "240px" })}
        >
          <Image
            src="https://i.imgur.com/eDPeTNd.jpeg"
            alt="header"
            width="100%"
            height="100%"
            objectFit="cover"
            filter="brightness(0.75)"
          />
          <Avatar
            src={`https://skin.vimeworld.com/helm/${username}.png`}
            width="128px"
            height="128px"
            position="absolute"
            bottom="-30px"
            transform="translateX(-50%)"
            border="4px solid white"
            boxShadow="lg"
          />
          {/* {profile.username == username ? (
            <Button
              position="absolute"
              top="10px"
              right="10px"
              variant="surface"
              boxShadow="md"
              opacity="0.1"
              transition="opacity 0.5s ease"
              _hover={{ opacity: 1 }}
            >
              {t("profile.header.edit_photo")}
            </Button>
          ) : null} */}
        </Box>

        <VStack mt={10} px={4} pb={4}>
          <Heading as="h1" size="2xl">
            {username}
          </Heading>
          <Flex gap={2} justify="center" wrap="wrap">
            <Text color="gray.500">{t("profile.header.description")}</Text>
          </Flex>
          <Flex gap={4} justify="center" mt={2}>
            <Badge variant="surface" colorPalette="green">
              {t("rating")}: 1000
            </Badge>
            <Badge variant="surface" colorPalette="red">
              {t("team")}: LMAO
            </Badge>
          </Flex>
        </VStack>
      </Box>
      <UserTabs />
    </Flex>
  )
}

const UserTabs = () => {
  const { t } = useTranslation()
  return (
    <Tabs.Root defaultValue="stats" alignItems="center">
      <Flex justifyContent="center" mt={4}>
        <Tabs.List
          gap="4"
          rounded="lg"
          boxShadow="sm"
          _hover={{ boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}
        >
          <Tabs.Trigger value="stats">{t("profile.tabs.stats")}</Tabs.Trigger>
          <Tabs.Trigger value="matches">
            {t("profile.tabs.matches")}
          </Tabs.Trigger>
          <Tabs.Trigger value="info">{t("profile.tabs.info")}</Tabs.Trigger>
          <Tabs.Indicator rounded="lg" />
        </Tabs.List>
      </Flex>
      <Tabs.Content value="stats">
        <PlayerStats
          kills={120}
          deaths={30}
          bedsBroken={15}
          kdRatio={4.0}
          rating={1500}
        />
      </Tabs.Content>
      <Tabs.Content value="matches">
        <ProfileContent />
      </Tabs.Content>
      <Tabs.Content value="info">
        <InfoContent />
      </Tabs.Content>
    </Tabs.Root>
  )
}

const InfoContent = () => (
  <Box p={4}>
    <Text fontSize="lg">Привет! Это твой профиль.</Text>
    <Text>
      Здесь ты можешь управлять настройками, просматривать свою статистику и
      многое другое.
    </Text>
  </Box>
)
