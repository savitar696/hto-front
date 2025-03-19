import React, { FC, useState } from "react";

import { Button } from "../../ui/button/Button";
import style from "./BrandBook.module.scss";

export namespace BrandBook {
  export const Heading: FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className={style.heading}>{children}</div>;
  };

  export const HeadingColumn: FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    return <div className={style.column}>{children}</div>;
  };

  export const HeadingColumnHeading: FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    return <div className={style.heading}>{children}</div>;
  };

  export const HeadingColumnHeadingTitle: FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    return <span className={style.title}>{children}</span>;
  };

  export const HeadingColumnHeadingDescription: FC<{
    children: React.ReactNode;
  }> = ({ children }) => {
    return <span className={style.description}>{children}</span>;
  };

  export const Branding: FC<{ children: React.ReactNode }> = ({ children }) => {
    return <span className={style.branding}>{children}</span>;
  };

  export const BrandingItem: FC<{
    children: React.ReactNode;
    title: { text: string; size?: number };
    description?: string;
  }> = ({ title, description, children }) => {
    return (
      <div className={style.item}>
        <div className={style.heading}>
          <span className={style.title} style={{ fontSize: title.size && 32 }}>
            {title.text}
          </span>
          <span className={style.description}>{description}</span>
        </div>
        <div className={style.images}>{children}</div>
      </div>
    );
  };

  export const BrandingItemImagesItem: FC<{
    styles?: any;
    heightImage: number;
    widthImage: number;
    background: { color: string; image?: string };
    image: string;
  }> = ({ styles, heightImage, widthImage, background, image }) => {
    const [visibility, setVisibility] = useState(false);

    return (
      <div
        className={style.item}
        onMouseEnter={() => setVisibility(true)}
        onMouseLeave={() => setVisibility(false)}
        style={{
          ...styles,
          background: `url(${background.image})`,
          backgroundColor: background.color,
        }}
      >
        <div
          className={style.buttons}
          style={{
            opacity: visibility ? 1 : 0,
            animation: `0.2s ease 0s 1 normal forwards running ${
              visibility
                ? style.buttonsAnimationShow
                : style.buttonsAnimationHidden
            }`,
          }}
        >
          <Button>PNG</Button>
          <Button>SVG</Button>
        </div>
        <img height={heightImage} width={widthImage} src={image} alt="" />
      </div>
    );
  };
}
