import { useUser } from "@entities/user";
import { createState, useState } from "@hookstate/core";
import axios from "axios";
import React, { FC, Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";

import {
  AddImageIcon,
  DiscordIcon,
  DotsIcon,
  VkIcon,
  YouTubeIcon,
} from "../../icons/Icons";
import { Modal } from "../../modal/Modal";
import modalStyle from "../../modal/Modal.module.scss";
import { Avatar } from "../../ui/avatar/Avatar";
import { Button } from "../../ui/button/Button";
import { Input } from "../../ui/input/Input";
import { Switch } from "../../ui/switch/Switch";
import style from "./PlayerSettings.module.scss";

export namespace PlayerSettings {
  const globalState = createState({
    tab: 1,
  });

  export const Head: FC = () => {
    return (
      <Fragment>
        <div className={style.head}>
          <span className={style.title}>Настройки профиля</span>
        </div>
      </Fragment>
    );
  };
  export const Body: FC = () => {
    const { payload } = useUser((state) => state, shallow);
    const Ref: any = useRef(null);
    const [file, setFile]: any = React.useState(false);

    const handleClick = () => {
      Ref.current.click();
    };

    const selectFile = (e: any) => {
      setFile({ file: e.target.files[0] });
    };

    const uploadFile = () => {
      const formData = new FormData();
      formData.append("image", file.file);

      axios
        .put(`http://localhost:3000/user/banner`, formData)
        .then(() => {})
        .catch(() => {});
    };

    const applyChanges = () => {
      uploadFile();
    };

    const [isOpenModal, setIsOpenModal] = React.useState(false);

    const navigate = useNavigate();
    const toSubscription = () => navigate("/subscription");

    const ref: any = useRef(null);
    const state = useState(globalState);

    const selectTab = (id: number) => {
      state.tab.set(id);
    };

    const [switchState, setSwitchState] = React.useState(false);

    return (
      <Fragment>
        <Modal.BackDrop state={isOpenModal} setState={setIsOpenModal}>
          <Modal.Wrapper setState={setIsOpenModal}>
            <Modal.Content width={350}>
              <div className={modalStyle.header}>
                <h1 className={modalStyle.title}>Изменить обложку в профиле</h1>
              </div>
              <div className={modalStyle.body}>
                <span className={modalStyle.text}>
                  Загрузите новую обложку для страницы вашего профиля. Мы
                  рекомендуем загружать изображения в разрешении 1463x300.
                  Максимум 5мб.
                </span>
                <input
                  ref={Ref}
                  style={{ display: "none" }}
                  type={"file"}
                  accept={"image/*"}
                  onChange={(event) => selectFile(event)}
                />
              </div>
              <div className={modalStyle.footer}>
                <Button
                  styles={{
                    backgroundColor: "var(--black100)",
                    color: "var(--white100)",
                    height: "48px",
                    border: "none",
                  }}
                  onClick={handleClick}
                >
                  Выбрать файл
                </Button>
                <Button
                  styles={{
                    height: "48px",
                  }}
                  onClick={() => setIsOpenModal(false)}
                >
                  Вернуться назад
                </Button>
              </div>
            </Modal.Content>
          </Modal.Wrapper>
        </Modal.BackDrop>

        <div className={style.body}>
          <div className={style.menu}>
            <div className={style.menuHeader}>
              <div
                className={style.tabItem}
                ref={state.tab.get() === 1 ? ref : null}
                style={{
                  color:
                    state.tab.value === 1
                      ? "var(--black100)"
                      : "var(--black40)",
                }}
                onClick={() => selectTab(1)}
              >
                Аккаунт
              </div>
              <div
                className={style.tabItem}
                ref={state.tab.get() === 2 ? ref : null}
                style={{
                  color:
                    state.tab.value === 2
                      ? "var(--black100)"
                      : "var(--black40)",
                }}
                onClick={() => selectTab(2)}
              >
                Другое
              </div>
            </div>

            {state.tab.value === 1 ? (
              <div className={style.menuBody}>
                <div className={style.account}>
                  <div className={style.coverWrapper}>
                    <div className={style.cover}>
                      <img src={`https://i.imgur.com/27QbtQt.png`} alt="" />
                      <div className={style.editCoverHiddenWrapper}>
                        <div
                          className={style.editCoverHidden}
                          onClick={() => setIsOpenModal(true)}
                        >
                          <div className={style.wrapperIcon}>
                            {/* <input
                              ref={Ref}
                              type={"file"}
                              name={"file"}
                              onChange={(e) => selectFile(e)}
                            /> */}
                            <AddImageIcon width={18} height={18} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={style.avatarWrapper}>
                      <div className={style.avatar}>
                        <Avatar
                          username={payload.profile.name}
                          widthPremium={30}
                          heightPremium={30}
                          styles={{
                            width: "123px",
                            height: "123px",
                            margin: "-5px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={style.contentWrapper}>
                    <div className={style.forms}>
                      <div className={style.itemsTop}>
                        <div className={style.item}>
                          <span className={style.title}>Статус</span>
                          <Input
                            options={{ useFocus: false }}
                            styles={{ height: "46px" }}
                            placeholder={"Какое у Вас сейчас настроение?"}
                          />
                        </div>
                      </div>
                      <div className={style.itemsBottom}>
                        <div className={style.header}>
                          <span className={style.title}>Социальные сети</span>
                          <span className={style.description}>
                            {file && file.name}
                            Добавьте свои существующие социальные ссылки
                          </span>
                        </div>
                        <div className={style.items}>
                          <div className={style.item}>
                            <span className={style.title}>Ссылка на сайт</span>
                            <Input
                              options={{ useFocus: false }}
                              styles={{ height: "46px" }}
                              placeholder={"https://"}
                            />
                          </div>
                          <div className={style.item}>
                            <span className={style.title}>Discord</span>
                            <div className={style.inputWrapperButton}>
                              <Input
                                options={{ useFocus: false }}
                                styles={{ height: "46px" }}
                                icon={{
                                  position: "left",
                                  item: <DiscordIcon width={18} height={18} />,
                                }}
                                placeholder={"Тег"}
                              />
                              <Button
                                styles={{
                                  height: "36px",
                                  gap: "var(--space-3)",
                                  alignItems: "center",
                                  position: "absolute",
                                  right: "6px",
                                  top: "6px",
                                  backgroundColor: "transparent",
                                  border: "none",
                                  color: "var(--black100)",
                                  opacity: 0.6,
                                }}
                              >
                                <span>Привязать</span>
                              </Button>
                            </div>
                          </div>
                          <div className={style.item}>
                            <span className={style.title}>ВКонтакте</span>
                            <Input
                              options={{ useFocus: false }}
                              styles={{ height: "46px" }}
                              icon={{
                                position: "left",
                                item: <VkIcon width={18} height={18} />,
                              }}
                              placeholder={"https://vk.com/"}
                            />
                          </div>
                          <div className={style.item}>
                            <span className={style.title}>YouTube</span>
                            <Input
                              options={{ useFocus: false }}
                              styles={{ height: "46px" }}
                              icon={{
                                position: "left",
                                item: <YouTubeIcon width={18} height={18} />,
                              }}
                              placeholder={"https://youtube.com/"}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <Button
                          styles={{
                            border: "none",
                            backgroundColor: "var(--black100)",
                            color: "var(--white100)",
                            height: "56px",
                            fontSize: "var(--fontSizes-2)",
                          }}
                          onClick={applyChanges}
                        >
                          Сохранить изменения
                        </Button>
                      </div>
                    </div>
                    <div className={style.verification}>
                      <img src={""} alt="" />
                      <div className={style.wrapper}>
                        <div className={style.text}>
                          <span className={style.title}>
                            Платная подписка Premium
                          </span>
                          <span className={style.description}>
                            Получите новые впечатления от игры и уникальные
                            функции на нашем сайте с временной подпиской
                          </span>
                        </div>
                        <Button onClick={toSubscription}>Посмотреть</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={style.menuBody}>
                <div className={style.other}>
                  <div className={style.info}>
                    <span className={style.title}>Другое</span>
                    <span className={style.description}>
                      Гибкие настройки для Вашего профиля
                    </span>
                  </div>
                  <div className={style.otherSettings}>
                    <div className={style.item}>
                      <div className={style.info}>
                        <span className={style.title}>
                          Видимость своего доната
                        </span>
                        <span className={style.description}>
                          Видимость своего значка доната перед другими игроками
                        </span>
                      </div>
                      <Switch
                        state={{
                          value: switchState,
                          setHandler: setSwitchState,
                        }}
                      />
                    </div>
                    <div className={style.item}>
                      <div className={style.info}>
                        <span className={style.title}>
                          Видимость доната игроков
                        </span>
                        <span className={style.description}>
                          Видимость значка доната всех игроков лично для Вас
                        </span>
                      </div>
                      <Switch
                        state={{
                          value: switchState,
                          setHandler: setSwitchState,
                        }}
                      />
                    </div>
                    <div className={style.item}>
                      <div className={style.info}>
                        <span className={style.title}>Звуковое оповещение</span>
                        <span className={style.description}>
                          Возможность выключить, включить или изменить звуковое
                          оповещение
                          <br /> при нахождении игры
                        </span>
                      </div>
                      <div className={style.buttons}>
                        <Switch
                          state={{
                            value: switchState,
                            setHandler: setSwitchState,
                          }}
                        />
                        <Button styles={{ width: "40px", height: "40px" }}>
                          <DotsIcon width={24} height={24} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Fragment>
    );
  };
}
