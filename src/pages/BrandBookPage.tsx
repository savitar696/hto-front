import { ArrowIcon } from "@components/icons/Icons";
import { BrandBook } from "@components/namespaces/brandbook/BrandBook";
import { Button } from "@components/ui/button/Button";
import { useLayout } from "@shared/lib/hooks/useLayout";
import {
  LogoAnimatedGif,
  LogoFullBlackImage,
  LogoFullWhiteImage,
  LogoMarkBlackImage,
  LogoMarkWhiteImage,
  RainbowImage,
} from "@shared/static/images";
import React, { FC, useLayoutEffect } from "react";

export const BrandBookPage: FC = () => {
  const { state: layout } = useLayout();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    layout.footer.topPeace.set(false);
    layout.footer.state.set(true);
  }, [layout.footer.state, layout.footer.topPeace]);

  return (
    <div style={{ minHeight: "calc(100vh - 333px)" }}>
      <BrandBook.Heading>
        <BrandBook.HeadingColumn>
          <BrandBook.HeadingColumnHeading>
            <BrandBook.HeadingColumnHeadingTitle>
              Как использовать
              <br /> брендинг HTO
            </BrandBook.HeadingColumnHeadingTitle>
            <BrandBook.HeadingColumnHeadingDescription>
              Вы сотрудничаете с HTO, работаете в HTO или создаете производное
              искусство? В этом кратком руководстве показано, что вы можете и
              чего не можете делать с элементами брендинга HTO.
            </BrandBook.HeadingColumnHeadingDescription>
          </BrandBook.HeadingColumnHeading>
          <Button
            styles={{
              height: "48px",
              backgroundColor: "var(--black100)",
              border: "none",
              color: "var(--white100)",
              paddingLeft: "40px",
              paddingRight: "40px",
              display: "flex",
              flexDirection: "row",
              gap: "var(--space-2)",
            }}
          >
            <ArrowIcon /> Скачать архив брендбука
          </Button>
        </BrandBook.HeadingColumn>
        <BrandBook.HeadingColumn>
          <img
            src={LogoAnimatedGif}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "100%",
              userSelect: "none",
            }}
            alt=""
          />
        </BrandBook.HeadingColumn>
      </BrandBook.Heading>
      <BrandBook.Branding>
        <BrandBook.BrandingItem
          title={{ text: "Наш логотип" }}
          description={"Используйте наш логотип в черном или белом цвете"}
        >
          <BrandBook.BrandingItemImagesItem
            image={LogoFullBlackImage}
            background={{ color: "var(--white100)" }}
            widthImage={194.19}
            heightImage={38.26}
          />
          <BrandBook.BrandingItemImagesItem
            image={LogoFullWhiteImage}
            background={{ color: "var(--black100)" }}
            widthImage={194.19}
            heightImage={38.26}
          />
          <BrandBook.BrandingItemImagesItem
            image={LogoFullWhiteImage}
            styles={{ borderColor: "var(--white100)" }}
            background={{ color: "var(--white100)", image: RainbowImage }}
            widthImage={194.19}
            heightImage={38.26}
          />
        </BrandBook.BrandingItem>
        <BrandBook.BrandingItem title={{ text: "Только иконка", size: 28 }}>
          <BrandBook.BrandingItemImagesItem
            image={LogoMarkBlackImage}
            background={{ color: "var(--white100)" }}
            widthImage={42.5}
            heightImage={50}
          />
          <BrandBook.BrandingItemImagesItem
            image={LogoMarkWhiteImage}
            background={{ color: "var(--black100)" }}
            widthImage={42.5}
            heightImage={50}
          />
          <BrandBook.BrandingItemImagesItem
            image={LogoMarkWhiteImage}
            styles={{ borderColor: "var(--white100)" }}
            background={{ color: "var(--white100)", image: RainbowImage }}
            widthImage={42.5}
            heightImage={50}
          />
        </BrandBook.BrandingItem>
      </BrandBook.Branding>
    </div>
  );
};
