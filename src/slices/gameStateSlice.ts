import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState, userStateSlice } from "./userStateSlice.ts";
import { TCard, Player, CardRank } from "../types/types.ts";

export interface GameState {
  players: Player[];
  hand: TCard[];
  tableCards: TCard[];
  konCard: CardRank | undefined;
  currentPlayer: string | undefined;
  isAllActions: boolean;
  isGameOver: boolean;
  shooterId: string | undefined;
  chamber: boolean[];
  haveToShoot: boolean;
}

const initialState: GameState = {
  players: [],
  hand: [],
  tableCards: [],
  konCard: undefined,
  currentPlayer: undefined,
  isAllActions: true,
  isGameOver: false,
  shooterId: undefined,
  chamber: [],
  haveToShoot: false,
};

export const gameStateSlice = createSlice({
  name: "gameState",
  initialState,
  reducers: {
    setHand: (state, action: PayloadAction<TCard[]>) => {
      state.hand = action.payload;
    },
    setTableCards: (state, action: PayloadAction<TCard[]>) => {
      state.tableCards = action.payload;
    },
    setKonCard: (state, action: PayloadAction<CardRank>) => {
      state.konCard = action.payload;
    },
    setCurrentPlayer: (state, action: PayloadAction<string>) => {
      state.currentPlayer = action.payload;
    },
    setPlayers: (state, action: PayloadAction<Player[]>) => {
      state.players = action.payload;
    },
    setActions: (state, action: PayloadAction<boolean>) => {
      state.isAllActions = action.payload;
    },
    setShooterId: (state, action: PayloadAction<string>) => {
      state.shooterId = action.payload;
    },
    setGameOver: (state, action: PayloadAction<boolean>) => {
      state.isGameOver = action.payload;
    },
    setChamber: (state, action: PayloadAction<boolean[]>) => {
      state.chamber = action.payload;
    },
    setShoot: (state, action: PayloadAction<boolean>) => {
      state.haveToShoot = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setHand,
  setPlayers,
  setCurrentPlayer,
  setKonCard,
  setTableCards,
  setActions,
  setShooterId,
  setGameOver,
  setChamber,
  setShoot,
} = gameStateSlice.actions;

export default gameStateSlice.reducer;
