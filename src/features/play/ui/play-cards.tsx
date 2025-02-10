import { SimpleGrid } from "@chakra-ui/react"
import { BedWars4v4Image, BedWars6v6Image } from "@shared/static/images"
import { Card } from "./card"

const gameModes = [
  { type: "4v4", image: BedWars4v4Image, available: true },
  { type: "6v6", image: BedWars6v6Image, available: false },
]

export const PlayCards = () => (
  <SimpleGrid columns={[1, 2]} spaceX={4}>
    {gameModes.map((game) => (
      <Card key={game.type} {...game} />
    ))}
  </SimpleGrid>
)
