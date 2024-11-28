import { Box, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react"
import { Button } from "@components/ui/button"
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog"
import { BedWars4v4Image, BedWars6v6Image } from "@shared/static/images"
import { useTimer } from "use-timer"
import {
  FC,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react"
import { QueueResponse } from "@entities/user/model/user.types"
import { useShallow } from "zustand/react/shallow"
import { useUser } from "@entities/user"
import { toaster } from "@components/ui/toaster"
import { useNavigate } from "react-router-dom"
import { queueIO } from "@entities/user/model/user.events"

const gameModes = [
  { type: "4v4", image: BedWars4v4Image, available: true },
  { type: "6v6", image: BedWars6v6Image, available: false },
]

export const PlayCards = () => (
  <SimpleGrid columns={[1, 2]} spaceX={4}>
    {gameModes.map(({ type, image, available }) => (
      <Card key={type} type={type} image={image} available={available} />
    ))}
  </SimpleGrid>
)

interface GameType {
  type: string
  image: string
  available: boolean
}

const Card: FC<GameType> = ({ type, image, available }) => {
  const { payload } = useUser(useShallow((state) => state))
  const cardStyles = useMemo(
    () => ({
      base: {
        height: "200px",
        maxW: "1200px",
        borderRadius: "16px",
        background: `url(${image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
        cursor: available ? "pointer" : "default",
        filter: available ? "grayscale(0)" : "grayscale(1)",
        transition: "all 0.2s ease-in-out",
      },
      hover: { filter: available ? "grayscale(0)" : "grayscale(1)" },
    }),
    [available, image],
  )

  return (
    <JoinQueue available={available} payload={payload}>
      <Box {...cardStyles.base} _hover={cardStyles.hover}>
        <Flex flexDirection="column" alignItems="center" mb={4}>
          <Heading color="white" fontWeight="semibold" fontSize="24px">
            {type}
          </Heading>
          <Text fontSize="14px" color="whiteAlpha.800" fontWeight="medium">
            {available ? "Режим доступен" : "Недоступен"}
          </Text>
        </Flex>
      </Box>
    </JoinQueue>
  )
}

interface JoinQueueProps {
  payload: any
  available: boolean
}

const JoinQueue: FC<PropsWithChildren<JoinQueueProps>> = ({
  children,
  payload,
  available,
}) => {
  const [search, setSearch] = useState<boolean>(false)
  const { time, start, pause, reset } = useTimer({
    initialTime: 0,
    interval: 1000,
    timerType: "INCREMENTAL",
  })
  const [hoverSearch, setHoverSearch] = useState<boolean>(false)

  const [data, setData] = useState<QueueResponse<any[]>>({
    status: "searching",
    payload: [],
  })
  const navigate = useNavigate()

  const joinQueue = () => {
    reset()
    start()
    setSearch(true)
    queueIO.connect()
  }

  const outQueue = () => {
    reset()
    pause()
    setSearch(false)
    queueIO.disconnect()
  }

  useEffect(() => {
    queueIO.on("connect", () => {
      queueIO.emit(
        "join",
        {
          id: payload.id,
        },
        (data: any) => {
          setData(data)
        },
      )
    })

    queueIO.on("join.event", (data) => {
      setData(data)
    })
  }, [])

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (data.status === "ready") {
      setLoading(!loading)
      toaster.create({
        description: "Ваша игра нашлась",
        type: "success",
      })

      setTimeout(() => {
        navigate(`/match/${data.url}`)
      }, 5000)
    }
  }, [data])

  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  const displayMinutes = String(minutes).padStart(2, "0")
  const displaySeconds = String(seconds).padStart(2, "0")
  const displayTime = `${displayMinutes}:${displaySeconds}`
  const displayText = search
    ? hoverSearch
      ? `Идет поиск (${displayTime})`
      : "Отменить поиск"
    : "Начать поиск"

  return available ? (
    <DialogRoot placement="center" motionPreset="slide-in-bottom">
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent borderRadius="12px">
        <DialogHeader>
          <DialogTitle textAlign="center" fontSize="22px">
            Поиск игры
          </DialogTitle>
        </DialogHeader>
        <DialogBody display="flex" alignItems="center" justifyContent="center">
          <Button
            onMouseEnter={() => setHoverSearch(false)}
            onMouseLeave={() => setHoverSearch(true)}
            onClick={!search ? () => joinQueue() : () => outQueue()}
          >
            {displayText}
          </Button>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  ) : (
    children
  )
}
