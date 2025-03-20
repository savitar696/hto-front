import { useUser } from "@entities/user";
import { ComponentInterface } from "@shared/lib/types";
import { multipleStarModalAnimation } from "@shared/lib/utils/Animations";
import {
  PaymentItems,
  PremiumItem,
  PremiumPlusItem,
} from "@shared/lib/utils/Items";
import { errorToast } from "@shared/lib/utils/Theme";
import {
  BedWars4v4Image,
  BedWars6v6Image,
  SkinsOrphans3D,
  WallpaperSampleGif,
} from "@shared/static/images";
import { motion } from "framer-motion";
import React, { FC, Fragment, useState } from "react";
import toast from "react-hot-toast";
import { shallow } from "zustand/shallow";

import {
  ArrowIcon,
  CrownIcon,
  PremiumBackgroundGradient,
} from "../../icons/Icons";
import { Modal } from "../../modal/Modal";
import modalStyle from "../../modal/Modal.module.scss";
import { RainbowText } from "../../rainbowText/RainbowText";
import { Avatar } from "../../ui/avatar/Avatar";
import { Button } from "../../ui/button/Button";
import { ButtonsSlider } from "../../ui/buttonsSlider/ButtonsSlider";
import style from "./Subscription.module.scss";

interface SubscriptionModalInterface {
  type: number;
  state: { value: boolean; setHandler: React.Dispatch<any> };
  handlers: Array<any>;
}

export namespace Subscription {
  const SubscriptionModal: FC<SubscriptionModalInterface> = ({
    state,
    handlers,
    type,
  }) => {
    return (
      <Fragment>
        <Modal.BackDrop state={state.value} setState={state.setHandler}>
          <Modal.Wrapper setState={state.setHandler}>
            <motion.div
              variants={multipleStarModalAnimation}
              initial={"initial"}
            ></motion.div>
            <Modal.Content width={500} setState={state.setHandler}>
              <div className={modalStyle.header}>
                <h1 className={modalStyle.title}>
                  Покупка подписки{" "}
                  {type === 1 ? (
                    <span>Premium</span>
                  ) : (
                    <span className={style.textGradient}>Premium +</span>
                  )}
                </h1>
              </div>
              <div className={modalStyle.body}>
                <span className={modalStyle.text}>
                  Выберите удобную для Вас подписку и платежную систему
                </span>
                <ButtonsSlider
                  styles={{ height: "60px" }}
                  items={type === 1 ? PremiumItem : PremiumPlusItem}
                  onStateChanged={(newState) => handlers[0](newState)}
                />
                <ButtonsSlider
                  styles={{ height: "60px" }}
                  items={PaymentItems}
                  onStateChanged={(newState) => handlers[1](newState)}
                />
              </div>
              <div className={modalStyle.footer}>
                <Button
                  onClick={handlers[3]}
                  styles={{
                    backgroundColor: "var(--black100)",
                    color: "var(--white100)",
                    height: "48px",
                    border: "none",
                  }}
                >
                  Оплатить
                </Button>
                <Button
                  onClick={() => state.setHandler(false)}
                  styles={{
                    height: "48px",
                  }}
                >
                  Вернуться назад
                </Button>
              </div>
            </Modal.Content>
          </Modal.Wrapper>
        </Modal.BackDrop>
      </Fragment>
    );
  };

  export const Slides: FC<ComponentInterface> = ({ children }) => {
    return <div className={style.slides}>{children}</div>;
  };

  export const Intro = () => {
    const { isAuth } = useUser((state) => state, shallow);

    const [isOpen, setIsOpen0] = useState(false);
    const [modal, setModal] = useState(0);

    const setIsOpen = (state: boolean) => {
      setIsOpen0(state);
    };

    const openModal = (current: number) => {
      if (!isAuth) {
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
              Для этого действия необходимо войти в аккаунт
            </span>
          </div>,
          errorToast
        );
        return;
      }

      setIsOpen(true);
      setModal(current);
    };

    const [charging, setCharging] = useState(false);

    const charge = () => {
      if (!isAuth) {
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
              Для этого действия необходимо войти в аккаунт
            </span>
          </div>,
          errorToast
        );
        return;
      }

      if (charging) {
        return;
      }

