import {
  Box,
  Flex,
  Grid,
  HStack,
  Icon,
  Image,
  StatRoot,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useColorModeValue } from "@components/ui/color-mode"
import { StatLabel, StatValueText } from "@components/ui/stat"
import { CgTrophy } from "react-icons/cg"
import { IconType } from "react-icons/lib"
import { LuBed, LuSkull } from "react-icons/lu"

interface MatchCardProps {
  mapImage: string
  mapName: string
  result: "Победа" | "Поражение"
  ratingChange: number
}

const MATCHES: MatchCardProps[] = [
  {
    mapImage: "https://i.imgur.com/TaY4I7N.jpeg",
    mapName: "Пробуждение",
    result: "Победа",
    ratingChange: 30,
  },
  {
    mapImage: "https://i.imgur.com/xqOHPZ5.png",
    mapName: "Джунглиос",
    result: "Поражение",
    ratingChange: 17,
  },
  {
    mapImage: "https://i.imgur.com/TaY4I7N.jpeg",
    mapName: "Пробуждение",
    result: "Поражение",
    ratingChange: 15,
  },
  {
    mapImage: "https://i.imgur.com/TaY4I7N.jpeg",
    mapName: "Пробуждение",
    result: "Победа",
    ratingChange: 30,
  },
  {
    mapImage: "https://i.imgur.com/xqOHPZ5.png",
    mapName: "Джунглиос",
    result: "Поражение",
    ratingChange: 17,
  },
  {
    mapImage: "https://i.imgur.com/xqOHPZ5.png",
    mapName: "Джунглиос",
    result: "Поражение",
    ratingChange: 17,
  },
]

export const ProfileContent = () => {
  return (
    <Box mx="auto">
      <Grid templateColumns="repeat(4, 1fr)" gap={6} justifyItems="center">
        {MATCHES.map((match, index) => (
          <MatchCard key={index} {...match} />
        ))}
      </Grid>
    </Box>
  )
}

export const MatchCard = ({
  mapImage,
  mapName,
  result,
  ratingChange,
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
      <CardInfo mapName={mapName} result={result} ratingChange={ratingChange} />
    </Box>
  )
}

const MatchImage = ({ src, alt }: { src: string; alt: string }) => {
  return <Image src={src} alt={alt} objectFit="cover" w="100%" h="100%" />
}

const Overlay = () => (
  <Box
    position="absolute"
    top="0"
    left="0"
    w="100%"
    h="100%"
    bg="rgba(0, 0, 0, 0.4)"
  />
)

const CardInfo = ({
  mapName,
  result,
  ratingChange,
}: Pick<MatchCardProps, "mapName" | "result" | "ratingChange">) => {
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
      <MatchRating ratingChange={ratingChange} />
    </VStack>
  )
}

const MatchResult = ({ result }: { result: "Победа" | "Поражение" }) => {
  return (
    <Text
      color={result === "Победа" ? "green.300" : "red.300"}
      fontWeight="bold"
      fontSize="md"
    >
      {result}
    </Text>
  )
}

const MatchRating = ({ ratingChange }: { ratingChange: number }) => {
  const isPositive = ratingChange > 0
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
      </HStack>
    </HStack>
  )
}

interface PlayerStatsProps {
  kills: number
  deaths: number
  bedsBroken: number
  kdRatio: number
  rating: number
}

export const PlayerStats: React.FC<PlayerStatsProps> = ({
  kills,
  deaths,
  bedsBroken,
  kdRatio,
  rating,
}) => {
  const bgColor = useColorModeValue("white", "gray.800")
  const boxShadow = useColorModeValue("md", "lg")

  return (
    <Flex bg={bgColor} p={6} borderRadius="lg" boxShadow={boxShadow} gap="8">
      <StatCard label="Kills" value={kills} icon={<LuSkull />} />
      <StatCard label="Deaths" value={deaths} icon={<LuSkull />} />
      <StatCard label="Beds Broken" value={bedsBroken} icon={<LuBed />} />
      <StatCard
        label="K/D Ratio"
        value={kdRatio.toFixed(2)}
        icon={<CgTrophy />}
      />
      <StatCard label="Rating" value={rating} icon={<CgTrophy />} />
    </Flex>
  )
}

const StatCard = ({
  label,
  value,
  icon,
}: {
  label: string
  value: number | string
  icon: React.ReactNode
}) => (
  <StatRoot maxW="360px" borderWidth="1px" px="6" py="3" rounded="md">
    <HStack justify="space-between">
      <StatLabel>{label}</StatLabel>
      {icon}
    </HStack>
    <StatValueText>{value}</StatValueText>
  </StatRoot>
)
