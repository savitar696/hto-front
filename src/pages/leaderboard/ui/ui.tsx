import { Box, Container, Grid, Text } from "@chakra-ui/react";
import { Avatar, AvatarGroup } from "@components/ui/avatar";
import { useColorModeValue } from "@components/ui/color-mode";
import { useNavigate } from "react-router-dom";

const USERS = [
  { id: 1, username: "YaClary", rating: 1132, role: "USER" },
  { id: 2, username: "k1arov", rating: 1000, role: "ADMIN" },
  { id: 3, username: "sakominov", rating: 865, role: "DEV" },
];

export const LeaderboardPage = () => {
  const textColor = useColorModeValue("black", "white");

  return (
    <Container
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      gap="4"
      mt="2"
    >
      <Text fontSize="3xl" color={textColor}>
        Leaderboard
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" gap="20px" placeContent="center">
        <RatingList />
      </Grid>
    </Container>
  );
};

export const RatingList = () => {
  return USERS.map((user, idx) => (
    <PlayerBox
      key={idx}
      id={idx + 1}
      username={user.username}
      rating={user.rating}
      role={user.role}
    />
  ));
};

type PlayerProps = {
  id: number;
  username: string;
  rating: number;
  role: string;
};

export const PlayerBox = ({ id, username, rating, role }: PlayerProps) => {
  const bg = useColorModeValue("gray.100", "#0F0E14");
  const hoverBg = useColorModeValue("gray.200", "#07060a");
  const borderColor = useColorModeValue("gray.300", "#252332");
  const textColor = useColorModeValue("black", "white");

  const navigate = useNavigate();

  return (
    <Box
      transition="all 200ms ease"
      cursor="pointer"
      bg={bg}
      p="15px"
      borderRadius="15px"
      width="100%"
      outline={`2px solid ${borderColor}`}
      _hover={{ bg: hoverBg, transform: "scale(0.9)" }}
      onClick={() => navigate(`/profile/${username}`)}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
        gap="16"
      >
        <Box display="flex" flexDirection="row" alignItems="center" gap="2">
          <Text color={textColor}>#{id}</Text>
          <Text fontSize="18px" color={textColor}>
            {username}
          </Text>
        </Box>
        <AvatarGroup>
          <Avatar
            size="xl"
            name={username}
            shape="rounded"
            src={`https://skin.vimeworld.com/helm/${username}.png`}
          />
        </AvatarGroup>
      </Box>
      <Box display="flex" alignItems="center" flexDirection="row" gap="2">
        <Text color="gray.400">{role}</Text>
        <Text color={textColor}>{rating}</Text>
      </Box>
    </Box>
  );
};
