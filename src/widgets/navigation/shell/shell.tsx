import { Box, Flex, Text, List, Link, MenuTrigger } from "@chakra-ui/react";
import { Avatar, AvatarGroup } from "@components/ui/avatar";
import { ColorModeButton, useColorModeValue } from "@components/ui/color-mode";
import { MenuContent, MenuItem, MenuRoot } from "@components/ui/menu";

interface Item {
  label: string;
  url: string;
}

const MenuItems: Item[] = [
  { label: "Главная", url: "/" },
  { label: "Рейтинг", url: "/leaderboard" },
  { label: "Новости", url: "/news" },
];

export const Shell: React.FC = () => {
    const bg = useColorModeValue("white", "black");
    const color = useColorModeValue("black", "white");

    return (
      <Box paddingX={"10%"}>
        <Flex
          as="nav"
          bg={bg}
          color={color}
          align="center"
          justify="space-between"
          p={4}
          px={8}
        >
          <Flex align="center" gap={6}>
            <Text fontSize="lg" fontWeight="bold">
              Iced League
            </Text>
          </Flex>

          <Flex align="center" gap={4}>
            <List.Root display="flex" alignItems="center" flexDirection="row">
              {MenuItems.map((item) => (
                <Box key={item.url} mx="4">
                  <Link href={item.url} fontWeight="bold" color={color}>
                    {item.label}
                  </Link>
                </Box>
              ))}
            </List.Root>
          </Flex>

          <Flex align="center" gap={4}>
            <ColorModeButton/>
                    <AvatarGroup display="flex" justifyContent="center" alignItems="center" gap="6">
                        <MenuRoot>
                            <MenuTrigger display="flex" flexDirection="row" alignItems="center" gap="3" cursor='pointer'>
                                <Avatar size="md" name="sakominov" src={`https://skin.vimeworld.com/helm/sakominov.png`}
                                />
                                <Text fontWeight="bold">sakominov</Text>
                            </MenuTrigger>
                            <MenuContent>
                                <MenuItem value="profile">Профиль</MenuItem>
                                <MenuItem value="settings">Настройки</MenuItem>
                                <MenuItem value="logout">Выйти</MenuItem>
                            </MenuContent>
                        </MenuRoot>
                    </AvatarGroup>
          </Flex>
        </Flex>
      </Box>
    );
  };
