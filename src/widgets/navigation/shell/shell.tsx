import {
  Box,
  Flex,
  Text,
  List,
  Link,
  Image,
  useBreakpointValue,
  AvatarImage,
  AvatarFallback,
  DrawerTrigger,
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
import { LogoDark, LogoWhite } from "@shared/static/logo"
import { config, Item, TreeItems } from "@shared/config"
import { LogoutDialog } from "@features/auth/ui/logout"
import { useUser } from "@entities/user"
import { UserPayload } from "@entities/user/model/user.types"
import { AuthDialog } from "@features/auth/ui/auth"
import { useNavigate } from "react-router-dom"
import { FC, useState, useEffect } from "react"
import { DrawerRoot, DrawerBackdrop, DrawerContent, DrawerHeader, DrawerTitle, DrawerBody } from "@components/ui/drawer"

export const Shell: FC = () => {
  const color = useColorModeValue("black", "white")
  const { isAuth, payload} = useUser((state) => state)
  const isMobile = useBreakpointValue({ base: true, md: false })
  const { colorMode } = useColorMode()
  const navigate = useNavigate()
  // const [open, setOpen] = useState(false)

  return (
    <Box px={{ base: "4", md: "10%" }} py="6px">
      <Flex
        as="nav"
        color={color}
        align="center"
        justify="space-between"
        p={4}
        borderRadius="16px"
        position="relative"
      >
        <Flex align="center" gap={2}>
          <Image
            src={colorMode === "dark" ? LogoWhite : LogoDark}
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
              {TreeItems.map((item: Item) => (
                <Box key={item.url} mx="4">
                  <NavigationText
                    url={item.url}
                  >
                    {item.label}
                  </NavigationText>
                </Box>
              ))}
            </List.Root>
          </Flex>
        )}

        <Flex align="center" gap={4}>
          <ColorModeButton />

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
            {isAuth ? (
              <>
              {/* <AvatarGroup gap="0" spaceX="-3" size="sm">
              <Avatar src="https://skin.vimeworld.com/helm/YaClary.png" />
              <Avatar src="https://skin.vimeworld.com/helm/Shaitan.png" />
              <Avatar src="https://skin.vimeworld.com/helm/Realish.png" />
            </AvatarGroup> */}
                <Button rounded="full" onClick={() => navigate("/play")}>
                  Играть
                </Button>
                {/* <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
                  <DrawerBackdrop />
                  <DrawerTrigger> */}
                <ProfileRoot payload={payload} />
                {/* <Avatar
                      size="md"
                      name={payload.profile.name}
                      src={`https://skin.vimeworld.com/helm/${payload.profile.name}.png`}
                      cursor="pointer"
                      bg={open ? "yellow.200" : "transparent"}
                    />
                </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>
                        <Flex alignItems="center" gap="3">
                          <Avatar
                            size="md"
                            name={payload.profile.name}
                            src={`https://skin.vimeworld.com/helm/${payload.profile.name}.png`}
                          />
                          <Text fontWeight={600} fontSize="20px">
                            {payload.profile.name}
                          </Text>
                        </Flex>
                      </DrawerTitle>
                    </DrawerHeader>
                    <DrawerBody>
                      <Flex
                        flexDirection="column"
                        gap="32px"
                        alignItems="center"
                        pt="5"
                      >
                        <Text fontSize="32px" fontWeight={600}>
                          <Link href={`/profile/${payload.profile.name}`}>
                            Профиль
                          </Link>
                        </Text>
                        <Text fontSize="32px" fontWeight={600}>
                          <Link href={`/settings`}>Настройки</Link>
                        </Text>
                        <Text fontSize="32px" fontWeight={600} cursor="pointer" onClick={handleLogout}>
                          Выход
                        </Text>
                      </Flex>
                    </DrawerBody>
                  </DrawerContent>
                </DrawerRoot> */}
              </>
            ) : (
              <AuthDialog>
                <Button rounded="2xl">
                  Авторизация
                </Button>
              </AuthDialog>
            )}
          </AvatarGroup>
        </Flex>
      </Flex>
    </Box>
  )
}

const NavigationText = ({
  url,
  children,
}: {
  url: string
  children: React.ReactNode
}) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(url)
  }

  return (
    <Text
      fontWeight="bold"
      cursor="pointer"
      onClick={handleNavigate}
      _hover={{ textDecoration: "underline" }}
    >
      {children}
    </Text>
  )
}

const ProfileRoot = ({ payload }: { payload: UserPayload }) => {
  const { logout } = useUser((state) => state)
  const navigate = useNavigate()
  const handleLogout = () => {
    logout()
    navigate("/")
  }
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
          name={payload.profile.name}
          src={`https://skin.vimeworld.com/helm/${payload.profile.name}.png`}
        />
        <Text fontWeight="bold">{payload.profile.name}</Text>
      </MenuTrigger>

      <MenuContent>
        <MenuItem value="profile">
          <Link href={`/profile/${payload.profile.name}`}>Профиль</Link>
        </MenuItem>
        <MenuItem value="settings">
          <Link href={`/settings`}>Настройки</Link>
        </MenuItem>
        <LogoutDialog>
          <MenuItem value="logout" onClick={handleLogout}>Выйти</MenuItem>
        </LogoutDialog>
      </MenuContent>
    </MenuRoot>
  )
}
