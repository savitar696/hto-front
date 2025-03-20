import { createState, useState } from "@hookstate/core";
import {
  BedWars2v2Image,
  BedWars4v4Image,
  BedWars6v6Image,
  RainbowImage,
  WallpaperSampleGif,
} from "@shared/static/images";
import React, { FC, Fragment, Key, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

import {
  AddIcon,
  DiscordIcon,
  DotsIcon,
  ShareIcon,
  TelegramIcon,
  VkIcon,
} from "../../icons/Icons";
import { Modal } from "../../modal/Modal";
import modalStyle from "../../modal/Modal.module.scss";
import { Popover, PopoverWrapper } from "../../popover/Popover";
import { Avatar } from "../../ui/avatar/Avatar";
import { Button } from "../../ui/button/Button";
import { NotFound } from "../notFound/NotFound";
import style from "./Player.module.scss";
import { game, GamePayload, GameUserPayload } from "@entities/game";
import { shallow } from "zustand/shallow";
import { useUser } from "@entities/user";
import { BiSolidErrorCircle } from "react-icons/bi";
import { Tooltip } from "react-tooltip";
import { getMapImage, MapImages, MapName } from "@shared/lib/utils/Maps";

const globalState = createState({
  tab: 1,
  sizes: 0,
  wrapperSize: 0,
});

interface FanModalInterface {
  state: { value: boolean; setHandler: React.Dispatch<any> };
  handlers: Array<any>;
  type: string;
  users?: Array<string>;
}

export namespace Player {
  export const Initialization: FC<{
    children: React.ReactNode;
    user: boolean;
  }> = ({ children, user }) => {
    return user ? (
      <Fragment>{children}</Fragment>
    ) : (
      <NotFound.Body
        title={"404"}
        description={
          "Нам не удалось найти данного игрока в нашей базе данных, возможно, он еще не авторизовался"
        }
      />
    );
  };

  const FanModal: FC<FanModalInterface> = ({ type, state }) => {
    return (
      <Modal.BackDrop state={state.value} setState={state.setHandler}>
        <Modal.Wrapper setState={state.setHandler}>
          <Modal.Content width={350} height={400} setState={state.setHandler}>
            <div className={modalStyle.header}>
              <h1 className={modalStyle.title}>
                {type === "followers" ? "Подписчики" : "Подписки"}
              </h1>
            </div>
            <div className={modalStyle.body}>
              <div className={modalStyle.modalItem}>
                <div className={modalStyle.modalItemProfile}>
                  <Link to={"/player/YaClary"}>
                    <Avatar
                      username={"Realish"}
                      styles={{ width: 40, height: 40 }}
                    />
                  </Link>
                  <div className={modalStyle.modalItemUser}>
                    <Link
                      className={modalStyle.modalUsername}
                      to={"/player/Realish"}
                    >
                      Realish
                    </Link>
                    <span className={modalStyle.modalUserFollowers}>
                      1 подписчик
                    </span>
                  </div>
                </div>
                <Button
                  styles={{
                    border: "none",
                    background: "var(--black100)",
                    height: "48px",
                    width: "146px",
                    padding: "0px 18.24px",
                    color: "var(--white100)",
                    fontSize: "var(--fontSizes-1)",
                    gap: "var(--space-1)",
                  }}
                >
                  <AddIcon height={20} width={20} fill={"var(--white100)"} />
                  <span>Подписаться</span>
                </Button>
              </div>
              <div className={modalStyle.modalItem}>
                <div className={modalStyle.modalItemProfile}>
                  <Link to={"/player/YaClary"}>
                    <Avatar
                      username={"YaClary"}
                      styles={{ width: 40, height: 40 }}
                    />
                  </Link>
                  <div className={modalStyle.modalItemUser}>
                    <Link
                      className={modalStyle.modalUsername}
                      to={"/player/YaClary"}
                    >
                      YaClary
                    </Link>
                    <span className={modalStyle.modalUserFollowers}>
                      0 подписчиков
                    </span>
                  </div>
                </div>
                <Button
                  styles={{
                    border: "none",
                    background: "rgba(0, 0, 0, 0.05) none repeat scroll 0% 0%",
                    height: "48px",
                    width: "146px",
                    padding: "0px 18.24px",
                    color: "var(--black100)",
                    fontSize: "var(--fontSizes-1)",
                    gap: "var(--space-2)",
                  }}
                >
                  <span>Подписан</span>
                </Button>
              </div>
            </div>
          </Modal.Content>
        </Modal.Wrapper>
      </Modal.BackDrop>
    );
  };

  export const Head = ({ data }: any) => {
    const { username } = useParams<{ username: string }>();
    const userState = useUser((state) => state.payload, shallow);
    const profile = userState?.profile ?? null;

    const [popover, setPopover] = React.useState<
      Array<{ index: string; value: boolean }>
    >([
      { index: "popover1", value: false },
      { index: "popover2", value: false },
      { index: "ban-status", value: false },
    ]);
    const [copy, setCopy] = React.useState("Копировать");

    const [modal, setModal] = React.useState(false);
    const navigate = useNavigate();

    const openInNewTab = (url?: string | URL) => {
      if (url) {
        window.open(url.toString(), "Data", "height=550,width=550");
      }
    };

    const copyURL = () => {
      navigator.clipboard.writeText(window.location.href);
      setCopy("Скопировано");

      setTimeout(() => {
        setPopover((prev) => prev.map((item) => ({ ...item, value: false })));
        setCopy("Копировать");
      }, 500);
    };

    const formatTimePlayed = (seconds?: number) => {
      if (!seconds) return "0 ч. 0 мин.";

      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return `${hours} ч. ${minutes} мин.`;
    };

    return (
      <Fragment>
        <FanModal
          state={{ value: modal, setHandler: setModal }}
          handlers={[]}
          type=""
        />

        <div className={style.head}>
          <div className={style.cover}>
            <div className={style.coverImageButtonWrapper}>
              <div className={style.imageButton}>
                <div className={style.imageWrapper}>
                  <img
                    src={data?.properties?.[0]?.value || RainbowImage}
                    alt="wallpaper"
                  />
                </div>
              </div>
            </div>
            <div className={style.coverAvatar}>
              <Avatar
                username={username || "Неизвестный"}
                widthPremium={30}
                heightPremium={30}
                styles={{ margin: "-5px" }}
              />
            </div>
          </div>
          <div className={style.info}>
            <div className={style.userNameButtons}>
              <div className={style.headInfo}>
                <div className={style.userName}>
                  <h1>{username || "Неизвестный"}</h1>
                  {data && data.ban && data.ban.valid && (
                    <div className={style.banStatus}>
                      <BiSolidErrorCircle color="var(--red)" size={"24"} />
                    </div>
                  )}
                </div>
                <span className={style.status}>
                  Сегодня я скушал несколько апельсинов
                </span>
              </div>
              <div className={style.buttons}>
                {profile?.name === username && (
                  <Button
                    styles={{
                      border: "none",
                      background: "rgba(0, 0, 0, 0.05)",
                      height: "48px",
                      padding: "0px 16px",
                      fontSize: "var(--fontSizes-1)",
                    }}
                    onClick={() => navigate("/settings")}
                  >
                    Редактировать профиль
                  </Button>
                )}
                <Popover
                  state={{ value: popover, setState: setPopover }}
                  anchor={
                    <Button
                      styles={{
                        border: "none",
                        background: "rgba(0, 0, 0, 0.05)",
                        height: "48px",
                        padding: "0px 12px",
                        fontSize: "var(--fontSizes-1)",
                      }}
                      onClick={() =>
                        setPopover((prev) =>
                          prev.map((item) =>
                            item.index === "popover1"
                              ? { ...item, value: !item.value }
                              : item
                          )
                        )
                      }
                    >
                      <ShareIcon
                        width={24}
                        height={24}
                        fill="var(--black100)"
                      />
                    </Button>
                  }
                >
                  <PopoverWrapper styles={{ gap: "var(--space-3)" }}>
                    <div
                      style={{
                        fontWeight: "var(--fontWeights-semibold)",
                        fontSize: 18,
                      }}
                    >
                      Поделитесь ссылкой на профиль
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "var(--space-6)",
                      }}
                    >
                      <Button
                        onClick={() =>
                          openInNewTab(
                            `https://vk.com/share.php?url=${window.location.href}`
                          )
                        }
                        styles={{
                          border: "1px solid var(--black10)",
                          height: "48px",
                          padding: "0px 12px",
                          fontSize: "var(--fontSizes-1)",
                        }}
                      >
                        <VkIcon width={22} height={22} />
                      </Button>
                      <Button
                        onClick={() =>
                          openInNewTab(
                            `https://telegram.me/share/?url=${window.location.href}&title=${username}`
                          )
                        }
                        styles={{
                          border: "1px solid var(--black10)",
                          height: "48px",
                          padding: "0px 12px",
                          fontSize: "var(--fontSizes-1)",
                        }}
                      >
                        <TelegramIcon width={22} height={22} />
                      </Button>
                      <Button
                        styles={{
                          border: "1px solid var(--black10)",
                          height: "48px",
                          padding: "0px 12px",
                          fontSize: "var(--fontSizes-1)",
                        }}
                      >
                        <DiscordIcon width={22} height={22} />
                      </Button>
                      <Button
                        onClick={copyURL}
                        styles={{
                          border: "1px solid var(--black10)",
                          height: "48px",
                          padding: "0px 12px",
                          fontSize: "var(--fontSizes-1)",
                        }}
                      >
                        <ShareIcon width={22} height={22} />
                        {copy}
                      </Button>
                    </div>
                  </PopoverWrapper>
                </Popover>
                <Popover
                  state={{ value: popover, setState: setPopover }}
                  anchor={
                    <Button
                      styles={{
                        border: "none",
                        background: "rgba(0, 0, 0, 0.05)",
                        height: "48px",
                        padding: "0px 12px",
                        fontSize: "var(--fontSizes-1)",
                      }}
                      onClick={() => setModal(!modal)}
                    >
                      <DotsIcon width={24} height={24} />
                    </Button>
                  }
                  children={undefined}
                ></Popover>
              </div>
            </div>
            <div className={style.followFollowersWrapper}>
              <div className={style.followFollowers}>
                <div className={style.items}>
                  <div className={style.item}>
                    <span className={style.title}>Наиграно времени</span>
                    <div className={style.status}>
                      <span className={style.title}>
                        {formatTimePlayed(data?.time_played)}
                      </span>
                    </div>
                  </div>
                  <div className={style.item}>
                    <span className={style.title}>Рейтинг</span>
                    <div className={style.status}>
                      <span className={style.title}>
                        {data?.rating ?? "1000"}
                      </span>
                    </div>
                  </div>
                  <hr />
                  <div className={style.item}>
                    <span className={style.title}>Статус</span>
                    <div className={style.status}>
                      <span
                        className={style.title}
                        style={{
                          color:
                            data.role &&
                            data?.role.some(
                              (role: any) => role.name === "ADMIN"
                            )
                              ? "var(--red)"
                              : "none",
                        }}
                      >
                        {data.role &&
                        data?.role.some((role: any) => role.name === "ADMIN")
                          ? "Администратор"
                          : "Игрок"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  const TableItem: FC<{
    head: Array<string>;
    data: any;
    games: any;
  }> = ({ head, data, games }) => {
    const navigate = useNavigate();
    const formatDate = (date: Date) => {
      if (!(date instanceof Date) || isNaN(date.getTime())) {
        return <span>Некорректная дата</span>;
      }

      const dateOptions: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };

      return (
        <>
          <span>
            {new Intl.DateTimeFormat("ru-RU", dateOptions).format(date)}
          </span>
        </>
      );
    };

    if (
      !Array.isArray(head) ||
      !Array.isArray(games) ||
      !data?.profile?.vime_id
    ) {
      return <p>Ошибка: Некорректные данные</p>;
    }

    const vimeId = Number(data.profile.vime_id);
    if (isNaN(vimeId)) {
      return <p>Ошибка: Некорректный ID пользователя</p>;
    }

    return (
      <table className={style.statistic}>
        <thead>
          <tr>
            {head.map((item: string, key: Key) => (
              <th key={key} style={{ width: `calc(100% / ${head.length})` }}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {games
            .filter((item) => item.map_id !== "load")
            .map((item, key) => {
              const gameDate = new Date(item.created_at);
              const isWinner =
                item.winners?.some((i: GameUserPayload) => i.id === vimeId) ??
                false;

              return (
                <tr key={key}>
                  <td>
                    <div className={style.date}>{formatDate(gameDate)}</div>
                  </td>
                  <td>4x2</td>
                  <td>
                    <span
                      style={{
                        color: isWinner ? "var(--green)" : "var(--red)",
                      }}
                    >
                      {isWinner ? "Победа" : "Поражение"}
                    </span>
                  </td>
                  <td>
                    <div className={style.map}>
                      <img src={getMapImage(item.map_name)} alt="Карта" />
                      {item.map_name || "Неизвестная карта"}
                    </div>
                  </td>
                  <td className={style.map}>
                    <Button onClick={() => navigate(`/match/${item.id}`)}>
                      Перейти
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  };

  const GameItem = ({
    data,
    games,
    image = BedWars4v4Image,
    type = "4v4",
  }: any) => {
    const counts = new Map<string, number>();
    for (const map of games) {
      counts.set(map.map_name, (counts.get(map.map_name) || 0) + 1);
    }
    const sortedCounts = Array.from(counts.entries()).sort(
      (a, b) => b[1] - a[1]
    );

    const frequentMaps = sortedCounts.slice(0, 1).map((entry) => entry[0]);

    return (
      <div className={style.matchCard}>
        <div
          className={style.matchCardImg}
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          <h1 className={style.matchCardImgTitle}>{type}</h1>
        </div>
        <div className={style.matchCardInfo}>
          <div className={style.matchCardInfoColumn}>
            <span className={style.matchCardInfoColumnTitle}>
              {data?.win + data?.lose}
            </span>
            <span className={style.matchCardInfoColumnDescription}>Матчи</span>
          </div>
          <div className={style.matchCardInfoColumn}>
            <span className={style.matchCardInfoColumnTitle}>
              {data?.rating}
            </span>
            <span className={style.matchCardInfoColumnDescription}>
              Рейтинг
            </span>
          </div>
          <div className={style.matchCardInfoColumn}>
            <span className={style.matchCardInfoColumnTitle}>
              {data?.brokenBeds}
            </span>
            <span className={style.matchCardInfoColumnDescription}>
              Кроватей сломано
            </span>
          </div>
          <div className={style.matchCardInfoColumn}>
            <span className={style.matchCardInfoColumnTitle}>
              {data?.kills}
            </span>
            <span className={style.matchCardInfoColumnDescription}>
              Убийств
            </span>
          </div>
          <div className={style.matchCardInfoColumn}>
            <span className={style.matchCardInfoColumnTitle}>
              {data?.deaths}
            </span>
            <span className={style.matchCardInfoColumnDescription}>
              Смертей
            </span>
          </div>
          <div className={style.matchCardInfoColumn}>
            <span className={style.matchCardInfoColumnTitle}>{data?.win}</span>
            <span className={style.matchCardInfoColumnDescription}>Побед</span>
          </div>
          <div className={style.matchCardInfoColumn}>
            <span className={style.matchCardInfoColumnTitle}>{data?.lose}</span>
            <span className={style.matchCardInfoColumnDescription}>
              Поражений
            </span>
          </div>
          <div className={style.matchCardInfoColumn}>
            <span className={style.matchCardInfoColumnTitle}>
              {frequentMaps.length == 0 ? "Нет" : frequentMaps}
            </span>
            <span className={style.matchCardInfoColumnDescription}>
              Частая карта
            </span>
          </div>
          <div className={style.matchCardInfoColumn}>
            <span className={style.matchCardInfoColumnTitle}>Нет</span>
            <span className={style.matchCardInfoColumnDescription}>
              Лучшая карта
            </span>
          </div>
          <div className={style.matchCardInfoColumn}>
            <span className={style.matchCardInfoColumnTitle}>{data.wr}</span>
            <span className={style.matchCardInfoColumnDescription}>
              Процент побед
            </span>
          </div>
          <div
            style={{ gridColumn: "1 / 6" }}
            className={style.matchCardInfoColumn}
          >
            <div className={style.matchCardInfoColumnTitle}>
              {games && data.profile && games.length > 0
                ? Array.from({ length: 10 - games.length }).map((_, key) => (
                    <span
                      key={`empty-${key}`}
                      style={{
                        color: "var(--black50)",
                        fontWeight: "var(--fontWeights-medium)",
                      }}
                    >
                      -
                    </span>
                  ))
                : Array.from({ length: 10 }).map((_, key) => (
                    <span
                      key={`empty-${key}`}
                      style={{
                        color: "var(--black50)",
                        fontWeight: "var(--fontWeights-medium)",
                      }}
                    >
                      -
                    </span>
                  ))}

              {data.profile &&
                games
                  .slice(0, 10)
                  .reverse()
                  .map((item: any, key: Key) => (
                    <span
                      key={`game-${key}`}
                      style={{
                        color: item?.winners.some(
                          (i: GameUserPayload) =>
                            i.id === Number(data.profile.vime_id)
                        )
                          ? "var(--green)"
                          : "var(--red)",
                      }}
                    >
                      {item?.winners.some(
                        (i: GameUserPayload) =>
                          i.id === Number(data.profile.vime_id)
                      )
                        ? "W"
                        : "L"}
                    </span>
                  ))}
            </div>
            <span className={style.matchCardInfoColumnDescription}>
              Последние матчи
            </span>
          </div>
        </div>
      </div>
    );
  };

  export const Body = ({ data, games }: any) => {
    const ref: any = useRef(null);
    const state = useState(globalState);

    const selectTab = (id: number) => {
      state.tab.set(id);
    };

    return (
      <Fragment>
        <div className={style.body}>
          <Tabs
            style={{
              gap: "var(--space-6)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TabList style={{ margin: 0, padding: 0 }}>
              <div className={style.tabs}>
                <div
                  className={style.border}
                  style={{
                    transform:
                      state.tab.get() === 1
                        ? "translateX(0px)"
                        : state.tab.get() === 2
                        ? "translateX(110px)"
                        : `translateX(180px)`,
                    width: state.sizes.get(),
                  }}
                ></div>
                <Tab>
                  <button
                    onClick={() => selectTab(1)}
                    ref={state.tab.get() === 1 ? ref : null}
                    style={{
                      color:
                        state.tab.get() === 1
                          ? "var(--black100)"
                          : "var(--black60)",
                    }}
                    className={style.tab}
                  >
                    Статистика
                  </button>
                </Tab>
                <Tab>
                  <button
                    onClick={() => selectTab(2)}
                    ref={state.tab.get() === 2 ? ref : null}
                    style={{
                      color:
                        state.tab.get() === 2
                          ? "var(--black100)"
                          : "var(--black60)",
                    }}
                    className={style.tab}
                  >
                    Матчи
                  </button>
                </Tab>
              </div>
            </TabList>
            <div className={style.tabBody}>
              <TabPanel>
                <div className={style.match}>
                  <GameItem
                    data={data}
                    games={games}
                    image={BedWars2v2Image}
                    type={"Premium"}
                  />
                  <GameItem
                    data={data}
                    games={games}
                    image={BedWars4v4Image}
                    type={"4v4"}
                  />
                  <GameItem
                    data={data}
                    games={games}
                    image={BedWars6v6Image}
                    type={"6v6"}
                  />
                </div>
              </TabPanel>

              <TabPanel>
                <TableItem
                  head={["Дата", "Режим", "Результат", "Карта"]}
                  games={games}
                  data={data}
                />
              </TabPanel>
            </div>
          </Tabs>
        </div>
      </Fragment>
    );
  };
}
