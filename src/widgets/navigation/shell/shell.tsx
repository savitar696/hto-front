import {
  Box,
  Flex,
  Text,
  List,
  Link,
  IconButton,
  Image,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Avatar, AvatarGroup } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import { ColorModeButton, useColorModeValue } from "@components/ui/color-mode";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@components/ui/menu";
import { Tooltip } from "@components/ui/tooltip";
import { useUserStore } from "@entities/user/model";
import { useLogout } from "@features/user-profile/auth/api";
import logo from "@shared/assets/logo.png";
import { config } from "@shared/lib/config";
import { MdLanguage, MdLogin } from "react-icons/md";

interface Item {
  label: string;
  url: string;
}

const TreeItems: Item[] = [
  { label: "Главная", url: "/" },
  { label: "Рейтинг", url: "/leaderboard" },
  { label: "Правила", url: "/rules" },
];

export const Shell: React.FC = () => {
  const bg = useColorModeValue("blackAlpha.50", "blackAlpha.500");
  const color = useColorModeValue("black", "white");
  const { isAuth, profile } = useUserStore();
  const isMobile = useBreakpointValue({ base: true, md: false });

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
          <Image src={logo} width="48px" height="48px" />
          <Text fontSize="lg" fontWeight="bold">
            {config.title}
          </Text>
        </Flex>

        {/* Навигационное меню для десктопа */}
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

          <Tooltip content="Изменить язык">
            <IconButton variant="ghost" aria-label="Language">
              <MdLanguage />
            </IconButton>
          </Tooltip>

          {/* <Tooltip content="Уведомления">
            <IconButton variant="ghost" aria-label="Notifications">
              <FaBell />
            </IconButton>
          </Tooltip> */}

          <AvatarGroup
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="6"
          >
            {isAuth && profile ? (
              <MenuRoot>
                <MenuTrigger
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  gap="3"
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
                    <Link href={`/profile/${profile.username}`}>Профиль</Link>
                  </MenuItem>
                  <MenuItem value="settings">
                    <Link href={`/settings`}>Настройки</Link>
                  </MenuItem>
                  <MenuItem value="logout">Выйти</MenuItem>
                </MenuContent>
              </MenuRoot>
            ) : (
              <Button rounded="full" variant="surface">
                Авторизация
              </Button>
            )}
          </AvatarGroup>
        </Flex>
      </Flex>
    </Box>
  );
};
