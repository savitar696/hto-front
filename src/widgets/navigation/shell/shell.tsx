import {
  Box,
  Flex,
  Text,
  List,
  Link,
  IconButton,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react"
import { Avatar, AvatarGroup } from "@components/ui/avatar"
import { Button } from "@components/ui/button"
import {
  ColorModeButton,
  useColorMode,
  useColorModeValue,
} from "@components/ui/color-mode"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@components/ui/menu"
import { Tooltip } from "@components/ui/tooltip"
import { UserProfile, useUserStore } from "@entities/user/model"
import logo from "@shared/assets/logo.png"
import logoWhite from "@shared/assets/logo-white.png"
import { config } from "@shared/lib/config"
import { MdLanguage } from "react-icons/md"
import { LogoutDialog } from "@features/auth/ui/logout"
import { FC, PropsWithChildren } from "react"
import { useTranslation } from "react-i18next"
import ReactCountryFlag from "react-country-flag"

interface Item {
  label: string
  url: string
}

export const Shell: React.FC = () => {
  const bg = useColorModeValue("blackAlpha.50", "blackAlpha.500")
  const color = useColorModeValue("black", "white")
  const { isAuth, profile } = useUserStore()
  const isMobile = useBreakpointValue({ base: true, md: false })
  const { colorMode } = useColorMode()

  const { t } = useTranslation()
  const TreeItems: Item[] = [
    { label: t("shell.links.main"), url: "/" },
    { label: t("shell.links.leaderboard"), url: "/leaderboard" },
    { label: t("shell.links.rules"), url: "/rules" },
  ]

  return (
    <Box px={{ base: "4", md: "10%" }} py="6px">
      <Flex
        as="nav"
        bg={bg}
        color={color}
        align="center"
        justify="space-between"
        p={4}
        borderRadius="16px"
        position="relative"
      >
        <Flex align="center" gap={2}>
          <Image
            src={colorMode === "dark" ? logoWhite : logo}
            width="48px"
            height="48px"
          />
          <Text fontSize="lg" fontWeight="bold">
            {config.title}
          </Text>
        </Flex>

        {!isMobile && (
          <Flex align="center" gap={4}>
            <List.Root display="flex" alignItems="center" flexDirection="row">
              {TreeItems.map((item) => (
                <Box key={item.url} mx="4">
                  <Link href={item.url} fontWeight="bold" color={color}>
                    {item.label}
                  </Link>
                </Box>
              ))}
            </List.Root>
          </Flex>
        )}

        <Flex align="center" gap={4}>
          <ColorModeButton />
          <ChangeLanguageRoot>
            <Tooltip content="Изменить язык">
              <IconButton variant="ghost" aria-label="Language">
                <MdLanguage />
              </IconButton>
            </Tooltip>
          </ChangeLanguageRoot>

          {/* <Tooltip content="Уведомления">
            <IconButton variant="ghost" aria-label="Notifications">
              <LuBell />
            </IconButton>
          </Tooltip> */}

          <AvatarGroup
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="6"
          >
            {isAuth && profile ? (
              <ProfileRoot profile={profile} />
            ) : (
              <Button rounded="full" variant="surface">
                Авторизация
              </Button>
            )}
          </AvatarGroup>
        </Flex>
      </Flex>
    </Box>
  )
}

const ProfileRoot = ({ profile }: { profile: UserProfile }) => {
  const { t } = useTranslation()
  return (
    <MenuRoot>
      <MenuTrigger
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap="2"
        cursor="pointer"
      >
        <Avatar
          size="md"
          name={profile.username}
          src={`https://skin.vimeworld.com/helm/${profile.username}.png`}
        />
        <Text fontWeight="bold">{profile.username}</Text>
      </MenuTrigger>

      <MenuContent>
        <MenuItem value="profile">
          <Link href={`/profile/${profile.username}`}>
            {t("shell.dropmenu.profile")}
          </Link>
        </MenuItem>
        <MenuItem value="settings">
          <Link href={`/settings`}>{t("shell.dropmenu.settings")}</Link>
        </MenuItem>
        <LogoutDialog>
          <MenuItem value="logout">{t("shell.dropmenu.logout")}</MenuItem>
        </LogoutDialog>
      </MenuContent>
    </MenuRoot>
  )
}

const ChangeLanguageRoot: FC<PropsWithChildren> = ({ children }) => {
  const { i18n } = useTranslation()

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const countries = [
    { id: 0, lang: "us", title: "English" },
    { id: 1, lang: "ru", title: "Русский" },
    { id: 2, lang: "ua", title: "Українська" },
  ]

  return (
    <MenuRoot>
      <MenuTrigger
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap="5"
        cursor="pointer"
      >
        {children}
      </MenuTrigger>
      <MenuContent>
        {countries.map((country) => (
          <MenuItem
            key={country.id}
            onClick={() => handleLanguageChange(country.lang)}
            value={country.lang}
          >
            <ReactCountryFlag countryCode={country.lang} svg />
            {country.title}
          </MenuItem>
        ))}
      </MenuContent>
    </MenuRoot>
  )
}
