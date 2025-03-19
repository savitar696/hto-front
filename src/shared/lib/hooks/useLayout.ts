import { createState, useHookstate } from "@hookstate/core";

const layoutState = createState({
  header: true,
  footer: { state: true, topPeace: true },
  container: true,
});

export const useLayout = () => {
  const state = useHookstate(layoutState);

  return { state };
};
