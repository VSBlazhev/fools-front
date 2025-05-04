import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  ready: boolean;
  room: string | undefined;
  id: string | undefined;
}

const initialState: UserState = {
  ready: false,
  room: undefined,
  id: undefined,
};

export const userStateSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    toggleReady: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.ready = !state.ready;
    },
    attachRoom: (state, action: PayloadAction<string>) => {
      state.room = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleReady, attachRoom, setUserId } = userStateSlice.actions;

export default userStateSlice.reducer;
