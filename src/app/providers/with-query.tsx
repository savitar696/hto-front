import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactElement } from "react";

const queryClient = new QueryClient();

export const withQuery = (component: () => ReactElement) => () => (
  <QueryClientProvider client={queryClient}>{component()}</QueryClientProvider>
);
