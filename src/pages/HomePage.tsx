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

      {/* <Home.ArticlesWrapper>
        <Home.ArticleHeading>Последние статьи</Home.ArticleHeading>
        <Home.Articles>
          <Home.ArticleItem
            image={
              "https://sun9-6.userapi.com/impg/wqv7TWmkva-_DDitar4IH0iQYQJqT0SY0CpM4g/8FvTnATRgfg.jpg?size=1024x1024&quality=96&sign=b443bb70d4e8017cfe37cd8b9b60aeae&type=album"
            }
            title={
              "К сожалению, нам придется перенести дату открытия на неопределенный срок времени."
            }
            date={"9 Сентября, 2022"}
            url={"vk.com"}
          />
          <Home.ArticleItem
            image={"https://i.imgur.com/kuULB0U.png"}
            title={
              "Увы, но по техническим причинам нам требуется перенести дату открытия сайта. Теперь, мы планируем сделать это 9 сентября."
            }
            date={"28 Августа, 2022"}
            url={"vk.com"}
          />
          <Home.ArticleItem
            image={
              "https://sun9-76.userapi.com/impg/hcNV2tnQJR5iHYfzGsvPwkIenS1y04K4ignWaw/ZC-N7h0jxvY.jpg?size=1920x812&quality=95&sign=3bd64e1b6f26397efa4a03b4528b4dfc&type=album"
            }
            title={
              "Приветствуем! Представляем вашему вниманию группу строителей нашего сервера.\n" +
              "В этой группе будет выходить различная информация по обновлениям карт. У вас есть шанс увидеть карты, которые по какой-либо причине не добавили. Или даже повлиять на выход карт на вашем любимом режиме. Также, в группе имеется уже три поста с новыми и ребилд картами. "
            }
            date={"26 Августа, 2022"}
            url={"vk.com"}
          />
        </Home.Articles>
      </Home.ArticlesWrapper> */}
    </div>
  );
};
