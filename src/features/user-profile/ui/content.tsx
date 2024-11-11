import {
  Badge,
  Box,
  Flex,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

interface MatchCardProps {
  mapImage: string;
  mapName: string;
  result: "Победа" | "Поражение";
  ratingChange: number;
  ratingDelta: number;
}

const MATCHES: MatchCardProps[] = [
  {
    mapImage: "https://i.imgur.com/TaY4I7N.jpeg",
    mapName: "Пробуждение",
    result: "Победа",
    ratingChange: 30,
    ratingDelta: 5,
  },
  {
    mapImage: "https://i.imgur.com/xqOHPZ5.png",
    mapName: "Джунглиос",
    result: "Поражение",
    ratingChange: 17,
    ratingDelta: 2,
  },
  {
    mapImage: "https://i.imgur.com/TaY4I7N.jpeg",
    mapName: "Пробуждение",
    result: "Поражение",
    ratingChange: 15,
    ratingDelta: -3,
  },
  {
    mapImage: "https://i.imgur.com/TaY4I7N.jpeg",
    mapName: "Пробуждение",
    result: "Победа",
    ratingChange: 30,
    ratingDelta: 4,
  },
  {
    mapImage: "https://i.imgur.com/xqOHPZ5.png",
    mapName: "Джунглиос",
    result: "Поражение",
    ratingChange: 17,
    ratingDelta: 1,
  },
  {
    mapImage: "https://i.imgur.com/xqOHPZ5.png",
    mapName: "Джунглиос",
    result: "Поражение",
    ratingChange: 17,
    ratingDelta: -1,
  },
];

export const ProfileContent = () => {
  return (
    <Box mx="auto">
      <Grid templateColumns="repeat(4, 1fr)" gap={6} justifyItems="center">
        {MATCHES.map((match, index) => (
          <MatchCard key={index} {...match} />
        ))}
      </Grid>
    </Box>
  );
};

export const MatchCard = ({
  mapImage,
  mapName,
  result,
  ratingChange,
  ratingDelta,
}: MatchCardProps) => {
  return (
    <Box
      w="260px"
      h="340px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="xl"
      position="relative"
      transform="scale(1)"
      transition="transform 0.3s ease, filter 0.3s ease"
      _hover={{ transform: "scale(1.05)", cursor: "pointer" }}
    >
      <MatchImage src={mapImage} alt={mapName} />
      <Overlay />
      <CardInfo
        mapName={mapName}
        result={result}
        ratingChange={ratingChange}
        ratingDelta={ratingDelta}
      />
    </Box>
  );
};

const MatchImage = ({ src, alt }: { src: string; alt: string }) => {
  return <Image src={src} alt={alt} objectFit="cover" w="100%" h="100%" />;
};

const Overlay = () => (
  <Box
    position="absolute"
    top="0"
    left="0"
    w="100%"
    h="100%"
    bg="rgba(0, 0, 0, 0.4)"
  />
);

const CardInfo = ({
  mapName,
  result,
  ratingChange,
  ratingDelta,
}: Pick<
  MatchCardProps,
  "mapName" | "result" | "ratingChange" | "ratingDelta"
>) => {
  return (
    <VStack
      position="absolute"
      bottom="0"
      w="100%"
      p="4"
      color="white"
      bgGradient="linear(to-t, rgba(0, 0, 0, 0.7), transparent)"
      textAlign="center"
    >
      <Text fontSize="lg" fontWeight="bold">
        {mapName}
      </Text>
      <MatchResult result={result} />
      <MatchRating ratingChange={ratingChange} ratingDelta={ratingDelta} />
    </VStack>
  );
};

const MatchResult = ({ result }: { result: "Победа" | "Поражение" }) => {
  return (
    <Text
      color={result === "Победа" ? "green.300" : "red.300"}
      fontWeight="bold"
      fontSize="md"
    >
      {result}
    </Text>
  );
};

const MatchRating = ({
  ratingChange,
  ratingDelta,
}: {
  ratingChange: number;
  ratingDelta: number;
}) => {
  const isPositive = ratingChange > 0;
  return (
    <HStack justify="center" spaceX={2}>
      <Text fontSize="md">Рейтинг:</Text>
      <HStack>
        <Text
          fontSize="md"
          fontWeight="bold"
          color={isPositive ? "green.300" : "red.300"}
        >
          {ratingChange}
        </Text>
        <Badge colorScheme={isPositive ? "green" : "red"}>
          {ratingDelta > 0 ? `+${ratingDelta}` : ratingDelta}
        </Badge>
      </HStack>
    </HStack>
  );
};
