import { Avatar } from "@components/ui/avatar/Avatar";
import {
  PaymentsMasterCardImage,
  PaymentsMirImage,
  PaymentsQIWIImage,
  PaymentsSBPImage,
  PaymentsVisaImage,
} from "@shared/static/images";
import sidebarStyle from "@widgets/sidebar/sidebar.module.scss";
import React, { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

import style from "../../../components/namespaces/subscription/Subscription.module.scss";

export type Items = Array<{
  title?: string;
  path: string;
  icon: { position: string; element: React.CElement<any, any> } | null;
  onClick?: MouseEventHandler<any>;
}>;

export type ButtonsSliderType = Array<{ item: React.ReactNode; index: number }>;

export const NavbarItems: {
  settings: {
    header: { show: boolean; content: React.CElement<any, any> };
    close: boolean;
  };
  items: Items;
  additionalItems?: { show: boolean; items: Items };
  footerItems?: { show: boolean; items: Items };
} = {
  settings: {
    header: {
      show: true,
      content: (
        <span className={sidebarStyle.info}>
          <span className={sidebarStyle.username}>Меню</span>
        </span>
      ),
    },
    close: true,
  },
  items: [
    {
      title: "Главная",
      path: "/",
      icon: null,
    },
    {
      title: "Рейтинги",
      path: "/rankings",
      icon: null,
    },
    {
      title: "Играть",
      path: "/play",
      icon: null,
    },
  ],
  additionalItems: {
    show: true,
    items: [
      {
        title: "Правила организации",
        path: "/rules",
        icon: null,
      },
      {
        title: "Центр поддержки",
        path: "/help",
        icon: null,
      },
      {
        title: "Платные подписки",
        path: "/subscription",
        icon: null,
      },
    ],
  },
  footerItems: {
    show: true,
    items: [
      {
        path: "https://t.me/hto_vw",
        icon: {
          position: "center",
          element: (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              className="sc-bdvvtL sc-iCfMLu iWfNDX"
            >
              <path
                d="M20.6601 4.22511C20.3531 3.96474 19.8708 3.92749 19.3722 4.12768H19.3713C18.8469 4.33811 4.52653 10.4806 3.94356 10.7315C3.83753 10.7684 2.91149 11.1139 3.00688 11.8835C3.09203 12.5774 3.8363 12.8648 3.92719 12.898L7.56787 14.1446C7.80941 14.9486 8.69983 17.915 8.89674 18.5488C9.01956 18.9438 9.21975 19.4629 9.5706 19.5698C9.87846 19.6885 10.1847 19.58 10.3828 19.4245L12.6087 17.3599L16.2019 20.1622L16.2874 20.2133C16.5314 20.3214 16.7652 20.3755 16.9883 20.3755C17.1606 20.3755 17.326 20.3431 17.4841 20.2784C18.0224 20.0574 18.2377 19.5444 18.2603 19.4863L20.9442 5.53557C21.108 4.79048 20.8803 4.41139 20.6601 4.22511ZM10.7787 14.6432L9.55054 17.9183L8.32237 13.8244L17.7383 6.86485L10.7787 14.6432Z"
                fill="currentColor"
              ></path>
            </svg>
          ),
        },
      },
      {
        path: "https://discord.gg/VJufZPj5",
        icon: {
          position: "center",
          element: (
            <svg
              viewBox="0 0 16 12"
              fill="none"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              className="sc-bdvvtL sc-iCfMLu coxBnO"
            >
              <path
                d="M13.1981 0.994734C12.2421 0.534315 11.2169 0.195098 10.1449 0.000814994C10.1254 -0.00293462 10.1059 0.00643586 10.0959 0.0251773C9.96401 0.27131 9.81796 0.592411 9.71568 0.844794C8.56275 0.663633 7.41574 0.663633 6.28645 0.844794C6.18415 0.586801 6.0328 0.27131 5.90036 0.0251773C5.8903 0.00706117 5.8708 -0.00230931 5.85128 0.000814994C4.77994 0.194478 3.75473 0.533694 2.79808 0.994734C2.7898 0.998482 2.7827 1.00473 2.77799 1.01285C0.83337 4.06208 0.300656 7.03635 0.561988 9.97375C0.56317 9.98812 0.570856 10.0019 0.581499 10.0106C1.86451 10.9995 3.10732 11.5999 4.32705 11.9978C4.34657 12.0041 4.36725 11.9966 4.37968 11.9797C4.6682 11.5662 4.9254 11.1301 5.14592 10.6715C5.15894 10.6447 5.14651 10.6128 5.11992 10.6022C4.71196 10.4398 4.3235 10.2417 3.94983 10.0169C3.92027 9.99874 3.91791 9.95437 3.9451 9.93313C4.02373 9.87129 4.10239 9.80694 4.17747 9.74197C4.19106 9.73011 4.20999 9.7276 4.22596 9.7351C6.6808 10.9114 9.33846 10.9114 11.7643 9.7351C11.7803 9.72698 11.7992 9.72949 11.8134 9.74135C11.8885 9.80632 11.9672 9.87129 12.0464 9.93313C12.0736 9.95437 12.0718 9.99874 12.0422 10.0169C11.6686 10.2461 11.2801 10.4398 10.8716 10.6016C10.845 10.6122 10.8331 10.6447 10.8462 10.6715C11.0714 11.1295 11.3286 11.5655 11.6118 11.9791C11.6236 11.9966 11.6449 12.0041 11.6644 11.9978C12.8901 11.5999 14.1329 10.9995 15.4159 10.0106C15.4271 10.0019 15.4342 9.98874 15.4354 9.97438C15.7482 6.57842 14.9116 3.62853 13.2176 1.01347C13.2135 1.00473 13.2064 0.998482 13.1981 0.994734ZM5.51251 8.18518C4.77344 8.18518 4.16446 7.47302 4.16446 6.59842C4.16446 5.72381 4.76163 5.01165 5.51251 5.01165C6.2693 5.01165 6.87238 5.73006 6.86055 6.59842C6.86055 7.47302 6.26338 8.18518 5.51251 8.18518ZM10.4967 8.18518C9.75766 8.18518 9.14868 7.47302 9.14868 6.59842C9.14868 5.72381 9.74583 5.01165 10.4967 5.01165C11.2535 5.01165 11.8566 5.73006 11.8448 6.59842C11.8448 7.47302 11.2535 8.18518 10.4967 8.18518Z"
                fill="currentColor"
              ></path>
            </svg>
          ),
        },
      },
      {
        path: "https://www.youtube.com/@hardtournamentorganization3443",
        icon: {
          position: "center",
          element: (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              className="sc-bdvvtL sc-iCfMLu coxBnO"
            >
              <path
                d="M21.593 7.20301C21.363 6.34501 20.688 5.66801 19.831 5.43701C18.265 5.00701 12 5.00001 12 5.00001C12 5.00001 5.73596 4.99301 4.16896 5.40401C3.32896 5.63301 2.63496 6.32501 2.40296 7.18201C1.98996 8.74801 1.98596 11.996 1.98596 11.996C1.98596 11.996 1.98196 15.26 2.39196 16.81C2.62196 17.667 3.29696 18.344 4.15496 18.575C5.73696 19.005 11.985 19.012 11.985 19.012C11.985 19.012 18.25 19.019 19.816 18.609C20.672 18.379 21.35 17.703 21.583 16.846C21.997 15.281 22 12.034 22 12.034C22 12.034 22.02 8.76901 21.593 7.20301ZM9.99596 15.005L10.001 9.00501L15.208 12.01L9.99596 15.005Z"
                fill="currentColor"
              ></path>
            </svg>
          ),
        },
      },
      {
        path: "https://vk.com/hto_vw",
        icon: {
          position: "center",
          element: (
            <svg
              fill="none"
              width="22"
              height="22"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 23.04C0 12.179 0 6.748 3.374 3.374S12.18 0 23.04 0h1.92c10.861 0 16.292 0 19.666 3.374C48 6.748 48 12.18 48 23.04v1.92c0 10.861 0 16.292-3.374 19.666C41.252 48 35.82 48 24.96 48h-1.92c-10.861 0-16.292 0-19.666-3.374C0 41.252 0 35.82 0 24.96z"
                fill="currentColor"
              ></path>
              <path
                d="M25.54 34.58c-10.94 0-17.18-7.5-17.44-19.98h5.48c.18 9.16 4.22 13.04 7.42 13.84V14.6h5.16v7.9c3.16-.34 6.48-3.94 7.6-7.9h5.16c-.86 4.88-4.46 8.48-7.02 9.96 2.56 1.2 6.66 4.34 8.22 10.02h-5.68c-1.22-3.8-4.26-6.74-8.28-7.14v7.14z"
                fill="#FFFFFF"
              ></path>
            </svg>
          ),
        },
      },
    ],
  },
};

export const ProfileItems = (user: any, logout: any) => {
  return {
    settings: {
      header: {
        show: true,
        content: (
          <Link to={"/"} className={sidebarStyle.info}>
            <Avatar
              styles={{ height: "40px", width: "40px" }}
              username={user.profile.name}
              widthPremium={14}
              heightPremium={14}
            />
            <span className={sidebarStyle.username}>{user.profile.name}</span>
          </Link>
        ),
      },
      close: true,
    },

    items: [
      {
        title: "Мой профиль",
        path: `/player/${user.profile.name}`,
        icon: null,
      },
      {
        title: "Настройки",
        path: `/settings`,
        icon: null,
      },
      {
        title: "Выход",
        path: "#",
        icon: null,
        onClick: logout,
      },
    ],
  };
};

export const PaymentItems: ButtonsSliderType = [
  {
    item: (
      <button
        style={{
          width: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          style={{
            width: "49.66px",
            height: "13.55px",
            zIndex: "4",
            padding: "10px",
            borderRadius: "var(--radii-3)",
          }}
          className={style.mirIcon}
          src={PaymentsMirImage}
          alt=""
        />
        <img
          style={{
            width: "41.26px",
            height: "13.47px",
            zIndex: "3",
            padding: "10px",
            borderRadius: "var(--radii-3)",
            transform: "translateX(0.25rem) scale(0.91)",
            marginRight: "var(--space-2)",
            position: "absolute",
          }}
          className={style.visaIcon}
          src={PaymentsVisaImage}
          alt=""
        />
        <img
          style={{
            width: "25.51px",
            height: "16px",
            zIndex: "2",
            position: "absolute",
            borderRadius: "var(--radii-3)",
            padding: "10px 14px",
            transform: "translateX(0.5rem) scale(0.8)",
          }}
          className={style.masterCardIcon}
          src={PaymentsMasterCardImage}
          alt=""
        />
      </button>
    ),
    index: 0,
  },

  {
    item: (
      <button
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <img
          style={{
            width: "57.94px",
            height: "21px",
            paddingTop: "3px",
            backgroundColor: "var(--blackNN04)",
          }}
          src={PaymentsQIWIImage}
          alt=""
        />
      </button>
    ),
    index: 1,
  },
  {
    item: (
      <button style={{ width: "100%" }}>
        <img
          style={{
            width: "57.94px",
            height: "21px",
            backgroundColor: "var(--blackNN04)",
          }}
          src={PaymentsSBPImage}
          alt=""
        />
      </button>
    ),
    index: 2,
  },
];

export const PremiumItem: ButtonsSliderType = [
  {
    item: (
      <button
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span style={{ color: "var(--black100)" }}>Месяц</span>
        <span style={{ color: "var(--black60)" }}>99 ₽</span>
      </button>
    ),
    index: 0,
  },
  {
    item: (
      <button
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span style={{ color: "var(--black100)" }}>3 месяца</span>
        <span style={{ color: "var(--black60)" }}>249 ₽ (-15%)</span>
      </button>
    ),
    index: 1,
  },
  {
    item: (
      <button
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span style={{ color: "var(--black100)" }}>6 месяцев</span>
        <span style={{ color: "var(--black60)" }}>450 ₽ (-25%)</span>
      </button>
    ),
    index: 2,
  },
];

export const PremiumPlusItem: ButtonsSliderType = [
  {
    item: (
      <button
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span style={{ color: "var(--black100)" }}>Месяц</span>
        <span style={{ color: "var(--black60)" }}>249 ₽</span>
      </button>
    ),
    index: 0,
  },
  {
    item: (
      <button
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span style={{ color: "var(--black100)" }}>3 месяца</span>
        <span style={{ color: "var(--black60)" }}>599 ₽ (-15%)</span>
      </button>
    ),
    index: 1,
  },
  {
    item: (
      <button
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span style={{ color: "var(--black100)" }}>6 месяцев</span>
        <span style={{ color: "var(--black60)" }}>999 ₽ (-25%)</span>
      </button>
    ),
    index: 2,
  },
];
