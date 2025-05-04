import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RoomState {
  users: Record<string, { ready: boolean }>;
}

const initialState: RoomState = {
  users: {},
};

export const roomStateSlice = createSlice({
  name: "roomState",
  initialState,
  reducers: {
    setUsers: (
      state,
      action: PayloadAction<Record<string, { ready: boolean }>>,
    ) => {
      state.users = action.payload;
    },

    setUserReady(
      state,
      action: PayloadAction<{ userId: string; ready: boolean }>,
    ) {
      const userId = action.payload.userId;
      state.users[userId].ready = action.payload.ready;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUsers, setUserReady } = roomStateSlice.actions;

export default roomStateSlice.reducer;
