import { Input } from "@chakra-ui/react"
import { Button } from "@components/ui/button"
import {
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
import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react"
import { useShallow } from "zustand/react/shallow"

export const AuthDialog: FC<PropsWithChildren> = ({ children }) => {
  const auth = useUser(useShallow((state) => state.auth))
  const [token, setToken] = useState<string>("")

  const escFunction = useCallback((event: any) => {
    if (event.key === "Enter") {
      if (token.includes("https://api.vime.world/web/token/")) {
        auth(token.replace("https://api.vime.world/web/token/", ""))
      } else {
        auth(token)
      }
    }
  }, [])

  const login = () => {
    if (token.includes("https://api.vime.world/web/token/")) {
      auth(token.replace("https://api.vime.world/web/token/", ""))
    } else {
      auth(token)
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false)

    return () => {
      document.removeEventListener("keydown", escFunction, false)
    }
  }, [escFunction])

  return (
    <DialogRoot>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent rounded="2xl">
        <DialogHeader>
          <DialogTitle>Авторизация</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <span>Вставьте сюда Ваш токен для авторизации</span>
          <Input
            placeholder="Токен /api auth"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </DialogBody>
        <DialogFooter>
          <Button onClick={() => login()}>Войти</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}
