import {
  Box,
  Flex,
  Text,
  List,
  Link,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react"
import { Avatar, AvatarGroup } from "@components/ui/avatar"
import { Button } from "@shared/ui/button"
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
import { AuthModal } from "@features/auth/ui/auth"
import { useNavigate } from "react-router-dom"
import { FC, useState } from "react"

export const Shell: FC = () => {
  const color = useColorModeValue("black", "white")
  const { isAuth, payload, logout, auth } = useUser((state) => state)
  const isMobile = useBreakpointValue({ base: true, md: false })
  const { colorMode } = useColorMode()
  const navigate = useNavigate()
  const [token, setToken] = useState("")
  const [isOpenModalAuth, setIsOpenModalAuth] = useState(false)
  return (
    <Box px={{ base: "4", md: "10%" }} py="3px">
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
                  <NavigationText url={item.url}>{item.label}</NavigationText>
                </Box>
              ))}
            </List.Root>
          </Flex>
        )}

        <Flex align="center" gap={4}>
          <AvatarGroup
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="6"
          >
            {isAuth ? (
              <>
                <AvatarGroup gap="0" size="md">
                  {payload.party &&
                    payload.party.map((user: any) => (
                      <Avatar
                        key={user.id}
                        src={`https://skin.vimeworld.com/helm/${user.name}.png`}
                      />
                    ))}
                </AvatarGroup>
                <Button onClick={() => navigate("/play")}>Играть</Button>
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
              <>
                <AuthModal
                  state={{
                    value: isOpenModalAuth,
                    setHandler: setIsOpenModalAuth,
                  }}
                  token={{ value: token, setHandler: setToken }}
                  handlers={[auth]}
                />
                <Button
                  styles={{
                    display: !isAuth ? "flex" : "none",
                    backgroundColor: "var(--black100)",
                    color: "var(--white100)",
                    border: "none",
                  }}
                  onClick={() => setIsOpenModalAuth(true)}
                >
                  Войти в свой аккаунт
                </Button>
              </>
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
          <MenuItem value="logout" onClick={handleLogout}>
            Выйти
          </MenuItem>
        </LogoutDialog>
      </MenuContent>
    </MenuRoot>
  )
}
