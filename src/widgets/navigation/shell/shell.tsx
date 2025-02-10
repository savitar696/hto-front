import {
  Box,
  Flex,
  Text,
  List,
  Link,
  Image,
  useBreakpointValue,
  Input,
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
import { config, Item, TreeItems } from "@shared/lib/config"
import { LogoutDialog } from "@features/auth/ui/logout"
import { useUser } from "@entities/user"
import { useShallow } from "zustand/react/shallow"
import { UserPayload } from "@entities/user/model/user.types"
import { AuthDialog } from "@features/auth/ui/auth"
import { useNavigate } from "react-router-dom"

export const Shell: React.FC = () => {
  const bg = useColorModeValue("blackAlpha.50", "blackAlpha.500")
  const color = useColorModeValue("black", "white")
  const { isAuth, payload } = useUser(useShallow((state) => state))
  const isMobile = useBreakpointValue({ base: true, md: false })
  const { colorMode } = useColorMode()
  const navigate = useNavigate()

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
                <Button
                  rounded="full"
                  variant="surface"
                  onClick={() => navigate("/play")}
                >
                  Играть
                </Button>
                <ProfileRoot payload={payload} />
              </>
            ) : (
              <AuthDialog>
                <Button rounded="full" variant="surface">
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

const ProfileRoot = ({ payload }: { payload: UserPayload }) => {
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
          <MenuItem value="logout">Выйти</MenuItem>
        </LogoutDialog>
      </MenuContent>
    </MenuRoot>
  )
}

const InputSearch = () => {
  return (
    <Input
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: "16px",
        height: "50px",
        minWidth: "700px",
      }}
      placeholder="Поиск по сайту..."
    />
  )
}

export const RootShell = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection={"row"}
      minWidth={1200}
      paddingTop={"18px"}
    >
      <Flex justifyContent="space-between" alignItems={"center"} gap={12}>
        <Flex gap="8">
          <Image src={LogoDark} width="48px" height="48px" />
          <InputSearch />
        </Flex>
        <Flex>
          <Button>Войти</Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
