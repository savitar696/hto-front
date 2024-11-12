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
import { FC, PropsWithChildren, useState } from "react"
import { useLogout } from "../api"

export const LogoutDialog: FC<PropsWithChildren> = ({ children }) => {
  const { logout } = useLogout()

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
          <Button onClick={logout}>Да</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}
