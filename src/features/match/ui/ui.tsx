import { MatchOverview } from "./content"
import { useMatch } from "../hooks"
import { Tabs } from "@chakra-ui/react"

const TABS = {
  MATCH: "match",
  STATS: "stats",
  EVENTS: "events",
}

export const MatchContainer = ({ id }: { id: string }) => {
  const { picks, state, loading } = useMatch(id)
  const items = [
    {
      title: "Обзор",
      value: TABS.MATCH,
      content: picks && (
        <MatchOverview
          picks={picks}
          state={state || ""}
          loading={loading}
          id={id}
        />
      ),
    },
  ]

  return (
    <Tabs.Root lazyMount unmountOnExit defaultValue={TABS.MATCH} flex="1">
      <Tabs.List alignItems="center" spaceX="4" justifyContent="center">
        <Tabs.Trigger value={TABS.MATCH}>Обзор</Tabs.Trigger>
        <Tabs.Trigger value={TABS.STATS}>Статистика</Tabs.Trigger>
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
