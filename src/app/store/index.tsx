import { userSlice } from "@entities/user/model";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
