import { Player } from "@components/namespaces/player/Player";
import { useUser } from "@entities/user";
import { useLayout } from "@shared/lib/hooks/useLayout";
import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shallow } from "zustand/shallow";

export const PlayerPage: FC = () => {
  const { state: layout } = useLayout();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    layout.footer.topPeace.set(true);
    layout.footer.state.set(true);
  }, [layout.footer.state, layout.footer.topPeace]);

  const [hasPlayer, setHasPlayer] = useState<boolean>(false);
  const { username } = useParams();

  const getInfoByUsername = useUser(
    (state) => state.getInfoByUsername,
    shallow
  );
  const getGames = useUser((state) => state.getGames, shallow);

  useEffect(() => {
    if (typeof username === "string") {
      getInfoByUsername(username);
      getGames(username);
    }
  }, [getGames, getInfoByUsername, username]);

  const payload = useUser((state) => state.profile, shallow);
  const games = useUser((state) => state.games, shallow);

  useEffect(() => {
    setHasPlayer(payload != null);
  }, [payload]);

  return (
    <div style={{ minHeight: "calc(100vh - 333px)" }}>
      <Player.Initialization user={hasPlayer}>
        <Player.Head
          data={hasPlayer ? payload : null}
          games={hasPlayer ? games : null}
        />
        <Player.Body
          data={hasPlayer ? payload : null}
          games={hasPlayer ? games : null}
        />
      </Player.Initialization>
    </div>
  );
};