      setCharging(true);
    };

    return (
      <Fragment>
        <SubscriptionModal
          type={modal}
          state={{ value: isOpen, setHandler: setIsOpen }}
          handlers={[0, 0, charge]}
        />
        <div className={style.intro}>
          <div className={style.wrapper}>
            <RainbowText
              styles={{
                fontSize: "var(--fontSizes-16)",
                lineHeight: "160px",
              }}
              blur={true}
            >
              Premium
            </RainbowText>
            <span className={style.description}>
              Получите новые впечатления от игры и уникальные функции
              <br />
              на нашем сайте с временной подпиской
            </span>
          </div>
          <Button
            onClick={() => openModal(1)}
            styles={{
              background: "var(--white100)",
              fontSize: "var(--fontSizes-1)",
              width: "300px",
              height: "50px",
            }}
          >
            Купить подписку
          </Button>
          <div className={style.detail}>
            <span className={style.title}>Узнать подробнее</span>
            <div className={style.icon}>
              <ArrowIcon height={28} width={28} />
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  export const ExclusiveIcon = () => {
    return (
      <div
        className={style.slide}
        style={{ background: "#FCE4EC", gap: "var(--space-13)" }}
      >
        <img className={style.skin3d} src={SkinsOrphans3D} alt={"YaClary"} />
        <div className={style.info} style={{ alignItems: "flex-start" }}>
          <motion.div whileHover={{ scale: 1.2 }} className={style.avatar}>
            <Avatar
              username={`YaClary`}
              widthPremium={40}
              heightPremium={40}
              permanentPremium
              styles={{ width: "100%", height: "100%", padding: "4px" }}
            />
          </motion.div>
          <span className={style.title} style={{ textAlign: "left" }}>
            Эксклюзивный значок
            <br /> в игре и на сайте
          </span>
          <span className={style.description} style={{ textAlign: "left" }}>
            Включить или выключить его видимость
            <br /> можно в настройках профиля
          </span>
        </div>
      </div>
    );
  };

  export const AnimatedWallpaper = () => {
    return (
      <div
        className={style.slide}
        style={{ background: "#E3F2FD", flexDirection: "column" }}
      >
        <div className={style.wallpaperAvatar}>
          <div className={style.wallpaper}>
            <div className={style.wallpaperWrapper}>
              <img src={WallpaperSampleGif} alt="wallpaper" />
            </div>
          </div>
          <div className={style.imageAvatar}>
            <Avatar
              username={`YaClary`}
              widthPremium={40}
              heightPremium={40}
              permanentPremium
              styles={{ width: "100%", height: "100%", padding: "4px" }}
            />
          </div>
        </div>
        <div className={style.info} style={{ gap: "var(--space-2)" }}>
          <span className={style.title}>Анимированная обложка профиля</span>
          <span className={style.description}>
            Получите возможность украсить свой профиль анимированной обложкой
          </span>
        </div>
      </div>
    );
  };

  export const PremiumMatchmaking = () => {
    return (
      <div
        className={style.slide}
        style={{ background: "#F3E5F5", flexDirection: "column" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-4)",
            width: "100%",
          }}
        >
          <div className={style.format}>
            {/* <div
              style={{ backgroundImage: `url(${BedWars2v2Image})` }}
              className={style.item}
            >
              <div className={style.info}>
                <h1 className={style.title}>2v2</h1>
                <span className={style.online}>В подборе: 0</span>
              </div>
            </div> */}
            <div
              style={{ backgroundImage: `url(${BedWars4v4Image})` }}
              className={style.item}
            >
              <div className={style.info}>
                <h1 className={style.title}>4v4</h1>
                <span className={style.online}>В подборе: 0</span>
              </div>
            </div>
            <div
              style={{ backgroundImage: `url(${BedWars6v6Image})` }}
              className={style.item}
            >
              <div className={style.info}>
                <h1 className={style.title}>6v6</h1>
                <span className={style.online}>В подборе: 0</span>
              </div>
            </div>
          </div>
        </div>
        <div className={style.info} style={{ gap: "var(--space-2)" }}>
          <span className={style.title}>Премиум-подбор соперников</span>
          <span className={style.description}>
            Поиск игры происходит среди других владельцев платной подписки
          </span>
        </div>
      </div>
    );
  };

  export const AdvancedRating = () => {
    return (
      <div
        className={style.slide}
        style={{ background: "#EEFFE1", flexDirection: "column" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-4)",
            width: "100%",
          }}
        ></div>
        <div className={style.info} style={{ gap: "var(--space-2)" }}>
          <span className={style.title}>Дополнительный рейтинг</span>
          <span className={style.description}>
            Получите дополнительный рейтинг после выигранной игры.
          </span>
        </div>
      </div>
    );
  };

  export const PriorityCaptain = () => {
    return (
      <div
        className={style.slide}
        style={{
          background: "#E8EAF6",
          display: "flex", // Используем flex вместо grid
          flexDirection: "row", // Размещаем элементы в строку (по умолчанию)
          justifyContent: "space-between", // Добавляем пространство между элементами
          overflow: "hidden",
        }}
      >
        <div className={style.info} style={{ alignItems: "flex-start" }}>
          <span className={style.title} style={{ textAlign: "left" }}>
            Приоритетная возможность
            <br /> стать капитаном команды
          </span>
          <span className={style.description} style={{ textAlign: "left" }}>
            Приоритет над всеми игроками на роль капитана в матчах.
            <br />
            На Premium матчмейкинге все игроки имеют платную <br /> подписку и
            капитан будет определяться случайно
          </span>
        </div>
        <div className={style.playerItems}>
          <div className={style.player} style={{ width: "400px" }}>
            <div className={style.defaultInfo}>
              <button className={style.avatarButton}>
                <Avatar
                  widthPremium={14}
                  heightPremium={14}
                  username={"k1arov"}
                  permanentPremium
                  styles={{ width: "40px", height: "40px" }}
                />
              </button>
              <span className={style.username}>
                k1arov{" "}
                <CrownIcon width={16} height={16} fill={"var(--yellow)"} />
              </span>
            </div>
            <div className={style.executionInfo}>
              <div className={style.executionInfoLeft}>
                <div className={style.executionInfoLeftTitle}>Всего</div>
                <div className={style.executionInfoLeftDescription}>
                  <span className={style.text}>3</span>
                  <span className={style.title}>Матчи</span>
                </div>
              </div>
              <div className={style.executionInfoRight}>
                <div className={style.executionInfoRightTitle}>
                  Последние 20 матчей
                </div>
                <div className={style.executionInfoRightDescription}>
                  <div className={style.executionInfoRightDescriptionItem}>
                    <span className={style.text}>36%</span>
                    <span className={style.title}>Побед</span>
                  </div>
                  <div className={style.executionInfoRightDescriptionItem}>
                    <span className={style.text}>21</span>
                    <span className={style.title}>Убийств</span>
                  </div>
                  <div className={style.executionInfoRightDescriptionItem}>
                    <span className={style.text}>0,83</span>
                    <span className={style.title}>K/D</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={style.player}>
            <div className={style.defaultInfo}>
              <button className={style.avatarButton}>
                <Avatar
                  widthPremium={14}
                  heightPremium={14}
                  username={"YaClary"}
                  styles={{ width: "40px", height: "40px" }}
                />
              </button>
              <span className={style.username}>YaClary</span>
            </div>
            <div className={style.executionInfo}>
              <div className={style.executionInfoLeft}>
                <div className={style.executionInfoLeftTitle}>Всего</div>
                <div className={style.executionInfoLeftDescription}>
                  <span className={style.text}>3</span>
                  <span className={style.title}>Матчи</span>
                </div>
              </div>
              <div className={style.executionInfoRight}>
                <div className={style.executionInfoRightTitle}>
                  Последние 20 матчей
                </div>
                <div className={style.executionInfoRightDescription}>
                  <div className={style.executionInfoRightDescriptionItem}>
                    <span className={style.text}>16%</span>
                    <span className={style.title}>Побед</span>
                  </div>
                  <div className={style.executionInfoRightDescriptionItem}>
                    <span className={style.text}>11</span>
                    <span className={style.title}>Убийств</span>
                  </div>
                  <div className={style.executionInfoRightDescriptionItem}>
                    <span className={style.text}>0,33</span>
                    <span className={style.title}>K/D</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={style.player}>
            <div className={style.defaultInfo}>
              <button className={style.avatarButton}>
                <Avatar
                  widthPremium={14}
                  heightPremium={14}
                  username={"Realish"}
                  permanentPremium
                  styles={{ width: "40px", height: "40px" }}
                />
              </button>
              <span className={style.username}>Realish</span>
            </div>
            <div className={style.executionInfo}>
              <div className={style.executionInfoLeft}>
                <div className={style.executionInfoLeftTitle}>Всего</div>
                <div className={style.executionInfoLeftDescription}>
                  <span className={style.text}>9</span>
                  <span className={style.title}>Матчи</span>
                </div>
              </div>
              <div className={style.executionInfoRight}>
                <div className={style.executionInfoRightTitle}>
                  Последние 20 матчей
                </div>
                <div className={style.executionInfoRightDescription}>
                  <div className={style.executionInfoRightDescriptionItem}>
                    <span className={style.text}>73%</span>
                    <span className={style.title}>Побед</span>
                  </div>
                  <div className={style.executionInfoRightDescriptionItem}>
                    <span className={style.text}>10</span>
                    <span className={style.title}>Убийств</span>
                  </div>
                  <div className={style.executionInfoRightDescriptionItem}>
                    <span className={style.text}>0,54</span>
                    <span className={style.title}>K/D</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}
