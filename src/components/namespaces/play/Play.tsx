import { QueueResponse } from "@entities/user";
import { queueIO } from "@entities/user/model/user.events";
import { createState, useState as useStatee } from "@hookstate/core";
import { errorToast, successToast } from "@shared/lib/utils";
import {
  BedWars2v2Image,
  BedWars4v4Image,
  BedWars6v6Image,
} from "@shared/static/images";
import { AcceptedMatchSound, FoundedMatchSound } from "@shared/static/sounds";
import React, { FC, Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useTimer } from "use-timer";

import { CloseIcon } from "@components/icons/Icons";
import { Modal } from "@components/modal/Modal";
import modalStyle from "@components/modal/Modal.module.scss";
import { Button } from "@components/ui/button/Button";
import style from "./Play.module.scss";

const globalState = createState({ tab: 0 });

export namespace Play {
  export const Head = () => {
    const state = useStatee(globalState);

    return (
      <Fragment>
        {state.tab.get() ? (
          <div className={style.head}>
            <div className={style.leftInfo}>
              <div className={style.headTitle}>
                <span
                  className={style.title}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-4)",
                  }}
                >
                  <Button
                    styles={{ width: "40px", height: "40px", padding: "0" }}
                    onClick={() => state.tab.set(0)}
                  >
                    <CloseIcon />
                  </Button>{" "}
                  Выберите тип
                </span>
              </div>
              <div className={style.headDescription}>
                <span>Выберите тип для начала рейтинговой игры</span>
              </div>
            </div>
          </div>
        ) : (
          <div className={style.head}>
            <div className={style.leftInfo}>
              <div className={style.headTitle}>
                <span className={style.title}>Выберите формат</span>
              </div>
              <div className={style.headDescription}>
                <span>Выберите формат для начала рейтинговой игры</span>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  };
  export const Body: FC<{ payload: any }> = ({ payload }) => {
    const state = useStatee(globalState);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [users, setUsers] = useState<any>([]);
    const [search, setSearch] = useState<boolean>(false);
    const { time, start, pause, reset } = useTimer({
      initialTime: 0,
      interval: 1000,
      timerType: "INCREMENTAL",
    });
    const [hoverSearch, setHoverSearch] = useState<boolean>(false);

    const [data, setData] = useState<QueueResponse<any[]>>({
      status: "searching",
      payload: [],
    });
    const navigate = useNavigate();

    const joinQueue = () => {
      console.log("Присоединение к очереди..."); // DEBUG
      toastError();
    };

    const outQueue = () => {
      reset();
      pause();
      setSearch(false);

      queueIO.emit("leave", { id: payload.id });
      console.log("socket disconnected");
      setTimeout(() => {
        queueIO.disconnect();
      }, 300);
    };

    useEffect(() => {
      queueIO.on("connect", () => {
        queueIO.emit("join", { id: payload.id }, (data: any) => {
          setData(data);
        });
      });

      queueIO.on("join.event", (data) => {
        setData(data);
      });

      return () => {
        queueIO.off("connect");
        queueIO.off("join.event");
      };
    }, []);

    useEffect(() => {
      queueIO.on("rooms.listener", (usersInfo) => {
        console.log(usersInfo);
        setUsers(usersInfo["ranking_1000_1000"]);
      });

      return () => {
        queueIO.off("rooms.listener");
      };
    }, [state]);

    const [loading, setLoading] = React.useState<boolean>(false);

    useEffect(() => {
      const audio1 = new Audio(FoundedMatchSound);
      const audio2 = new Audio(AcceptedMatchSound);
      audio1.addEventListener("canplaythrough", () => {
        if (data.status === "ready") {
          audio1.play();
          setLoading(!loading);
          toast.error(
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-1)",
              }}
            >
              <span
                style={{
                  color: "var(--white100)",
                  fontWeight: "var(--fontWeights-semibold)",
                }}
              >
                Ваша игра найдена
              </span>
            </div>,
            successToast
          );
          setTimeout(() => {
            navigate(`/match/${data.url}`);
            audio2.play();
          }, 15000);
        }
      });
      return () => {
        audio1.pause();
        audio1.removeEventListener("canplaythrough", () => {});
      };
    }, [data]);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const displayMinutes = String(minutes).padStart(2, "0");
    const displaySeconds = String(seconds).padStart(2, "0");
    const displayTime = `${displayMinutes}:${displaySeconds}`;
    const displayText = search
      ? hoverSearch
        ? `Идет поиск (${displayTime})`
        : "Отменить поиск"
      : "Начать поиск";

    const toastError = () => {
      toast.error(
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-1)",
          }}
        >
          <span
            style={{
              color: "var(--white100)",
              fontWeight: "var(--fontWeights-semibold)",
            }}
          >
            Ошибка
          </span>
          <span
            style={{
              color: "var(--white60)",
              fontWeight: "var(--fontWeights-medium)",
              fontSize: "var(--fontSizes-0)",
            }}
          >
            бедварс организация events запретила вам заходить в поиск (санкции)
          </span>
        </div>,
        errorToast
      );
    };

    return (
      <Fragment>
        <Modal.BackDrop state={isOpenModal} setState={setIsOpenModal}>
          <Modal.Wrapper setState={setIsOpenModal}>
            <Modal.Content width={350} setState={setIsOpenModal}>
              <div className={modalStyle.header}>
                <h1 className={modalStyle.title}>
                  Одиночный подбор на{" "}
                  {state.tab.get() === 1
                    ? "2v2"
                    : state.tab.get() === 2
                    ? "4v4"
                    : "6v6"}
                </h1>
              </div>
              <div className={modalStyle.body}>
                <span className={modalStyle.text}>
                  Перезагрузка страницы приведет к отключению Вас из очереди
                </span>
                {/* <span
                  className={modalStyle.text}
                  style={{ textAlign: "center" }}
                >
                  В поиске: {users.length}
                </span> */}
              </div>
              <div className={modalStyle.footer}>
                <Button
                  styles={{
                    backgroundColor: "var(--black100)",
                    color: "var(--white100)",
                    height: "48px",
                    border: "none",
                  }}
                  onMouseEnter={() => setHoverSearch(false)}
                  onMouseLeave={() => setHoverSearch(true)}
                  onClick={!search ? () => joinQueue() : () => outQueue()}
                >
                  {loading ? (
                    <ClipLoader
                      color={"var(--white60)"}
                      loading={true}
                      size={10}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    displayText
                  )}
                </Button>
              </div>
            </Modal.Content>
          </Modal.Wrapper>
        </Modal.BackDrop>

        <Tabs>
          <div className={style.body}>
            {state.tab.get() === 0 ? (
              <TabList className={style.format}>
                <Tab
                  style={{
                    backgroundImage: `url(${BedWars2v2Image})`,
                    pointerEvents: "none",
                  }}
                  className={style.item}
                >
                  <div className={style.info}>
                    <h1 className={style.title}>4v4 Premium</h1>
                    <span className={style.online}>Режим недоступен</span>
                  </div>
                </Tab>
                <Tab
                  style={{ backgroundImage: `url(${BedWars4v4Image})` }}
                  className={style.item}
                  onClick={() => state.tab.set(2)}
                >
                  <div className={style.info}>
                    <h1 className={style.title}>4v4</h1>
                    <span className={style.online}>
                      В подборе: {users.length}
                    </span>
                  </div>
                </Tab>
                <Tab
                  style={{
                    backgroundImage: `url(${BedWars6v6Image})`,
                    pointerEvents: "none",
                  }}
                  className={style.item}
                >
                  <div className={style.info}>
                    <h1 className={style.title}>6v6</h1>
                    <span className={style.online}>Режим недоступен</span>
                  </div>
                </Tab>
              </TabList>
            ) : (
              ""
            )}
            {state.tab.get() != 0 ? (
              <Fragment>
                <TabPanel className={style.mode}>
                  <button
                    className={style.item}
                    onClick={() =>
                      state.tab.get() === 1
                        ? setIsOpenModal(true)
                        : state.tab.get() === 2
                        ? setIsOpenModal(true)
                        : setIsOpenModal(true)
                    }
                  >
                    <span className={style.sticker}>👼</span>
                    <h1 className={style.title}>Одиночный</h1>
                  </button>
                  <button
                    className={style.item}
                    style={{
                      userSelect: "none",
                      pointerEvents: "none",
                      filter: "grayscale(1)",
                    }}
                  >
                    <span className={style.sticker}>👯‍♀️</span>
                    <h1 className={style.title}>С друзьями</h1>
                    <span className={style.online}>Режим недоступен</span>
                  </button>
                </TabPanel>
              </Fragment>
            ) : (
              ""
            )}
          </div>
        </Tabs>
      </Fragment>
    );
  };
}
