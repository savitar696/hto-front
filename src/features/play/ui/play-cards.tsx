import { SimpleGrid } from "@chakra-ui/react"
import { BedWars4v4Image } from "@shared/static/images"
import { Card } from "./card"

const gameModes = [{ type: "4v4", image: BedWars4v4Image, available: true }]

export const PlayCards = () => (
  <SimpleGrid columns={gameModes.length} spaceX={2} justifyItems="center">
    {gameModes.map((game) => (
      <Card key={game.type} {...game} />
    ))}
  </SimpleGrid>
)
