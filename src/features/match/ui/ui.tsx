import { MatchOverview } from "./content"
import { GameState, useMatch, useMatchData } from "../hooks"
import { parseMatchData } from "../api/lib"
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
  const parsedData = data || {}
  const parsedPick = data?.lobby || {}
  const isMatchFinished =
    picks?.state === GameState.FINISHED ||
    ["load", undefined].includes(data?.map_id)

  const items = [
    {
      title: "Обзор",
      value: TABS.MATCH,
      content:
        parsedPick && !isMatchFinished ? (
          <MatchOverview
            picks={parsedPick.lobby}
            state={GameState.FINISHED}
            loading={isLoading}
            id={parsedPick.lobby.game_id}
            startedTime={parsedData?.started_at ?? undefined}
            endedTime={parsedData?.ended_at ?? undefined}
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
          players={[...parsedData.winners, ...parsedData.losers]}
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
