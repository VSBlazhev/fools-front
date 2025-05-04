import {createSlice} from '@reduxjs/toolkit'

export interface AppState {
    value: 'inGame' | 'room' | 'main'
}

const initialState: AppState = {
    value: 'main',
}

export const appStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        setRoom: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value = 'room'
        },
        setGame: (state) => {
            state.value = 'inGame'
        },
        setMain: (state) => {
            state.value = 'main'
        },
    },
})

// Action creators are generated for each case reducer function
export const {setRoom, setMain, setGame} = appStateSlice.actions

export default appStateSlice.reducer