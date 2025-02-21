import { Tabs } from "@chakra-ui/react"
import { MatchOverview } from "./content"
import { GameState, useMatch, useMatchData } from "../hooks"
import { parseMatchData } from "../api/lib"
import { MatchStats, EventLog } from "@widgets/match-statistics/ui"

const TABS = {
  MATCH: "match",
  STATS: "stats",
  EVENTS: "events",
}

export const MatchContainer = ({ id }: { id: string }) => {
  const { picks, state, loading } = useMatch(id)
  const { data, isLoading } = useMatchData(id)

  if (isLoading) return <div>Загрузка...</div>

  const parsedData = data ? parseMatchData(data) : null
  const parsedPick = data ? JSON.parse(data.lobby) : null
  const isMatchFinished =
    picks?.state === GameState.FINISHED ||
    data.data?.map_id === "load" ||
    data.data?.map_id === undefined
  return (
    <Tabs.Root defaultValue={TABS.MATCH}>
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
        {parsedPick ? (
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
  )
}
