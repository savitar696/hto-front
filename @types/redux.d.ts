import type { store } from "../src/app/store";

declare global {
	export type RootState = ReturnType<typeof store.getState>;
	export type AppDispatch = typeof store.dispatch;
}
