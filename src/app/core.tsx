import { BrowserRouter } from "react-router-dom";
import { withProviders } from "./providers";
import { AppRouter } from "./routing";
import { AuthProvider } from "./providers/with-auth";

export const Core = withProviders(() => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
});
