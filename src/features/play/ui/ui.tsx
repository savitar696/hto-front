import { FC, PropsWithChildren, useState } from "react"
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
import { useQueue } from "../hooks/use-queue"

interface JoinQueueProps {
  payload: { id: string }
  available: boolean
}

export const JoinQueue: FC<PropsWithChildren<JoinQueueProps>> = ({
  children,
  payload,
  available,
}) => {
  const { search, time, loading, joinQueue, outQueue } = useQueue(payload.id)
  const [hoverSearch, setHoverSearch] = useState(false)

  const displayTime = `${String(Math.floor(time / 60)).padStart(2, "0")}:${String(time % 60).padStart(2, "0")}`
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
            onClick={search ? outQueue : joinQueue}
            loading={loading}
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
