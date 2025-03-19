import React, { FC } from "react";
import { Link } from "react-router-dom";

import style from "./Home.module.scss";

export namespace HomePageNamespace {
  export const Heading: FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className={style.head}>{children}</div>;
  };

  export const HeadingTitle: FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    return <div className={style.title}>{children}</div>;
  };

  export const HeadingTabs: FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    return <div className={style.tabs}>{children}</div>;
  };

  export const ArticlesWrapper: FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    return <div className={style.articles}>{children}</div>;
  };

  export const ArticleHeading: FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    return (
      <div className={style.title}>
        <span>{children}</span>
      </div>
    );
  };

  export const Articles: FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className={style.items}>{children}</div>;
  };

  export const ArticleItem: FC<{
    image: string;
    title: string;
    date: string;
    url: string;
  }> = ({ image, date, title, url }) => {
    return (
      <Link to={url} className={style.item}>
        <img className={style.image} src={image} alt="" />
        <div className={style.info}>
          <span className={style.title}>{title}</span>
          <span className={style.date}>{date}</span>
        </div>
      </Link>
    );
  };
}
