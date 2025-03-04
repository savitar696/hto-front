import { Button } from "@components/ui/button"
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog"
import { useUser } from "@entities/user"
import { FC, PropsWithChildren } from "react"
import { useShallow } from "zustand/react/shallow"
import { useNavigate } from "react-router-dom"

export const LogoutDialog: FC<PropsWithChildren> = ({ children }) => {
  const logout = useUser(useShallow((state) => state.logout))
  const navigate = useNavigate()
  return (
    <DialogRoot>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent rounded="2xl">
        <DialogHeader>
          <DialogTitle>Подтверждение</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>Вы уверены, что хотите выйти с аккаунта?</p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Нет</Button>
          </DialogActionTrigger>
          <Button onClick={() => {
            logout()
            navigate("/")
            window.location.reload()
          }}>
            Да
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}
