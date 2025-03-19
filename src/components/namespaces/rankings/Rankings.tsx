import { arrowAnimation } from "@shared/lib/utils/Animations";
import { AnimatePresence, motion } from "framer-motion";
import React, { FC, Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ComponentInterface } from "../../../shared/lib/types";
import { ArrowIcon } from "../../icons/Icons";
import { Avatar } from "../../ui/avatar/Avatar";
import style from "./Rankings.module.scss";
import { api } from "@shared/api/api.instance";
import { RainbowText } from "@components/rainbowText/RainbowText";

interface RankingsTable {
  category: Array<string>;
  items: any;
}

export namespace Rankings {
  export const Wrapper: FC<ComponentInterface> = ({ children }) => {
    return <Fragment>{children}</Fragment>;
  };

  export const Head = () => {
    return (
      <div className={style.head}>
        <div className={style.title}>Рейтинг игроков</div>
      </div>
    );
  };

  const TableItem: FC<{
    username: string;
    rating: number;
    id: number;
    premium: boolean;
    query?: boolean;
  }> = ({ username, rating, id, query, premium }) => {
    const [isHover, setIsHover] = useState(false);
    const navigate = useNavigate();

    const getRowClass = () => {
      if (id === 1) return style.firstPlace;
      if (id === 2) return style.secondPlace;
      if (id === 3) return style.thirdPlace;
      return "";
    };

    return (
      <motion.tr
        className={`${style.rankingsItem} ${getRowClass()}`}
        onHoverStart={() => setIsHover(true)}
        onHoverEnd={() => setIsHover(false)}
        onClick={() => navigate(`/player/${username}`)}
      >
        <th>{id}</th>
        <th>
          <div className={style.rankingsItemUser}>
            <Avatar
              username={username}
              styles={{ width: 48, height: 48 }}
              permanentPremium={premium}
              heightPremium={18}
              widthPremium={18}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              {username}
            </div>
          </div>
        </th>
        <motion.th>
          <div
            style={{
              display: "flex",
              gap: "var(--space-2)",
              height: "50px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {rating}

            <div style={{ marginRight: 25 }}>
              <AnimatePresence>
                {isHover && query ? (
                  <motion.div
                    variants={arrowAnimation}
                    initial={"initial"}
                    animate={"animate"}
                    exit={"exit"}
                  >
                    <ArrowIcon height={24} width={24} />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </motion.th>
      </motion.tr>
    );
  };

  const Table: FC<RankingsTable> = ({ category }) => {
    const mediaMatch = window.matchMedia("(min-width: 820px)");
    const [matches, setMatches] = useState(mediaMatch.matches);
    const [data, setData] = useState<any>();

    useEffect(() => {
      const handler = (e: any) => setMatches(e.matches);
      mediaMatch.addListener(handler);
      return () => mediaMatch.removeListener(handler);
    });

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await api.get("user/ranking");
          setData(response.data);
        } catch (error) {
          console.error("Error fetching rankings:", error);
        }
      };
      fetchData();
    }, []);

    return (
      <table className={style.rankingsTable}>
        <thead className={style.rankingsTableHead}>
          {category.map((item, key) =>
            item === "Статус" && !matches ? null : <th key={key}>{item}</th>
          )}
        </thead>

        <tbody>
          {data &&
            data.map((item: any, key: number) => (
              <TableItem
                username={item.profile.name}
                rating={item.rating}
                premium={item.premium}
                id={key + 1}
                query={matches}
                key={key}
              />
            ))}
        </tbody>
      </table>
    );
  };

  export const Body = () => {
    return (
      <Fragment>
        <div className={style.rankingsTableWrapper}>
          <Table category={["#", "Никнейм", "Рейтинг"]} items={"any"} />
        </div>
      </Fragment>
    );
  };
}
