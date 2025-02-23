import { MatchOverview } from "./content";
import { GameState, useMatch, useMatchData } from "../hooks";
import { parseMatchData } from "../api/lib";
import { MatchStats, EventLog } from "@widgets/match-statistics/ui";
import { Tabs } from "@chakra-ui/react"

const TABS = {
  MATCH: "match",
  STATS: "stats",
  EVENTS: "events",
};

export const MatchContainer = ({ id }: {id: string}) => {
  const { picks, state, loading } = useMatch(id);
  const { data, isLoading } = useMatchData(id);

  if (isLoading) return <div>Загрузка...</div>;

  const parsedData = data ? parseMatchData(data) : null;
  const parsedPick = typeof data.lobby === "string" ? JSON.parse(data.lobby) : data.lobby || {};
  const isMatchFinished =
    picks?.state === GameState.FINISHED ||
    ["load", undefined].includes(data?.map_id);

  return (
    <Tabs.Root lazyMount unmountOnExit defaultValue={TABS.MATCH}>
      <Tabs.List>
        <Tabs.Trigger value={TABS.MATCH}>Обзор</Tabs.Trigger>
        <Tabs.Trigger value={TABS.STATS} disabled={isMatchFinished}>
          Статистика
        </Tabs.Trigger>
        <Tabs.Trigger value={TABS.EVENTS} disabled={isMatchFinished}>
          События
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value={TABS.MATCH}>
        {parsedPick && !isMatchFinished ? (
          <MatchOverview
            picks={parsedPick.lobby}
            state={GameState.FINISHED}
            loading={isLoading}
            id={parsedPick.lobby.game_id}
          />
        ) : (
          picks && (
            <MatchOverview
              picks={picks}
              state={state || ""}
              loading={loading || isLoading}
              id={id}
            />
          )
        )}
      </Tabs.Content>

      <Tabs.Content value={TABS.STATS}>
        {parsedData && <MatchStats {...parsedData} />}
      </Tabs.Content>

      <Tabs.Content value={TABS.EVENTS}>
        {parsedData && (
          <EventLog
            events={parsedData.events}
            players={[...parsedData.winners, ...parsedData.losers]}
          />
        )}
      </Tabs.Content>
    </Tabs.Root>
  );
};
