import { Player } from "@components/namespaces/player/Player";
import { useUser } from "@entities/user";
import { useLayout } from "@shared/lib/hooks/useLayout";
import React, { FC, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { shallow } from "zustand/shallow";

export const PlayerPage: FC = () => {
  const { state: layout } = useLayout();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    layout.footer.topPeace.set(true);
    layout.footer.state.set(true);
  }, []);

  const { username } = useParams();
  const getInfoByUsername = useUser((state) => state.getInfoByUsername);
  const getGames = useUser((state) => state.getGames);

  useEffect(() => {
    if (username) {
      getInfoByUsername(username);
      getGames(username);
    }
  }, [username]);

  const payload = useUser((state) => state.profile, shallow);
  const games = useUser((state) => state.games, shallow);

  const hasPlayer = !!payload;

  return (
    <div style={{ minHeight: "calc(100vh - 333px)" }}>
      <Player.Initialization user={hasPlayer}>
        <Player.Head data={payload} games={games} />
        <Player.Body data={payload} games={games} />
      </Player.Initialization>
    </div>
  );
};
