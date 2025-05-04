import { configureStore } from "@reduxjs/toolkit";
import appStateReducer from "../slices/appStateSlice.ts";
import roomStateReducer from "../slices/roomStateSlice.ts";
import userStateReducer from "../slices/userStateSlice.ts";
import gameStateReducer from "../slices/gameStateSlice.ts";

export const store = configureStore({
  reducer: {
    appState: appStateReducer,
    roomState: roomStateReducer,
    userState: userStateReducer,
    gameState: gameStateReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
