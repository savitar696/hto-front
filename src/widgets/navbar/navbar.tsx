import { CloseIcon, SearchIcon } from "@components/icons/Icons";
import { Modal } from "@components/modal/Modal";
import { Avatar } from "@components/ui/avatar/Avatar";
import { Button } from "@components/ui/button/Button";
import { Container } from "@components/ui/container/Container";
import { Input } from "@components/ui/input/Input";
import { useUser } from "@entities/user";
import { Items, ProfileItems } from "@shared/lib/utils/Items";
import { Logo } from "@shared/ui";
import { Sidebar } from "@widgets/sidebar/sidebar";
import disableScroll from "disable-scroll";
import { AnimatePresence } from "framer-motion";
import React, {
  FC,
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";

import modalStyle from "../../components/modal/Modal.module.scss";
import style from "./navbar.module.scss";

import LogoBlack from "@shared/static/images/logo/full/fullLogoBlack.svg";

interface Navbar {
  items: {
    settings: { header: { show: boolean; content: React.CElement<any, any> } };
    items: Items;
    additionalItems?: { show: boolean; items: Items };
    footerItems?: { show: boolean; items: Items };
  };
}

interface NavbarModal {
  state: { value: boolean; setHandler: React.Dispatch<any> };
  token: { value: string; setHandler: React.Dispatch<any> };
  handlers: Array<any>;
}
const NavbarModal: FC<NavbarModal> = ({ state, token }) => {
  const auth = useUser((state) => state.auth, shallow);

  const escFunction = useCallback((event: any) => {
    if (event.key === "Enter" && state.value) {
      if (token.value.includes("https://api.vime.world/web/token/")) {
        auth(token.value.replace("https://api.vime.world/web/token/", ""));
      } else {
        auth(token.value);
      }
    }
  }, []);

  const login = () => {
    if (token.value.includes("https://api.vime.world/web/token/")) {
      auth(token.value.replace("https://api.vime.world/web/token/", ""));
    } else {
      auth(token.value);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  return (
    <Modal.BackDrop state={state.value} setState={state.setHandler}>
      <Modal.Wrapper setState={state.setHandler}>
        <Modal.Content width={350} setState={state.setHandler}>
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
        </Modal.Content>
      </Modal.Wrapper>
    </Modal.BackDrop>
  );
};

export const Navbar: FC<Navbar> = ({ items }) => {
  const { isAuth, payload, logout, auth } = useUser((state) => state, shallow);
  const location = useLocation();
  const [token, setToken] = useState("");
  const [isOpenModalAuth, setIsOpenModalAuth] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [open, setOpen]: any = useState({
    state: false,
    settings: null,
    sideItems: null,
    additionalItems: null,
    footerItems: null,
  });
  const openSidebar = (items: any) => {
    setOpen({
      state: true,
      settings: items.settings,
      sideItems: items.items,
      additionalItems: items.additionalItems,
      footerItems: items.footerItems,
    });
  };

  useEffect(() => {
    setIsOpenModalAuth(false);
  }, [isAuth]);

  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (open.state) {
      disableScroll.on();
    } else {
      disableScroll.off();
    }
  }, [open.state]);

  return (
    <Fragment>
      <NavbarModal
        state={{ value: isOpenModalAuth, setHandler: setIsOpenModalAuth }}
        token={{ value: token, setHandler: setToken }}
        handlers={[auth]}
      />
      <header className={style.backDrop}>
        <Container>
          <div className={style.headerWrapper}>
            {isOpenSearch && (
              <div className={style.hiddenSearch}>
                <Input
                  placeholder={"Поиск по сайту.."}
                  options={{ useFocus: false }}
                  styles={{ width: "100%", height: "10%" }}
                />
                <Button
                  styles={{
                    padding: "0",
                    border: "none",
                    height: "48px",
                    minWidth: "48px",
                    backgroundColor: "var(--black04)",
                  }}
                  onClick={() => setIsOpenSearch(false)}
                >
                  <CloseIcon width={24} height={24} />
                </Button>
              </div>
            )}

            {!isOpenSearch && (
              <div className={style.header}>
                <Logo
                  type={"full"}
                  color={"black"}
                  href
                  height={28}
                  fillColor={location.pathname === "/" ? "white" : "black"}
                />
                {location.pathname !== "/" && (
                  <Input
                    placeholder={"Поиск по сайту.."}
                    styles={{
                      left: "106px",
                      minWidth: "470px",
                      height: "46px",
                    }}
                    options={{ useFocus: true }}
                    icon={{ position: "left", item: <SearchIcon /> }}
                    className={style.hiddenInput}
                  />
                )}
                <div className={style.menu}>
                  {isAuth && (
                    <Fragment>
                      <Button onClick={() => navigate("/play")}>Играть</Button>
                      <Button
                        styles={{
                          border: "none",
                          outline: "none",
                          padding: "0",
                        }}
                        onClick={() =>
                          openSidebar(ProfileItems(payload, logout))
                        }
                      >
                        <Avatar
                          username={payload.profile.name}
                          styles={{ height: "40px", width: "40px" }}
                          widthPremium={14}
                          heightPremium={14}
                        />
                      </Button>
                    </Fragment>
                  )}
                  <Button
                    styles={{
                      display: !isAuth ? "flex" : "none",
                      backgroundColor: "var(--black100)",
                      color: "var(--white100)",
                      border: "none",
                    }}
                    onClick={() => setIsOpenModalAuth(true)}
                  >
                    Войти
                  </Button>

                  <button
                    className={style.buttonDots}
                    onClick={() => openSidebar(items)}
                  >
                    ·
                  </button>
                </div>
              </div>
            )}
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {open.state && (
          <Sidebar
            settings={open.settings}
            state={open}
            setState={setOpen}
            items={open.sideItems}
            additionalItems={open.additionalItems}
            footerItems={open.footerItems}
          />
        )}
      </AnimatePresence>
    </Fragment>
  );
};
