import { FC, PropsWithChildren, useState } from "react"
import { Button } from "@components/ui/button"
import { Text } from "@chakra-ui/react"
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog"
import { useQueue } from "../hooks/use-queue"

interface JoinQueueProps {
  payload: any
  available: boolean
}

export const JoinQueue: FC<PropsWithChildren<JoinQueueProps>> = ({
  children,
  payload,
  available,
}) => {
  const { search, time, loading, joinQueue, outQueue } = useQueue(payload)
  const [hoverSearch, setHoverSearch] = useState(false)

  const displayTime = `${String(Math.floor(time / 60)).padStart(2, "0")}:${String(time % 60).padStart(2, "0")}`
  const displayText = search
    ? hoverSearch
      ? `Идет поиск (${displayTime})`
      : "Отменить поиск"
    : "Начать поиск"

  return available ? (
    <DialogRoot placement="center" motionPreset="scale">
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent borderRadius="16px">
        <DialogHeader>
          <DialogTitle textAlign="center" fontSize="22px">
            Поиск игры
            <Text fontSize="14px" color={"gray.500"}>
              Перезагрузка страницы приведет к отключению Вас из очереди
            </Text>
          </DialogTitle>
        </DialogHeader>
        <DialogBody
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          gap="12px"
        >
          <Button
            onMouseEnter={() => setHoverSearch(false)}
            onMouseLeave={() => setHoverSearch(true)}
            onClick={search ? outQueue : joinQueue}
            loading={loading}
            borderRadius="12px"
            minWidth="70%"
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
