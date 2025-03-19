import { FC } from "react";
import { Link } from "react-router-dom";

import { Button } from "../../ui/button/Button";
import style from "./NotFound.module.scss";

interface NotFoundI {
  title: string;
  description: string;
}

export namespace NotFound {
  export const Body: FC<NotFoundI> = ({ title, description }) => {
    return (
      <div className={style.notFoundWrapper}>
        <div className={style.notFound}>
          <h1 className={style.title}>{title}</h1>
          <span className={style.description}>{description}</span>
          <div className={style.buttons}>
            <Button
              styles={{
                background: "var(--black100)",
                color: "var(--white100)",
                border: "none",
                height: "48px",
              }}
            >
              <Link
                to={"/"}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Вернуться назад
              </Link>
            </Button>
            <a
              style={{ textDecoration: "none" }}
              target={"_blank"}
              href={"https://vk.me/HardTournamentsvw"}
            >
              <Button
                styles={{
                  background: "rgba(0, 0, 0, 0.05) none repeat scroll 0 0",
                  color: "var(--black100)",
                  border: "none",
                  height: "48px",
                }}
              >
                Поддержка
              </Button>
            </a>
          </div>
        </div>
      </div>
    );
  };
}
