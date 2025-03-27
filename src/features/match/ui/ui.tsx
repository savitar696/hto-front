import { MatchOverview } from "./content"
import { GameState, useMatch, useMatchData } from "../hooks"
import { MatchStats, EventLog } from "@widgets/match-statistics/ui"
import { Tabs } from "@chakra-ui/react"
import { LoadingContent } from "@widgets/loading-content/ui"

const TABS = {
  MATCH: "match",
  STATS: "stats",
  EVENTS: "events",
}

export const MatchContainer = ({ id }: { id: string }) => {
  const { picks, state, loading } = useMatch(id)
  const { data, isLoading } = useMatchData(id)

  if (isLoading) return <LoadingContent text="Загружаем матч..." />
  const parsedData = (data && data.data) || {}
  const isMatchFinished =
    picks?.state === GameState.FINISHED ||
    ["load", undefined].includes(parsedData?.map_id)

  const items = [
    {
      title: "Обзор",
      value: TABS.MATCH,
      content:
        parsedData && !isMatchFinished ? (
          <MatchOverview
            picks={parsedData.lobby}
            state={GameState.FINISHED}
            loading={isLoading}
            id={parsedData.lobby.game_id}
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
        ),
    },
    {
      title: "Статистика",
      value: TABS.STATS,
      content: parsedData && <MatchStats {...parsedData} />,
    },
    {
      title: "События",
      value: TABS.EVENTS,
      content: parsedData && (
        <EventLog
          events={parsedData.events}
          players={[
            ...(Array.isArray(parsedData.winners) ? parsedData.winners : []),
            ...(Array.isArray(parsedData.losers) ? parsedData.losers : []),
          ]}
        />
      ),
    },
  ]

  return (
    <Tabs.Root lazyMount unmountOnExit defaultValue={TABS.MATCH} flex="1">
      <Tabs.List alignItems="center" spaceX="4" justifyContent="center">
        <Tabs.Trigger value={TABS.MATCH}>Обзор</Tabs.Trigger>
        <Tabs.Trigger value={TABS.STATS} disabled={isMatchFinished}>
          Статистика
        </Tabs.Trigger>
        <Tabs.Trigger value={TABS.EVENTS} disabled={isMatchFinished}>
          События
        </Tabs.Trigger>
      </Tabs.List>
      {items.map((item, index) => (
        <Tabs.Content
          key={index}
          value={item.value}
          _open={{
            animationName: "fade-in, scale-in",
            animationDuration: "300ms",
          }}
          _closed={{
            animationName: "fade-out, scale-out",
            animationDuration: "120ms",
          }}
        >
          {item.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}
