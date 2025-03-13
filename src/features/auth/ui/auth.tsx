import { useUser } from "@entities/user"
import { ModalWrapper, ModalContent, ModalBackDrop } from "@shared/ui/modal"
import { FC, useCallback, useEffect } from "react"
import { useShallow } from "zustand/react/shallow"
import modalStyle from "@shared/ui/modal/Modal.module.scss"
import { Button } from "@shared/ui/button"

interface AuthModalFC {
  state: { value: boolean; setHandler: React.Dispatch<any> }
  token: { value: string; setHandler: React.Dispatch<any> }
  handlers: Array<any>
}
export const AuthModal: FC<AuthModalFC> = ({ state, token }) => {
  const auth = useUser(useShallow((state) => state.auth))

  const escFunction = useCallback((event: any) => {
    if (event.key === "Enter" && state.value) {
      if (token.value.includes("https://api.vime.world/web/token/")) {
        auth(token.value.replace("https://api.vime.world/web/token/", ""))
      } else {
        auth(token.value)
      }
      state.setHandler(false)
      token.setHandler("")
    }
  }, [])

  const login = () => {
    if (token.value.includes("https://api.vime.world/web/token/")) {
      auth(token.value.replace("https://api.vime.world/web/token/", ""))
    } else {
      auth(token.value)
    }
    state.setHandler(false)
    token.setHandler("")
  }

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false)

    return () => {
      document.removeEventListener("keydown", escFunction, false)
    }
  }, [escFunction])

  return (
    <ModalBackDrop state={state.value} setState={state.setHandler}>
      <ModalWrapper setState={state.setHandler}>
        <ModalContent width={450} setState={state.setHandler}>
          <div className={modalStyle.header}>
            <h1 className={modalStyle.title}>Войти в свой аккаунт</h1>
          </div>
          <div className={modalStyle.body}>
            <span className={modalStyle.text}>
              Вставьте Ваш токен авторизации для входа
            </span>
            <div className={modalStyle.textInput}>
              <span className={modalStyle.text}>Токен</span>
              <div className={modalStyle.inputWrapper}>
                <input
                  placeholder="https://api.vime.world/web/token/"
                  value={token.value}
                  onChange={(e) => token.setHandler(e.target.value)}
                  className={modalStyle.input}
                />
              </div>
            </div>
          </div>
          <div className={modalStyle.footer}>
            <Button
              styles={{
                backgroundColor: "var(--black100)",
                color: "var(--white100)",
                height: "48px",
                border: "none",
              }}
              onClick={() => login()}
            >
              Войти
            </Button>
            <Button
              styles={{
                height: "48px",
              }}
              onClick={() => state.setHandler(false)}
            >
              Вернуться назад
            </Button>
          </div>
        </ModalContent>
      </ModalWrapper>
    </ModalBackDrop>
  )
}
