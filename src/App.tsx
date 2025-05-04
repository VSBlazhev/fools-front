import {useState} from 'react'
import type {RootState} from "./store/store.ts";
import './App.css'
import Room from "./components/Room.tsx";
import RoomSearch from "./components/RoomSearch.tsx";
import Game from "./components/Game.tsx";
import {socket, WebSocketProvider} from "./contexts/WebScoket.ts";
import {useSelector, useDispatch} from 'react-redux'
import {setMain, setGame, setRoom} from "./slices/appStateSlice.ts";


function App() {

    const appState = useSelector((state: RootState) => state.appState.value)

    const dispatch = useDispatch();


    return (
        <>
            <WebSocketProvider value={socket}>
                {appState === 'main' ? <RoomSearch/> : null}
                {appState === 'room' ? <Room/> : null}
                {appState === 'inGame' ? <Game/> : null}
                <div className={'flex flex-col mt-20 border-2'}>
                    <button onClick={() => dispatch(setGame())}>InGame</button>
                    <button onClick={() => dispatch(setRoom())}>Room</button>
                    <button onClick={() => dispatch(setMain())}>Main</button>
                </div>
            </WebSocketProvider>
        </>
    )
}

export default App
