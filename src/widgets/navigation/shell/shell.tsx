import {
  Box,
  Flex,
  Text,
  Link,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react"
import { Avatar, AvatarGroup } from "@components/ui/avatar"
import { Button } from "@shared/ui/button"
import { useColorMode, useColorModeValue } from "@components/ui/color-mode"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@components/ui/menu"
import { LogoDark, LogoWhite } from "@shared/static/logo"
import { config } from "@shared/config"
import { LogoutDialog } from "@features/auth/ui/logout"
import { useUser } from "@entities/user"
import { UserPayload } from "@entities/user/model/user.types"
import { AuthModal } from "@features/auth/ui/auth"
import { useNavigate } from "react-router-dom"
import { FC, useState } from "react"
import { Input } from "@shared/ui/input"

export const Shell: FC = () => {
  const color = useColorModeValue("black", "white")
  const { isAuth, payload, auth } = useUser((state) => state)
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

        <Input
          placeholder="Поиск"
          styles={{
            minWidth: isMobile ? "100%" : "300px",
          }}
          options={{
            useFocus: false,
          }}
        />

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
                <ProfileRoot payload={payload} />
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

// const NavigationText = ({
//   url,
//   children,
// }: {
//   url: string
//   children: React.ReactNode
// }) => {
//   const navigate = useNavigate()

//   const handleNavigate = () => {
//     navigate(url)
//   }

//   return (
//     <Text
//       fontWeight="bold"
//       cursor="pointer"
//       onClick={handleNavigate}
//       _hover={{ textDecoration: "underline" }}
//     >
//       {children}
//     </Text>
//   )
// }

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
