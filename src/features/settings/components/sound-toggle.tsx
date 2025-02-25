import { Switch } from "@components/ui/switch"
import { useLocalStorage } from "@siberiacancode/reactuse"

export const SoundToggle = () => {
  const { value, set } = useLocalStorage("sound", true)

  return (
    <Switch checked={value} onChange={() => set(!value)}>
      Включить звук в игре
    </Switch>
  )
}
