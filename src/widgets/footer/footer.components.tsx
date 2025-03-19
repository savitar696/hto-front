import { RoutesEnum } from "@app/router";
import {
  DiscordIcon,
  TelegramIcon,
  VkIcon,
  YouTubeIcon,
} from "@components/icons/Icons";
import { ComponentInterface } from "@shared/lib/types";
import {
  PaymentsMasterCardImage,
  PaymentsMirImage,
  PaymentsVisaImage,
} from "@shared/static/images";
import { Logo } from "@shared/ui";
import style from "@widgets/footer/footer.module.scss";
import React, { FC, Fragment } from "react";
import { Link } from "react-router-dom";

interface FooterComponents extends ComponentInterface {
  topPeace?: boolean;
}

export namespace FooterComponents {
  export const Header: FC<FooterComponents> = ({ children, topPeace }) => {
    return (
      <Fragment>
        {topPeace && <div className={style.header}>{children}</div>}
      </Fragment>
    );
  };

  export const Wallpaper = () => {
    return (
      <div className={style.wallpaper}>
        <Logo type={"full"} color={"white"} href height={70} />
      </div>
    );
  };

  export const Links = () => {
    const links = [
      {
        name: "Ссылки",
        items: [
          {
            title: "Правила организации",
            link: RoutesEnum.RULES_PAGE,
          },
          {
            title: "Платные подписки",
            link: RoutesEnum.SUBSCRIPTION_PAGE,
          },
          {
            title: "Главная",
            link: RoutesEnum.HOME_PAGE,
          },
        ],
      },
    ];

    return (
      <Fragment>
        {links.map((item) => {
          return (
            <div className={style.item} key={item.name}>
              <span className={style.title}>{item.name}</span>
              {item.items.map((item) => {
                return (
                  <Link to={item.link} className={style.text} key={item.title}>
                    {item.title}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </Fragment>
    );
  };

  export const Other = () => {
    const other = [
      {
        name: "Другое",
        items: [
          {
            title: "Другие наши проекты",
            link: RoutesEnum.HOME_PAGE,
          },
          {
            title: "Сотрудничество",
            link: RoutesEnum.HOME_PAGE,
          },
          {
            title: "Центр поддержки",
            link: RoutesEnum.HOME_PAGE,
          },
          {
            title: "API",
            link: RoutesEnum.HOME_PAGE,
          },
        ],
      },
    ];

    return (
      <Fragment>
        {other.map((item) => {
          return (
            <div className={style.item} key={item.name}>
              <span className={style.title}>{item.name}</span>
              {item.items.map((item) => {
                return (
                  <Link to={item.link} className={style.text} key={item.title}>
                    {item.title}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </Fragment>
    );
  };

  export const Community = () => {
    const community = [
      {
        name: "Telegram",
        icon: <TelegramIcon width={22} height={22} />,
        link: "https://t.me/hto_vw",
      },
      {
        name: "Discord",
        icon: <DiscordIcon width={22} height={22} />,
        link: "https://discord.gg/rHHVvFXqju",
      },
      {
        name: "YouTube",
        icon: <YouTubeIcon width={22} height={22} />,
        link: "https://www.youtube.com/@hardtournamentorganization3443",
      },
      {
        name: "VK",
        icon: <VkIcon width={22} height={22} />,
        link: "https://vk.com/hto_vw",
      },
    ];

    return (
      <div className={style.item}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-4)",
          }}
        >
          <span className={style.title}>Наше сообщество</span>
          <div className={style.community}>
            {community.map(({ icon, link }) => {
              return (
                <a
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  target={"_blank"}
                  href={link}
                  rel="noreferrer"
                  key={link}
                >
                  {icon}
                </a>
              );
            })}
          </div>
        </div>
        {/* <div className={style.bottom}>
          <img
            style={{ width: "49px", height: "16px" }}
            src={PaymentsVisaImage}
            alt=""
          />
          <img
            style={{ width: "30.29px", height: "19px" }}
            src={PaymentsMasterCardImage}
            alt=""
          />
          <img
            style={{ width: "59px", height: "16.09px" }}
            src={PaymentsMirImage}
            alt=""
          />
        </div> */}
      </div>
    );
  };

  export const Footer = () => {
    return (
      <div className={style.footer}>
        <div className={style.item}>HTO Production</div>
      </div>
    );
  };
}
