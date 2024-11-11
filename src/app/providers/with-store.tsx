import { store } from "@app/store";
import { ReactElement } from "react";
import { Provider } from "react-redux";

export const withStore = (component: () => ReactElement) => () => (
  <Provider store={store}>{component()}</Provider>
);
