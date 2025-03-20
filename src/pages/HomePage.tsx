import { SearchIcon } from "@components/icons/Icons";
import { HomePageNamespace as Home } from "@components/namespaces/home/Home";
import { RainbowText } from "@components/rainbowText/RainbowText";
import { Button } from "@components/ui/button/Button";
import { Input } from "@components/ui/input/Input";
import { useUser } from "@entities/user";
import { useLayout } from "@shared/lib/hooks/useLayout";
import { FC, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";

import style from "../components/namespaces/home/Home.module.scss";

export const HomePage: FC = () => {
  const { state: layout } = useLayout();
  const navigate = useNavigate();
  const isAuth = useUser((state) => state.isAuth, shallow);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    layout.footer.topPeace.set(true);
    layout.footer.state.set(true);
    layout.container.set(true);
  }, [layout.container, layout.footer.state, layout.footer.topPeace]);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div style={{ minHeight: "calc(100vh - 333px)" }}>
      <Home.Heading>
        <Home.HeadingTitle>
          <RainbowText blur={false}>Hard Tournaments</RainbowText>
          <br />
          Лига по Bedwars на новом уровне
        </Home.HeadingTitle>
        <Input
          icon={{
            position: "left",
            item: <SearchIcon height={24} width={24} />,
          }}
          placeholder={"Поиск по сайту.."}
          className={style.hiddenInput}
          styles={{ padding: "0px 14px", height: "50px", width: "470px" }}
          options={{ useFocus: true }}
        />
        <Home.HeadingTabs>
          {/* <Button
            onClick={() => navigate("/brandbook")}
            styles={{ height: "46px" }}
          >
            Брендбук
          </Button> */}
          {isAuth && (
            <Button
              onClick={() => navigate("/play")}
              styles={{ height: "46px" }}
            >
              Играть
            </Button>
          )}
          <Button
            onClick={() => navigate("/rankings")}
            styles={{ height: "46px" }}
          >
            Рейтинг игроков
          </Button>
        </Home.HeadingTabs>
      </Home.Heading>

      <Home.ArticlesWrapper>
        <Home.ArticleHeading>Последние статьи</Home.ArticleHeading>
        <Home.Articles>
          <Home.ArticleItem
            image={"https://i.imgur.com/8DFy1Cg.png"}
            title={"Ура, новый дизайн у сайта! у шайтана мама шлюха"}
            date={formatDate(new Date())}
            url={"player/YaClary"}
          />
          <Home.ArticleItem
            image={"https://i.imgur.com/tHlJML8.png"}
            title={"saxue в ахуе от пениса на экране"}
            date={formatDate(new Date())}
            url={"player/YaClary"}
          />
          <Home.ArticleItem
            image={"https://i.imgur.com/wVid9AF.png"}
            title={"всем обнул рейтинга "}
            date={formatDate(new Date())}
            url={"player/YaClary"}
          />
        </Home.Articles>
      </Home.ArticlesWrapper>
    </div>
  );
};
